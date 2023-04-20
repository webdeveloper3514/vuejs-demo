<!--//TODO Review entire page, replace the table with https://seantheme.com/hud-vue/table/plugins and fix table pagination-->

<template>
  <perfect-scrollbar class="app-content-inner-padding h-100">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">SAAS</a></li>
      <li class="breadcrumb-item active">EDITIONS</li>
    </ul>
    <div class="row align-items-center">
      <div class="col-sm-10">
        <h1 class="page-header">Editions</h1>
      </div>
      <div class="mb-2 col-4 col-sm-2 col-xxl-1 text-end">
        <button
          class="btn btn-sm btn-outline-theme"
          type="button"
          v-on:click="openModal('', 'addEditionModal')"
        >
          <i class="me-1 fa fa-plus"></i> New edition
        </button>
      </div>
    </div>
    <hr class="mb-4 mt-n1" />

    <!-- edition search -->
    <div class="search_bar">
      <div class="row">
        <div class="col-12 mb-4">
          <div class="input-group">
            <input
              v-model="searchText"
              class="form-control"
              placeholder="Search for..."
              type="text"
              v-on:keyup="filterRecords"
            />
            <button class="btn btn-outline-default" type="button">
              <i class="fa fa-search text-muted"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- edition table -->
    <div class="tbl_wrap">
      <card>
        <card-body>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="border-bottom-trans">
                  <th scope="col">EDITION NAME</th>
                  <th class="text-center" scope="col">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td v-loading="loading" class="p-5" colspan="2"></td>
                </tr>
                <tr v-for="(item, index) in editionUsers" v-bind:key="index">
                  <td>{{ item.displayName }}</td>
                  <td class="text-center">
                    <button
                      class="btn btn-outline-theme ms-2 btn-sm"
                      type="button"
                      v-on:click="openModal(item, 'deleteEditionModal')"
                    >
                      Delete
                    </button>
                    <button
                      class="btn btn-outline-theme ms-2 btn-sm"
                      type="button"
                      v-on:click="openModal(item, 'updateEditionModal')"
                    >
                      Edit
                    </button>
                    <button
                      class="btn btn-outline-theme ms-2 btn-sm"
                      type="button"
                      v-on:click="openModal(item, 'featuresModal')"
                    >
                      Features
                    </button>
                    <button
                      class="btn btn-outline-theme ms-2 btn-sm"
                      type="button"
                      v-on:click="openModal(item, 'changeHistoryEditionModal')"
                    >
                      Change History
                    </button>
                  </td>
                </tr>
                <tr v-if="editionUsers?.length === 0 && loading === false">
                  <td class="text-center pt-15px pb-15px" colspan="2">
                    No records found based on your search
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <td colspan="4">{{ editionUsers?.length }} Total Records</td>
              </tfoot>
            </table>
          </div>
        </card-body>
      </card>
    </div>

    <!-- add edition modal -->
    <div id="addEditionModal" class="modal fade" data-backdrop="false">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New Edition</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="form-label">Edition name*</label>
                <input
                  v-model="editionDetail.displayName"
                  autocomplete="off"
                  class="form-control"
                  type="text"
                />
              </div>
              <p v-if="nameError" class="error" style="color: #f19f9f">
                {{ nameError }}
              </p>
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
              v-on:click="addEditionSubmitHandler"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- update edition modal -->
    <div id="updateEditionModal" class="modal fade" data-backdrop="false">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update Edition</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="form-label">Edition name*</label>
                <input
                  v-model="updateModalsDetail.displayName"
                  autocomplete="off"
                  class="form-control"
                  type="text"
                />
              </div>
              <p v-if="UpdateNameError" class="error" style="color: #f19f9f">
                {{ UpdateNameError }}
              </p>
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
              v-on:click="updateEditionHandler"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div id="deleteEditionModal" class="modal fade" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Edition Confirmation</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <h4>Are you sure?</h4>
            <p>
              Edition {{ deleteModalsDetail.displayName }} will be deleted. Do
              you confirm that?
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
              v-on:click="deleteEditionHandler(deleteModalsDetail.id)"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- changeHistory Modal-->
    <div
      id="changeHistoryEditionModal"
      class="modal fade"
      data-backdrop="false"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Volo.Saas.Editions.Edition <br />
              <span style="font-size: small">({{ changeHistory.id }})</span>
            </h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <!-- card Here -->
            <!-- <div>
            <div class="accordion" id="accordionExample" >
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Accordion Item #1
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    Hello
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-default"
              data-bs-dismiss="modal"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- features modal -->
    <div id="featuresModal" class="modal fade">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Features</h4>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-4">
                  <ul
                    aria-orientation="vertical"
                    class="nav-pills nav flex-column"
                    orientation="vertical"
                    role="tablist"
                  >
                    <li class="nav-item">
                      <a
                        v-for="feature in featuresDatails"
                        :class="
                          activeClass === feature?.name
                            ? 'nav-link active'
                            : 'nav-link'
                        "
                        :value="feature?.name"
                        aria-disabled="false"
                        aria-selected="false"
                        role="tab"
                        v-on:click="selectFeatures(feature)"
                        >{{ feature.displayName }}</a
                      >
                    </li>
                  </ul>
                </div>
                <div class="col-md-8">
                  <div class="tab-content">
                    <div class="tab-pane fade active show">
                      <h4>{{ activeClass }}</h4>
                      <hr class="mt-2 mb-3" />
                      <div
                        v-for="feature in featureData.features"
                        :value="feature?.name"
                        class="mt-2"
                        style="margin-left: 0px"
                      >
                        <div
                          v-if="
                            feature.valueType.name ===
                            'SelectionStringValueType'
                          "
                          class="mb-3 form-group"
                        >
                          <label class="form-label" for="Identity.TwoFactor">{{
                            feature.displayName
                          }}</label>
                          <select
                            :id="feature.name"
                            v-model="feature.value"
                            class="form-select"
                            @change="
                              newFeatureData(feature.name, feature.value)
                            "
                          >
                            <option
                              v-for="option in feature.valueType.itemSource
                                .items"
                              :value="option.value"
                            >
                              {{ option.value }}
                            </option></select
                          ><small class="d-block form-text text-muted">{{
                            feature.description
                          }}</small>
                        </div>

                        <div
                          v-if="
                            feature.valueType.name === 'FreeTextStringValueType'
                          "
                          class="mb-3 form-group"
                        >
                          <label class="form-label">{{
                            feature.displayName
                          }}</label
                          ><input
                            :id="feature.name"
                            v-model="feature.value"
                            :type="
                              feature.valueType.validator.name === 'BOOLEAN'
                                ? 'checkbox'
                                : feature.valueType.validator.name === 'NUMERIC'
                                ? 'number'
                                : feature.valueType.validator.name === 'STRING'
                                ? 'text'
                                : ''
                            "
                            :value="feature.value"
                            class="form-control"
                            @change="
                              newFeatureData(feature.name, feature.value)
                            "
                          /><small class="d-block form-text text-muted">{{
                            feature.description
                          }}</small>
                        </div>

                        <div
                          v-if="
                            feature.valueType.name === 'ToggleStringValueType'
                          "
                          class="form-check"
                        >
                          <input
                            :id="feature.name"
                            v-model="feature.value"
                            :type="
                              feature.valueType.validator.name === 'BOOLEAN'
                                ? 'checkbox'
                                : feature.valueType.validator.name === 'NUMERIC'
                                ? 'number'
                                : feature.valueType.validator.name === 'STRING'
                                ? 'text'
                                : ''
                            "
                            :value="feature.value"
                            class="form-check-input"
                            type="checkbox"
                            @change="
                              newFeatureData(feature.name, feature.value)
                            "
                          />
                          <label class="form-check-label">{{
                            feature.displayName
                          }}</label>
                          <small class="d-block form-text text-muted">
                            {{ feature.description }}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-outline-theme btn-sm"
              type="button"
              v-on:click="openActionsModalss('', 'resetFeatures')"
            >
              <i class="me-1 fa fa-refresh"></i> Reset to default
            </button>
            <button
              class="btn btn-outline-theme btn-sm"
              data-bs-dismiss="modal"
              type="button"
            >
              Close
            </button>
            <button
              class="btn btn-theme btn-sm"
              type="button"
              v-on:click="ActionsApiHandler('updateFeatures')"
            >
              <i class="me-1 fa fa-check"></i> Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- reset default feature modal -->
    <div id="resetFeatures" class="modal fade" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content bg-dark">
          <div class="modal-header">
            <h5 class="modal-title">Reset Default Features Confirmation</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <h4>Are you sure?</h4>
            <p>Are you sure to reset to default?</p>
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
              data-bs-dismiss="modal"
              type="button"
              v-on:click="resetFeaturesHandler"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  </perfect-scrollbar>
</template>

<script>
import { useAppAuth } from "../../stores/app-auth";

import Edition from "../../services/admin/edition";
import { Modal } from "bootstrap";
import jQuery from "jquery";

const appAuth = useAppAuth();

export default {
  name: "Edition",
  components: {},
  data() {
    return {
      loading: true,
      searchText: "",
      editionUsers: [],
      deleteModalsDetail: {},
      updateModalsDetail: {},
      editionDetail: {
        extraProperties: {},
        displayName: "",
        planId: null,
      },
      changeHistory: [],
      featuresDatails: [],
      activeClass: "Identity",
      featureData: {},
      editionId: "",
      isValidate: false,
      selectedItems: [],
    };
  },
  computed: {
    nameError() {
      if (!this.editionDetail.displayName) {
        if (this.isValidate) {
          return "This field is required.";
        }
      }
    },
    UpdateNameError() {
      if (!this.updateModalsDetail.displayName) {
        if (this.isValidate) {
          return "This field is required.";
        }
      }
    },
    filterRecords() {
      const payload = {
        filter: this.searchText,
        skipCount: 0,
        maxResultCount: 10,
      };
      if (this.searchText === "") delete payload["filter"];
      try {
        Edition.searchEditionData(payload).then(
          (response) => {
            this.editionUsers = response.data.items;
          },
          (error) => {
            this.loading = false;
          }
        );
      } catch (err) {
        this.loading = false;
      }
    },
  },
  created() {
    if (appAuth.$state.userLoggedIn == false) {
      this.$router.push("/");
    }
  },
  mounted() {
    this.getRecords();
  },
  methods: {
    ActionsApiHandler(action) {
      if (action === "updateFeatures") {
        const payload = {
          features: this.selectedItems,
        };
        try {
          Edition.updateFeatures(payload, this.editionId).then(
            (response) => {
              this.myModal.hide();
              this.featuresDatails = [];
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
    newFeatureData(name, value) {
      const obj = { name: name, value: value.toString() };
      const index = this.selectedItems.findIndex((a) => a.name === name);
      if (index >= 0) this.selectedItems.splice(index, 1, obj);
      else this.selectedItems.push(obj);
    },
    getRecords() {
      this.loading = true;
      try {
        Edition.getEditionAdminGetAll().then(
          (response) => {
            this.loading = false;
            this.editionUsers = response.data.items;
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
    },
    openModal(edition, action) {
      this.resetAllStates();

      this.isValidate = false;
      action === "deleteEditionModal"
        ? (this.deleteModalsDetail = edition)
        : "";
      action === "updateEditionModal"
        ? (this.updateModalsDetail = edition)
        : "";
      action === "featuresModal" ? (this.editionId = edition.id) : "";
      action === "featuresModal" ? this.getFeatureshandler(edition) : "";
      action === "changeHistoryEditionModal"
        ? this.changeHistoryEditionHandler(edition)
        : "";
      this.myModal = new Modal(document.getElementById(action), {
        keyboard: false,
      });
      this.myModal.show();
      jQuery(`#${action}`).appendTo(jQuery("body"));
    },
    resetAllStates() {
      this.editionDetail.displayName = "";
      this.featuresDatails = [];
    },
    getFeatureshandler(edition) {
      try {
        Edition.getFeaturesData(edition.id).then(
          (response) => {
            this.featuresDatails = response.data.groups;
            this.selectFeatures(this.featuresDatails[0]);
          },
          (error) => {
            this.loading = false;
          }
        );
      } catch (err) {
        this.loading = false;
      }
    },
    addEditionSubmitHandler() {
      this.isValidate = true;
      if (!this.nameError) {
        try {
          Edition.addNewEdition(this.editionDetail).then(
            (response) => {
              this.getRecords();
              this.myModal.hide();
              this.loading = false;
              this.editionDetail.extraProperties = {};
              this.editionDetail.displayName = "";
              this.editionDetail.planId = null;
            },
            (error) => {
              this.loading = false;
            }
          );
        } catch (err) {
          this.loading = false;
        }
      }
    },
    deleteEditionHandler(id) {
      try {
        Edition.deleteActionEdition(id).then(
          (response) => {
            this.getRecords();
            this.myModal.hide();
            this.loading = false;
          },
          (error) => {
            this.loading = false;
          }
        );
      } catch (err) {
        this.loading = false;
      }
    },
    updateEditionHandler(id) {
      this.isValidate = true;
      if (!this.UpdateNameError) {
        const payload = {
          displayName: this.updateModalsDetail.displayName,
          planId: null,
          planName: null,
          concurrencyStamp: this.updateModalsDetail.concurrencyStamp,
          id: this.updateModalsDetail.id,
          extraProperties: {},
        };
        try {
          Edition.updateActionEdition(payload).then(
            (response) => {
              this.getRecords();
              this.myModal.hide();
              this.loading = false;
            },
            (error) => {
              this.loading = false;
            }
          );
        } catch (err) {
          this.loading = false;
        }
      }
    },
    changeHistoryEditionHandler(edition) {
      try {
        Edition.changeHistoryActionEdition(edition).then(
          (response) => {
            this.changeHistory = response.data;
          },
          (error) => {
            this.loading = false;
          }
        );
      } catch (err) {
        this.loading = false;
      }
    },
    selectFeatures(feature) {
      this.activeClass = feature.name;
      this.featureData = feature;
    },
    resetFeaturesHandler() {
      try {
        Edition.resetDefaultFeature(this.editionId).then(
          (response) => {
            this.myModal.hide();
          },
          (error) => {
            this.loading = false;
          }
        );
      } catch (err) {
        this.loading = false;
      }
    },
    openActionsModalss(edition, action) {
      this.myModals = new Modal(document.getElementById(action), {
        keyboard: false,
      });
      this.myModals.show();
      jQuery(`#${action}`).appendTo(jQuery("body"));
    },
  },
};
</script>
