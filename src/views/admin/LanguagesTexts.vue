<script>
import LanguageTexts from "@/services/admin/languageTexts";
import Languages from "@/services/admin/languages";
import { Modal } from "bootstrap";
import jQuery from "jquery";

export default {
  name: "LanguageTexts",
  data() {
    return {
      loading: true,
      resources: [],
      Languages: [],
      LanguagesTexts: [],
      getParticularLanguageText: {},
      editLanguageTextIndex: -1,
      modalIsCloseOrNot: true,
      LanguageTextFilter: {
        resourceName: "",
        baseCultureName: "",
        targetCultureName: "",
        getOnlyEmptyValues: false,
        skipCount: 0,
        maxResultCount: 100,
      },
    };
  },
  mounted() {
    this.ActionsApiHandler("getResources");
    this.ActionsApiHandler("getLanguage");
    setTimeout(() => {
      this.ActionsApiHandler("getLanguageTexts");
    }, 1000);
  },
  methods: {
    ActionsApiHandler(action, apiCallOrNot) {
      if (action === "getResources") {
        this.loading = true;
        try {
          LanguageTexts.getResources().then(
            (response) => {
              this.loading = false;
              this.resources = response.data;
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
      if (action === "getLanguage") {
        try {
          Languages.getLanguage().then(
            (response) => {
              this.Languages = response.data.items;
              this.LanguageTextFilter.baseCultureName =
                response.data.items[0]?.cultureName;
              this.LanguageTextFilter.targetCultureName =
                response.data.items[1]?.cultureName;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "getLanguageTexts") {
        this.loading = true;
        this.LanguageTextFilter.resourceName === "" &&
          delete this.LanguageTextFilter["resourceName"];
        try {
          LanguageTexts.getLanguageTexts(this.LanguageTextFilter).then(
            (response) => {
              this.loading = false;
              this.LanguagesTexts = response.data.items;
            },
            (error) => {
              this.loading = false;
              console.log("error", error);
            }
          );
        } catch (err) {
          this.loading = false;
          console.log("error", err);
        }
      }
      if (action === "restoreToDefaultTextLanguage") {
        try {
          LanguageTexts.restoreToDefaultTextLanguage(
            this.getParticularLanguageText
          ).then(
            (response) => {
              this.myModal.hide();
              this.ActionsApiHandler("getLanguageTexts");
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "saveLanguageTexts") {
        this.loading = true;
        try {
          LanguageTexts.saveLanguageTexts(this.getParticularLanguageText).then(
            (response) => {
              apiCallOrNot && this.myModal.hide();
              this.ActionsApiHandler("getLanguageTexts");
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
      if (action === "saveAndNext") {
        this.ActionsApiHandler("saveLanguageTexts", false);
        this.LanguagesTexts[this.editLanguageTextIndex] =
          this.getParticularLanguageText;
        if (this.editLanguageTextIndex < this.LanguagesTexts.length - 1) {
          this.editLanguageTextIndex++;
          this.getParticularLanguageText =
            this.LanguagesTexts[this.editLanguageTextIndex];
        } else {
          this.editLanguageTextIndex = -1;
          this.getParticularLanguageText = "";
          alert("You have reached the end of the LanguagesTexts.");
        }
      }
      if (action === "filterLanguageTexts") {
        this.LanguageTextFilter.resourceName === "" &&
          delete this.LanguageTextFilter["resourceName"];

        try {
          LanguageTexts.filterLanguageTexts(this.LanguageTextFilter).then(
            (response) => {
              this.LanguagesTexts = response.data.items;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
    },
    openActionsModals(item, action, index) {
      this.getParticularLanguageText = {};
      this.getParticularLanguageText = item;
      this.editLanguageTextIndex = index;
      this.myModal = new Modal(document.getElementById(action), {
        keyboard: false,
      });
      this.myModal.show();
      jQuery(`#${action}`).appendTo(jQuery("body"));
    },
  },
};
</script>

<template>
  <!-- heading in edition -->

  <perfect-scrollbar class="app-content-inner-padding h-100">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">ADMINISTRATION</a></li>
      <li class="breadcrumb-item"><a href="/">LANGUAGE MANAGEMENT</a></li>
      <li class="breadcrumb-item active">LANGUAGE TEXTS</li>
    </ul>
    <div class="row align-items-center">
      <div class="col-sm-10">
        <h1 class="page-header">Language Texts</h1>
      </div>
    </div>
    <hr class="mb-4 mt-n1" />

    <!-- languageText Filter -->
    <div class="tbl_wrap">
      <card>
        <card-body>
          <form id="FilterFormId">
            <div class="row">
              <div class="col-12 col-md-3">
                <div class="mb-3">
                  <label class="form-label">Base Culture Name</label
                  ><select
                    v-model="LanguageTextFilter.baseCultureName"
                    class="form-select form-control"
                    @change="this.ActionsApiHandler('filterLanguageTexts')"
                  >
                    <option
                      v-for="item in Languages"
                      :value="item?.cultureName"
                    >
                      {{ item.displayName }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-12 col-md-3">
                <div class="mb-3">
                  <label class="form-label">Target Culture Name</label
                  ><select
                    v-model="LanguageTextFilter.targetCultureName"
                    class="form-select form-control"
                    @change="this.ActionsApiHandler('filterLanguageTexts')"
                  >
                    <option
                      v-for="item in Languages"
                      :value="item?.cultureName"
                    >
                      {{ item.displayName }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-12 col-md-3">
                <div class="mb-3">
                  <label class="form-label" >Resource Name</label>
                  <select
                    v-model="LanguageTextFilter.resourceName"
                    class="form-select form-control"
                    @change="this.ActionsApiHandler('filterLanguageTexts')"
                  >
                    <option value=""></option>
                    <option v-for="item in resources" :value="item?.name">
                      {{ item.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-12 col-md-3">
                <div class="mb-3">
                  <label class="form-label">Target Value</label>
                  <select
                    v-model="LanguageTextFilter.getOnlyEmptyValues"
                    class="form-select form-control"
                    @change="this.ActionsApiHandler('filterLanguageTexts')"
                  >
                    <option value="false">All</option>
                    <option value="true">Only empty values</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
          <div class="data-tables-filter">
            <div class="input-group">
              <input
                class="form-control"
                placeholder="Search"
                type="search"
              />
              <button class="btn btn-theme">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </card-body>
      </card>
    </div>

    <!-- Language Table -->
    <div class="tbl_wrap mt-4">
      <card>
        <card-body>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="border-bottom-trans">
                  <th scope="col">ACTION</th>
                  <th scope="col">KEY</th>
                  <th scope="col">BASE VALUE</th>
                  <th scope="col">VALUE</th>
                  <th scope="col">RESOURCE NAME</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td v-loading="loading" class="p-5" colspan="5"></td>
                </tr>
                <tr v-for="(item, index) in LanguagesTexts" v-bind:key="index">
                  <td>
                    <button
                      class="btn btn-outline-theme"
                      v-on:click="
                        openActionsModals(
                          item,
                          'updateTextLanguageModal',
                          index
                        )
                      "
                    >
                      Edit
                    </button>
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.baseValue }}</td>
                  <td>{{ item.value }}</td>
                  <td>{{ item.resourceName }}</td>
                </tr>
                <tr v-if="LanguagesTexts?.length === 0 && loading === false">
                  <td class="text-center pt-15px pb-15px" colspan="5">
                    No records found based on your search
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <td colspan="5">{{ LanguagesTexts.length }} Total Records</td>
              </tfoot>
            </table>
          </div>
        </card-body>
      </card>
    </div>

    <!-- Edit Text Language -->
    <div id="updateTextLanguageModal" class="modal fade" data-backdrop="false">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body" style="min-height: 420px">
            <div class="modal-body">
              <div v-if="!loading">
                <div class="mb-3">
                  <label class="form-label">Key</label>
                  <div>
                    <strong>{{ getParticularLanguageText.name }}</strong>
                  </div>
                </div>
                <div class="mb-3">
                  <label
                    class="form-label"
                    >Base Value</label
                  ><textarea
                    v-model="getParticularLanguageText.baseValue"
                    class="form-control"
                    rows="4"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label
                    class="form-label"
                    >Target Value</label
                  ><textarea
                    v-model="getParticularLanguageText.value"
                    class="form-control"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-sm btn-outline-primary"
              data-bs-dismiss="modal"
              type="button"
            >
              Cancel
            </button>
              <button
                class="btn btn-sm btn-outline-primary"
                type="button"
                v-on:click="ActionsApiHandler('restoreToDefaultTextLanguage')"
              >
                <i class="me-1 fa fa-check"></i>Restore to default
              </button>
              <button
                class="btn btn-sm btn-primary"
                type="button"
                v-on:click="this.ActionsApiHandler('saveLanguageTexts', true)"
              >
                <i class="me-1 fa fa-check"></i>Save
              </button>
              <button
                class="btn btn-sm btn-success"
                type="button"
                v-on:click="this.ActionsApiHandler('saveAndNext')"
              >
                <i class="me-1 fa fa-check"></i>Save And Next
                <i class="fa fa-arrow-right ms-1"></i>
              </button>
          </div>
        </div>
      </div>
    </div>
  </perfect-scrollbar>
</template>
