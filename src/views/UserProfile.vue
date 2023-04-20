<template>
  <div class="tab-list py-4">
    <div class="tab-list_item px-4 mb-5">
      <div class="mb-3 profile-title">
        <p class="h5 mb-1">
          <i class="fas fa-user fa-fw text-theme"></i> Profile
        </p>
        <p class="mb-0">
          <small>Change your user profile</small>
        </p>
      </div>

      <card>
        <card-body class="p-0 pt-3">
          <div class="profile-data">
            <div class="px-3">
              <div v-if="error_message != null" class="alert alert-danger">
                {{ error_message }}
              </div>
              <div v-if="success_message != null" class="alert alert-success">
                {{ success_message }}
              </div>
              <el-form
                ref="ruleForm"
                :model="profileForm"
                :rules="rules"
                label-position="top"
              >
                <el-form-item label="Email Address" prop="email">
                  <el-input v-model="profileForm.email" readonly></el-input>
                </el-form-item>
                <div class="d-flex row">
                  <div class="col-xl-6 col-md-12 col-12">
                    <el-form-item label="First name" prop="firstName">
                      <el-input v-model="profileForm.firstName"></el-input>
                    </el-form-item>
                  </div>
                  <div class="col-xl-6 col-md-12 col-12">
                    <el-form-item label="Last name" prop="lastName">
                      <el-input v-model="profileForm.lastName"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="d-flex row">
                  <div class="col-xl-6 col-md-12 col-12">
                    <el-form-item label="Phone">
                      <el-input v-model="profileForm.phone"></el-input>
                    </el-form-item>
                  </div>
                  <div class="col-xl-6 col-md-12 col-12">
                    <el-form-item label="Profile Picture">
                      <div class="d-flex w-100">
                        <div class="flex-fill d-flex align-items-center">
                          <div class="form-group w-100">
                            <input
                              id="exampleFormControlFile1"
                              :name="newUserProfilePic"
                              accept="image/*"
                              class="form-control form-control-lg"
                              type="file"
                              @change="updateAvatar($event)"
                            />
                          </div>
                          <!--                                                    <div class="detete-profile-img">-->
                          <!--                                                        <a class="ms-3 text-body" href="#"-->
                          <!--                                                        >Delete</a-->
                          <!--                                                        >-->
                          <!--                                                    </div>-->
                          <div
                            :class="newUserProfilePic != '' ? 'ms-2' : ''"
                            class="h-40px d-flex"
                          >
                            <img
                              :src="newUserProfilePic"
                              class="ms-100 mh-100 rounded-3"
                            />
                          </div>
                        </div>
                      </div>
                    </el-form-item>
                  </div>
                </div>

                <el-form-item>
                  <div
                    class="form-btn text-center d-sm-flex justify-content-end w-100 p-3 border-top-trans"
                  >
                    <button
                      v-loading="loginLoading"
                      :loading="loginLoading"
                      class="btn btn-outline-theme btn-sm"
                      type="button"
                      @click="submitForm('ruleForm')"
                    >
                      Save
                    </button>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </card-body>
      </card>
    </div>

    <div class="tab-list_item px-4 mb-5">
      <div class="mb-3 profile-title">
        <p class="h5 mb-1"><i class="fas fa-lock text-theme"></i> Security</p>
      </div>
      <card>
        <card-body class="p-0 pt-3">
          <div class="profile-data">
            <div class="px-3">
              <el-form
                ref="changePasswordForm"
                :model="changePasswordForm"
                :rules="changePasswordFormRules"
                label-position="top"
              >
                <el-form-item label="Current Password" prop="currentPassword">
                  <el-input
                    v-model="changePasswordForm.currentPassword"
                    type="password"
                  ></el-input>
                </el-form-item>
                <div class="d-flex row">
                  <div class="col-xl-6 col-md-12 col-12">
                    <el-form-item label="New Password" prop="newPassword">
                      <el-input
                        v-model="changePasswordForm.newPassword"
                        type="password"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="col-xl-6 col-md-12 col-12">
                    <el-form-item
                      label="Confirm Password"
                      prop="confirmPassword"
                    >
                      <el-input
                        v-model="changePasswordForm.confirmPassword"
                        type="password"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
                <el-form-item>
                  <div
                    class="form-btn text-center d-sm-flex justify-content-end w-100 p-3 border-top-trans"
                  >
                    <button
                      v-loading="changePasswordFormLoading"
                      :loading="changePasswordFormLoading"
                      class="btn btn-outline-theme btn-sm"
                      type="button"
                      @click="submitChangePasswordForm('changePasswordForm')"
                    >
                      Save
                    </button>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </card-body>
      </card>
    </div>

    <div class="tab-list_item px-4">
      <div class="mb-3 profile-title">
        <p class="h5 mb-1">
          <i class="fas fa-exclamation-triangle text-theme"></i>
          Danger zone
        </p>
        <p class="mb-0"><small>Be careful</small></p>
      </div>
      <card>
        <card-body class="p-0 pt-3">
          <div class="profile-data mb-3">
            <div class="px-3">
              <h4>Delete your account</h4>
              <p>
                Once you delete your account, you will lose all data associated
                with it.
              </p>

              <button
                class="btn btn-danger btn-sm"
                type="button"
                @click="openDeleteAccountForm"
              >
                Delete Account
              </button>
            </div>
          </div>
        </card-body>
      </card>
    </div>
  </div>

  <div id="deleteAccount" class="modal fade" data-backdrop="false">
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
          <p>We will delete your account and all your organizations</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-default" data-bs-dismiss="modal" type="button">
            Close
          </button>
          <button
            v-loading="deleteAccountLoading"
            :loading="deleteAccountLoading"
            class="btn btn-outline-theme"
            type="button"
            v-on:click="deleteAccount"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAppAuth } from "../stores/app-auth";
import router from "../router";
import { Modal, Toast } from "bootstrap";
import jQuery from "jquery";

const appAuth = useAppAuth();

export default {
  data() {
    return {
      loginLoading: false,
      profileUploadingLoading: false,
      changePasswordFormLoading: false,
      deleteAccountLoading: false,
      success_message: null,
      error_message: null,
      newUserProfilePic: "",
      myModal: null,
      profileForm: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
      changePasswordForm: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "Please enter valid email address",
            trigger: "blur",
          },
        ],
        firstName: [
          {
            required: true,
            message: "Please enter your first name",
            trigger: "change",
          },
        ],
        lastName: [
          {
            required: true,
            message: "Please enter your last name",
            trigger: "change",
          },
        ],
      },
      changePasswordFormRules: {
        currentPassword: [
          {
            required: true,
            message: "Please enter current password",
            trigger: "blur",
          },
        ],
        newPassword: [
          {
            required: true,
            message: "Please enter new password",
            trigger: "change",
          },
        ],
        confirmPassword: [
          {
            required: true,
            message: "Please enter confirm password",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    const loggedInUser = appAuth.$state.userInfo;
    this.profileForm.email = loggedInUser.email;
    this.profileForm.firstName = loggedInUser.firstName;
    this.profileForm.lastName = loggedInUser.lastName;
    this.profileForm.phone = loggedInUser.phone;
  },
  methods: {
    openDeleteAccountForm() {
      this.myModal = new Modal(document.getElementById("deleteAccount"), {
        keyboard: false,
      });
      this.myModal.show();

      jQuery("#deleteAccount").appendTo(jQuery("body"));
    },
    deleteAccount: async function (event) {
      event.preventDefault();
      try {
        this.deleteAccountLoading = true;
        await Member.deleteUser().then(
          (response) => {
            this.deleteAccountLoading = false;
            if (response.status === 200) {
              this.myModal.hide();
              appAuth.doLogout();
              var toast = new Toast(document.getElementById("toast-1"));
              document.getElementById("toast-body").innerHTML =
                "Account Deleted Successfully";
              toast.show();
              setTimeout(() => {
                router.push("/");
                // window.location.replace("/");
              }, 1000);
            } else {
              this.myModal.hide();
              var toast = new Toast(document.getElementById("toast-1"));
              document.getElementById("toast-body").innerHTML =
                "Something is wrong!";
              toast.show();
              return true;
            }
          },
          (error) => {
            this.deleteAccountLoading = false;
            const toast = new Toast(document.getElementById("toast-1"));
            document.getElementById("toast-body").innerHTML =
              "Something is wrong!";
            toast.show();
            console.log("error", error);

            this.myModal.hide();
          }
        );
      } catch (err) {
        console.log("error", err);
      }
    },
    updateAvatar: async function (event) {
      // event.preventDefault();
      try {
        this.profileUploadingLoading = true;
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        this.newUserProfilePic = url;
        const reader = new FileReader();
        reader.onloadend = async function () {
          // console.log("RESULT", reader.result);
          await Member.updateUserAvatar(reader.result).then(
            (response) => {
              appAuth.updateUserStateAvatar(response.data.avatar);

              this.profileUploadingLoading = false;

              const toast = new Toast(document.getElementById("toast-1"));
              document.getElementById("toast-body").innerHTML =
                "Profile Picture Updated Successfully!";
              toast.show();
              return true;
            },
            (error) => {
              this.profileUploadingLoading = false;
              console.log("error", error);
              const toast = new Toast(document.getElementById("toast-1"));
              document.getElementById("toast-body").innerHTML =
                error.response.data;
              toast.show();
            }
          );
        };
        reader.readAsDataURL(file);
      } catch (err) {
        console.log("error", err);
      }
    },
    submitChangePasswordForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changePasswordFormLoading = true;
          try {
            if (
              this.changePasswordForm.newPassword !==
              this.changePasswordForm.confirmPassword
            ) {
              this.changePasswordForm.newPassword = "";
              this.changePasswordForm.confirmPassword = "";

              const toast = new Toast(document.getElementById("toast-1"));
              document.getElementById("toast-body").innerHTML =
                "Password and confirm password does not match";
              toast.show();
              return;
            }
            Member.updatePassword(
              this.changePasswordForm.currentPassword,
              this.changePasswordForm.newPassword,
              this.changePasswordForm.confirmPassword
            ).then(
              (response) => {
                this.changePasswordFormLoading = false;
                if (response.status === 200) {
                  this.$refs[formName].resetFields();
                  var toast = new Toast(document.getElementById("toast-1"));
                  document.getElementById("toast-body").innerHTML =
                    "Password Updated Successfully!";
                  toast.show();
                  return true;
                } else {
                  var toast = new Toast(document.getElementById("toast-1"));
                  if (response.response.data == "api.errors.invalidPassword") {
                    document.getElementById("toast-body").innerHTML =
                      "Invalid current password!";
                  } else {
                    document.getElementById("toast-body").innerHTML =
                      "Something is wrong!!!";
                  }
                  toast.show();
                  return true;
                }
              },
              (response) => {
                this.changePasswordFormLoading = false;
                const toast = new Toast(document.getElementById("toast-1"));
                if (response.response.data == "api.errors.invalidPassword") {
                  document.getElementById("toast-body").innerHTML =
                    "Invalid current password!";
                } else {
                  document.getElementById("toast-body").innerHTML =
                    "Something is wrong!!!";
                }
                toast.show();
                return true;
                console.log("error", error);
              }
            );
          } catch (err) {
            console.log("error", err);
          }
        } else {
          return false;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const toast = new Toast(document.getElementById("toast-1"));
          try {
            this.profileLoading = true;

            Member.updateUser(
              appAuth.$state.userInfo.id,
              this.profileForm.firstName,
              this.profileForm.lastName,
              this.profileForm.phone
            )
              .then((res) => {
                this.profileLoading = false;
                if (res.data) {
                  appAuth.updateUserStateInformation(
                    this.profileForm.firstName,
                    this.profileForm.lastName,
                    this.profileForm.phone
                  );
                  document.getElementById("toast-body").innerHTML =
                    "Account Updated Successfully!";
                  toast.show();
                  return true;
                } else {
                  if (res.response.data == "api.errors.userNotRegistered")
                    var error_message = "User Not Registered";
                  else if (res.response.data == "api.errors.invalidPassword")
                    var error_message = "Invalid Password";
                  else var error_message = res.response.data;

                  document.getElementById("toast-body").innerHTML =
                    error_message;
                  toast.show();
                }
              })
              .catch((res) => {
                console.log("error", res);
                this.profileLoading = false;
                if (res.response.data == "api.errors.userNotRegistered")
                  var error_message = "User Not Registered";
                else if (res.response.data == "api.errors.invalidPassword")
                  var error_message = "Invalid Password";
                else var error_message = res.response.data;

                document.getElementById("toast-body").innerHTML = error_message;
                toast.show();
              });
          } catch (err) {
            console.log("error", err);
            this.loginLoading = false;
            this.error_message = "Something went wrong!";
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
