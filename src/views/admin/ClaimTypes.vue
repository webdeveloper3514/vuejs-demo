<!--//TODO Review entire page, replace the table with https://seantheme.com/hud-vue/table/plugins and fix table pagination-->

<template>
  <!-- heading in claim type -->
  <perfect-scrollbar class="app-content-inner-padding h-100">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">ADMINISTRATION</a></li>
      <li class="breadcrumb-item"><a href="/">IDENTITY MANAGEMENT</a></li>
      <li class="breadcrumb-item active">CLAIM TYPES</li>
    </ul>
    <div class="row align-items-center">
      <div class="col-sm-10">
        <h1 class="page-header">Claim Types</h1>
      </div>
      <div class="mb-2 col-4 col-sm-2 col-xxl-1 text-end">
        <button
          class="btn btn-sm btn-outline-theme"
          type="button"
          v-on:click="openActionsModals('', 'addClaimTypeModal')"
        >
          <i class="me-1 fa fa-plus"></i> New Claim type
        </button>
      </div>
    </div>
    <hr class="mb-4 mt-n1" />

    <!-- claim type search -->
    <div class="search_bar">
      <div class="row">
        <div class="col-12 mb-4">
          <div class="input-group">
            <input
              v-model="searchText"
              class="form-control"
              placeholder="Search for..."
              type="text"
              v-on:keyup="this.ActionsApiHandler('searchClaimTypes')"
            />
            <button class="btn btn-outline-default" type="button">
              <i class="fa fa-search text-muted"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- claim type table -->
    <div class="tbl_wrap">
      <card>
        <card-body>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="border-bottom-trans">
                  <th scope="col">ACTIONS</th>
                  <th scope="col">NAME</th>
                  <th scope="col">VALUE TYPE</th>
                  <th scope="col">DESCRIPTION</th>
                  <th scope="col">REGEX</th>
                  <th scope="col">REQUIRED</th>
                  <th scope="col">IS STATIC</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td v-loading="loading" class="p-5" colspan="7"></td>
                </tr>
                <tr v-for="(item, index) in claimTypes" v-bind:key="index">
                  <td>
                    <select
                      v-model="selectedOption"
                      class="form-select form-select-lg"
                      style="width: 170px"
                      @change="handleSelectOption(item)"
                    >
                      <option hidden value="null">Actions</option>
                      <option value="delete">Delete</option>
                      <option value="edit">Edit</option>
                    </select>
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.valueType }}</td>
                  <td>{{ item.description }}</td>
                  <td>{{ item.regex }}</td>
                  <td v-if="item.required"><i class="fa fa-check"></i></td>
                  <td v-if="!item.required"><i class="fa fa-times"></i></td>
                  <td v-if="item.isStatic"><i class="fa fa-check"></i></td>
                  <td v-if="!item.isStatic"><i class="fa fa-times"></i></td>
                </tr>
                <tr v-if="claimTypes?.length === 0 && loading === false">
                  <td class="text-center pt-15px pb-15px" colspan="7">
                    No records found based on your search
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <td colspan="7">{{ claimTypes?.length }} Total Records</td>
              </tfoot>
            </table>
          </div>
        </card-body>
      </card>
    </div>

    <!-- add claimtype modal -->
    <div id="addClaimTypeModal" class="modal fade" data-backdrop="false">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New claim type</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="form-label">Name *</label>
                <input
                  v-model="addClaimTypePayload.name"
                  autocomplete="off"
                  class="form-control"
                  type="text"
                />
              </div>
              <p v-if="AddNameError" class="error" style="color: #f19f9f">
                {{ AddNameError }}
              </p>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    v-model="addClaimTypePayload.required"
                    class="form-check-input"
                    type="checkbox"
                  />
                  <label class="form-check-label">
                    Required</label
                  >
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Regex</label>
                <input
                  v-model="addClaimTypePayload.regex"
                  autocomplete="off"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">
                  Regex description
                </label>
                <input
                  v-model="addClaimTypePayload.regexDescription"
                  autocomplete="off"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Description</label>
                <input
                  v-model="addClaimTypePayload.description"
                  autocomplete="off"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="mb-3">
                <label class="form-label"> Value Type </label>
                <select
                  v-model="addClaimTypePayload.valueType"
                  class="form-select form-control"
                >
                  <option value="0">String</option>
                  <option value="1">Int</option>
                  <option value="2">Boolean</option>
                  <option value="3">DateTime</option>
                </select>
              </div>
            </form>
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
              v-on:click="ActionsApiHandler('addClaimType')"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- edit claimtype modal -->
    <div id="updateClaimTypeModal" class="modal fade" data-backdrop="false">
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
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="form-label">Name *</label>
                <input
                  v-model="updateClaimTypePayload.name"
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
                    v-model="updateClaimTypePayload.required"
                    class="form-check-input"
                    type="checkbox"
                  />
                  <label class="form-check-label">
                    Required</label
                  >
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Regex</label>
                <input
                  v-model="updateClaimTypePayload.regex"
                  autocomplete="off"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">
                  Regex description
                </label>
                <input
                  v-model="updateClaimTypePayload.regexDescription"
                  autocomplete="off"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Description</label>
                <input
                  v-model="updateClaimTypePayload.description"
                  autocomplete="off"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="mb-3">
                <label class="form-label"> Value Type </label>
                <select
                  v-model="updateClaimTypePayload.valueType"
                  class="form-select form-control"
                >
                  <option value="0">String</option>
                  <option value="1">Int</option>
                  <option value="2">Boolean</option>
                  <option value="3">DateTime</option>
                </select>
              </div>
            </form>
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
              v-on:click="ActionsApiHandler('updateClaimTypes')"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div id="deleteClaimTypeModal" class="modal fade" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Are you sure ?</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              Are you sure you want to delete the claim type
              {{ claimTypeName }}?
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
              v-on:click="this.ActionsApiHandler('deleteClaimType')"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </perfect-scrollbar>
</template>

<script>
import ClaimTypes from "../../services/admin/claimTypes";
import { Modal } from "bootstrap";
import jQuery from "jquery";

export default {
  name: "ClaimTypes",
  components: {},
  data() {
    return {
      loading: true,
      claimTypes: [],
      selectedOption: null,
      searchText: "",
      claimTypeId: "",
      claimTypeName: "",
      AddNameError: "",
      updateNameError: "",
      addClaimTypePayload: {
        description: "",
        extraProperties: {},
        name: "",
        regex: "",
        regexDescription: "",
        required: false,
        valueType: 0,
      },
      updateClaimTypePayload: {
        concurrencyStamp: "",
        description: "",
        extraProperties: {},
        id: "",
        isStatic: false,
        name: "",
        regex: "",
        regexDescription: "",
        required: false,
        valueType: 0,
        valueTypeAsString: "",
      },
    };
  },
  watch: {
    "addClaimTypePayload.name"(newVal) {
      if (!newVal) {
        this.AddNameError = "This field is required.";
      } else {
        this.AddNameError = "";
      }
    },
    "updateClaimTypePayload.name"(newVal) {
      if (newVal === "") {
        this.updateNameError = "This field is required.";
      } else {
        this.updateNameError = "";
      }
    },
  },
  mounted() {
    this.ActionsApiHandler("getClaimTypes");
  },
  methods: {
    ActionsApiHandler(action, item) {
      if (action === "getClaimTypes") {
        this.loading = true;
        try {
          ClaimTypes.getClaimTypes().then(
            (res) => {
              this.claimTypes = res.data.items;
              this.loading = false;
            },
            (error) => {
              this.loading = false;
              console.log("error", error);
            }
          );
        } catch (error) {
          this.loading = false;
          console.log("error", error);
        }
      }
      if (action === "addClaimType") {
        if (this.AddNameError === "" && this.addClaimTypePayload.name !== "") {
          try {
            ClaimTypes.addClaimType(this.addClaimTypePayload).then(
              (res) => {
                this.myModal.hide();
                this.ActionsApiHandler("getClaimTypes");
              },
              (error) => {
                console.log("error", error);
              }
            );
          } catch (error) {
            console.log("error", error);
          }
        } else {
          this.AddNameError = "This field is required.";
        }
      }
      if (action === "getParticularData") {
        try {
          ClaimTypes.getParticularData(item.id).then(
            (res) => {
              this.updateClaimTypePayload.concurrencyStamp =
                res.data.concurrencyStamp;
              this.updateClaimTypePayload.description = res.data.description;
              this.updateClaimTypePayload.extraProperties =
                res.data.extraProperties;
              this.updateClaimTypePayload.id = res.data.id;
              this.updateClaimTypePayload.isStatic = res.data.isStatic;
              this.updateClaimTypePayload.name = res.data.name;
              this.updateClaimTypePayload.regex = res.data.regex;
              this.updateClaimTypePayload.regexDescription =
                res.data.regexDescription;
              this.updateClaimTypePayload.required = res.data.required;
              this.updateClaimTypePayload.valueType = res.data.valueType;
              this.updateClaimTypePayload.valueTypeAsString =
                res.data.valueTypeAsString;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (error) {
          console.log("error", error);
        }
      }
      if (action === "updateClaimTypes") {
        if (this.updateNameError === "" && this.updateClaimTypePayload.name) {
          try {
            ClaimTypes.updateClaimTypes(this.updateClaimTypePayload).then(
              (res) => {
                this.myModal.hide();
                this.ActionsApiHandler("getClaimTypes");
              },
              (error) => {
                console.log("error", error);
              }
            );
          } catch (error) {
            console.log("error", error);
          }
        } else {
          this.updateNameError = "This field is required.";
        }
      }
      if (action === "searchClaimTypes") {
        const payload = {
          filter: this.searchText.toLowerCase(),
          skipCount: 0,
          maxResultCount: 10,
        };
        if (this.searchText === "") delete payload["filter"];
        try {
          ClaimTypes.searchClaimTypes(payload).then(
            (res) => {
              this.claimTypes = res.data.items;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (error) {
          console.log("error", error);
        }
      }
      if (action === "deleteClaimType") {
        try {
          ClaimTypes.deleteClaimType(this.claimTypeId).then(
            (res) => {
              this.myModal.hide();
              this.ActionsApiHandler("getClaimTypes");
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (error) {
          console.log("error", error);
        }
      }
    },
    openActionsModals(item, action) {
      this.resetStates();
      this.claimTypeId = item.id;
      this.claimTypeName = item.name;
      action === "updateClaimTypeModal" &&
        this.ActionsApiHandler("getParticularData", item);
      this.myModal = new Modal(document.getElementById(action), {
        keyboard: false,
      });
      this.myModal.show();
      jQuery(`#${action}`).appendTo(jQuery("body"));
    },
    resetStates() {
      this.addClaimTypePayload.description = "";
      this.addClaimTypePayload.extraProperties = {};
      this.addClaimTypePayload.name = "";
      this.addClaimTypePayload.regex = "";
      this.addClaimTypePayload.regexDescription = "";
      this.addClaimTypePayload.required = false;
      this.addClaimTypePayload.valueType = 0;
    },
    handleSelectOption(item) {
      if (this.selectedOption === "delete") {
        this.openActionsModals(item, "deleteClaimTypeModal");
      } else if (this.selectedOption === "edit") {
        this.openActionsModals(item, "updateClaimTypeModal");
      }
      this.selectedOption = null;
    },
  },
};
</script>
