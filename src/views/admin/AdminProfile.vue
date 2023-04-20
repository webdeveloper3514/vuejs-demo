<!--
<template>
  <div class="setting-sec p-0">
    <div class="card">
      <div class="card-body p-0">
        <div class="d-flex h-100vh flex-wrap">
          <div
            class="user-profile col-12 col-md-12 col-lg-4 col-xl-3 col-xxl-2 border-right-trans p-4"
          >
            <div class="desktop-sticky-top">
              <div
                class="profile-sidebar col-md-4 col-lg-12 col-xl-12 col-xxl-12"
              >
                <div class="profile-img">
                  <img
                    alt="Profile Image"
                    class="w-100"
                    src="/src/assets/default.jpg"
                  />
                </div>
              </div>
              <div class="profile-name mt-3">
                <h5 class="mb-1">
                  {{ profileDetail.Name ? profileDetail.Name : "" }}
                  {{ profileDetail.Surname ? profileDetail.Surname : "" }}
                </h5>
                <a class="text-decoration-none mt-0" href="#">{{
                    profileDetail.Email
                  }}</a>
              </div>
            </div>
          </div>
          <div class="user-info col-12 col-md-12 col-lg-8 col-xl-9 col-xxl-10">
            <div class="tac-links">
              <ul id="pills-tab" class="nav nav-tabs nav-tabs-v2 px-4">
                <li class="nav-item me-3">
                  <a
                    id="pills-profile-tab"
                    :class="
                      ActiveTab === 'personalInfo'
                        ? 'nav-link active'
                        : 'nav-link'
                    "
                    data-bs-toggle="pill"
                    href="#pills-Information"
                    v-on:click="ActiveTab = 'personalInfo'"
                  >Personal Info / Change Password</a
                  >
                </li>
                <li class="nav-item me-3">
                  <a
                    id="pills-workspaces-tab"
                    :class="
                      ActiveTab === 'profileChange'
                        ? 'nav-link active'
                        : 'nav-link'
                    "
                    data-bs-toggle="pill"
                    href="#pills-profile"
                    v-on:click="ActiveTab = 'profileChange'"
                  >Profile Change / Two Factor</a
                  >
                </li>
              </ul>
            </div>
            <div id="pills-tabContent" class="tab-content">
              <div
                v-if="ActiveTab === 'personalInfo'"
                id="pills-Information"
                class="tab-pane fade active show"
              >
                <div class="tab-list py-4">
                  &lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;  Personal Information  -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;
                  <div class="tab-list_item px-4 mb-5">
                    <div class="mb-3 profile-title">
                      <p class="h5 mb-1">
                        <i class="fas fa-user fa-fw text-theme"></i> Personal
                        Information
                      </p>
                      <p class="mb-0">
                        <small>Change your personal Information</small>
                      </p>
                    </div>

                    <div class="card">
                      <div class="card-body p-0 pt-3">
                        <div class="profile-data">
                          <div class="px-3">
                            <form
                              class="el-form el-form&#45;&#45;default el-form&#45;&#45;label-top"
                            >
                              &lt;!&ndash; user Name &ndash;&gt;
                              <div
                                class="el-form-item is-required asterisk-left"
                              >
                                <label
                                  class="form-label ng-star-inserted"
                                  for="username"
                                >
                                  User name *
                                </label>
                                <div class="el-form-item__content">
                                  <div class="el-input">
                                    <div class="el-input__wrapper">
                                      <input
                                        id="username"
                                        v-model="profileDetail.UserName"
                                        autocomplete="off"
                                        class="el-input__inner"
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              &lt;!&ndash; name and lastname &ndash;&gt;
                              <div class="d-flex row">
                                <div class="col-xl-6 col-md-12 col-12">
                                  <div
                                    class="el-form-item is-required asterisk-left"
                                  >
                                    <label class="form-label" for="name"
                                    >Name
                                    </label>
                                    <div class="el-form-item__content">
                                      <div class="el-input">
                                        <div class="el-input__wrapper">
                                          <input
                                            id="name"
                                            v-model="profileDetail.Name"
                                            class="el-input__inner"
                                            name="name"
                                            type="text"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-xl-6 col-md-12 col-12">
                                  <div
                                    class="el-form-item is-required asterisk-left"
                                  >
                                    <label class="form-label" for="name"
                                    >Surname
                                    </label>
                                    <div class="el-form-item__content">
                                      <div class="el-input">
                                        <div class="el-input__wrapper">
                                          <input
                                            id="surname"
                                            v-model="profileDetail.Surname"
                                            class="el-input__inner"
                                            name="surname"
                                            type="text"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              &lt;!&ndash; email &ndash;&gt;
                              <div
                                class="el-form-item is-required asterisk-left"
                              >
                                <label class="form-label" for="email-address"
                                >Email</label
                                ><span> * </span>
                                <div class="el-form-item__content">
                                  <div class="el-input">
                                    <div class="el-input__wrapper">
                                      <input
                                        id="email-address"
                                        v-model="profileDetail.Email"
                                        class="el-input__inner"
                                        type="email"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <p
                                v-if="emailError"
                                class="error"
                                style="color: #f19f9f"
                              >
                                {{ emailError }}
                              </p>
                              &lt;!&ndash; phone &ndash;&gt;
                              <div
                                class="el-form-item is-required asterisk-left"
                              >
                                <label class="form-label" for="phone-number"
                                >Phone number</label
                                >
                                <div class="el-form-item__content">
                                  <div class="el-input">
                                    <div class="el-input__wrapper">
                                      <input
                                        id="phone-number"
                                        v-model="profileDetail.PhoneNumber"
                                        class="el-input__inner"
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              &lt;!&ndash; save button &ndash;&gt;
                              <div class="el-form-item asterisk-left">
                                <div class="el-form-item__content">
                                  <div
                                    class="form-btn text-center d-sm-flex justify-content-end w-100 p-3 border-top-trans"
                                  >
                                    <button
                                      v-if="
                                        profileDetail.UserName !== '' &&
                                        !emailError
                                      "
                                      class="btn btn-outline-theme"
                                      loading="false"
                                      type="button"
                                      v-on:click="
                                        openActionsModals(
                                          '',
                                          'PersonalInfoChanged'
                                        )
                                      "
                                    >
                                      Save
                                    </button>
                                    <button
                                      v-if="
                                        profileDetail.UserName === '' ||
                                        emailError
                                      "
                                      class="btn btn-outline-default"
                                      type="button"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div class="card-arrow">
                        <div class="card-arrow-top-left"></div>
                        <div class="card-arrow-top-right"></div>
                        <div class="card-arrow-bottom-left"></div>
                        <div class="card-arrow-bottom-right"></div>
                      </div>
                    </div>
                  </div>
                  &lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; Change password  -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;
                  <div class="tab-list_item px-4 mb-5">
                    <div class="mb-3 profile-title">
                      <p class="h5 mb-1">
                        <i class="fas fa-lock text-theme"></i> Change password
                      </p>
                    </div>
                    <div class="card">
                      <div class="card-body p-0 pt-3">
                        <div class="profile-data">
                          <div class="px-3">
                            <form
                              class="el-form el-form&#45;&#45;default el-form&#45;&#45;label-top"
                            >
                              <div class="mb-3 ng-star-inserted">
                                <label class="form-label" for="current-password"
                                >Current password</label
                                ><span> * </span>
                                <div class="input-group" validationtarget="">
                                  <input
                                    id="current-password"
                                    v-model="currentPassword"
                                    :type="currentPasswordinputType"
                                    class="form-control ng-untouched ng-pristine ng-valid"
                                  />
                                  <button
                                    class="btn btn-secondary"
                                    type="button"
                                    @click="
                                      showPasswordToggle('currentPassword')
                                    "
                                  >
                                    <i
                                      :class="
                                        currentPasswordinputType === 'text'
                                          ? 'fa fa-eye-slash'
                                          : 'fa fa-eye'
                                      "
                                    ></i>
                                  </button>
                                </div>
                                <p style="color: #f19f9f">
                                  {{ currentPasswordErr }}
                                </p>
                              </div>
                              <div class="d-flex row">
                                <div class="col-xl-6 col-md-12 col-12">
                                  <div
                                    class="el-form-item is-required asterisk-left"
                                  >
                                    <label class="form-label" for="new-password"
                                    >New password</label
                                    ><span> * </span>
                                    <div
                                      class="input-group"
                                      validationtarget=""
                                    >
                                      <input
                                        id="new-password"
                                        v-model="newPassword"
                                        :type="newPasswordinputType"
                                        class="form-control ng-untouched ng-pristine ng-valid"
                                      />
                                      <button
                                        class="btn btn-secondary"
                                        type="button"
                                        @click="
                                          showPasswordToggle('newPassword')
                                        "
                                      >
                                        <i
                                          :class="
                                            newPasswordinputType === 'text'
                                              ? 'fa fa-eye-slash'
                                              : 'fa fa-eye'
                                          "
                                        ></i>
                                      </button>
                                    </div>
                                    <p style="color: #f19f9f">
                                      {{ newPasswordErr }}
                                    </p>
                                  </div>
                                </div>
                                <div class="col-xl-6 col-md-12 col-12">
                                  <div
                                    class="el-form-item is-required asterisk-left"
                                  >
                                    <label
                                      class="form-label"
                                      for="confirm-new-password"
                                    >Confirm new password</label
                                    ><span> * </span>
                                    <div class="input-group">
                                      <input
                                        id="confirm-new-password"
                                        v-model="confirmPassword"
                                        :type="confirmPasswordinputType"
                                        class="form-control ng-untouched ng-pristine ng-valid"
                                      />
                                      <button
                                        class="btn btn-secondary"
                                        type="button"
                                        @click="
                                          showPasswordToggle('confirmPassword')
                                        "
                                      >
                                        <i
                                          :class="
                                            confirmPasswordinputType === 'text'
                                              ? 'fa fa-eye-slash'
                                              : 'fa fa-eye'
                                          "
                                        ></i>
                                      </button>
                                    </div>
                                    <p style="color: #f19f9f">
                                      {{ confirmPasswordErr }}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div class="el-form-item asterisk-left">
                                <div class="el-form-item__content">
                                  <div
                                    class="form-btn text-center d-sm-flex justify-content-end w-100 p-3 border-top-trans"
                                  >
                                    <button
                                      class="btn btn-outline-theme"
                                      loading="false"
                                      type="button"
                                      v-on:click="changePasswordHandler"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div class="card-arrow">
                        <div class="card-arrow-top-left"></div>
                        <div class="card-arrow-top-right"></div>
                        <div class="card-arrow-bottom-left"></div>
                        <div class="card-arrow-bottom-right"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="deleteAccount"
                  class="modal fade"
                  data-backdrop="false"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Delete Account</h5>
                        <button
                          class="btn-close"
                          data-bs-dismiss="modal"
                          type="button"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <p>
                          We will delete your account and all your organizations
                        </p>
                      </div>
                      <div class="modal-footer">
                        <button
                          class="btn btn-default"
                          data-bs-dismiss="modal"
                          type="button"
                        >
                          Close
                        </button
                        >
                        <button
                          class="btn btn-outline-theme"
                          loading="false"
                          type="button"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-if="ActiveTab === 'profileChange'"
                id="pills-profile"
                class="tab-pane fade active show"
              >
                <div class="tab-list py-4">
                  &lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;  Change Profile  -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;
                  <div class="tab-list_item px-4 mb-5">
                    <div class="mb-3 profile-title">
                      <p class="h5 mb-1">
                        <i class="fas fa-user fa-fw text-theme"></i> Profile
                        Picture
                      </p>
                      <p class="mb-0">
                        <small>Change your profile</small>
                      </p>
                    </div>
                    <div class="card">
                      <div class="card-body p-0 pt-3">
                        <div class="profile-data">
                          <div class="px-3">
                            <div class="row ng-star-inserted" style="">
                              <div class="col">
                                {{ type }}
                                <div class="form-check mb-2">
                                  <input
                                    id="Radio_UseDefault"
                                    v-model="profileType"
                                    class="form-check-input pp-type-selector ng-untouched ng-pristine ng-valid"
                                    name="pptype"
                                    type="radio"
                                    value="0"
                                  /><label
                                  class="form-check-label"
                                  for="Radio_UseDefault"
                                >Use Default Avatar</label
                                >
                                </div>
                                <div class="form-check mb-2">
                                  <input
                                    id="Radio_UseGravatar"
                                    v-model="profileType"
                                    class="form-check-input pp-type-selector ng-untouched ng-pristine ng-valid"
                                    name="pptype"
                                    type="radio"
                                    value="1"
                                  /><label
                                  class="form-check-label"
                                  for="Radio_UseGravatar"
                                >Use Gravatar</label
                                ><small class="d-block form-text text-muted"
                                >Use Gravatar service for your profile
                                  picture.</small
                                >
                                </div>
                                <div class="form-check mb-2">
                                  <input
                                    id="Radio_UploadFile"
                                    v-model="profileType"
                                    class="form-check-input pp-type-selector ng-untouched ng-pristine ng-valid"
                                    name="pptype"
                                    type="radio"
                                    value="2"
                                  /><label
                                  class="form-check-label"
                                  for="Radio_UploadFile"
                                >Upload File</label
                                >
                                </div>
                              </div>
                              <div
                                v-if="profileType === '2'"
                                id="UploadPPContainer"
                                class="row ng-star-inserted"
                              >
                                <div class="col">
                                  <h3>Change Profile Picture</h3>
                                  <div class="mb-3">
                                    <label
                                      class="form-label"
                                      for="UploadProfilePictureInfo_Picture"
                                    >Select New Image</label
                                    ><input
                                    id="UploadProfilePictureInfo_Picture"
                                    accept="image/*"
                                    class="form-control"
                                    type="file"
                                  />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="el-form-item asterisk-left">
                            <div class="el-form-item__content">
                              <div
                                class="form-btn text-center d-sm-flex justify-content-end w-100 p-3 border-top-trans"
                              >
                                <button
                                  class="btn btn-outline-theme"
                                  loading="false"
                                  type="button"
                                  v-on:click="saveProfileHandler"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card-arrow">
                        <div class="card-arrow-top-left"></div>
                        <div class="card-arrow-top-right"></div>
                        <div class="card-arrow-bottom-left"></div>
                        <div class="card-arrow-bottom-right"></div>
                      </div>
                    </div>
                  </div>
                  &lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; Two Factor  -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;
                  <div class="tab-list_item px-4 mb-5">
                    <div class="mb-3 profile-title">
                      <p class="h5 mb-1">
                        <i class="fas fa-lock text-theme"></i> Two Factor
                      </p>
                    </div>
                    <div class="card">
                      <div class="card-body p-0 pt-3">
                        <div class="profile-data">
                          <div class="px-3">
                            <div
                              _ngcontent-eie-c250=""
                              class="form-check mb-4 ng-star-inserted"
                            >
                              <input
                                id="two-factor-enabled"
                                v-model="enabled"
                                _ngcontent-eie-c250=""
                                class="form-check-input ng-untouched ng-pristine ng-valid"
                                type="checkbox"
                              /><label
                              _ngcontent-eie-c250=""
                              class="form-check-label"
                              for="two-factor-enabled"
                            >Two factor enabled</label
                            >
                            </div>
                            <div class="el-form-item asterisk-left">
                              <div class="el-form-item__content">
                                <div
                                  class="form-btn text-center d-sm-flex justify-content-end w-100 p-3 border-top-trans"
                                >
                                  <button
                                    class="btn btn-outline-theme"
                                    loading="false"
                                    type="button"
                                    v-on:click="twoFactorChangeHandler"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card-arrow">
                        <div class="card-arrow-top-left"></div>
                        <div class="card-arrow-top-right"></div>
                        <div class="card-arrow-bottom-left"></div>
                        <div class="card-arrow-bottom-right"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="deleteAccount"
                  class="modal fade"
                  data-backdrop="false"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Delete Account</h5>
                        <button
                          class="btn-close"
                          data-bs-dismiss="modal"
                          type="button"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <p>
                          We will delete your account and all your organizations
                        </p>
                      </div>
                      <div class="modal-footer">
                        <button
                          class="btn btn-default"
                          data-bs-dismiss="modal"
                          type="button"
                        >
                          Close
                        </button
                        >
                        <button
                          class="btn btn-outline-theme"
                          loading="false"
                          type="button"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="pills-tabContent" class="tab-content"></div>
          </div>
        </div>
      </div>
      <div class="card-arrow">
        <div class="card-arrow-top-left"></div>
        <div class="card-arrow-top-right"></div>
        <div class="card-arrow-bottom-left"></div>
        <div class="card-arrow-bottom-right"></div>
      </div>
    </div>
  </div>

  <div id="PersonalInfoChanged" class="modal fade" data-backdrop="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Personal info changed</h5>
          <button
            class="btn-close"
            data-bs-dismiss="modal"
            type="button"
          ></button>
        </div>
        <div class="modal-body">
          <p>
            If you want to apply these changes, you have to login. Do you want
            to log out?
          </p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-default" data-bs-dismiss="modal" type="button">
            Close
          </button>
          <button
            class="btn btn-outline-theme"
            type="button"
            v-on:click="logOutafterProfileDetailsChanges"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>

  <div id="wrongDetailChangePassword" class="modal fade" data-backdrop="false">
    <div class="modal-dialog bg-dark">
      <div class="modal-content">
        <div class="modal-body">
          <p>Something Went Wrong While Reseting The Password</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-default" data-bs-dismiss="modal" type="button">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  <div id="invalidCurrentPassword" class="modal fade" data-backdrop="false">
    <div class="modal-dialog bg-dark">
      <div class="modal-content">
        <div class="modal-body">
          <p>Current Password Is Wrong.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-default" data-bs-dismiss="modal" type="button">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  &lt;!&ndash; Bootstrap toast error &ndash;&gt;
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
</template>

<script>
import AdminProfile from "../../services/admin/adminprofile";
import router from "../../router";
import VueCookies from "vue-cookies";
import { Modal, Toast } from "bootstrap";
import jQuery from "jquery";

export default {
  name: "AdminProfile",
  components: {},
  data() {
    return {
      ActiveTab: "personalInfo",
      enabled: false,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      currentPasswordErr: "",
      newPasswordErr: "",
      confirmPasswordErr: "",
      currentPasswordinputType: "password",
      newPasswordinputType: "password",
      confirmPasswordinputType: "password",
      loggedInUser: {},
      profileDetail: {
        UserNam: "",
        Name: "",
        Surname: "",
        Email: "",
        PhoneNumber: "",
        __RequestVerificationToken: ""
      },
      profileType: "0",
      validationIstrue: true
    };
  },
  mounted() {
    this.loggedInUser = VueCookies.get("user-info");
    this.twoFactorHandler();
    this.getMyProfile();
    this.getProfilePicture();
  },
  computed: {
    emailError() {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.profileDetail.Email.match(pattern)) {
        return "Please enter a valid email address";
      }
    }
  },
  watch: {
    currentPassword: {
      handler(newValue, oldValue) {
        this.currentPasswordErr = "";
        this.currentPassword.length === 1 && (this.validationIstrue = true);
        if (this.currentPassword === "" && this.validationIstrue) {
          this.currentPasswordErr = "This field is required.";
        }
      }
    },
    newPassword: {
      handler(newValue, oldValue) {
        this.newPasswordErr = "";
        this.newPassword.length === 1 && (this.validationIstrue = true);
        if (this.newPassword === "" && this.validationIstrue) {
          this.newPasswordErr = "This field is required.";
        }
        if (this.newPassword?.length < 3 && this.newPassword !== "") {
          this.newPasswordErr =
            "This field must be a string or array type with a minimum length of 3.";
        }
        if (
          this.newPassword?.length > 2 &&
          this.newPassword !== "" &&
          this.newPassword !== this.confirmPassword
        ) {
          this.newPasswordErr = "Password does not match the confirm password.";
        }
        if (
          this.newPassword?.length > 2 &&
          this.newPassword !== "" &&
          this.newPassword === this.confirmPassword
        ) {
          this.newPasswordErr = "";
          this.confirmPasswordErr = "";
        }
      }
    },
    confirmPassword: {
      handler(newValue, oldValue) {
        this.confirmPasswordErr = "";
        this.confirmPassword.length === 1 && (this.validationIstrue = true);
        if (this.confirmPassword === "" && this.validationIstrue) {
          this.confirmPasswordErr = "This field is required.";
        }
        if (this.confirmPassword?.length < 3 && this.confirmPassword !== "") {
          this.confirmPasswordErr =
            "This field must be a string or array type with a minimum length of 3.";
        }
        if (
          this.confirmPassword?.length > 2 &&
          this.confirmPassword !== "" &&
          this.newPassword !== this.confirmPassword
        ) {
          this.confirmPasswordErr =
            "Password does not match the confirm password.";
        }
        if (
          this.confirmPassword?.length > 2 &&
          this.confirmPassword !== "" &&
          this.newPassword === this.confirmPassword
        ) {
          this.confirmPasswordErr = "";
          this.newPasswordErr = "";
        }
      }
    }
  },
  methods: {
    twoFactorHandler() {
      try {
        AdminProfile.twoFactorAction().then(
          (response) => {
            this.enabled = response.data;
          },
          (error) => {
            console.log("error", error);
          }
        );
      } catch (error) {
        console.log("error", error);
      }
    },
    twoFactorChangeHandler() {
      try {
        AdminProfile.twoFactorChangeAction(this.enabled).then(
          (response) => {
          },
          (error) => {
            console.log("error", error);
          }
        );
      } catch (err) {
        console.log("error", error);
      }
    },
    openActionsModals(item, action) {
      action === "PersonalInfoChanged" && this.saveAdminProfileHandler();
      this.myModal = new Modal(document.getElementById(action), {
        keyboard: false
      });
      this.myModal.show();
      jQuery(`#${action}`).appendTo(jQuery("body"));
    },
    saveAdminProfileHandler() {
      try {
        AdminProfile.saveAdminProfileChanges(this.profileDetail).then(
          (response) => {
          },
          (error) => {
            console.log("error", error);
          }
        );
      } catch (error) {
        console.log("error", error);
      }
    },
    changePasswordHandler() {
      if (
        this.currentPasswordErr === "" &&
        this.newPasswordErr === "" &&
        this.confirmPasswordErr === "" &&
        this.currentPassword !== "" &&
        this.newPassword !== "" &&
        this.confirmPassword !== ""
      ) {
        const payload = {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword
        };
        try {
          AdminProfile.saveChangePassword(payload).then(
            (response) => {
              this.showToast("toast-1");
              this.currentPassword = "";
              this.newPassword = "";
              this.confirmPassword = "";
              this.validationIstrue = false;
            },
            (error) => {
              if (error.response.data.error.message === "Incorrect password.") {
                this.openActionsModals("", "invalidCurrentPassword");
              }
            }
          );
        } catch (error) {
        }
      } else {
        this.openActionsModals("", "wrongDetailChangePassword");
      }
    },
    showPasswordToggle(toggle) {
      if (toggle === "currentPassword") {
        this.currentPasswordinputType =
          this.currentPasswordinputType === "password" ? "text" : "password";
      }
      if (toggle === "newPassword") {
        this.newPasswordinputType =
          this.newPasswordinputType === "password" ? "text" : "password";
      }
      if (toggle === "confirmPassword") {
        this.confirmPasswordinputType =
          this.confirmPasswordinputType === "password" ? "text" : "password";
      }
    },
    getMyProfile() {
      try {
        AdminProfile.getAdminProfileDetails().then(
          (response) => {
            console.log("response", response);
            this.profileDetail.Email = response.data.email;
            this.profileDetail.Name = response.data.name;
            this.profileDetail.PhoneNumber = response.data.phoneNumber;
            this.profileDetail.Surname = response.data.surname;
            this.profileDetail.UserName = response.data.userName;
          },
          (error) => {
            console.log("error", error);
          }
        );
      } catch (error) {
        console.log("error", error);
      }
    },
    getProfilePicture() {
      try {
        AdminProfile.getAdminProfilePicture(this.loggedInUser.sub).then(
          (response) => {
          },
          (error) => {
            console.log("error", error);
          }
        );
      } catch (error) {
        console.log("error", error);
      }
    },
    logOutafterProfileDetailsChanges() {
      setTimeout(() => {
        VueCookies.remove("user-token");
        VueCookies.remove("user-info");
        VueCookies.remove("user-refresh-token");
        this.myModal.hide();
        router.push("/");
      }, 1000);
    },
    saveProfileHandler() {
      const fd = new FormData();
      fd.append("type", this.profileType);
      try {
        AdminProfile.saveProfile(fd).then(
          (response) => {
            this.getProfilePicture();
          },
          (error) => {
            console.log("error", error);
          }
        );
      } catch (error) {
        console.log("error", error);
      }
    },
    showToast(target) {
      const toast = new Toast(document.getElementById(target));
      toast.show();
    }
  }
};
</script>
-->
