<!--
//TODO
Manage Host feature is not working
Replace all dropdown box with VUEDropDown
-->

<script>
import SettingManagement from "@/services/admin/settingManagement";
import { Modal, Toast } from "bootstrap";
import jQuery from "jquery";

export default {
  name: "SettingManagement",
  components: {},
  data() {
    return {
      ActiveSettingTab: "IdentityManagement",
      ActiveSettingIdentityManagementTab: "General",
      ActiveSettingAccountTab: "General",
      accountGeneralPayload: {
        isSelfRegistrationEnabled: false,
        enableLocalLogin: false,
      },
      accountTwoFactorPayload: {
        twoFactorBehaviour: 0,
        isRememberBrowserEnabled: false,
        usersCanChange: false,
      },
      accountCaptchaPayload: {
        useCaptchaOnLogin: false,
        useCaptchaOnRegistration: false,
        verifyBaseUrl: "",
        siteKey: null,
        siteSecret: null,
        version: "",
        score: "",
      },
      IdentityManagementPayload: {
        password: {
          requiredLength: "",
          requiredUniqueChars: "",
          requireNonAlphanumeric: false,
          requireLowercase: false,
          requireUppercase: false,
          requireDigit: false,
        },
        lockout: {
          allowedForNewUsers: false,
          lockoutDuration: "",
          maxFailedAccessAttempts: "",
        },
        signIn: {
          requireConfirmedEmail: false,
          enablePhoneNumberConfirmation: false,
          requireConfirmedPhoneNumber: false,
        },
        user: {
          isUserNameUpdateEnabled: false,
          isEmailUpdateEnabled: false,
        },
      },
      activeClass: "Identity",
      featuresDatails: [],
      featureData: {},
      requiredLengthError: "",
      requiredUniqueCharsError: "",
      lockoutDurationError: "",
      verifyBaseUrlError: "",
      scoreError: "",
      selectedItems: [],
    };
  },
  watch: {
    "IdentityManagementPayload.password.requiredLength"(newVal) {
      if (!newVal) {
        this.requiredLengthError = "Number is required";
      } else if (newVal <= 1 || newVal > 32) {
        this.requiredLengthError = "Number must be between 1 and 32";
      } else {
        this.requiredLengthError = "";
      }
    },
    "IdentityManagementPayload.password.requiredUniqueChars"(newVal) {
      if (!newVal) {
        this.requiredUniqueCharsError = "Number is required";
      } else if (newVal <= 0 || newVal > 32) {
        this.requiredUniqueCharsError = "Number must be between 1 and 32";
      } else {
        this.requiredUniqueCharsError = "";
      }
    },
    "IdentityManagementPayload.lockout.lockoutDuration"(newVal) {
      if (!newVal) {
        this.lockoutDurationError = "Number is required";
      } else if (newVal <= 0) {
        this.lockoutDurationError = "Number must be between 1 and 32";
      } else {
        this.lockoutDurationError = "";
      }
    },
    "accountCaptchaPayload.verifyBaseUrl"(newVal) {
      if (!newVal) {
        this.verifyBaseUrlError = "Number is required";
      } else {
        this.verifyBaseUrlError = "";
      }
    },
    "accountCaptchaPayload.score"(newVal) {
      if (newVal === "") {
        this.scoreError = "This field is required.";
      } else if (newVal < 0) {
        this.scoreError = "This field must be greater than or equal to 0.";
      } else if (newVal > 1) {
        this.scoreError = "This field must be less than or equal to 1.";
      } else {
        this.scoreError = "";
      }
    },
  },
  mounted() {
    this.ActionsApiHandler("getIdentityManagementSetting", "firstTimeApiCall");
  },
  methods: {
    ActionsApiHandler(action, item) {
      if (action === "updateFeatures") {
        const payload = {
          features: this.selectedItems,
        };
        try {
          SettingManagement.updateFeatures(payload).then(
            (response) => {
              this.myModal.hide();
              this.featuresDatails = [];
              this.showToast("toast-1");
              this.ActionsApiHandler("applicationConfigurationLocalization");
              this.ActionsApiHandler("applicationConfigurationCulture");
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "getIdentityManagementSetting") {
        if (
          this.ActiveSettingTab !== "IdentityManagement" ||
          item === "firstTimeApiCall"
        ) {
          this.ActiveSettingTab = "IdentityManagement";
          try {
            SettingManagement.getIdentityManagementSetting().then(
              (res) => {
                this.IdentityManagementPayload.password.requiredLength =
                  res.data.password.requiredLength;
                this.IdentityManagementPayload.password.requiredUniqueChars =
                  res.data.password.requiredUniqueChars;
                this.IdentityManagementPayload.password.requireNonAlphanumeric =
                  res.data.password.requireNonAlphanumeric;
                this.IdentityManagementPayload.password.requireLowercase =
                  res.data.password.requireLowercase;
                this.IdentityManagementPayload.password.requireUppercase =
                  res.data.password.requireUppercase;
                this.IdentityManagementPayload.password.requireDigit =
                  res.data.password.requireDigit;

                this.IdentityManagementPayload.lockout.allowedForNewUsers =
                  res.data.lockout.allowedForNewUsers;
                this.IdentityManagementPayload.lockout.lockoutDuration =
                  res.data.lockout.lockoutDuration;
                this.IdentityManagementPayload.lockout.maxFailedAccessAttempts =
                  res.data.lockout.maxFailedAccessAttempts;

                this.IdentityManagementPayload.signIn.requireConfirmedEmail =
                  res.data.signIn.requireConfirmedEmail;
                this.IdentityManagementPayload.signIn.enablePhoneNumberConfirmation =
                  res.data.signIn.enablePhoneNumberConfirmation;
                this.IdentityManagementPayload.signIn.requireConfirmedPhoneNumber =
                  res.data.signIn.requireConfirmedPhoneNumber;

                this.IdentityManagementPayload.user.isUserNameUpdateEnabled =
                  res.data.user.isUserNameUpdateEnabled;
                this.IdentityManagementPayload.user.isEmailUpdateEnabled =
                  res.data.user.isEmailUpdateEnabled;
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
      if (action === "updateIdentityManagementSetting") {
        try {
          SettingManagement.updateIdentityManagementSetting(
            this.IdentityManagementPayload
          ).then(
            (response) => {
              this.showToast("toast-1");
              this.ActionsApiHandler("applicationConfigurationLocalization");
              this.ActionsApiHandler("applicationConfigurationCulture");
              // this.ActionsApiHandler("totalUnreadMessageCount");
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "getAccountGeneralData") {
        if (
          this.ActiveSettingTab !== "Account" ||
          this.ActiveSettingAccountTab !== "General"
        ) {
          this.ActiveSettingTab = "Account";
          this.ActiveSettingAccountTab = "General";
          try {
            SettingManagement.getAccountGeneral().then(
              (response) => {
                this.accountGeneralPayload.isSelfRegistrationEnabled =
                  response.data.isSelfRegistrationEnabled;
                this.accountGeneralPayload.enableLocalLogin =
                  response.data.enableLocalLogin;
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
      if (action === "updateSettingAccountGeneral") {
        try {
          SettingManagement.updateSettingAccountGeneral(
            this.accountGeneralPayload
          ).then(
            (response) => {
              this.showToast("toast-1");
              this.ActionsApiHandler("applicationConfigurationLocalization");
              this.ActionsApiHandler("applicationConfigurationCulture");
              // this.ActionsApiHandler("totalUnreadMessageCount");
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "getAccountTwoFactor") {
        if (this.ActiveSettingAccountTab !== "Twofactor") {
          this.ActiveSettingAccountTab = "Twofactor";
          try {
            SettingManagement.getAccountTwoFactor().then(
              (response) => {
                this.accountTwoFactorPayload.twoFactorBehaviour =
                  response.data.twoFactorBehaviour;
                this.accountTwoFactorPayload.isRememberBrowserEnabled =
                  response.data.isRememberBrowserEnabled;
                this.accountTwoFactorPayload.usersCanChange =
                  response.data.usersCanChange;
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
      if (action === "updateSettingAccountTwoFactor") {
        try {
          SettingManagement.updateSettingAccountTwoFactor(
            this.accountTwoFactorPayload
          ).then(
            (response) => {
              this.showToast("toast-1");
              this.ActionsApiHandler("applicationConfigurationLocalization");
              this.ActionsApiHandler("applicationConfigurationCulture");
              // this.ActionsApiHandler("totalUnreadMessageCount");
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "getAccountCaptcha") {
        if (this.ActiveSettingAccountTab !== "Captcha") {
          this.ActiveSettingAccountTab = "Captcha";
          try {
            SettingManagement.getAccountCaptcha().then(
              (response) => {
                this.accountCaptchaPayload.useCaptchaOnLogin =
                  response.data.useCaptchaOnLogin;
                this.accountCaptchaPayload.useCaptchaOnRegistration =
                  response.data.useCaptchaOnRegistration;
                this.accountCaptchaPayload.verifyBaseUrl =
                  response.data.verifyBaseUrl;
                this.accountCaptchaPayload.siteKey = response.data.siteKey;
                this.accountCaptchaPayload.siteSecret =
                  response.data.siteSecret;
                this.accountCaptchaPayload.version = response.data.version;
                this.accountCaptchaPayload.score = response.data.score;
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
      if (action === "updateSettingAccountCaptcha") {
        if (this.verifyBaseUrlError === "" && this.scoreError === "") {
          try {
            SettingManagement.updateSettingAccountCaptcha(
              this.accountCaptchaPayload
            ).then(
              (response) => {
                this.showToast("toast-1");
                this.ActionsApiHandler("applicationConfigurationLocalization");
                this.ActionsApiHandler("applicationConfigurationCulture");
                // this.ActionsApiHandler("totalUnreadMessageCount");
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
      if (action === "getFeatures") {
        try {
          SettingManagement.getFeatures().then(
            (response) => {
              this.featuresDatails = response.data.groups;
              this.ActionsApiHandler("selectFeatures", this.featuresDatails[0]);
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "selectFeatures") {
        this.activeClass = item.name;
        this.featureData = item;
      }
      if (action === "applicationConfigurationLocalization") {
        try {
          SettingManagement.applicationConfigurationLocalization().then(
            (response) => {},
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "applicationConfigurationCulture") {
        try {
          SettingManagement.applicationConfigurationCulture().then(
            (response) => {},
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "resetDefaultFeature") {
        try {
          SettingManagement.resetDefaultFeature().then(
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
      }
    },
    newFeatureData(name, value) {
      const obj = { name: name, value: value.toString() };
      const index = this.selectedItems.findIndex((a) => a.name === name);
      if (index >= 0) this.selectedItems.splice(index, 1, obj);
      else this.selectedItems.push(obj);
    },
    openActionsModals(item, action) {
      // this.isValidate = false;
      action === "FeatureManagementModal" &&
        this.ActionsApiHandler("getFeatures");
      this.myModal = new Modal(document.getElementById(action), {
        keyboard: false,
      });
      this.myModal.show();
      jQuery(`#${action}`).appendTo(jQuery("body"));
    },
    showToast(target) {
      const toast = new Toast(document.getElementById(target));
      toast.show();
    },
    openActionsModalss(setting, action) {
      this.featuresDatails = [];
      this.myModals = new Modal(document.getElementById(action), {
        keyboard: false,
      });
      this.myModals.show();
      jQuery(`#${action}`).appendTo(jQuery("body"));
    },
  },
};
</script>

<template>
  <perfect-scrollbar class="app-content-inner-padding h-100">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">ADMINISTRATION</a></li>
      <li class="breadcrumb-item"><a href="/">IDENTITY MANAGEMENT</a></li>
      <li class="breadcrumb-item active">SETTINGS</li>
    </ul>
    <div class="row align-items-center">
      <div class="col-sm-10">
        <h1 class="page-header">Settings</h1>
      </div>
    </div>
    <hr class="mb-4 mt-n1" />

    <div id="SettingManagementWrapper">
      <card>
        <card-body>
          <div class="row">
            <div class="col-12 col-md-3 mb-2 mb-md-0">
              <!-- main setting tabs -->
              <ul id="nav-tab" class="nav flex-column nav-pills" role="tablist">
                <li
                  class="nav-item pointer"
                  v-on:click="
                    this.ActionsApiHandler('getIdentityManagementSetting')
                  "
                >
                  <a
                    :class="
                      ActiveSettingTab === 'IdentityManagement'
                        ? 'nav-link active'
                        : 'nav-link'
                    "
                    role="tab"
                    >Identity Management</a
                  >
                </li>
                <li
                  class="nav-item pointer"
                  v-on:click="this.ActionsApiHandler('getAccountGeneralData')"
                >
                  <a
                    :class="
                      ActiveSettingTab === 'Account'
                        ? 'nav-link active'
                        : 'nav-link'
                    "
                    role="tab"
                    >Account</a
                  >
                </li>
                <li class="nav-item pointer">
                  <a
                    :class="
                      ActiveSettingTab === 'FeatureManagement'
                        ? 'nav-link active'
                        : 'nav-link'
                    "
                    role="tab"
                    v-on:click="ActiveSettingTab = 'FeatureManagement'"
                    >Feature management</a
                  >
                </li>
              </ul>
            </div>
            <!-- Identity Management -->
            <div
              v-if="ActiveSettingTab === 'IdentityManagement'"
              class="col-12 col-md-9"
            >
              <div class="tab-content">
                <div class="tab-pane fade show active">
                  <h2>Identity Management</h2>
                  <hr class="my-2" />
                  <ul class="nav-tabs nav" role="tablist">
                    <li class="nav-item">
                      <a
                        aria-disabled="false"
                        aria-selected="true"
                        class="nav-link active"
                        role="tab"
                        >General</a
                      >
                    </li>
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane fade show active">
                      <form>
                        <div class="row">
                          <div class="col-md-12">
                            <!-- password setting -->
                            <div formgroupname="password">
                              <h4>Password Settings</h4>
                              <div class="mb-3">
                                <label class="form-label">Required length</label
                                ><input
                                  v-model="
                                    IdentityManagementPayload.password
                                      .requiredLength
                                  "
                                  class="form-control"
                                  formcontrolname="requiredLength"
                                  max="32"
                                  min="2"
                                  type="number"
                                /><small class="form-text text-muted"
                                  >The minimum length a password must be.</small
                                >
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Required unique characters number</label
                                ><input
                                  v-model="
                                    IdentityManagementPayload.password
                                      .requiredUniqueChars
                                  "
                                  class="form-control"
                                  formcontrolname="requiredUniqueChars"
                                  max="32"
                                  min="1"
                                  type="number"
                                /><small class="form-text text-muted"
                                  >The minimum number of unique characters which
                                  a password must contain.</small
                                >
                              </div>
                              <div class="form-check mb-2">
                                <input
                                  v-model="
                                    IdentityManagementPayload.password
                                      .requireNonAlphanumeric
                                  "
                                  class="form-check-input"
                                  formcontrolname="requireNonAlphanumeric"
                                  type="checkbox"
                                /><label class="form-check-label"
                                  >Required non-alphanumeric character</label
                                >
                                &nbsp;
                                <small class="form-text text-muted"
                                  >If passwords must contain a non-alphanumeric
                                  character.</small
                                >
                              </div>
                              <div class="form-check mb-2">
                                <input
                                  v-model="
                                    IdentityManagementPayload.password
                                      .requireLowercase
                                  "
                                  class="form-check-input"
                                  formcontrolname="requireLowercase"
                                  type="checkbox"
                                /><label class="form-check-label"
                                  >Required lower case character</label
                                >
                                &nbsp;
                                <small class="form-text text-muted"
                                  >If passwords must contain a lower case ASCII
                                  character.</small
                                >
                              </div>
                              <div class="form-check mb-2">
                                <input
                                  v-model="
                                    IdentityManagementPayload.password
                                      .requireUppercase
                                  "
                                  class="form-check-input"
                                  formcontrolname="requireUppercase"
                                  type="checkbox"
                                /><label class="form-check-label"
                                  >Required upper case character</label
                                >
                                &nbsp;
                                <small class="form-text text-muted"
                                  >If passwords must contain a upper case ASCII
                                  character.</small
                                >
                              </div>
                              <div class="form-check mb-2">
                                <input
                                  v-model="
                                    IdentityManagementPayload.password
                                      .requireDigit
                                  "
                                  class="form-check-input"
                                  formcontrolname="requireDigit"
                                  type="checkbox"
                                /><label class="form-check-label"
                                  >Required digit</label
                                >
                                &nbsp;
                                <small class="form-text text-muted"
                                  >If passwords must contain a digit.</small
                                >
                              </div>
                            </div>
                            <hr class="my-4" />
                            <!-- lockout setting -->
                            <div formgroupname="lockout">
                              <h4>Lockout Settings</h4>
                              <div class="form-check mb-2">
                                <input
                                  v-model="
                                    IdentityManagementPayload.lockout
                                      .allowedForNewUsers
                                  "
                                  class="form-check-input"
                                  formcontrolname="allowedForNewUsers"
                                  type="checkbox"
                                /><label class="form-check-label"
                                  >Enabled for new users</label
                                >
                                &nbsp;
                                <small class="form-text text-muted"
                                  >Whether a new user can be locked out.</small
                                >
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Lockout duration(seconds)</label
                                ><input
                                  v-model="
                                    IdentityManagementPayload.lockout
                                      .lockoutDuration
                                  "
                                  class="form-control"
                                  formcontrolname="lockoutDuration"
                                  type="number"
                                /><small class="form-text text-muted"
                                  >The duration a user is locked out for when a
                                  lockout occurs.</small
                                >
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Max failed access attempts</label
                                ><input
                                  v-model="
                                    IdentityManagementPayload.lockout
                                      .maxFailedAccessAttempts
                                  "
                                  class="form-control"
                                  formcontrolname="maxFailedAccessAttempts"
                                  type="number"
                                /><small class="form-text text-muted"
                                  >The number of failed access attempts allowed
                                  before a user is locked out, assuming lock out
                                  is enabled.</small
                                >
                              </div>
                            </div>
                            <hr class="my-4" />
                            <!-- signIn setting -->
                            <div formgroupname="signIn">
                              <h4>SignIn Settings</h4>
                              <div class="form-check mb-2">
                                <input
                                  v-model="
                                    IdentityManagementPayload.signIn
                                      .requireConfirmedEmail
                                  "
                                  class="form-check-input"
                                  formcontrolname="requireConfirmedEmail"
                                  type="checkbox"
                                /><label class="form-check-label"
                                  >Require confirmed email</label
                                >
                                &nbsp;
                                <small class="form-text text-muted"
                                  >Whether a confirmed email address is required
                                  to sign in.</small
                                >
                              </div>
                              <div class="form-check mb-2">
                                <input
                                  v-model="
                                    IdentityManagementPayload.signIn
                                      .enablePhoneNumberConfirmation
                                  "
                                  class="form-check-input"
                                  formcontrolname="enablePhoneNumberConfirmation"
                                  type="checkbox"
                                /><label class="form-check-label"
                                  >Allow users to confirm their phone
                                  number</label
                                >
                                &nbsp;
                                <small class="form-text text-muted"
                                  >Whether the phoneNumber can be confirmed by
                                  the user.</small
                                >
                              </div>
                              <div class="form-check mb-2">
                                <input
                                  v-model="
                                    IdentityManagementPayload.signIn
                                      .requireConfirmedPhoneNumber
                                  "
                                  class="form-check-input"
                                  formcontrolname="requireConfirmedPhoneNumber"
                                  type="checkbox"
                                /><label class="form-check-label"
                                  >Require confirmed phone number</label
                                >
                                &nbsp;
                                <small class="form-text text-muted"
                                  >Whether a confirmed telephone number is
                                  required to sign in.</small
                                >
                              </div>
                            </div>
                            <hr class="my-4" />
                            <!-- User Settings -->
                            <div formgroupname="user">
                              <h4>User Settings</h4>
                              <div class="form-check mb-2">
                                <input
                                  v-model="
                                    IdentityManagementPayload.user
                                      .isEmailUpdateEnabled
                                  "
                                  class="form-check-input"
                                  formcontrolname="isEmailUpdateEnabled"
                                  type="checkbox"
                                /><label class="form-check-label"
                                  >Allow users to change their email
                                  addresses</label
                                >
                                &nbsp;
                                <small class="form-text text-muted"
                                  >Whether the email can be updated by the
                                  user.</small
                                >
                              </div>
                              <div class="form-check mb-2">
                                <input
                                  v-model="
                                    IdentityManagementPayload.user
                                      .isUserNameUpdateEnabled
                                  "
                                  class="form-check-input"
                                  formcontrolname="isUserNameUpdateEnabled"
                                  type="checkbox"
                                /><label class="form-check-label"
                                  >Allow users to change their usernames</label
                                >
                                &nbsp;
                                <small class="form-text text-muted"
                                  >Whether the username can be updated by the
                                  user.</small
                                >
                              </div>
                            </div>
                            <hr class="my-3" />
                            <div>
                              <button
                                v-if="
                                  !requiredLengthError &&
                                  !requiredUniqueCharsError &&
                                  !lockoutDurationError
                                "
                                class="btn btn-md btn-outline-theme float-end"
                                type="button"
                                v-on:click="
                                  this.ActionsApiHandler(
                                    'updateIdentityManagementSetting'
                                  )
                                "
                              >
                                <i class="me-1 fa fa-save"></i> Save
                              </button>
                              <button
                                v-if="
                                  requiredLengthError ||
                                  requiredUniqueCharsError ||
                                  lockoutDurationError
                                "
                                class="btn btn-md btn-outline-theme float-end"
                                style="pointer-events: none"
                                type="button"
                              >
                                <i class="me-1 fa fa-save"></i> Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Account -->
            <div v-if="ActiveSettingTab === 'Account'" class="col-12 col-md-9">
              <div class="tab-content">
                <div class="tab-pane fade show active">
                  <h2>Account</h2>
                  <hr class="my-2" />
                  <div id="AccountSettingsForm" class="row">
                    <div class="col-md-12">
                      <!-- Account tabs -->
                      <ul class="nav-tabs nav" role="tablist">
                        <li
                          class="nav-item"
                          v-on:click="
                            this.ActionsApiHandler('getAccountGeneralData')
                          "
                        >
                          <a
                            :class="
                              ActiveSettingAccountTab === 'General'
                                ? 'nav-link active'
                                : 'nav-link'
                            "
                            aria-disabled="false"
                            aria-selected="true"
                            role="tab"
                            >General</a
                          >
                        </li>
                        <li
                          class="nav-item"
                          v-on:click="
                            this.ActionsApiHandler('getAccountTwoFactor')
                          "
                        >
                          <a
                            :class="
                              ActiveSettingAccountTab === 'Twofactor'
                                ? 'nav-link active'
                                : 'nav-link'
                            "
                            aria-disabled="false"
                            aria-selected="false"
                            role="tab"
                            >Two factor</a
                          >
                        </li>
                        <li
                          class="nav-item"
                          v-on:click="
                            this.ActionsApiHandler('getAccountCaptcha')
                          "
                        >
                          <a
                            :class="
                              ActiveSettingAccountTab === 'Captcha'
                                ? 'nav-link active'
                                : 'nav-link'
                            "
                            aria-disabled="false"
                            aria-selected="false"
                            role="tab"
                          >
                            Captcha
                          </a>
                        </li>
                      </ul>
                      <!-- Account General Tab -->
                      <div
                        v-if="ActiveSettingAccountTab === 'General'"
                        class="tab-content mt-4"
                      >
                        <div class="tab-pane fade show active">
                          <div class="py-2">
                            <h4>General</h4>
                            <div class="form-check mb-2">
                              <input
                                v-model="
                                  accountGeneralPayload.isSelfRegistrationEnabled
                                "
                                class="form-check-input ng-pristine"
                                type="checkbox"
                              /><label class="form-check-label"
                                >Enable self registration</label
                              >
                            </div>
                            <div class="form-check mb-2">
                              <input
                                v-model="accountGeneralPayload.enableLocalLogin"
                                class="form-check-input"
                                type="checkbox"
                              /><label class="form-check-label"
                                >Authenticate with a local account</label
                              >
                            </div>
                          </div>
                          <hr class="my-3" />
                          <div>
                            <button
                              class="btn btn-md btn-outline-theme float-end"
                              type="button"
                              v-on:click="
                                this.ActionsApiHandler(
                                  'updateSettingAccountGeneral'
                                )
                              "
                            >
                              <i class="me-1 fa fa-save"></i>Save
                            </button>
                          </div>
                        </div>
                      </div>
                      <!-- Account Two Factor Tab-->
                      <div
                        v-if="ActiveSettingAccountTab === 'Twofactor'"
                        class="tab-content mt-4"
                      >
                        <div class="tab-pane fade active show">
                          <div>
                            <h4>Two Factor Authentication</h4>
                            <div>
                              <div class="mb-3">
                                <label
                                  class="form-label"
                                  for="AccountTwoFactorSettings_TwoFactorBehaviour"
                                  >Two Factor Behaviour</label
                                ><select
                                  v-model="
                                    accountTwoFactorPayload.twoFactorBehaviour
                                  "
                                  class="form-select form-control"
                                >
                                  <option value="0">Optional</option>
                                  <option value="1">Disabled</option>
                                  <option value="2">Forced</option>
                                </select>
                              </div>
                              <div class="form-check mb-2">
                                <input
                                  v-model="
                                    accountTwoFactorPayload.usersCanChange
                                  "
                                  checked="checked"
                                  class="form-check-input"
                                  type="checkbox"
                                /><label class="form-check-label"
                                  >Allow users to change their Two
                                  Factor.</label
                                >
                              </div>
                              <div class="form-check mb-2">
                                <input
                                  v-model="
                                    accountTwoFactorPayload.isRememberBrowserEnabled
                                  "
                                  checked="checked"
                                  class="form-check-input"
                                  type="checkbox"
                                /><label class="form-check-label"
                                  >Remember this browser</label
                                >
                              </div>
                            </div>
                            <hr class="my-3" />
                            <div>
                              <button
                                class="btn btn-md btn-outline-theme float-end"
                                type="button"
                                v-on:click="
                                  this.ActionsApiHandler(
                                    'updateSettingAccountTwoFactor'
                                  )
                                "
                              >
                                <i class="me-1 fa fa-save"></i>Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- Account Captcha Tab -->
                      <div
                        v-if="ActiveSettingAccountTab === 'Captcha'"
                        class="tab-content mt-4"
                      >
                        <div class="tab-pane fade active show">
                          <div>
                            <h4>Captcha</h4>
                            <form>
                              <div class="form-check mb-2">
                                <input
                                  v-model="
                                    accountCaptchaPayload.useCaptchaOnLogin
                                  "
                                  class="form-check-input ng-pristine ng-valid ng-touched"
                                  formcontrolname="useCaptchaOnLogin"
                                  type="checkbox"
                                /><label class="form-check-label"
                                  >Use security image question (captcha) on
                                  login.</label
                                >
                              </div>
                              <div class="form-check mb-2">
                                <input
                                  v-model="
                                    accountCaptchaPayload.useCaptchaOnRegistration
                                  "
                                  class="form-check-input"
                                  formcontrolname="useCaptchaOnRegistration"
                                  type="checkbox"
                                /><label class="form-check-label"
                                  >Use security image question (captcha) on
                                  registration.</label
                                >
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Verify base url</label
                                ><input
                                  v-model="accountCaptchaPayload.verifyBaseUrl"
                                  class="form-control"
                                  formcontrolname="verifyBaseUrl"
                                  type="text"
                                />
                              </div>
                              <p
                                v-if="verifyBaseUrlError"
                                class="error"
                                style="color: #f19f9f"
                              >
                                {{ verifyBaseUrlError }}
                              </p>
                              <div class="mb-3">
                                <label class="form-label">Version</label
                                ><select
                                  v-model="accountCaptchaPayload.version"
                                  class="form-control"
                                  formcontrolname="version"
                                >
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                </select>
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Site key</label
                                ><input
                                  v-model="accountCaptchaPayload.siteKey"
                                  class="form-control"
                                  formcontrolname="siteKey"
                                  type="text"
                                /><small class="form-text text-muted"
                                  >Leave as empty to use the defaults</small
                                >
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Site secret</label>
                                <input
                                  v-model="accountCaptchaPayload.siteSecret"
                                  class="form-control"
                                  formcontrolname="siteSecret"
                                  type="text"
                                /><small class="form-text text-muted"
                                  >Leave as empty to use the defaults</small
                                >
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Score</label
                                ><input
                                  v-model="accountCaptchaPayload.score"
                                  class="form-control"
                                  formcontrolname="score"
                                  max="1"
                                  min="0"
                                  type="number"
                                />
                              </div>
                              <p
                                v-if="scoreError"
                                class="error"
                                style="color: #f19f9f"
                              >
                                {{ scoreError }}
                              </p>
                            </form>
                            <hr class="my-3" />
                            <div>
                              <button
                                id=""
                                class="btn btn-md btn-outline-theme float-end"
                                type="button"
                                v-on:click="
                                  this.ActionsApiHandler(
                                    'updateSettingAccountCaptcha'
                                  )
                                "
                              >
                                <i class="me-1 fa fa-save"></i>Save
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
            <!-- Feature management -->
            <div
              v-if="ActiveSettingTab === 'FeatureManagement'"
              class="col-12 col-md-9"
            >
              <div class="tab-content">
                <div class="tab-pane fade show active">
                  <p class="text-wrap">
                    You can manage the host side features by clicking the
                    following button.
                  </p>
                  <button
                    class="btn btn-md btn-outline-theme float-end"
                    type="button"
                    v-on:click="openActionsModals('', 'FeatureManagementModal')"
                  >
                    <i class="fa fa-cog"></i> Manage Host features
                  </button>
                </div>
              </div>
            </div>
          </div>
        </card-body>
      </card>
    </div>

    <!-- feature modal -->
    <div id="FeatureManagementModal" class="modal fade">
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
                        v-on:click="
                          this.ActionsApiHandler('selectFeatures', feature)
                        "
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
                              class="ng-star-inserted"
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
                            :class="
                              feature.valueType.validator.name === 'NUMERIC'
                                ? 'form-control ng-valid ng-dirty ng-touched'
                                : feature.valueType.validator.name === 'STRING'
                                ? 'form-control'
                                : ''
                            "
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
                          /><label class="form-check-label">{{
                            feature.displayName
                          }}</label>
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
              class="btn btn-md btn-outline-theme float-end"
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
            <i class="me-1 fa fa-check"></i> Saved Successfully.
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
              v-on:click="this.ActionsApiHandler('resetDefaultFeature')"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  </perfect-scrollbar>
</template>
