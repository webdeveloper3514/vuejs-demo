<script>
import Languages from "@/services/admin/languages";
import { Modal, Toast } from "bootstrap";
import jQuery from "jquery";

export default {
  name: "Languages",
  data() {
    return {
      Languages: [],
      loading: true,
      cultureListApiCallOrNot: false,
      selectedOption: null,
      searchText: "",
      updateNameError: "",
      getSpecificLanguage: {},
      cultureList: [],
      LanguageId: "",
      LanguageName: "",
      cultureNameErr: "",
      uiCultureNameErr: "",
      displayNameErr: "",
      cultureDetail: {
        extraProperties: {},
        cultureName: "",
        uiCultureName: "",
        displayName: "",
        isEnabled: false,
      },
    };
  },
  watch: {
    "getSpecificLanguage.displayName"(newVal) {
      if (!newVal) {
        this.updateNameError = "This field is required.";
      } else {
        this.updateNameError = "";
      }
    },
    "cultureDetail.cultureName"(newVal) {
      if (!newVal) {
        this.cultureNameErr = "This field is required.";
      } else {
        this.cultureNameErr = "";
      }
    },
    "cultureDetail.uiCultureName"(newVal) {
      if (!newVal) {
        this.uiCultureNameErr = "This field is required.";
      } else {
        this.uiCultureNameErr = "";
      }
    },
    "cultureDetail.displayName"(newVal) {
      if (!newVal) {
        this.displayNameErr = "This field is required.";
      } else {
        this.displayNameErr = "";
      }
    },
  },
  mounted() {
    this.ActionsApiHandler("getLanguage");
  },
  methods: {
    ActionsApiHandler(action) {
      if (action === "getLanguage") {
        this.loading = true;
        try {
          Languages.getLanguage().then(
            (response) => {
              this.Languages = response.data.items;
              this.loading = false;
            },
            (error) => {
              console.log("error", error);
              this.loading = false;
            }
          );
        } catch (err) {
          console.log("error", err);
          this.loading = false;
        }
      }
      if (action === "searchLanguage") {
        const payload = {
          filter: this.searchText,
          skipCount: 0,
          maxResultCount: 20,
        };
        if (this.searchText === "") delete payload["filter"];
        try {
          Languages.searchLanguages(payload).then(
            (response) => {
              this.Languages = response.data.items;
            },
            (error) => {
              console.log("Error", error);
            }
          );
        } catch (err) {
          console.log("Error", err);
        }
      }
      if (action === "getCultureList") {
        try {
          Languages.getCultureList().then(
            (response) => {
              this.cultureListApiCallOrNot = true;
              this.cultureList = response.data;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "addLanguage") {
        if (this.cultureDetail.cultureName === "") {
          this.cultureNameErr = "This field is required.";
        }
        if (this.cultureDetail.uiCultureName === "") {
          this.uiCultureNameErr = "This field is required.";
        }
        if (this.cultureDetail.displayName === "") {
          this.displayNameErr = "This field is required.";
        }
        if (
          this.cultureNameErr === "" &&
          this.uiCultureNameErr === "" &&
          this.displayNameErr === ""
        ) {
          try {
            Languages.addLanguage(this.cultureDetail).then(
              (response) => {
                this.ActionsApiHandler("getLanguage");
                this.myModal.hide();
              },
              (error) => {
                console.log("Error", error);
              }
            );
          } catch (err) {
            console.log("Error", err);
          }
        }
      }
      if (action === "getParticularRowData") {
        try {
          Languages.getSpecificLanguage(this.LanguageId).then(
            (response) => {
              this.getSpecificLanguage = response.data;
            },
            (error) => {
              console.log("Error", error);
            }
          );
        } catch (err) {
          console.log("Error", err);
        }
      }
      if (action === "deleteLanguage") {
        try {
          Languages.deleteLanguage(this.LanguageId).then(
            (response) => {
              this.myModal.hide();
              this.ActionsApiHandler("getLanguage");
            },
            (error) => {
              console.log("Error", error);
            }
          );
        } catch (err) {
          console.log("Error", err);
        }
      }
      if (action === "setDefaultLanguage") {
        try {
          Languages.setDefaultLanguage(this.LanguageId).then(
            (response) => {
              this.ActionsApiHandler("getLanguage");
              this.showToast("toast-1");
            },
            (error) => {
              console.log("Error", error);
            }
          );
        } catch (err) {
          console.log("Error", err);
        }
      }
      if (action === "updateLanguage") {
        if (this.updateNameError === "") {
          try {
            Languages.updateLanguage(this.getSpecificLanguage).then(
              (response) => {
                this.myModal.hide();
                this.ActionsApiHandler("getLanguage");
              },
              (error) => {
                console.log("Error", error);
              }
            );
          } catch (err) {
            console.log("Error", err);
          }
        } else {
          this.updateNameError = "This field is required.";
        }
      }
    },
    handleSelectOption(item) {
      if (this.selectedOption === "delete") {
        this.openActionsModals(item, "deleteModal");
      } else if (this.selectedOption === "update") {
        this.openActionsModals(item, "updateModal");
      } else if (this.selectedOption === "setDefaultLanguage") {
        this.LanguageId = item.id;
        this.ActionsApiHandler("setDefaultLanguage");
      }
      this.selectedOption = null;
    },
    showToast(target) {
      const toast = new Toast(document.getElementById(target));
      toast.show();
    },
    openActionsModals(item, action) {
      this.resetAllState();
      this.LanguageId = item.id;
      this.LanguageName = item.displayName;
      if (action === "updateModal") {
        this.ActionsApiHandler("getParticularRowData");
      }
      !this.cultureListApiCallOrNot &&
        action === "addNewLanguage" &&
        this.ActionsApiHandler("getCultureList");
      this.myModal = new Modal(document.getElementById(action), {
        keyboard: false,
      });
      this.myModal.show();
      jQuery(`#${action}`).appendTo(jQuery("body"));
    },
    resetAllState() {
      this.cultureNameErr = "";
      this.uiCultureNameErr = "";
      this.displayNameErr = "";
      this.updateNameError = "";
      this.LanguageId = "";
      this.cultureDetail.cultureName = "";
      this.cultureDetail.uiCultureName = "";
      this.cultureDetail.displayName = "";
      this.cultureDetail.isEnabled = false;
      this.getSpecificLanguage = {};
    },
  },
};
</script>

<template>
  <!-- Language component header -->
  <perfect-scrollbar class="app-content-inner-padding h-100">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">ADMINISTRATION</a></li>
      <li class="breadcrumb-item"><a href="/">LANGUAGE MANAGEMENT</a></li>
      <li class="breadcrumb-item active">LANGUAGES</li>
    </ul>
    <div class="row align-items-center">
      <div class="col-sm-10">
        <h1 class="page-header">Languages</h1>
      </div>
      <div class="mb-2 col-4 col-sm-2 col-xxl-1 text-end">
        <button
          class="btn btn-sm btn-outline-theme"
          type="button"
          v-on:click="openActionsModals('', 'addNewLanguage')"
        >
          <i class="me-1 fa fa-plus"></i> Create new Language
        </button>
      </div>
    </div>
    <hr class="mb-4 mt-n1" />

    <!-- Language search -->
    <div class="search_bar">
      <div class="row">
        <div class="col-12 mb-4">
          <div class="input-group">
            <input
              v-model="searchText"
              class="form-control"
              placeholder="Search for..."
              type="text"
              v-on:keyup="this.ActionsApiHandler('searchLanguage')"
            />
            <button class="btn btn-theme" type="button">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Language table -->
    <div class="tbl_wrap">
      <card>
        <card-body>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="border-bottom-trans">
                  <th scope="col">ACTIONS</th>
                  <th scope="col">DISPLAY NAME</th>
                  <th scope="col">CULTURE NAME</th>
                  <th scope="col">CULTURE NAME</th>
                  <th scope="col">ENABLED</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td v-loading="loading" class="p-5" colspan="5"></td>
                </tr>
                <tr v-for="(item, index) in Languages" v-bind:key="index">
                  <td>
                    <select
                      v-model="selectedOption"
                      class="form-select form-select-lg"
                      style="width: 170px"
                      @change="handleSelectOption(item)"
                    >
                      <option hidden value="null">Action</option>
                      <option value="delete">Delete</option>
                      <option value="update">Update</option>
                      <option value="setDefaultLanguage">
                        Set as default Language
                      </option>
                    </select>
                  </td>
                  <td>
                    {{ item.displayName }}
                    {{ item.isDefaultLanguage ? "(Default Language)" : "" }}
                  </td>
                  <td>{{ item.cultureName }}</td>
                  <td>{{ item.uiCultureName }}</td>
                  <td v-if="item.isEnabled"><i class="fa fa-check"></i></td>
                  <td v-if="!item.isEnabled"><i class="fa fa-times"></i></td>
                </tr>
                <tr v-if="Languages?.length === 0 && loading === false">
                  <td class="text-center pt-15px pb-15px" colspan="5">
                    No records found based on your search
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <td colspan="5">{{ Languages?.length }} Total</td>
              </tfoot>
            </table>
          </div>
        </card-body>
      </card>
    </div>
    <!-- Delete Modal -->
    <div id="deleteModal" class="modal fade" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Language Confirmation</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <h4>Are you sure?</h4>
            <p>
              {{ LanguageName }} language will be deleted. Do you confirm that?
            </p>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-default"
              data-bs-dismiss="modal"
              type="button"
            >
              Close
            </button>
            <button
              class="btn btn-outline-theme"
              type="button"
              v-on:click="ActionsApiHandler('deleteLanguage')"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- add Language modal -->
    <div id="addNewLanguage" class="modal fade" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create new language</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Culture Name *</label>
              <select
                v-model="cultureDetail.cultureName"
                class="form-select form-control"
              >
                <option
                  v-for="culture in cultureList"
                  :value="culture?.displayName"
                >
                  {{ culture.displayName }}
                </option>
              </select>
            </div>
            <p v-if="cultureNameErr" class="error" style="color: #f19f9f">
              {{ cultureNameErr }}
            </p>
            <div class="mb-3">
              <label class="form-label">Ui Culture Name *</label>
              <select
                v-model="cultureDetail.uiCultureName"
                class="form-select form-control"
              >
                <option
                  v-for="culture in cultureList"
                  :value="culture?.displayName"
                >
                  {{ culture.displayName }}
                </option>
              </select>
            </div>
            <p v-if="uiCultureNameErr" class="error" style="color: #f19f9f">
              {{ uiCultureNameErr }}
            </p>
            <div class="mb-3">
              <label class="form-label">Display Name *</label>
              <input
                v-model="cultureDetail.displayName"
                autocomplete="off"
                class="form-control"
                type="text"
              />
            </div>
            <p v-if="displayNameErr" class="error" style="color: #f19f9f">
              {{ displayNameErr }}
            </p>
            <div class="mb-3">
              <div class="form-check">
                <input
                  v-model="cultureDetail.isEnabled"
                  class="form-check-input"
                  type="checkbox"
                />
                <label class="form-check-label"> Enabled </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-default"
              data-bs-dismiss="modal"
              type="button"
            >
              Close
            </button>
            <button
              class="btn btn-outline-theme"
              type="button"
              v-on:click="ActionsApiHandler('addLanguage')"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- update modal -->
    <div id="updateModal" class="modal fade" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit language</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Display Name *</label>
              <input
                v-model="getSpecificLanguage.displayName"
                autocomplete="off"
                class="form-control"
                type="text"
              />
            </div>
            <p v-if="updateNameError" class="error" style="color: #f19f9f">
              {{ updateNameError }}
            </p>
            <div class="mb-3">
              <div class="form-check">
                <input
                  v-model="getSpecificLanguage.isEnabled"
                  class="form-check-input"
                  type="checkbox"
                />
                <label class="form-check-label" for="is-enabled">
                  Enabled
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-default"
              data-bs-dismiss="modal"
              type="button"
            >
              Close
            </button>
            <button
              class="btn btn-outline-theme"
              type="button"
              v-on:click="ActionsApiHandler('updateLanguage')"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- toast message -->
    <div class="position-fixed bottom-0 end-0 p-3">
      <div
        id="toast-1"
        aria-atomic="true"
        aria-live="assertive"
        class="toast align-items-center text-white bg-outline-green border-0 bg-success"
        role="alert"
      >
        <div class="d-flex">
          <div class="toast-body">
            <i class="me-1 fa fa-check"></i> Set Default Language Successfully.
          </div>
          <button
            aria-label="Close"
            class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            type="button"
          ></button>
        </div>
      </div>
    </div>
  </perfect-scrollbar>
</template>
