<!--//TODO Review entire page, replace the table with https://seantheme.com/hud-vue/table/plugins and fix table pagination-->

<template>
  <perfect-scrollbar class="app-content-inner-padding h-100">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">ADMINISTRATION</a></li>
      <li class="breadcrumb-item"><a href="/">IDENTITY MANAGEMENT</a></li>
      <li class="breadcrumb-item active">USERS</li>
    </ul>
    <div class="row align-items-center">
      <div class="col-sm-10">
        <h1 class="page-header">Users</h1>
      </div>
      <div class="mb-2 col-4 col-sm-2 col-xxl-1 text-end">
        <button
          class="btn btn-sm btn-outline-theme"
          type="button"
          v-on:click="openModal('', 'createNewUserModal')"
        >
          <i class="me-1 fa fa-plus"></i> New role
        </button>
      </div>
    </div>
    <hr class="mb-4 mt-n1" />

    <div class="search_bar">
      <div class="row">
        <!-- userd search -->
        <div class="col-12 mb-4">
          <div class="input-group">
            <input
              v-model="searchText"
              class="form-control"
              placeholder="Search for..."
              type="text"
              v-on:keyup="this.ActionsApiHandler('searchUsers')"
            />
            <button class="btn btn-outline-default" type="button">
              <i class="fa fa-search text-muted"></i>
            </button>
          </div>
        </div>
        <!-- advance filter in users -->
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
                  Advanced Filters
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
                        <label class="form-label">
                          Role
                        </label>
                        <select
                          v-model="filterPayload.roleId"
                          class="form-select form-control"
                        >
                          <option value=""></option>
                          <option
                            v-for="role in identityRoles"
                            :value="role?.id"
                          >
                            {{ role.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12 col-sm-3">
                      <div class="mb-3">
                        <label class="form-label">Organization unit</label
                        >
                        <select
                          v-model="filterPayload.organizationUnitId"
                          class="form-select form-control"
                          formcontrolname="activationState"
                        >
                          <option value=""></option>
                          <option
                            v-for="unit in organizationUnits"
                            :value="unit?.id"
                          >
                            {{ unit.displayName }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-3 col-xxl-2">
                      <div class="mb-3 mb-lg-0">
                        <label class="form-label">User name</label
                        ><input
                          v-model="filterPayload.userName"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-3 col-xxl-2">
                      <div class="mb-3 mb-lg-0">
                        <label
                          class="form-label"
                          >Phone number</label
                        ><input
                          v-model="filterPayload.phoneNumber"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-3 col-xxl-2">
                      <div class="mb-3 mb-lg-0">
                        <label
                          class="form-label"
                          >Email address</label
                        ><input
                          v-model="filterPayload.emailAddress"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="d-flex col-auto mb-3 mb-md-0">
                      <div class="align-self-center">
                        <div class="form-check">
                          <input
                            v-model="filterPayload.isLockedOut"
                            class="form-check-input"
                            type="checkbox"
                          />
                          <label class="form-check-label" for="is-locked-out"
                            >Lock</label
                          >
                        </div>
                      </div>
                      <div class="align-self-center ms-3">
                        <div class="form-check">
                          <input
                            v-model="filterPayload.notActive"
                            class="form-check-input"
                            type="checkbox"
                          />
                          <label class="form-check-label">Not active</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-sm-auto align-self-end mb-3">
                      <div class="row">
                        <div class="col-6 col-sm-auto d-grid">
                          <button
                            class="btn btn-theme"
                            type="button"
                            v-on:click="ResetFilterData"
                          >
                            Clear
                          </button>
                        </div>
                        <div class="col-6 col-sm-auto d-grid">
                          <button
                            class="btn btn-theme"
                            type="button"
                            v-on:click="this.ActionsApiHandler('filterUsers')"
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
    <!-- users table -->
    <div class="tbl_wrap">
      <card>
        <card-body>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="border-bottom-trans">
                  <th scope="col">ACTIONS</th>
                  <th scope="col">USER NAME</th>
                  <th scope="col">EMAIL ADDRESS</th>
                  <th scope="col">ROLES</th>
                  <th scope="col">PHONE NUMBER</th>
                  <th scope="col">NAME</th>
                  <th scope="col">SURNAME</th>
                  <th scope="col">ACTIVE</th>
                  <th scope="col">ACCOUNT LOCKOUT</th>
                  <th scope="col">EMAIL CONFIRMED</th>
                  <th scope="col">TWO FACTOR ENABLED</th>
                  <th scope="col">ACCESS FAILED COUNT</th>
                  <th scope="col">CREATION TIME</th>
                  <th scope="col">LAST MODIFICATION TIME</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td v-loading="loading" class="p-5" colspan="14"></td>
                </tr>
                <tr v-for="(item, index) in userList" v-bind:key="index">
                  <td>
                    <select
                      v-model="selectedOption"
                      class="form-select form-select-lg"
                      style="width: 170px"
                      @change="handleSelectOption(item)"
                    >
                      <option hidden value="null">Actions</option>
                      <option value="delete">Delete</option>
                      <option value="twoFactor">Two Factor</option>
                      <option value="permission">Permissions</option>
                      <option value="setPassword">Set Password</option>
                      <option value="claims">Claims</option>
                      <option value="edit">Edit</option>
                      <option value="changeHistory">Change History</option>
                      <option value="lock">Lock</option>
                    </select>
                  </td>
                  <td>{{ item.userName }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.roleNames.join(", ") }}</td>
                  <td>{{ item.phoneNumber }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.surname }}</td>
                  <td>{{ item.isActive }}</td>
                  <td>{{ item.lockoutEnabled }}</td>
                  <td>{{ item.emailConfirmed }}</td>
                  <td>{{ item.twoFactorEnabled }}</td>
                  <td>{{ item.accessFailedCount }}</td>
                  <td>{{ item.creationTime }}</td>
                  <td>{{ item.lastModificationTime }}</td>
                </tr>
                <tr v-if="userList?.length === 0 && loading === false">
                  <td class="text-center pt-15px pb-15px" colspan="14">
                    No records found based on your search
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <td colspan="14">{{ userList?.length }} Total</td>
              </tfoot>
            </table>
          </div>
        </card-body>
      </card>
    </div>

    <!-- Delete Modal -->
    <div id="deleteUserModal" class="modal fade" data-backdrop="false">
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
            <p>Are you sure you want to delete the user {{ userName }}?</p>
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
              v-on:click="this.ActionsApiHandler('deleteUser')"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- two factor modal -->
    <div id="twoFactorModal" class="modal fade" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Two factor - {{ userName }}</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-check mb-2">
              <input
                v-model="TwoFactorEnabled"
                class="form-check-input"
                type="checkbox"
              /><label class="form-check-label"
                >Two factor enabled</label
              >
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
              v-on:click="this.ActionsApiHandler('updateTwoFactor')"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- setPassword modal -->
    <div id="setPasswordModal" class="modal fade" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Set Password</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label"> Password</label>
              <div class="input-group">
                <input
                  v-model="newPassword"
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
              v-on:click="this.ActionsApiHandler('changeNewPassword')"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- permission modal -->
    <div id="permissionModal" class="modal fade">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Permissions - {{ userName }}</h4>
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
                        for="FeatureManagement.ManageHostFeatures"
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

    <!-- Create new user modal -->
    <div id="createNewUserModal" class="modal" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New User</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
              v-on:click="resetValidationError"
            ></button>
          </div>
          <div class="modal-body">
            <div class="modal-body">
              <!-- Tabs -->
              <ul
                class="nav-tabs nav"
                role="tablist"
              >
                <li id="user-informations" class="nav-item">
                  <a
                    :class="
                      activeAddUserTab === 'userInfo'
                        ? `nav-link active`
                        : `nav-link`
                    "
                    aria-disabled="false"
                    aria-selected="true"
                    role="tab"
                    v-on:click="activeAddUserTab = 'userInfo'"
                    >User information</a
                  >
                </li>
                <li
                  class="nav-item"
                >
                  <a
                    :class="
                      activeAddUserTab === 'roles'
                        ? `nav-link active`
                        : `nav-link`
                    "
                    aria-disabled="false"
                    aria-selected="false"
                    role="tab"
                    v-on:click="activeAddUserTab = 'roles'"
                    >Roles
                  </a>
                </li>
                <li
                  class="nav-item"
                >
                  <a
                    :class="
                      activeAddUserTab === 'orgUnits'
                        ? `nav-link active`
                        : `nav-link`
                    "
                    aria-disabled="false"
                    aria-selected="false"
                    role="tab"
                    v-on:click="activeAddUserTab = 'orgUnits'"
                    >Organization Units
                  </a>
                </li>
              </ul>
              <!-- Tabs end -->
              <!-- User Info tab -->
              <div v-if="activeAddUserTab === 'userInfo'">
                <div
                  class="mt-2 fade-in-top tab-content"
                >
                  <div
                    class="tab-pane fade active show"
                  >
                    <div class="mb-3">
                      <label
                        class="form-label"
                      >
                        User name * </label
                      ><input
                        v-model="userPayload.userName"
                        autocomplete="off"
                        class="form-control"
                        type="text"
                      />
                    </div>
                    <p v-if="userNameErr" class="error" style="color: #f19f9f">
                      {{ userNameErr }}
                    </p>
                    <div class="mb-3">
                      <label class="form-label">
                        Password *
                      </label>
                        <div class="input-group">
                          <input
                            v-model="userPayload.password"
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
                                inputType === 'text'
                                  ? 'fa fa-eye-slash'
                                  : 'fa fa-eye'
                              "
                            ></i>
                          </button>
                        </div>
                    </div>
                    <p
                      v-if="userpasswordErr"
                      class="error"
                      style="color: #f19f9f"
                    >
                      {{ userpasswordErr }}
                    </p>
                    <div class="mb-3">
                      <label class="form-label">
                        Name </label
                      ><input
                        v-model="userPayload.name"
                        autocomplete="off"
                        class="form-control"
                        type="text"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">
                        Surname </label
                      ><input
                        v-model="userPayload.surname"
                        autocomplete="off"
                        class="form-control"
                        type="text"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">
                        Email address * </label
                      ><input
                        v-model="userPayload.email"
                        autocomplete="off"
                        class="form-control"
                        type="email"
                      />
                    </div>
                    <p v-if="userEmailErr" class="error" style="color: #f19f9f">
                      {{ userEmailErr }}
                    </p>
                    <div class="mb-3">
                      <label
                        class="form-label"
                      >
                        Phone number </label
                      ><input
                        v-model="userPayload.phoneNumber"
                        autocomplete="off"
                        class="form-control"
                        type="text"
                      />
                    </div>
                    <div class="mb-3">
                      <div
                        class="form-check"
                      >
                        <input
                          v-model="userPayload.isActive"
                          class="form-check-input"
                          type="checkbox"
                        /><label
                          class="form-check-label"
                        >
                          Active
                        </label>
                      </div>
                    </div>
                    <div class="mb-3">
                      <div
                        class="form-check"
                      >
                        <input
                          v-model="userPayload.lockoutEnabled"
                          class="form-check-input"
                          type="checkbox"
                        /><label
                          class="form-check-label"
                          for="lockout-checkbox"
                        >
                          Account lockout
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Roles tab -->
              <br />
              <div v-if="activeAddUserTab === 'roles'">
                <div v-for="roles in assignableRoles">
                  <div class="form-check mb-2">
                    <input
                      v-model="userPayload.roleNames"
                      :value="roles.name"
                      class="form-check-input"
                      type="checkbox"
                    /><label class="form-check-label" for="roles-0">{{
                      roles?.name
                    }}</label>
                  </div>
                </div>
              </div>

              <!-- Organization Units tab -->
              <div v-if="activeAddUserTab === 'orgUnits'">
                <div v-for="unit in availableOrgUnits">
                  <div class="form-check mb-2">
                    <input
                      v-model="userPayload.organizationUnitIds"
                      :value="unit.id"
                      class="form-check-input"
                      type="checkbox"
                    /><label class="form-check-label" for="roles-0">{{
                      unit.displayName
                    }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-default"
              data-bs-dismiss="modal"
              type="button"
              v-on:click="resetValidationError"
            >
              Cancel
            </button>
            <button
              class="btn btn-outline-theme"
              type="button"
              v-on:click="this.ActionsApiHandler('createNewUser')"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Claims modal -->
    <div id="claimsModal" class="modal" data-backdrop="false">
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
                    autofocus=""
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
              class="btn btn-default"
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
              <h5>Volo.Abp.Identity.IdentityUser</h5>
              <div>{{ userId }}</div>
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
              class="btn btn-default"
              data-bs-dismiss="modal"
              type="button"
            >
              Close
            </button>
            <button class="btn btn-outline-theme" type="button">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- User Lock modal -->
    <div id="userLockModal" class="modal" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Lock - Alice.Denesik25</h5>
            {{ lockDate }}
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <p>Lockout end date</p>
            <datepicker v-model="lockDate" />
            <br />
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
              v-on:click="this.ActionsApiHandler('usersLock')"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit User modal -->
    <div id="editUserModal" class="modal" data-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit User</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
              v-on:click="resetValidationError"
            ></button>
          </div>
          <div class="modal-body">
            <div
              class="modal-body"
            >
              <!-- Tabs -->
              <ul id="user-nav-tabs" class="nav-tabs nav" role="tablist">
                <li id="user-informations" class="nav-item">
                  <a
                    :class="
                      activeEditUserTab === 'userInfo'
                        ? `nav-link active`
                        : `nav-link`
                    "
                    aria-disabled="false"
                    aria-selected="true"
                    role="tab"
                    v-on:click="activeEditUserTab = 'userInfo'"
                    >User information</a
                  >
                </li>
                <li id="user-roles" class="nav-item">
                  <a
                    :class="
                      activeEditUserTab === 'roles'
                        ? `nav-link active`
                        : `nav-link`
                    "
                    aria-disabled="false"
                    aria-selected="false"
                    role="tab"
                    v-on:click="activeEditUserTab = 'roles'"
                    >Roles
                  </a>
                </li>
                <li
                  class="nav-item"
                >
                  <a
                    :class="
                      activeEditUserTab === 'orgUnits'
                        ? `nav-link active`
                        : `nav-link`
                    "
                    aria-disabled="false"
                    aria-selected="false"
                    role="tab"
                    v-on:click="activeEditUserTab = 'orgUnits'"
                    >Organization Units
                  </a>
                </li>
              </ul>
              <!-- Tabs end -->
              <!-- User Info tab -->
              <div v-if="activeEditUserTab === 'userInfo'">
                <div class="mt-2 fade-in-top tab-content">
                  <div
                    class="tab-pane fade active show"
                  >
                    <div class="mb-3">
                      <label
                        class="form-label"
                      >
                        User name * </label
                      ><input
                        v-model="singleUserDetails.userName"
                        autocomplete="off"
                        class="form-control"
                        type="text"
                      />
                    </div>
                    <p v-if="userNameErr" class="error" style="color: #f19f9f">
                      {{ userNameErr }}
                    </p>
                    <div class="mb-3">
                      <label class="form-label">
                        Name </label
                      ><input
                        v-model="singleUserDetails.name"
                        autocomplete="off"
                        class="form-control"
                        type="text"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">
                        Surname </label
                      ><input
                        v-model="singleUserDetails.surname"
                        autocomplete="off"
                        class="form-control"
                        type="text"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">
                        Email address * </label
                      ><input
                        v-model="singleUserDetails.email"
                        autocomplete="off"
                        class="form-control"
                        type="email"
                      />
                    </div>
                    <p v-if="userEmailErr" class="error" style="color: #f19f9f">
                      {{ userEmailErr }}
                    </p>
                    <div class="mb-3">
                      <label
                        class="form-label"
                      >
                        Phone number </label
                      ><input
                        v-model="singleUserDetails.phoneNumber"
                        autocomplete="off"
                        class="form-control"
                        type="text"
                      />
                    </div>
                    <div class="mb-3">
                      <div
                        class="form-check"
                      >
                        <input
                          v-model="singleUserDetails.isActive"
                          :checked="singleUserDetails.isActive === true"
                          class="form-check-input"
                          type="checkbox"
                        /><label
                          class="form-check-label"
                        >
                          Active
                        </label>
                      </div>
                    </div>
                    <div class="mb-3">
                      <div
                        class="form-check"
                      >
                        <input
                          v-model="singleUserDetails.lockoutEnabled"
                          :checked="singleUserDetails.lockoutEnabled === true"
                          class="form-check-input"
                          type="checkbox"
                        /><label
                          class="form-check-label"
                        >
                          Account lockout
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Roles tab -->
              <br />
              <div v-if="activeEditUserTab === 'roles'">
                <div v-for="roles in assignableRoles">
                  <div class="form-check mb-2">
                    <input
                      :id="roles.id"
                      v-model="selectedRolesName"
                      :checked="
                        singleUserRoles.some((item) => item.id === roles.id)
                      "
                      :value="roles.name"
                      class="form-check-input"
                      type="checkbox"
                    /><label :for="roles.id" class="form-check-label">{{
                      roles?.name
                    }}</label>
                  </div>
                </div>
              </div>

              <!-- Organization Units tab -->
              <div v-if="activeEditUserTab === 'orgUnits'">
                <div v-for="unit in availableOrgUnits">
                  <div class="form-check mb-2">
                    <input
                      v-model="selectedOrganizationUnitIds"
                      :checked="
                        singleUserOrgUnits.some((item) => item.id === unit.id)
                      "
                      :value="unit.id"
                      class="form-check-input"
                      type="checkbox"
                    /><label class="form-check-label" for="roles-0">{{
                      unit.displayName
                    }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-default"
              data-bs-dismiss="modal"
              type="button"
              v-on:click="resetValidationError"
            >
              Cancel
            </button>
            <button
              class="btn btn-outline-theme"
              type="button"
              v-on:click="this.ActionsApiHandler('updateUser')"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </perfect-scrollbar>
</template>

<script>
import Users from "../../services/admin/users";
import { Modal } from "bootstrap";
import datepicker from "@/components/plugins/Datepicker.vue";
import jQuery from "jquery";

export default {
  name: "Users",
  components: {
    datepicker: datepicker,
  },
  data() {
    return {
      loading: true,
      grantAllPermissions: false,
      userList: [],
      activeClass: "FeatureManagement",
      organizationUnits: [],
      selectedOption: null,
      identityRoles: [],
      permissionList: [],
      permission: [],
      selectedItems: [],
      newPassword: "",
      TwoFactorEnabled: false,
      searchText: "",
      userId: "",
      userName: "",
      filterPayload: {
        roleId: "",
        organizationUnitId: "",
        userName: "",
        phoneNumber: "",
        emailAddress: "",
        isLockedOut: false,
        notActive: false,
        skipCount: 0,
        maxResultCount: 10,
      },
      userPayload: {
        email: "",
        extraProperties: {},
        isActive: true,
        name: "",
        organizationUnitIds: [],
        password: "",
        phoneNumber: "",
        roleNames: [],
        surname: "",
        userName: "",
      },
      claimsType: [],
      claimTypeError: "",
      claimValueError: "",
      isValidate: false,
      claimsArray: [],
      claimType: "",
      claimValue: "",
      entityChangeArray: [],
      lockDate: "",
      assignableRoles: [],
      availableOrgUnits: [],
      activeAddUserTab: "userInfo",
      activeEditUserTab: "userInfo",
      singleUserDetails: {},
      singleUserRoles: [],
      singleUserOrgUnits: [],
      editPayload: {},
      selectedRolesName: [],
      selectedOrganizationUnitIds: [],
      inputType: "password",
      userNameErr: "",
      userEmailErr: "",
      userpasswordErr: "",
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
    "userPayload.userName"(newVal) {
      if (!newVal) {
        this.userNameErr = "This field is required.";
      } else {
        this.userNameErr = "";
      }
    },
    "userPayload.email"(newVal) {
      if (!newVal) {
        this.userEmailErr = "This field is required.";
      } else if (!/\S+@\S+\.\S+/.test(newVal)) {
        this.userEmailErr = "Please enter a valid email address.";
      } else {
        this.userEmailErr = "";
      }
    },
    "userPayload.password"(newVal) {
      if (!newVal) {
        this.userpasswordErr = "This field is required.";
      } else if (newVal.length < 3) {
        this.userpasswordErr = "Password must be at least 3 characters long.";
      } else {
        this.userpasswordErr = "";
      }
    },
    "singleUserDetails.userName"(newVal) {
      if (!newVal) {
        this.userNameErr = "This field is required.";
      } else {
        this.userNameErr = "";
      }
    },
    "singleUserDetails.email"(newVal) {
      if (!newVal) {
        this.userEmailErr = "This field is required.";
      } else if (!/\S+@\S+\.\S+/.test(newVal)) {
        this.userEmailErr = "Please enter a valid email address.";
      } else {
        this.userEmailErr = "";
      }
    },
  },
  mounted() {
    this.ActionsApiHandler("getIdentityRoles");
    this.ActionsApiHandler("getOrganizationUnits");
    this.ActionsApiHandler("getIdentityUsers");
  },
  methods: {
    ActionsApiHandler(action, item) {
      if (action === "getIdentityRoles") {
        try {
          Users.getIdentityRoles().then(
            (res) => {
              this.identityRoles = res.data.items;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "getOrganizationUnits") {
        try {
          Users.getOrganizationUnits().then(
            (res) => {
              this.organizationUnits = res.data.items;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "getIdentityUsers") {
        this.loading = true;
        try {
          Users.getIdentityUsers().then(
            (res) => {
              this.loading = false;
              this.userList = res.data.items;
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
      if (action === "searchUsers") {
        const payload = {
          filter: this.searchText.toLowerCase(),
          skipCount: 0,
          maxResultCount: 10,
        };
        if (this.searchText === "") delete payload["filter"];
        try {
          Users.searchUsers(payload).then(
            (res) => {
              this.userList = res.data.items;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "filterUsers") {
        if (this.filterPayload.roleId === "")
          delete this.filterPayload["roleId"];
        if (this.filterPayload.organizationUnitId === "")
          delete this.filterPayload["organizationUnitId"];
        if (this.filterPayload.userName === "")
          delete this.filterPayload["userName"];
        if (this.filterPayload.phoneNumber === "")
          delete this.filterPayload["phoneNumber"];
        if (this.filterPayload.emailAddress === "")
          delete this.filterPayload["emailAddress"];
        if (this.filterPayload.isLockedOut === false)
          delete this.filterPayload["isLockedOut"];
        if (this.filterPayload.notActive === false)
          delete this.filterPayload["notActive"];
        try {
          Users.filterUsers(this.filterPayload).then(
            (res) => {
              this.userList = res.data.items;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "deleteUser") {
        try {
          Users.deleteUser(this.userId).then(
            (res) => {
              this.ActionsApiHandler("getIdentityUsers");
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
      if (action === "getTwoFactorDetail") {
        try {
          Users.getTwoFactorDetail(this.userId).then(
            (res) => {
              this.TwoFactorEnabled = res.data;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "updateTwoFactor") {
        try {
          Users.updateTwoFactor(this.userId, this.TwoFactorEnabled).then(
            (res) => {
              this.ActionsApiHandler("getIdentityUsers");
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
      if (action === "changeNewPassword") {
        const payload = {
          newPassword: this.newPassword,
        };
        try {
          Users.changeNewPassword(this.userId, payload).then(
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
      if (action === "getPermissionDetail") {
        try {
          Users.getPermissionDetail(this.userId).then(
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
          Users.updatePermission(payload, this.userId).then(
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
      if (action === "createNewUser") {
        if (this.userPayload.userName === "") {
          this.userNameErr = "This field is required.";
        }
        if (this.userPayload.email === "") {
          this.userEmailErr = "This field is required.";
        }
        if (this.userPayload.password === "") {
          this.userpasswordErr = "This field is required.";
        }

        if (
          this.userNameErr === "" &&
          this.userpasswordErr === "" &&
          this.userEmailErr === ""
        ) {
          try {
            Users.createNewUser(this.userPayload).then(
              (response) => {
                this.myModal.hide();
                this.ActionsApiHandler("getIdentityUsers");
              },
              (error) => {
                console.log("error", error);
              }
            );
          } catch (err) {
            console.log("error", err);
          }
        }
      }
      if (action === "AddClaimUpdate") {
        try {
          Users.AddClaimUpdate(this.userId, this.claimsArray).then(
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
      if (action === "getClaims") {
        try {
          Users.getClaims(this.userId).then(
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
      if (action === "allClaimTypes") {
        try {
          Users.allClaimTypes().then(
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
      if (action === "getChangeHistory") {
        try {
          Users.getChangeHistory(this.userId).then(
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
      if (action === "usersLock") {
        const encoded = encodeURIComponent(this.lockDate.toISOString()).trim(
          " "
        );
        try {
          Users.usersLock(this.userId, encoded).then(
            (response) => {
              this.myModal.hide();
              this.ActionsApiHandler("getIdentityUsers");
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "getSingleUser") {
        try {
          Users.getSingleUser(this.userId).then(
            (res) => {
              this.singleUserDetails = res.data;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "getAssignableRoles") {
        try {
          Users.getAssignableRoles().then(
            (res) => {
              this.assignableRoles = res.data.items;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "getSingleUserRoles") {
        try {
          Users.getSingleUserRoles(this.userId).then(
            (res) => {
              this.singleUserRoles = res.data.items;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "getAvailableOrganizationUnits") {
        try {
          Users.getAvailableOrganizationUnits().then(
            (res) => {
              this.availableOrgUnits = res.data.items;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "getSingleUserOrganiztionUnits") {
        try {
          Users.getSingleUserOrganiztionUnits(this.userId).then(
            (res) => {
              this.singleUserOrgUnits = res.data;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "updateUser") {
        if (this.singleUserDetails.name === "") {
          this.userNameErr = "This field is required.";
        }
        if (this.singleUserDetails.email === "") {
          this.userEmailErr = "This field is required.";
        }
        if (this.userNameErr === "" && this.userEmailErr === "") {
          this.singleUserDetails.roleNames = this.selectedRolesName;
          this.singleUserDetails.organizationsUnitIds =
            this.selectedOrganizationUnitIds;
          try {
            Users.updateUser(this.singleUserDetails).then(
              (res) => {
                this.ActionsApiHandler("getIdentityUsers");
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
      }
    },
    // selectAllPermissions() {
    //   for (const permission of this.permission) {
    //     permission.isGranted = !this.grantAllPermissions;
    //   }
    // },
    openModal(item, action) {
      //before open modals reset state
      this.resetAllStates();
      this.activeEditUserTab = "userInfo";
      //set user name and id
      this.userId = item.id;
      this.userName = item.userName;
      //open modals api call
      action === "twoFactorModal" &&
        this.ActionsApiHandler("getTwoFactorDetail");
      action === "permissionModal" &&
        this.ActionsApiHandler("getPermissionDetail");
      if (action === "claimsModal") {
        this.ActionsApiHandler("allClaimTypes");
        this.ActionsApiHandler("getClaims");
      }
      if (action === "changeHistoryModal") {
        this.ActionsApiHandler("getChangeHistory");
        this.userId = item.id;
      }
      if (action === "createNewUserModal") {
        this.ActionsApiHandler("getAssignableRoles");
        this.ActionsApiHandler("getAvailableOrganizationUnits");
        this.activeAddUserTab = "userInfo";
        this.userPayload = {
          email: "",
          extraProperties: {},
          isActive: true,
          name: "",
          organizationUnitIds: [],
          password: "",
          phoneNumber: "",
          roleNames: [],
          surname: "",
          userName: "",
        };
      }
      if (action === "editUserModal") {
        this.ActionsApiHandler("getSingleUser");
        this.ActionsApiHandler("getSingleUserRoles");
        this.ActionsApiHandler("getSingleUserOrganiztionUnits");
        this.ActionsApiHandler("getAssignableRoles");
        this.ActionsApiHandler("getAvailableOrganizationUnits");
      }
      this.myModal = new Modal(document.getElementById(action), {
        keyboard: false,
      });
      this.myModal.show();
      jQuery(`#${action}`).appendTo(jQuery("body"));
    },
    ResetFilterData() {
      this.filterPayload.roleId = "";
      this.filterPayload.organizationUnitId = "";
      this.filterPayload.userName = "";
      this.filterPayload.phoneNumber = "";
      this.filterPayload.emailAddress = "";
      this.filterPayload.isLockedOut = false;
      this.filterPayload.notActive = false;
      this.filterPayload.skipCount = 0;
      this.filterPayload.maxResultCount = 10;
    },
    handleSelectOption(item) {
      if (this.selectedOption === "delete") {
        this.openModal(item, "deleteUserModal");
      } else if (this.selectedOption === "twoFactor") {
        this.openModal(item, "twoFactorModal");
      } else if (this.selectedOption === "setPassword") {
        this.openModal(item, "setPasswordModal");
      } else if (this.selectedOption === "permission") {
        this.openModal(item, "permissionModal");
      } else if (this.selectedOption === "claims") {
        this.openModal(item, "claimsModal");
      } else if (this.selectedOption === "changeHistory") {
        this.openModal(item, "changeHistoryModal");
      } else if (this.selectedOption === "lock") {
        this.openModal(item, "userLockModal");
      } else if (this.selectedOption === "edit") {
        this.openModal(item, "editUserModal");
      }

      this.selectedOption = null;
    },
    generatePassword() {
      const length = 12; // Change this to adjust the length of the password
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]\\:;?><,./-=";
      let password = "";
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      this.newPassword = password;
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
    removeItem(index) {
      this.claimsArray.splice(index, 1);
    },
    updateInputFieldArray(index, value) {
      this.claimsArray[index]["claimValue"] = value;
    },
    AddClaimArray() {
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
          userId: this.userId,
          claimType: this.claimType,
          claimValue: this.claimValue,
          inputType: "String",
        };
        this.claimsArray.push(newObject);
        this.claimType = "";
        this.claimValue = "";
      }
    },
    resetAllStates() {
      this.userPayload.extraProperties = {};
      this.userPayload.name = "";
      this.userPayload.isDefault = false;
      this.userPayload.isPublic = false;
      this.userId = "";
      this.userName = "";
      this.claimType = "";
      this.claimValue = "";
      this.assignableRoles = [];
      this.singleUserRoles = [];
      this.singleUserDetails = {};
      this.selectedItems = [];
    },
    showPasswordToggle() {
      this.inputType = this.inputType === "password" ? "text" : "password";
    },
    resetValidationError() {
      this.userNameErr = "";
      this.userEmailErr = "";
      this.userpasswordErr = "";
    },
  },
};
</script>
