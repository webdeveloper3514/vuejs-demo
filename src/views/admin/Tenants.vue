<!--//TODO Review entire page, replace the table with https://seantheme.com/hud-vue/table/plugins and fix table pagination-->

<script>
import { useAppAuth } from "@/stores/app-auth";
import Tenant from "@/services/admin/tenant";
import Edition from "@/services/admin/edition";
import { Modal, Toast } from "bootstrap";
import jQuery from "jquery";
import datepicker from "@/components/plugins/Datepicker.vue";
import vueSelect from '@/components/plugins/vueSelect.vue';

const appAuth = useAppAuth();

export default {
  name: "Tenants",
  components: {
    datepicker: datepicker,
    vueSelect: vueSelect
  },
  data() {
    return {
      loading: true,
      tenantsUsers: [],
      searchText: "",
      tenantDetails: {
        extraProperties: {},
        name: "",
        editionId: "",
        adminEmailAddress: "",
        adminPassword: "",
        activationState: 0,
        activationEndDate: null,
        connectionStrings: {
          id: "",
          default: null,
          databases: [],
        },
      },
      deleteModalsDetail: {},
      editionUsers: [],
      selectedOption: null,
      updateDetail: {
        name: "",
        editionId: null,
        editionEndDateUtc: null,
        editionName: null,
        hasDefaultConnectionString: false,
        activationState: "",
        activationEndDate: null,
        concurrencyStamp: "",
        id: "",
        extraProperties: {},
      },
      tenantFilter: {
        editionId: {},
        activationState: null,
        skipCount: 0,
        maxResultCount: 10,
      },
      changePassword: {
        username: "admin",
        password: "",
      },
      tenantUid: "",
      inputType: "password",
      addModalActiveTab: "BaseInfo",
      selectedAddModalDatabaseCon: true,
      selectedActionModalDatabaseCon: true,
      featureData: {},
      activeClass: "Identity",
      featuresDatails: [],
      getTenantName: "",
      tenantId: "",
      isValidate: false,
      selectedItems: [],
      editionSelectArray:[],
    };
  },
  computed: {
    emailRequiredError() {
      if (!this.tenantDetails.adminEmailAddress) {
        return "This field is required.";
      }
    },
    emailInvalidError() {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        this.tenantDetails.adminEmailAddress &&
        !this.tenantDetails.adminEmailAddress.match(pattern)
      ) {
        return "This field is not a valid e-mail address.";
      }
    },
    emailError() {
      if (this.isValidate) {
        return this.emailRequiredError || this.emailInvalidError;
      }
    },

    nameRequiredError() {
      if (!this.tenantDetails.name) {
        return "This field is required.";
      }
    },
    nameInvalidError() {
      const pattern = /^[a-zA-Z ]{3,}$/;
      if (this.tenantDetails.name && !this.tenantDetails.name.match(pattern)) {
        return "Please enter a valid name with at least 3 characters.";
      }
    },
    nameError() {
      if (this.isValidate) {
        return this.nameRequiredError || this.nameInvalidError;
      }
    },

    passwordRequiredError() {
      if (!this.tenantDetails.adminPassword) {
        return "This field is required.";
      }
    },
    passwordInvalidError() {
      const pattern = /^.{3,}$/;
      if (
        this.tenantDetails.adminPassword &&
        !this.tenantDetails.adminPassword.match(pattern)
      ) {
        return "This field must be a string or array type with a minimum length of 3.";
      }
    },
    passwordError() {
      if (this.isValidate) {
        return this.passwordRequiredError || this.passwordInvalidError;
      }
    },

    updateModalNameErr() {
      if (!this.updateDetail.name) {
        return "This field is required.";
      }
    },

    changePasswordNameError() {
      if (!this.changePassword.username) {
        if (this.isValidate) {
          return "This field is required.";
        }
      }
    },
    filterRecords() {
      const payload = {
        filter: this.searchText.toLowerCase(),
        skipCount: 0,
        maxResultCount: 10,
      };
      if (this.searchText === "") delete payload["filter"];
      try {
        Tenant.searchTenantData(payload).then(
          (response) => {
            this.tenantsUsers = response.data.items;
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
    if (appAuth.$state.userLoggedIn === false) {
      this.$router.push("/");
    }
  },
  mounted() {
    this.getTenantsRecords();
    this.getEditionRecords();
  },
  methods: {
    ActionsApiHandler(action) {
      if (action === "updateFeatures") {
        const payload = {
          features: this.selectedItems,
        };
        try {
          Tenant.updateFeatures(payload, this.tenantId).then(
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
    showPasswordToggle() {
      this.inputType = this.inputType === "password" ? "text" : "password";
    },
    getTenantsRecords() {
      this.tenantsUsers = [];
      this.loading = true;
      try {
        Tenant.getTenantAdminGetAll().then(
          (response) => {
            this.loading = false;
            this.tenantsUsers = response.data.items;
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
    getEditionRecords() {
      try {
        Edition.getEditionAdminGetAll().then(
          (response) => {
            this.loading = false;
            this.editionSelectArray = response.data.items.map(obj => ({ label: obj.displayName, value: obj.id }));
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
    handleSelectOption(item) {
      if (this.selectedOption === "delete") {
        this.openActionsModals(item, "deleteTenantModal");
      } else if (this.selectedOption === "update") {
        this.getParticularRowHandler(item);
        this.openActionsModals(item, "updateTenantModal");
      } else if (this.selectedOption === "changePassword") {
        this.tenantUid = item.id;
        this.getTenantName = item.name;
        this.openActionsModals(item, "changePasswordModal");
      } else if (this.selectedOption === "changeHistory") {
        this.changeHistoryTenantHandler(item);
        this.openActionsModals(item, "changeHistoryTenantModal");
      } else if (this.selectedOption === "databaseConnection") {
        this.getDatabaseconHandler(item, "addModalDatabaseAction");
        this.openActionsModals(item, "databaseConnectionModal");
      } else if (this.selectedOption === "featureModal") {
        this.tenantId = item.id;
        this.getFeatureshandler(item);
        this.openActionsModals(item, "featureModal");
      }
      this.selectedOption = null;
    },
    resetFeaturesHandler() {
      try {
        Tenant.resetDefaultFeature(this.tenantId).then(
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
    getFeatureshandler(item) {
      try {
        Tenant.getFeaturesData(item.id).then(
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
    changeHistoryTenantHandler(tenant) {
      try {
        Tenant.changeHistoryActionTenant(tenant).then(
          (response) => {},
          (error) => {
            console.log("error", error);
          }
        );
      } catch (err) {
        console.log("error", error);
      }
    },
    openActionsModals(tenant, action) {
      this.featuresDatails = [];
      this.isValidate = false;
      action !== "actionChangePasswordValidate" && this.ResetStates();
      this.deleteModalsDetail = tenant;
      action === "addTenantModal"
        ? this.getDatabaseconHandler("", "addModalDatabaseAction")
        : "";
      this.myModal = new Modal(document.getElementById(action), {
        keyboard: false,
      });
      this.myModal.show();
      jQuery(`#${action}`).appendTo(jQuery("body"));
    },
    ResetStates() {
      this.tenantDetails.extraProperties = {};
      this.tenantDetails.name = "";
      this.tenantDetails.editionId = "";
      this.tenantDetails.adminEmailAddress = "";
      this.tenantDetails.adminPassword = "";
      this.tenantDetails.activationState = 0;
      this.tenantDetails.activationEndDate = null;
      this.tenantDetails.connectionStrings.id = "";
      this.tenantDetails.connectionStrings.default = null;
      this.tenantDetails.connectionStrings.databases = [];
      this.changePassword.username = "admin";
      this.changePassword.password = "";
    },
    showToast(target) {
      const toast = new Toast(document.getElementById(target));
      toast.show();
    },
    getDatabaseconHandler(item, action) {
      if (action === "addModalDatabaseAction") {
        try {
          Tenant.getDatabaseAddModalAction().then(
            (response) => {},
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "actionTableDatabaseAction") {
        try {
          Tenant.getDatabaseTableAction(item.id).then(
            (response) => {},
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
    },
    addSubmitHandler() {
      this.isValidate = true;
      this.tenantDetails.editionId =
        this.tenantDetails.editionId === ""
          ? null
          : this.tenantDetails.editionId;

      if (
        !this.emailError &&
        !this.passwordError &&
        !this.nameError &&
        this.tenantDetails.name !== "" &&
        this.tenantDetails.adminEmailAddress !== "" &&
        this.tenantDetails.adminPassword !== ""
      ) {
        try {
          Tenant.tenantAddSubmitHandler(this.tenantDetails).then(
            (response) => {
              this.getTenantsRecords();
              this.myModal.hide();
              // reset modal details
              this.tenantDetails.extraProperties = {};
              this.tenantDetails.name = "";
              this.tenantDetails.editionId = null;
              this.tenantDetails.adminEmailAddress = "";
              this.tenantDetails.adminPassword = "";
              this.tenantDetails.activationState = 0;
              this.tenantDetails.activationEndDate = null;
              this.tenantDetails.connectionStrings.id = "";
              this.tenantDetails.connectionStrings.default = null;
              this.tenantDetails.connectionStrings.databases = [];
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
    updateSubmitHandler() {
      this.updateDetail.editionId =
        this.updateDetail.editionId === "null"
          ? null
          : this.updateDetail.editionId;

      if (!this.updateModalNameErr) {
        try {
          Tenant.tenantUpdateSubmitHandler(this.updateDetail).then(
            (response) => {
              this.getTenantsRecords();
              this.myModal.hide();
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
    deleteTenantHandler(id) {
      try {
        Tenant.deleteActionTenant(id).then(
          (response) => {
            this.getTenantsRecords();
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
    getParticularRowHandler(payload) {
      try {
        Tenant.getParticularRowData(payload.id).then(
          (response) => {
            this.updateDetail.name = response.data.name
              ? response.data.name
              : "";
            this.updateDetail.editionId = response.data.editionId
              ? response.data.editionId
              : null;
            this.updateDetail.editionName = response.data.editionName
              ? response.data.editionName
              : null;
            this.updateDetail.id = response.data.id ? response.data.id : "";
            this.updateDetail.activationState = response.data.activationState
              ? response.data.activationState
              : "";
            this.updateDetail.concurrencyStamp = response.data.concurrencyStamp
              ? response.data.concurrencyStamp
              : "";
          },
          (error) => {
            console.log("error", error);
          }
        );
      } catch (err) {
        console.log("error", error);
      }
    },
    clearFilterDetails() {
      this.tenantFilter.editionId = null;
      this.tenantFilter.activationState = null;
    },
    tenantFilterHandler() {
      if (
        this.tenantFilter.editionId === null ||
        this.tenantFilter.editionId === ""
      ) {
        delete this.tenantFilter["editionId"];
      }
      if (
        this.tenantFilter.activationState === null ||
        this.tenantFilter.activationState === ""
      ) {
        delete this.tenantFilter["activationState"];
      }

      try {
        Tenant.tenantFilterData(this.tenantFilter).then(
          (response) => {
            this.tenantsUsers = response.data.items;
          },
          (error) => {
            this.loading = false;
          }
        );
      } catch (err) {
        this.loading = false;
      }
      this.selectedOption = null;
    },
    changePasswordHandler() {
      this.isValidate = true;
      if (!this.changePasswordNameError) {
        if (
          !/(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}/.test(
            this.changePassword.password
          )
        ) {
          this.openActionsModals("", "actionChangePasswordValidate");
        } else {
          try {
            Tenant.changeTenantPassword(
              this.tenantUid,
              this.changePassword
            ).then(
              (response) => {
                this.myModal.hide();
                this.showToast("toast-1");
              },
              (error) => {
                this.loading = false;
              }
            );
          } catch (err) {
            this.loading = false;
          }
        }
      }
    },
    generatePassword() {
      const length = 12; // Change this to adjust the length of the password
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]\\:;?><,./-=";
      let password = "";
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      this.changePassword.password = password;
    },
    AddModalActiveTabHandle(tab) {
      this.addModalActiveTab = tab;
    },
    selectFeatures(feature) {
      this.activeClass = feature.name;
      this.featureData = feature;
    },
    openActionsModalss(tenant, action) {
      this.myModals = new Modal(document.getElementById(action), {
        keyboard: false,
      });
      this.myModals.show();
      jQuery(`#${action}`).appendTo(jQuery("body"));
    },
    getSelectBoxValue(){
      console.log("callling.......")
    },
  },
};
</script>

<template>
  <perfect-scrollbar class="app-content-inner-padding h-100">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">SAAS</a></li>
      <li class="breadcrumb-item active">TENANTS</li>
    </ul>
    <div class="row align-items-center">
      <div class="col-sm-10">
        <h1 class="page-header">Tenants</h1>
      </div>
      <div class="mb-2 col-4 col-sm-2 col-xxl-1 text-end">
        <button
          class="btn btn-sm btn-outline-theme"
          type="button"
          v-on:click="openActionsModals('', 'addTenantModal')"
        >
          <i class="me-1 fa fa-plus"></i> New tenant
        </button>
      </div>
    </div>
    <hr class="mb-4 mt-n1" />

    <div class="search_bar">
      <div class="row">
        <!-- tenant search -->
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
        <!-- advance filter in tenant -->
        <div class="col-12 mb-4">
          <div id="accordionExample" class="accordion">
            <div class="accordion-item">
              <h2 id="headingOne" class="accordion-header">
                <button
                  class="accordion-button"
                  data-bs-target="#collapseOne"
                  data-bs-toggle="collapse"
                  type="button"
                >
                  Advance Filters
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div class="row">
                    <div class="col-12 col-sm-3">
                      <div class="mb-3">
                        <label class="form-label" for="editionIdFilter">
                          Edition
                        </label>
                        <!-- {{ tenantFilter?.editionId?.value }} -->
                        <!-- <select
                          v-model="tenantFilter.editionId"
                          class="form-select form-control"
                        >
                          <option value="">All</option>
                          <option
                            v-for="user in editionUsers"
                            :value="user?.id"
                          >
                            {{ user.displayName }}
                          </option>
                        </select> -->
                        <vue-select 
                          :options="editionSelectArray" 
                          placeholder="Select Edition">
                        </vue-select>
                </div>
                    </div>
                    <div class="col-12 col-sm-3">
                      <div class="mb-3">
                        <label class="form-label">Expiration date</label>
                        <div class="row">
                          <div class="col-12">
                            <datepicker multiCalendars range />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-sm-3">
                      <div class="mb-3">
                        <label class="form-label" for="activationState"
                          >Tenant activation state</label
                        >
                        <select
                          v-model="tenantFilter.activationState"
                          class="form-select form-control"
                          formcontrolname="activationState"
                        >
                          <option value=""></option>
                          <option value="Active">Active</option>
                          <option value="ActiveWithLimitedTime">
                            Active with limited time
                          </option>
                          <option value="Passive">Passive</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12 col-sm-auto align-self-end mb-3">
                      <div class="row">
                        <div class="col-6 col-sm-auto d-grid">
                          <button
                            class="btn btn-outline-theme"
                            type="button"
                            v-on:click="clearFilterDetails"
                          >
                            Clear
                          </button>
                        </div>
                        <div class="col-6 col-sm-auto d-grid">
                          <button
                            class="btn btn-theme"
                            type="button"
                            v-on:click="tenantFilterHandler"
                          >
                            Refresh
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- tenant table -->
    <div class="tbl_wrap">
      <card>
        <card-body>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="border-bottom-trans">
                  <th scope="col">ACTIONS</th>
                  <th scope="col">TENANT NAME</th>
                  <th scope="col">EDITION NAME</th>
                  <th scope="col">EXPIRY DATE (UTC)</th>
                  <th scope="col">ACTIVATION STATE</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td v-loading="loading" class="p-5" colspan="5"></td>
                </tr>
                <tr v-for="(item, index) in tenantsUsers" v-bind:key="index">
                  <td>
                    <div class="col-xl-4">
                    <select
                      v-model="selectedOption"
                      class="form-select form-select-lg"
                      @change="handleSelectOption(item)"
                    >
                      <option hidden value="null">Actions</option>
                      <option value="delete">Delete</option>
                      <option value="update">Update</option>
                      <option value="changePassword">Change password</option>
                      <option value="changeHistory">Change History</option>
                      <option value="databaseConnection">
                        Database Connection String
                      </option>
                      <option value="featureModal">Features</option>
                    </select>
                  </div>
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.editionName ? item.editionName : "-" }}</td>
                  <td>-</td>
                  <td>
                    {{
                      item.activationState === 0
                        ? "Active"
                        : item.activationState === 1
                        ? "Active with limited time"
                        : item.activationState === 2
                        ? "Passive"
                        : ""
                    }}
                  </td>
                </tr>
                <tr v-if="tenantsUsers.length == 0 && loading === false">
                  <td class="text-center pt-15px pb-15px" colspan="5">
                    No records found based on your search
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <td colspan="5">{{ tenantsUsers.length }} Total</td>
              </tfoot>
            </table>
          </div>
        </card-body>
      </card>
    </div>

    <!-- Add tenant modal -->
    <div id="addTenantModal" class="modal fade" data-backdrop="false">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New Tenant</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <ul class="nav-tabs nav mb-3" role="tablist">
              <li
                class="nav-item"
                v-on:click="this.AddModalActiveTabHandle('BaseInfo')"
              >
                <a
                  :class="
                    addModalActiveTab === 'BaseInfo'
                      ? 'nav-link active'
                      : 'nav-link'
                  "
                  aria-disabled="false"
                  aria-selected="true"
                  role="tab"
                  >Base info
                </a>
              </li>
              <li
                class="nav-item"
                v-on:click="this.AddModalActiveTabHandle('DatabaseCon')"
              >
                <a
                  :class="
                    addModalActiveTab === 'DatabaseCon'
                      ? 'nav-link active'
                      : 'nav-link'
                  "
                  aria-disabled="false"
                  aria-selected="false"
                  role="tab"
                  >Database Connection Strings
                </a>
              </li>
            </ul>

            <el-form v-if="addModalActiveTab === 'BaseInfo'">
              <div class="mb-3">
                <label class="form-label"> Tenant name* </label>
                <input
                  v-model="tenantDetails.name"
                  autocomplete="off"
                  class="form-control"
                  type="text"
                />
              </div>
              <p v-if="nameError" class="text-danger">
                {{ nameError }}
              </p>
              <div class="mb-3">
                <label class="form-label"> Edition</label>
                <select
                  v-model="tenantDetails.editionId"
                  class="form-select form-control"
                >
                  <option value="">All</option>
                  <option v-for="user in editionUsers" :value="user?.id">
                    {{ user.displayName }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">
                  Tenant admin's email address*
                </label>
                <input
                  v-model="tenantDetails.adminEmailAddress"
                  autocomplete="off"
                  class="form-control"
                  type="text"
                />
              </div>
              <p v-if="emailError" class="text-danger">
                {{ emailError }}
              </p>
              <div class="mb-3">
                <label class="form-label"> Tenant admin's password*</label>
                <div class="input-group">
                  <input
                    v-model="tenantDetails.adminPassword"
                    :type="inputType"
                    class="form-control"
                  />
                  <button
                    class="btn btn-secondary"
                    type="button"
                    @click="showPasswordToggle"
                  >
                    <i
                      :class="
                        inputType === 'text' ? 'fa fa-eye-slash' : 'fa fa-eye'
                      "
                    ></i>
                  </button>
                </div>
              </div>
              <p v-if="passwordError" class="text-danger">
                {{ passwordError }}
              </p>
              <div class="mb-3">
                <label class="form-label"> Tenant activation state* </label>
                <select
                  v-model="tenantDetails.activationState"
                  class="form-select form-control"
                >
                  <option value="0">Active</option>
                  <option value="1">Active with limited time</option>
                  <option value="2">Passive</option>
                </select>
              </div>

              <!-- <div class="mb-3" v-if="tenantDetails.activationState === '1'">
                <label for="activation-end-date" class="form-label">
                  Tenant activation end date
                </label>
              </div> -->
            </el-form>
            <form v-if="addModalActiveTab === 'DatabaseCon'">
              <div class="mb-3">
                <div class="form-check mb-2">
                  <input
                    v-model="selectedAddModalDatabaseCon"
                    class="form-check-input"
                    formcontrolname="useSharedDatabase"
                    type="checkbox"
                  />
                  <label class="form-check-label" for="useSharedDatabase"
                    >Use the Shared Database</label
                  >
                </div>
              </div>
            </form>
            <div v-if="!selectedAddModalDatabaseCon" class="mb-3">
              <label class="form-label">Default connection string</label>
              <input
                class="form-control"
                formcontrolname="defaultConnectionString"
                type="text"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-outline-theme"
              type="button"
              v-on:click="openActionsModalss('', 'unsavedchanges')"
            >
              Close
            </button>
            <button
              class="btn btn-theme"
              type="button"
              v-on:click="addSubmitHandler"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div id="deleteTenantModal" class="modal fade" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Tenant Confirmation</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <h4>Are you sure?</h4>
            <p>
              Tenant {{ deleteModalsDetail.name }} will be deleted. Do you
              confirm that?
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
              v-on:click="deleteTenantHandler(deleteModalsDetail.id)"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- tenant update modal -->
    <div id="updateTenantModal" class="modal fade" data-backdrop="false">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update Tenant</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <el-form>
              <div class="mb-3">
                <label class="form-label"> Tenant name* </label>
                <input
                  v-model="updateDetail.name"
                  autocomplete="off"
                  class="form-control"
                  type="text"
                />
              </div>
              <p v-if="updateModalNameErr" class="text-danger">
                {{ updateModalNameErr }}
              </p>
              <div class="mb-3">
                <label class="form-label"> Edition</label>
                <select
                  v-model="updateDetail.editionId"
                  class="form-select form-control"
                >
                  <option value="null">All</option>
                  <option v-for="user in editionUsers" :value="user?.id">
                    {{ user.displayName }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label"> Tenant activation state* </label>
                <select
                  v-model="updateDetail.activationState"
                  class="form-select form-control"
                >
                  <option value="0">Active</option>
                  <option value="1">Active with limited time</option>
                  <option value="2">Passive</option>
                </select>
              </div>
            </el-form>
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
              v-on:click="updateSubmitHandler"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- tenant change password -->
    <div id="changePasswordModal" class="modal fade" data-backdrop="false">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Set Password - {{ getTenantName }}</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <el-form>
              <div class="mb-3">
                <label class="form-label"> User Name </label>
                <input
                  v-model="changePassword.username"
                  autocomplete="off"
                  class="form-control"
                  type="text"
                />
                <p
                  v-if="changePasswordNameError"
                  class="text-danger"
                >
                  {{ changePasswordNameError }}
                </p>
              </div>
              <div class="mb-3">
                <label class="form-label"> Password</label>
                <div class="input-group">
                  <input
                    v-model="changePassword.password"
                    class="form-control"
                    type="text"
                  />
                  <button
                    class="btn btn-secondary"
                    type="button"
                    v-on:click="generatePassword"
                  >
                    <i class="fa fa-refresh"></i>
                  </button>
                </div>
              </div>
            </el-form>
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
              v-on:click="changePasswordHandler"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bootstrap toast error -->
    <div class="position-fixed bottom-0 end-0 p-3">
      <div
        id="toast-1"
        aria-atomic="true"
        aria-live="assertive"
        class="toast align-items-center text-white bg-outline-green border-0"
        role="alert"
      >
        <div class="d-flex">
          <div class="toast-body">
            <i class="me-1 fa fa-check"></i> Your password has been Changed
            Successfully.
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

    <!-- invalid password validation modal -->
    <div id="passwordValidation" class="modal">
      <div class="modal-dialog bg-dark">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">An error has occurred!</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              Passwords must be at least 6 characters., Passwords must have at
              least one non alphanumeric character., Passwords must have at
              least one digit ('0'-'9')., Passwords must have at least one
              uppercase ('A'-'Z').
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
          </div>
        </div>
      </div>
    </div>

    <!-- changeHistory Modal-->
    <div id="changeHistoryTenantModal" class="modal fade" data-backdrop="false">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Volo.Saas.Tenants.Tenant <br />
              <span style="font-size: small">()</span>
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

    <!-- databade connection string modal -->
    <div id="databaseConnectionModal" class="modal fade" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Database Connection Strings</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <div class="form-check mb-2">
                  <input
                    v-model="selectedActionModalDatabaseCon"
                    class="form-check-input"
                    formcontrolname="useSharedDatabase"
                    type="checkbox"
                  />
                  <label class="form-check-label"
                    >Use the Shared Database</label
                  >
                </div>
              </div>
            </form>
            <div v-if="!selectedActionModalDatabaseCon" class="mb-3">
              <label class="form-label">Default connection string</label>
              <input
                class="form-control"
                formcontrolname="defaultConnectionString"
                type="text"
              />
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
            <button class="btn btn-outline-theme" type="button">Save</button>
          </div>
        </div>
      </div>
    </div>

    <!-- features modal -->
    <div id="featureModal" class="modal fade">
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
                          <label class="form-label">{{
                            feature.displayName
                          }}</label>
                          <select
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
                          }}</label>
                          <input
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
                          /><label
                            class="form-check-label"
                            for="Identity.EnableOAuthLogin"
                            >{{ feature.displayName }}</label
                          >
                          <small class="d-block form-text text-muted">{{
                            feature.description
                          }}</small>
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
              class="btn btn-primary"
              type="button"
              v-on:click="openActionsModalss('', 'resetFeatures')"
            >
              <i class="me-1 fa fa-refresh"></i> Reset to default
            </button>
            <button
              class="btn btn-outline-theme"
              data-bs-dismiss="modal"
              type="button"
            >
              Close
            </button>
            <button
              class="btn btn-outline-theme"
              type="button"
              v-on:click="this.ActionsApiHandler('updateFeatures')"
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

    <!-- validation message -->
    <div
      id="actionChangePasswordValidate"
      class="modal fade"
      data-backdrop="false"
    >
      <div class="modal-dialog bg-dark">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">An error has occurred!</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <h4>Are you sure?</h4>
            <p>
              Passwords must be at least 6 characters., Passwords must have at
              least one non alphanumeric character., Passwords must have at
              least one lowercase ('a'-'z')., Passwords must have at least one
              uppercase ('A'-'Z').
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
          </div>
        </div>
      </div>
    </div>

    <!-- unsave change modal -->
    <div id="unsavedchanges" class="modal fade" data-backdrop="false">
      <div class="modal-dialog bg-dark">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Are you sure?</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <p>You have unsaved changes.</p>
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
              v-on:click="this.myModal.hide()"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </perfect-scrollbar>
</template>
