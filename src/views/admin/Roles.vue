<!--//TODO Review entire page, replace the table with https://seantheme.com/hud-vue/table/plugins and fix table pagination-->

<template>
  <perfect-scrollbar class="app-content-inner-padding h-100">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">ADMINISTRATION</a></li>
      <li class="breadcrumb-item"><a href="/">IDENTITY MANAGEMENT</a></li>
      <li class="breadcrumb-item active">ROLES</li>
    </ul>
    <div class="row align-items-center">
      <div class="col-sm-10">
        <h1 class="page-header">Roles</h1>
      </div>
      <div class="mb-2 col-4 col-sm-2 col-xxl-1 text-end">
        <button
          class="btn btn-sm btn-outline-theme"
          type="button"
          v-on:click="openActionsModal('', 'addRolesModal')"
        >
          <i class="me-1 fa fa-plus"></i> New role
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
              v-on:keyup="this.ActionsApiHandler('rolesSearch')"
            />
            <button class="btn btn-outline-theme" type="button">
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
                  <th scope="col">ACTIONS</th>
                  <th scope="col">ROLE NAME</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td v-loading="loading" class="p-5" colspan="2"></td>
                </tr>
                <tr v-for="(item, index) in roles" v-bind:key="index">
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
                      <option value="claims">Claims</option>
                      <option value="permission">Permissions</option>
                      <option value="changeHistory">Change History</option>
                    </select>
                  </td>
                  <td>
                    {{ item.name }}
                    <span
                      v-if="item.isDefault"
                      class="badge rounded-pill bg-success ms-1"
                      >Default</span
                    >
                    <span
                      v-if="item.isPublic"
                      class="badge rounded-pill bg-info ms-1"
                      >Public</span
                    >
                  </td>
                </tr>
                <tr v-if="roles?.length === 0 && loading === false">
                  <td class="text-center pt-15px pb-15px" colspan="2">
                    No records found based on your search
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <td colspan="2">{{ roles?.length }} Total Records</td>
              </tfoot>
            </table>
          </div>
        </card-body>
      </card>
    </div>

    <!-- add roles modal -->
    <div id="addRolesModal" class="modal fade" data-backdrop="false">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New role</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="form-label" for="name">Role name *</label>
                <input
                  id="name"
                  v-model="addRolePayload.name"
                  autocomplete="off"
                  class="form-control"
                  type="text"
                />
              </div>

              <div class="mb-3">
                <div class="form-check" validationtarget="">
                  <input
                    id="role-is-default"
                    v-model="addRolePayload.isDefault"
                    class="form-check-input"
                    type="checkbox"
                  /><label
                    class="form-check-label"
                    for="role-is-default"
                  >
                    Default
                  </label>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check" validationtarget="">
                  <input
                    id="role-is-public"
                    v-model="addRolePayload.isPublic"
                    class="form-check-input"
                    type="checkbox"
                  /><label
                    class="form-check-label"
                    for="role-is-public"
                  >
                    Public
                  </label>
                </div>
              </div>
              <!-- <p v-if="nameError" class="error" style="color: #f19f9f">
              {{ nameError }}
            </p> -->
            </form>
          </div>
          <div class="modal-footer">
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
              v-on:click="this.ActionsApiHandler('addRoles')"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- update roles modal -->
    <div id="updateRolesModal" class="modal fade" data-backdrop="false">
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
                <label class="form-label" for="name">Role name *</label>
                <input
                  id="name"
                  v-model="updateRolePayload.name"
                  autocomplete="off"
                  class="form-control"
                  type="text"
                />
              </div>

              <div class="mb-3">
                <div class="form-check" validationtarget="">
                  <input
                    id="role-is-default"
                    v-model="updateRolePayload.isDefault"
                    class="form-check-input"
                    type="checkbox"
                  /><label
                    class="form-check-label"
                    for="role-is-default"
                  >
                    Default
                  </label>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check" validationtarget="">
                  <input
                    id="role-is-public"
                    v-model="updateRolePayload.isPublic"
                    class="form-check-input"
                    type="checkbox"
                  /><label
                    class="form-check-label"
                    for="role-is-public"
                  >
                    Public
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
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
              v-on:click="this.ActionsApiHandler('updateRoles')"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- delete roles modal -->
    <div id="deleteRolesModal" class="modal fade" data-backdrop="false">
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
            <p>Are you sure you want to delete the role {{ rolesName }}?</p>
          </div>
          <div class="modal-footer">
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
              v-on:click="this.ActionsApiHandler('deleteRoles')"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- claims roles modal -->
    <div id="claimsRolesModal" class="modal fade" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Claims</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Type</label
                  ><select
                    v-model="claimType"
                    class="form-select form-control"
                    formcontrolname="claimType"
                  >
                    <option v-for="item in claimsType" :value="item?.name">
                      {{ item.name }}
                    </option>
                  </select>
                  <p v-if="claimTypeError" class="error" style="color: #f19f9f">
                    {{ claimTypeError }}
                  </p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Value</label
                  ><input
                    v-model="claimValue"
                    class="form-control"
                    formcontrolname="claimValue"
                    type="String"
                  />
                  <p
                    v-if="claimValueError"
                    class="error"
                    style="color: #f19f9f"
                  >
                    {{ claimValueError }}
                  </p>
                </div>
              </div>
              <div class="col-md-12 align-self-center d-grid">
                <button
                  class="btn btn-success"
                  type="submit"
                  v-on:click="AddClaimArray"
                >
                  <i class="fa fa-plus"></i> Add Claim
                </button>
              </div>
            </div>

            <div
              v-for="(item, index) in claimsArray"
              v-bind:key="index"
              class="willBeHidden mt-3"
            >
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text mw-100 h-100 fs-9">{{
                    item.claimType
                  }}</label>
                </div>
                <input
                  :value="item.claimValue"
                  class="form-control"
                  type="String"
                  @input="updateInputFieldArray(index, $event.target.value)"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-danger deleteClaim"
                    v-on:click="removeItem(index)"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
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
              v-on:click="this.ActionsApiHandler('AddClaimUpdate')"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Change History modal -->
    <div id="changeHistoryModal" class="modal" data-backdrop="false">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">
              <h5>Volo.Abp.Identity.IdentityRole</h5>
              <p>{{ rolesId }}</p>
            </div>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <div v-if="entityChangeArray.length === 0">No Change(s)</div>
            <div v-if="entityChangeArray.length > 0">
              <div v-for="item in entityChangeArray"></div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-outline-theme"
              data-bs-dismiss="modal"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Permissions modal -->
    <div id="permissionModal" class="modal fade">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Permissions - {{ rolesName }}</h4>
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
                  <div class="form-check mb-2">
                    <input
                      class="form-check-input"
                      type="checkbox"
                    />
                    <!-- v-model="grantAllPermissions"
                    @click="selectAllPermissions" -->
                    <label class="form-check-label"
                      >Grant all permissions</label
                    >
                  </div>
                  <hr class="mt-2 mb-2" />
                  <div class="overflow-auto">
                    <ul class="nav nav-pills flex-column">
                      <li class="nav-item">
                        <a
                          v-for="item in permissionList"
                          :class="
                            activeClass === item?.name
                              ? 'nav-link pointer active'
                              : 'nav-link pointer'
                          "
                          :value="item?.name"
                          v-on:click="selectFeatures(item)"
                        >
                          <div>{{ item.name }}</div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-8 overflow-auto">
                  <div class="ps-1">
                    <div class="form-check mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                      /><label
                        class="form-check-label"
                        >Select all</label
                      >
                    </div>
                    <hr class="my-2" />
                    <div
                      v-for="item in permission"
                      :style="
                        item.parentName !== null
                          ? 'margin-left: 20px'
                          : 'margin-left: 0px'
                      "
                      :value="item?.displayName"
                      class="form-check mb-2"
                    >
                      <input
                        v-model="item.isGranted"
                        :value="item.isGranted"
                        class="form-check-input"
                        type="checkbox"
                        @change="newPermissionData(item.name, item.isGranted)"
                      /><label
                        class="form-check-label"
                        >{{ item.displayName }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
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
              v-on:click="this.ActionsApiHandler('updatePermission')"
            >
              <i class="me-1 fa fa-check"></i> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </perfect-scrollbar>
</template>

<script>
import Roles from "../../services/admin/roles";
import { Modal } from "bootstrap";
import jQuery from "jquery";

export default {
  name: "Roles",
  components: {},
  data() {
    return {
      loading: true,
      roles: [],
      searchText: "",
      selectedOption: null,
      rolesId: "",
      rolesName: "",
      addRolePayload: {
        extraProperties: {},
        name: "",
        isDefault: false,
        isPublic: false,
      },
      updateRolePayload: {
        name: "",
        isDefault: false,
        isStatic: false,
        isPublic: false,
        concurrencyStamp: "",
        id: "",
        extraProperties: {},
      },
      claimsType: [],
      claimsArray: [],
      claimType: "",
      claimValue: "",
      claimTypeError: "",
      claimValueError: "",
      isValidate: false,
      entityChangeArray: [],
      permissionList: [],
      permission: [],
      selectedItems: [],
    };
  },
  watch: {
    claimType(newVal) {
      if (this.isValidate) {
        if (!newVal) {
          this.claimTypeError = "This field is required.";
        } else {
          this.claimTypeError = "";
        }
      }
    },
    claimValue(newVal) {
      if (this.isValidate) {
        if (!newVal) {
          this.claimValueError = "This field is required.";
        } else {
          this.claimValueError = "";
        }
      }
    },
  },
  mounted() {
    this.ActionsApiHandler("getRoles");
  },
  methods: {
    ActionsApiHandler(action, item) {
      if (action === "getRoles") {
        this.loading = true;
        try {
          Roles.getRoles().then(
            (res) => {
              this.roles = res.data.items;
              this.loading = false;
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
      if (action === "rolesSearch") {
        const payload = {
          filter: this.searchText.toLowerCase(),
          skipCount: 0,
          maxResultCount: 10,
        };
        if (this.searchText === "") delete payload["filter"];
        try {
          Roles.rolesSearch(payload).then(
            (res) => {
              this.roles = res.data.items;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "addRoles") {
        try {
          Roles.addRoles(this.addRolePayload).then(
            (res) => {
              this.myModal.hide();
              this.ActionsApiHandler("getRoles");
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "deleteRoles") {
        try {
          Roles.deleteRoles(this.rolesId).then(
            (res) => {
              this.myModal.hide();
              this.ActionsApiHandler("getRoles");
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "getParticularRoles") {
        try {
          Roles.getParticularRoles(this.rolesId).then(
            (res) => {
              this.updateRolePayload.name = res.data.name;
              this.updateRolePayload.isDefault = res.data.isDefault;
              this.updateRolePayload.isStatic = res.data.isStatic;
              this.updateRolePayload.isPublic = res.data.isPublic;
              this.updateRolePayload.concurrencyStamp =
                res.data.concurrencyStamp;
              this.updateRolePayload.id = res.data.id;
              this.updateRolePayload.extraProperties = res.data.extraProperties;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "updateRoles") {
        try {
          Roles.updateRoles(this.updateRolePayload).then(
            (res) => {
              this.myModal.hide();
              this.ActionsApiHandler("getRoles");
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "allClaimTypes") {
        try {
          Roles.allClaimTypes().then(
            (res) => {
              this.claimsType = res.data;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "getClaims") {
        try {
          Roles.getClaims(this.rolesId).then(
            (res) => {
              this.claimsArray = res.data;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "AddClaimUpdate") {
        try {
          Roles.AddClaimUpdate(this.rolesId, this.claimsArray).then(
            (res) => {
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
      if (action === "getChangeHistory") {
        try {
          Roles.getChangeHistory(this.rolesId).then(
            (res) => {
              this.entityChangeArray = res.data;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "getPermissionDetail") {
        try {
          Roles.getPermissionDetail(this.rolesName).then(
            (res) => {
              this.permissionList = res.data.groups;
              this.selectFeatures(this.permissionList[0]);
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "updatePermission") {
        const payload = {
          permissions: this.selectedItems,
        };
        try {
          Roles.updatePermission(payload, this.rolesName).then(
            (response) => {
              this.myModal.hide();
              this.permissionList = [];
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
    openActionsModal(item, action) {
      this.resetAllStates();
      this.rolesId = item.id;
      this.rolesName = item.name;

      action === "updateRolesModal" &&
        this.ActionsApiHandler("getParticularRoles");
      action === "claimsRolesModal" && this.ActionsApiHandler("allClaimTypes");
      action === "claimsRolesModal" && this.ActionsApiHandler("getClaims");
      if (action === "changeHistoryModal") {
        this.ActionsApiHandler("getChangeHistory");
      }
      if (action === "permissionModal") {
        this.ActionsApiHandler("getPermissionDetail");
      }

      this.myModal = new Modal(document.getElementById(action), {
        keyboard: false,
      });
      this.myModal.show();
      jQuery(`#${action}`).appendTo(jQuery("body"));
    },
    resetAllStates() {
      this.addRolePayload.extraProperties = {};
      this.addRolePayload.name = "";
      this.addRolePayload.isDefault = false;
      this.addRolePayload.isPublic = false;
      this.rolesId = "";
      this.rolesName = "";
      this.claimType = "";
      this.claimValue = "";
      this.selectedItems = [];
    },
    handleSelectOption(item) {
      if (this.selectedOption === "delete") {
        this.openActionsModal(item, "deleteRolesModal");
      } else if (this.selectedOption === "edit") {
        this.openActionsModal(item, "updateRolesModal");
      } else if (this.selectedOption === "claims") {
        this.openActionsModal(item, "claimsRolesModal");
      } else if (this.selectedOption === "changeHistory") {
        this.openActionsModal(item, "changeHistoryModal");
      } else if (this.selectedOption === "permission") {
        this.openActionsModal(item, "permissionModal");
      }
      this.selectedOption = null;
    },
    AddClaimArray() {
      // this.isValidate = true;
      if (this.claimType === "") {
        this.isValidate = true;
        this.claimTypeError = "This field is required.";
      }
      if (this.claimValue === "") {
        this.isValidate = true;
        this.claimValueError = "This field is required.";
      }
      if (
        this.claimType !== "" &&
        this.claimValue !== "" &&
        this.claimTypeError === "" &&
        this.claimValueError === ""
      ) {
        this.isValidate = false;
        const newObject = {
          roleId: this.rolesId,
          claimType: this.claimType,
          claimValue: this.claimValue,
          inputType: "String",
        };
        this.claimsArray.push(newObject);
        this.claimType = "";
        this.claimValue = "";
      }
    },
    removeItem(index) {
      this.claimsArray.splice(index, 1);
    },
    updateInputFieldArray(index, value) {
      this.claimsArray[index]["claimValue"] = value;
    },
    selectFeatures(item) {
      this.activeClass = item.name;
      this.permission = item.permissions;
    },
    newPermissionData(name, value) {
      const obj = { name: name, isGranted: value };
      const index = this.selectedItems.findIndex((a) => a.name === name);
      if (index >= 0) this.selectedItems.splice(index, 1, obj);
      else this.selectedItems.push(obj);
    },
  },
};
</script>
