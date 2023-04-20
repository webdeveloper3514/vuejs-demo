<template>
  <perfect-scrollbar class="app-content-inner-padding h-100">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">ADMINISTRATION</a></li>
      <li class="breadcrumb-item"><a href="/">IDENTITY MANAGEMENT</a></li>
      <li class="breadcrumb-item active">ORGANIZATION TREE</li>
    </ul>
    <div class="row align-items-center">
      <div class="col-sm-10">
        <h1 class="page-header">Organization Units</h1>
      </div>
    </div>
    <hr class="mb-4 mt-n1" />

    <!-- --------------------------------------------------------------- -->

    <div class="row">
      <div class="col-12 col-lg-6 col-xl-5">
        <div class="tbl_wrap">
          <card>
            <card-body>
              <div class="card-header d-flex justify-content-between">
                <h5>Organization tree</h5>
                <button
                  class="btn btn-sm btn-theme"
                  v-on:click="
                    openActionsModals('', 'createOrganizationUnitModal')
                  "
                >
                  <i class="fas fa-plus me-1"></i> Add root unit
                </button>
              </div>
              <div class="card-body" style="position: relative">
                <!-- Org Units Here -->
                <!-- <tree-component
                :tree="nodeTreeArray"
                :myFunction="createToggle"
              /> -->
                <div v-for="(item, index) in allOrganizationUnits" class="mb-4">
                  <div>
                    <div>
                      <div aria-hidden="true" class="ant-tree-indent"></div>
                      <div
                        :title="item.displayName"
                        aria-grabbed="true"
                        draggable="true"
                      >
                        <div
                          class="selected"
                          v-on:click="toggleMembersAndRoles(item)"
                        >
                          <div class="d-inline-block">
                            <span>
                              <i
                                class="fas fa-folder fs-15px text-primary me-1"
                              ></i>
                              {{ item.displayName }}
                            </span>
                          </div>
                          <div
                            container="body"
                            placement="bottom"
                            v-bind:class="
                              toggle
                                ? `d-inline-block ms-1 show dropdown`
                                : `d-inline-block ms-1 dropdown`
                            "
                          >
                            <i
                              class="fas fa-caret-down text-muted"
                              v-bind:aria-expanded="toggle ? true : false"
                              v-on:click="createToggle(index)"
                            ></i>
                            <div
                              v-bind:class="
                                toggle && activeClick == index
                                  ? `dropdown-menu show`
                                  : `dropdown-menu`
                              "
                            >
                              <li
                                class="dropdown-item pointer"
                                tabindex="0"
                                v-on:click="
                                  openActionsModals(
                                    item,
                                    'editOrganizationUnitModal'
                                  )
                                "
                              >
                                Edit
                              </li>
                              <li
                                class="dropdown-item pointer"
                                tabindex="0"
                                v-on:click="
                                  openActionsModals(item, 'createSubUnitModal')
                                "
                              >
                                Add sub-unit
                              </li>
                              <li
                                class="dropdown-item pointer"
                                tabindex="0"
                                v-on:click="
                                  openActionsModals(
                                    item,
                                    'deleteOrganizationUnitModal'
                                  )
                                "
                              >
                                Delete
                              </li>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </card-body>
          </card>
        </div>
      </div>
      <div class="col-12 col-lg-6 col-xl-7">
        <div class="tbl_wrap">
          <card>
            <card-body>
              <ul class="nav-tabs nav" role="tablist">
                <li class="nav-item">
                  <a
                    aria-disabled="false"
                    aria-selected="true"
                    class="nav-link active"
                    data-bs-toggle="tab"
                    role="tab"
                    v-on:click="toggleMemberMR('members')"
                    >Members</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    aria-disabled="false"
                    aria-selected="false"
                    class="nav-link"
                    data-bs-toggle="tab"
                    role="tab"
                    v-on:click="toggleMemberMR('roles')"
                    >Roles</a
                  >
                </li>
              </ul>
              <div v-if="selectedUser === ''">
                <br />
                Select an Organization Unit to see {{ activeTab }}
              </div>
              <div v-if="selectedUser !== ''">
                <!-- Members Tab -->
                <div v-if="activeTab === 'members'" class="tab-content">
                  <div class="tab-pane fade show active">
                    <div>
                      <div class="py-2 d-flex justify-content-between">
                        <h2>
                          {{ organizationDetails.displayName }}
                        </h2>
                        <button
                          class="btn btn-sm btn-theme mb-2"
                          v-on:click="openActionsModals('', 'addMemberModal')"
                        >
                          <i class="fas fa-plus me-1"></i> Add member
                        </button>
                      </div>
                      <div>
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col"></th>
                              <th scope="col">User Name</th>
                              <th scope="col">Email Address</th>
                            </tr>
                          </thead>
                          <tr v-if="organizationMembers.length === 0">
                            <th scope="row"></th>
                            <td>No data available</td>
                          </tr>
                          <tbody v-for="item in organizationMembers">
                            <tr>
                              <th scope="row">
                                <button
                                  class="btn btn-primary"
                                  v-on:click="
                                    openActionsModals(item, 'deleteMemberModal')
                                  "
                                >
                                  Delete
                                </button>
                              </th>
                              <td>{{ item.userName }}</td>
                              <td>{{ item.email }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Roles Tab -->
                <div v-if="activeTab === 'roles'">
                  <div class="py-2 d-flex justify-content-between">
                    <h2>
                      {{ organizationDetails.displayName }}
                    </h2>
                    <button
                      class="btn btn-sm btn-theme mb-2"
                      v-on:click="openActionsModals('', 'addRolesModal')"
                    >
                      <i class="fas fa-plus me-1"></i> Add role
                    </button>
                  </div>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Role Name</th>
                      </tr>
                    </thead>
                    <tr v-if="organizationRoles.length === 0">
                      <th scope="row"></th>
                      <td>No data available</td>
                    </tr>
                    <tbody v-for="item in organizationRoles">
                      <tr v-if="organizationRoles.length > 0">
                        <th scope="row">
                          <button
                            class="btn btn-primary"
                            type="button"
                            v-on:click="
                              openActionsModals(item, 'deleteRolesModal')
                            "
                          >
                            Delete
                          </button>
                        </th>
                        <td>{{ item.name }}</td>
                      </tr>
                      <tr v-if="organizationRoles.length === 0">
                        <th scope="row"></th>
                        <td>No data available</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </card-body>
          </card>
        </div>
      </div>
    </div>

    <!-- Add Organization Unit Modal -->
    <div id="createOrganizationUnitModal" class="modal" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Organization Unit</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-group mb-3">
              <label class="form-label">Display Name*</label>
              <input
                v-model="organizationName.displayName"
                class="form-control"
                type="text"
              />
              <p v-if="addRootUnitError" class="error" style="color: #f19f9f">
                {{ addRootUnitError }}
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-default"
              data-bs-dismiss="modal"
              type="button"
            >
              Cancel
            </button>
            <button
              class="btn btn-outline-theme"
              type="button"
              v-on:click="
                this.ActionsApiHandler(
                  'createOrganizationUnit',
                  organizationName
                )
              "
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Organization Unit Modal -->
    <div id="editOrganizationUnitModal" class="modal" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">EditOrganizatonUnit</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-group mb-3">
              <label class="form-label">Display Name*</label>
              <input
                v-model="editPayload.displayName"
                class="form-control"
                type="text"
              />
              <p v-if="editRootUnitError" class="error" style="color: #f19f9f">
                {{ editRootUnitError }}
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-default"
              data-bs-dismiss="modal"
              type="button"
            >
              Cancel
            </button>
            <button
              class="btn btn-outline-theme"
              type="button"
              v-on:click="this.ActionsApiHandler('editOrganizationUnit')"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Sub Unit Modal -->
    <div id="createSubUnitModal" class="modal" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New organization unit</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-group mb-3">
              <label class="form-label">Display Name*</label>
              <input
                v-model="organizationName.displayName"
                class="form-control"
                type="text"
              />
              <p v-if="addRootUnitError" class="error" style="color: #f19f9f">
                {{ addRootUnitError }}
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-default"
              data-bs-dismiss="modal"
              type="button"
            >
              Cancel
            </button>
            <button
              class="btn btn-outline-theme"
              type="button"
              v-on:click="this.ActionsApiHandler('createOrganizationUnit')"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Organization Unit Modal -->
    <div id="deleteOrganizationUnitModal" class="modal" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete this unit</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <h2>Are you sure ?</h2>
            <p>Are you sure you want to delete this organization unit?</p>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-default"
              data-bs-dismiss="modal"
              type="button"
            >
              Cancel
            </button>
            <button
              class="btn btn-outline-theme"
              type="button"
              v-on:click="this.ActionsApiHandler('deleteOrganizationUnit')"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add member to Organization Unit Modal -->
    <div id="addMemberModal" class="modal" data-backdrop="false">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Select Users</h5>

            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <div class="input-group">
              <input
                v-model="filterParams"
                class="form-control"
                placeholder="Search"
                type="search"
                v-on:keyup="this.ActionsApiHandler('filterMembers')"
              />
              <div class="input-group-append">
                <button class="btn btn-sm btn-primary h-100">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">USER NAME</th>
                    <th scope="col">EMAIL ADDRESS</th>
                  </tr>
                </thead>
                <tbody v-for="(item, index) in allMembers">
                  <tr>
                    <th scope="row">
                      <input
                        v-model="memberId.userIds"
                        :value="item.id"
                        name="user"
                        type="checkbox"
                      />
                    </th>
                    <td>{{ item.userName }}</td>
                    <td>{{ item.email }}</td>
                  </tr>
                </tbody>
              </table>
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
              v-on:click="this.ActionsApiHandler('addOrganizationMembers')"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete member from Organization unit modal -->
    <div id="deleteMemberModal" class="modal" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Remove member from this organization</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <p>Are you sure?</p>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-default"
              data-bs-dismiss="modal"
              type="button"
            >
              Cancel
            </button>
            <button
              class="btn btn-outline-theme"
              type="button"
              v-on:click="this.ActionsApiHandler('deleteOrganizationMember')"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add roles to Organization unit Modal -->
    <div id="addRolesModal" class="modal" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Select Roles</h5>

            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">ROLE NAME</th>
                </tr>
              </thead>
              <tbody v-for="item in allRoles">
                <tr v-bind:key="item.id">
                  <th scope="row">
                    <input
                      v-model="scopeId.roleIds"
                      :value="item.id"
                      class="form-check-input"
                      type="checkbox"
                    />
                  </th>
                  <td>
                    <label class="form-check-label">
                      {{ item.name }}
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-default"
              data-bs-dismiss="modal"
              type="button"
            >
              Cancel
            </button>
            <button
              class="btn btn-outline-theme"
              type="button"
              v-on:click="this.ActionsApiHandler('addOrganizationRoles')"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete role from Organization unit modal -->
    <div id="deleteRolesModal" class="modal" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">MODAL TITLE</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <h4>Are you sure ?</h4>
            <p>
              Are you sure to you want to remove this role from this
              organization unit?
            </p>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-default"
              data-bs-dismiss="modal"
              type="button"
            >
              Cancel
            </button>
            <button
              class="btn btn-outline-theme"
              type="button"
              v-on:click="this.ActionsApiHandler('deleteOrganizationRoles')"
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
import OrganizationUnits from "../../services/admin/organizationUnits";
import { Modal } from "bootstrap";
import jQuery from "jquery";

export default {
  name: "OrganizationUnits",
  components: {
    // TreeComponent,
  },
  data() {
    return {
      loading: false,
      toggle: false,
      allOrganizationUnits: [],
      allMembers: [],
      allRoles: [],
      organizationMembers: [],
      organizationRoles: [],

      deleteMemberId: "",
      deleteRoleId: "",
      memberId: {
        userIds: [],
      },
      scopeId: {
        roleIds: [],
      },
      organizationId: "",
      editPayload: {},
      organizationDetails: {},
      organizationName: {
        displayName: "",
        extraProperties: {},
        parentId: null,
      },
      activeClick: "",
      activeTab: "members",
      filterParams: "",
      parentOrganizations: [],
      childOrganizations: [],
      addRootUnitError: "",
      editRootUnitError: "",
      selectedUser: "",
      rootNde: {},
      nodeTreeArray: [],
      hideShow: false,
    };
  },

  mounted() {
    this.ActionsApiHandler("getAllOrganizationUnits");
  },
  watch: {
    "organizationName.displayName"(newVal) {
      if (!newVal) {
        this.addRootUnitError = "This field is required.";
      } else {
        this.addRootUnitError = "";
      }
    },
    "editPayload.displayName"(newVal) {
      if (!newVal) {
        this.editRootUnitError = "This field is required.";
      } else {
        this.editRootUnitError = "";
      }
    },
  },

  methods: {
    // pushIdToArray() {
    //   this.memberId.userIds = [...this.memberId.userIds, this.isChecked];
    // },
    // pushroleIdToArray() {
    //   this.scopeId.roleIds = [...this.scopeId.roleIds, this.isChecked];
    // },
    createToggle(index) {
      this.activeClick = index;
      this.toggle = !this.toggle;
    },
    // createNodeTree(items) {
    //   const nodes = [];
    //   let rootNode = null;

    //   // Create nodes from items
    //   for (const item of items) {
    //     const node = { ...item, children: [] };
    //     nodes[node.id] = node;

    //     if (item.parentId) {
    //       const parentNode = nodes[item.parentId];
    //       if (parentNode) {
    //         parentNode.children.push(node);
    //       }
    //     } else {
    //       rootNode = node;
    //     }
    //   }
    //   this.rootNde = rootNode;
    //   console.log(rootNode);
    //   return rootNode;
    // },
    openActionsModals(item, action) {
      if (action === "editOrganizationUnitModal") {
        this.editPayload = {
          displayName: item.displayName,
          extraProperties: {},
          parentId: null,
        };
        this.organizationId = item.id;
        this.editRootUnitError = "";
      }
      if (action === "createSubUnitModal") {
        this.addRootUnitError = "";
        this.organizationName = {
          displayName: "",
          extraProperties: {},
          parentId: item.id,
        };
      }
      if (action === "deleteOrganizationUnitModal") {
        this.organizationId = item.id;
      }
      if (action === "createOrganizationUnitModal") {
        this.organizationName.displayName = "";
        this.addRootUnitError = "";
      }
      if (action === "addMemberModal") {
        this.ActionsApiHandler("getAllMembers");
      }
      if (action === "deleteMemberModal") {
        this.deleteMemberId = item.id;
      }
      if (action === "addRolesModal") {
        this.ActionsApiHandler("getAllRoles");
      }
      if (action === "deleteRolesModal") {
        this.deleteRoleId = item.id;
      }
      this.toggle = false;
      this.myModal = new Modal(document.getElementById(action), {
        keyboard: false,
      });
      this.myModal.show();
      jQuery(`#${action}`).appendTo(jQuery("body"));
    },
    toggleMembersAndRoles(item) {
      this.organizationId = item.id;
      this.organizationDetails = item;
      // if (this.activeTab === "") {
      //   this.ActionsApiHandler("getSingleOrganizationUnit", item);
      // }
      if (this.selectedUser !== item.id) {
        this.selectedUser = item.id;
        if (this.activeTab === "members") {
          this.ActionsApiHandler("getOrganizationMembers", this.organizationId);
        }
        if (this.activeTab === "roles") {
          this.ActionsApiHandler("getOrganizationRoles", this.organizationId);
        }
      }
    },
    toggleMemberMR(item) {
      if (this.activeTab !== "members") {
        if (item === "members") {
          this.activeTab = "members";
          this.organizationDetails.displayName &&
            this.ActionsApiHandler(
              "getOrganizationMembers",
              this.organizationId
            );
        }
      }
      if (this.activeTab !== "roles") {
        if (item === "roles") {
          this.activeTab = "roles";
          this.organizationDetails.displayName &&
            this.ActionsApiHandler("getOrganizationRoles", this.organizationId);
        }
      }
    },
    ActionsApiHandler(action, item) {
      if (action === "getAllOrganizationUnits") {
        this.loading = true;
        try {
          OrganizationUnits.getAllOrganizationUnits().then(
            (response) => {
              this.nodeTreeArray = this.testFunction(response.data.items);
              this.loading = false;
              this.allOrganizationUnits = response.data.items;

              // this.allOrganizationUnits.filter(
              //   (item) =>
              //     item.parentId === null && this.parentOrganizations.push(item)
              // );
              // this.allOrganizationUnits.filter(
              //   (item) =>
              //     item.parentId !== null && this.childOrganizations.push(item)
              // );
              // this.createNodeTree(this.allOrganizationUnits);
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
      if (action === "createOrganizationUnit") {
        if (
          this.addRootUnitError === "" &&
          this.organizationName.displayName !== ""
        ) {
          this.loading = true;
          try {
            OrganizationUnits.createOrganizationUnit(
              this.organizationName
            ).then(
              (response) => {
                this.loading = false;
                this.myModal.hide();
                this.ActionsApiHandler("getAllOrganizationUnits");
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
        } else {
          this.addRootUnitError = "This field is required";
        }
      }
      if (action === "getSingleOrganizationUnit") {
        this.loading = true;

        try {
          OrganizationUnits.getSingleOrganizationUnit(item.id).then(
            (response) => {
              this.loading = false;
              this.organizationDetails = response.data;
              this.organizationId = response.data.id;

              // if (this.activeTab === "members") {
              //   this.ActionsApiHandler("getOrganizationMembers", item.id);
              // }
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
      if (action === "editOrganizationUnit") {
        if (this.editRootUnitError === "" && editPayload.displayName !== "") {
          this.loading = true;
          try {
            OrganizationUnits.editOrganizationUnit(
              this.organizationId,
              this.editPayload
            ).then(
              (response) => {
                this.loading = false;
                this.myModal.hide();
                this.ActionsApiHandler("getAllOrganizationUnits");
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
        } else {
          this.editRootUnitError = "This field is required";
        }
      }
      if (action === "deleteOrganizationUnit") {
        this.loading = true;
        try {
          OrganizationUnits.deleteOrganizationUnit(this.organizationId).then(
            (response) => {
              this.loading = false;
              this.myModal.hide();
              this.ActionsApiHandler("getAllOrganizationUnits");
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
      if (action === "getAllMembers") {
        this.loading = true;
        try {
          OrganizationUnits.getAllMembers().then(
            (response) => {
              this.loading = false;
              this.allMembers = response.data.items;
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
      if (action === "getOrganizationMembers") {
        // if (this.activeTab != "members") {
        this.loading = true;
        this.activeTab = "members";

        try {
          OrganizationUnits.getOrganizationMembers(this.organizationId).then(
            (response) => {
              this.loading = false;
              this.organizationMembers = response.data.items;
              // this.organizationId = item.id;
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
        // }
      }
      if (action === "addOrganizationMembers") {
        this.loading = true;
        try {
          OrganizationUnits.addOrganizationMembers(
            this.organizationId,
            this.memberId
          ).then(
            (response) => {
              this.loading = false;
              this.myModal.hide();
              this.ActionsApiHandler(
                "getOrganizationMembers",
                this.organizationId
              );
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
      if (action === "deleteOrganizationMember") {
        this.loading = true;
        try {
          OrganizationUnits.deleteOrganizationMember(
            this.organizationId,
            this.deleteMemberId
          ).then(
            (response) => {
              this.loading = false;
              this.myModal.hide();

              this.ActionsApiHandler(
                "getOrganizationMembers",
                this.organizationId
              );
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
      if (action === "getOrganizationRoles") {
        // if (this.activeTab != "roles") {
        this.loading = true;
        this.activeTab = "roles";
        try {
          OrganizationUnits.getOrganizationRoles(this.organizationId).then(
            (response) => {
              this.loading = false;
              this.organizationRoles = response.data.items;
              // this.organizationId = item.id;
            },
            (error) => {
              this.loading = false;
              console.log("error", error);
            }
          );
        } catch (err) {
          this.loading = false;
          console.log("error", err);
          // }
        }
      }
      if (action === "getAllRoles") {
        try {
          OrganizationUnits.getAllRoles().then(
            (response) => {
              this.loading = false;
              this.allRoles = response.data.items;
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
      if (action === "addOrganizationRoles") {
        this.loading = true;
        try {
          OrganizationUnits.addOrganizationRoles(
            this.organizationId,
            this.scopeId
          ).then(
            (response) => {
              this.loading = false;
              this.myModal.hide();
              this.ActionsApiHandler(
                "getOrganizationRoles",
                this.organizationId
              );
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
      if (action === "deleteOrganizationRoles") {
        this.loading = true;
        try {
          OrganizationUnits.deleteOrganizationRoles(
            this.organizationId,
            this.deleteRoleId
          ).then(
            (response) => {
              this.loading = false;
              this.myModal.hide();
              this.ActionsApiHandler(
                "getOrganizationRoles",
                this.organizationId
              );
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
      if (action === "filterMembers") {
        this.loading = true;
        try {
          OrganizationUnits.filterMembers(this.filterParams).then(
            (response) => {
              this.loading = false;
              this.allMembers = response.data.items;
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
    },
    testFunction(list) {
      let map = {},
        node,
        roots = [],
        i;

      for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i; // initialize the map
        list[i].children = []; // initialize the children
      }

      for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parentId !== null) {
          // if you have dangling branches check that map[node.parentId] exists
          list[map[node.parentId]].children.push(node);
        } else {
          roots.push(node);
        }
      }
      return roots;
    },
    toggleHideAndShow() {
      this.hideShow = !this.hideShow;
    },
  },
};
</script>
