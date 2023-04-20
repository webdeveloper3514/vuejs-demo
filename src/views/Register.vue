<template>
  <div class="register">
    <div class="register-content">
      <div class="logo_box d-flex justify-content-center mb-3">
        <a class="mx-auto h-12 w-auto" href="/">
          <img
            alt="Logo"
            class="mx-auto h-9 w-auto"
            src="/src/assets/main_logo.png"
          />
        </a>
      </div>
      <h2 class="text-center">Try Manticore for 7 days for only $7</h2>
      <div class="text-white text-center mb-4">Credit card required</div>

      <div class="nav-wizards-container">
        <nav class="nav nav-wizards-2 mb-4">
          <div class="nav-item col">
            <a :class="step >= 1 ? 'active' : ''" class="nav-link" href="#">
              <div class="nav-text">Email</div>
            </a>
          </div>

          <div class="nav-item col">
            <a :class="step >= 2 ? 'active' : ''" class="nav-link" href="#">
              <div class="nav-text">Basic</div>
            </a>
          </div>

          <div class="nav-item col">
            <a :class="step >= 3 ? 'active' : ''" class="nav-link" href="#">
              <div class="nav-text">Company</div>
            </a>
          </div>

          <div class="nav-item col">
            <a :class="step >= 4 ? 'active' : ''" class="nav-link" href="#">
              <div class="nav-text">Confirmation</div>
            </a>
          </div>
        </nav>
      </div>

      <card v-if="step === 1">
        <card-body>
          <h4>Enter your business email address</h4>
          <div class="text-white mb-4">
            Let’s get the basics. Enter your info below
          </div>
          <!--          <div class="alert alert-danger" v-if="error_message != null">
            {{ error_message }}
          </div>
          <label class="form-label" for="registrationForm.email"
            >Business Email</label
          >
          <input
            class="form-control"
            id="registrationForm.email"
            placeholder="Email"
            v-model="registrationForm.email"
          />-->
          <form class="was-validated" novalidate>
            <div class="col-md-12 mb-3">
              <label class="form-label" for="validationInvalidInputGroup"
                >Business Email</label
              >
              <div class="input-group has-validation">
                <span class="input-group-text">@</span>
                <input
                  id="validationInvalidInputGroup"
                  class="form-control is-invalid"
                  required
                  type="text"
                />
              </div>
            </div>
          </form>

          <el-form-item label="" prop="acceptTermsAndConditions">
            <div class="form-check form-switch">
              <input
                id="demo2"
                v-model="registrationForm.acceptTermsAndConditions"
                class="form-check-input"
                type="checkbox"
                value=""
              />
              <label class="form-check-label ps-2 text-white" for="demo2"
                >I agree to receive marketing communications and promotional
                offers from Manticore.</label
              >
            </div>
          </el-form-item>
          <div class="mb-2 term-condition-wrap">
            <div class="">
              <label class="form-check-label text-white">
                By clicking Get started, you agree to Manticore’s
                <a href="javascript:void(0)">Privacy Notice</a> and
                <a href="javascript:void(0)">Terms & Conditions.</a>
              </label>
            </div>
          </div>
          <el-form-item label="">
            <div
              v-if="success_message != null"
              class="alert alert-success w-100"
            >
              {{ success_message }}
            </div>
            <div v-else class="mt-2 form-btn w-100">
              <button
                class="btn btn-outline-theme btn-lg d-block w-100 fw-500 mb-3"
                type="button"
                @click="submitForm('step1RulesForm')"
              >
                Get started
              </button>
              <div class="text-white text-center mt-2">Region: Singapore</div>
            </div>
          </el-form-item>
        </card-body>
      </card>
      <card v-if="step === 2">
        <card-body>
          <h4>Let’s start</h4>
          <div class="text-white mb-4">
            Let’s get the basics. Enter your info below
          </div>
          <div v-if="error_message != null" class="alert alert-danger">
            {{ error_message }}
          </div>
          <el-form
            ref="step2RulesForm"
            :model="registrationForm"
            :rules="step2rules"
            label-position="top"
          >
            <div class="d-flex row">
              <div class="col-6">
                <el-form-item label="First name" prop="firstName">
                  <el-input
                    v-model="registrationForm.firstName"
                    placeholder="First Name"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col-6">
                <el-form-item label="Last name" prop="lastName">
                  <el-input
                    v-model="registrationForm.lastName"
                    placeholder="Last Name"
                  ></el-input>
                </el-form-item>
              </div>
            </div>

            <el-form-item label="Phone Number" prop="phone">
              <vue-tel-input
                :value="registrationForm.phone"
                clas="w-100"
                mode="international"
                @input="onInput"
              ></vue-tel-input>
            </el-form-item>

            <el-form-item label="">
              <div
                v-if="success_message != null"
                class="alert alert-success w-100"
              >
                {{ success_message }}
              </div>

              <div v-else class="mb-4 mt-2 form-btn w-100 d-flex gap-2">
                <button
                  v-loading="loginLoading"
                  :loading="loginLoading"
                  class="btn btn-theme btn-lg d-block w-100"
                  type="button"
                  @click="this.step = 1"
                >
                  Back
                </button>
                <button
                  v-loading="loginLoading"
                  :loading="loginLoading"
                  class="btn btn-theme btn-lg d-block w-100"
                  type="button"
                  @click="submitForm('step2RulesForm')"
                >
                  Next
                </button>
              </div>
            </el-form-item>
          </el-form>
        </card-body>
      </card>
      <card v-if="step === 3">
        <card-body>
          <h4>Organization Information</h4>
          <div class="text-white mb-4">This will be your organization name</div>
          <div v-if="error_message != null" class="alert alert-danger">
            {{ error_message }}
          </div>
          <el-form
            ref="step3RulesForm"
            :model="registrationForm"
            :rules="step3rules"
            label-position="top"
          >
            <el-form-item label="Organization name" prop="name">
              <el-input
                v-model="registrationForm.name"
                placeholder="Organization Name"
              ></el-input>
            </el-form-item>

            <el-form-item label="">
              <div
                v-if="success_message != null"
                class="alert alert-success w-100"
              >
                {{ success_message }}
              </div>
              <div v-else class="mb-4 mt-2 form-btn w-100 gap-2 d-flex">
                <button
                  v-loading="loginLoading"
                  :loading="loginLoading"
                  class="btn btn-theme btn-lg d-block w-100"
                  type="button"
                  @click="this.step = 2"
                >
                  Back
                </button>
                <button
                  v-loading="loginLoading"
                  :loading="loginLoading"
                  class="btn btn-theme btn-lg d-block w-100"
                  type="button"
                  @click="submitForm('step3RulesForm')"
                >
                  Next
                </button>
              </div>
            </el-form-item>
          </el-form>
        </card-body>
      </card>
      <card v-if="step === 4">
        <card-body>
          <h4 class="mb-4">Check your email</h4>
          <div class="text-white mb-1">We sent a confirmation link to:</div>
          <h6 class="text-white mb-4 fs-4 fw-normal">
            {{ registrationForm.email }}
          </h6>
          <div class="text-white mb-5 fs-4">
            Check your inbox and follow the instructions to get started.
          </div>
          <div class="mb-4">
            <a href="/register">Use a different email address</a>
          </div>
          <el-form
            ref="step4RulesForm"
            :model="registrationForm"
            label-position="top"
          >
            <el-form-item label="">
              <div
                v-if="success_message != null"
                class="alert alert-success w-100"
              >
                {{ success_message }}
              </div>
              <div v-else class="mb-4 mt-2 form-btn w-100 d-flex gap-2">
                <button
                  v-loading="loginLoading"
                  :loading="loginLoading"
                  class="btn btn-theme btn-lg d-block w-100"
                  type="button"
                  @click="this.step = 3"
                >
                  Back
                </button>
                <button
                  class="btn btn-theme btn-lg d-block w-100 d-flex justify-content-center align-items-center gap-3"
                  type="button"
                  @click="submitForm('step4RulesForm')"
                >
                  <div v-if="loginLoading" class="spinner-border"></div>
                  Submit
                </button>
              </div>
            </el-form-item>
          </el-form>
        </card-body>
      </card>

      <div class="mt-4 text-center">
        <RouterLink class="" to="/">Back to Login</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { VueTelInput } from "vue3-tel-input";
import "vue3-tel-input/dist/vue3-tel-input.css";
import { useAppOptionStore } from "@/stores/app-option";
import { useAppAuth } from "@/stores/app-auth";

const appOption = useAppOptionStore();
const appAuth = useAppAuth();

export default {
  name: "Register",
  components: {
    VueTelInput,
  },
  data() {
    const phoneCustomValidate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please provide value"));
      } else {
        if (this.phoneObject?.valid) {
          callback();
        } else {
          callback(new Error("Please enter valid phone number"));
        }
      }
    };

    const acceptTermsAndConditions = (rule, value, callback) => {
      if (value === "" || value === false) {
        callback(new Error("Please select our terms and condition"));
      } else {
        callback();
      }
    };

    return {
      loginLoading: false,
      success_message: null,
      error_message: null,
      step: 1,
      phoneObject: null,
      registrationForm: {
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        phone: "",
        name: "",
        acceptTermsAndConditions: false,
      },
      step1Rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "Please enter email",
            trigger: "change",
          },
        ],
        /*password: [
          {
            required: true,
            message: "Please input your password",
            trigger: "change",
          },
        ],*/
        acceptTermsAndConditions: [
          {
            validator: acceptTermsAndConditions,
            message: "Please select our terms and condition",
            trigger: "change",
          },
        ],
      },
      step2rules: {
        firstName: [
          {
            required: true,
            message: "Please enter first name",
            trigger: "change",
          },
        ],
        lastName: [
          {
            required: true,
            message: "Please enter last name",
            trigger: "change",
          },
        ],
        phone: [{ validator: phoneCustomValidate, trigger: "change" }],
      },
      step3rules: {
        name: [
          {
            required: true,
            message: "Please enter organization name",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {},
  beforeUnmount() {
    appOption.appSidebarHide = true;
    appOption.appHeaderHide = true;
    appOption.appContentClass = "p-0";
  },
  created() {
    // if (appAuth.$state.userLoggedIn) {
    //   router.push("/app/dashboard");
    // }
  },
  async mounted() {
    appOption.appSidebarHide = true;
    appOption.appHeaderHide = true;
    appOption.appContentClass = "p-0";
  },
  methods: {
    onInput(phone, phoneObject, input) {
      if (phoneObject?.formatted) {
        this.phoneObject = phoneObject;
        this.registrationForm.phone = phoneObject.formatted;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.step === 4) {
            this.loginLoading = true;
            console.log(this.registrationForm);
            const formData = {
              ...this.registrationForm,
              adminEmailAddress: this.registrationForm.email,
              adminPassword: this.registrationForm.password,
              phoneNumber: this.registrationForm.phone,
            };
            delete formData.email;
            delete formData.password;
            delete formData.phone;
            const result = await appAuth.doRegister(formData);
            /*if (result?.id) {
              const res = await appAuth.sendEmailConfirmationToken(
                result.id,
                this.registrationForm.email
              );
              console.log("view register", res);
            }*/
          } else {
            if (formName === "step1RulesForm") {
              this.step = 2;
            } else if (formName === "step2RulesForm") {
              this.step = 3;
            } else {
              this.step = 4;
            }
          }
          this.loginLoading = false;
        } else {
          this.loginLoading = false;
          return false;
        }
      });
    },
  },
};
</script>

<style>
.vti__input {
  background: 0 0;
  color: rgba(255, 255, 255, 0.75) !important;
  height: 40px;
}

.vue-tel-input {
  width: 100%;
  border: 1px solid #636c74;
}

.vti__dropdown-list {
  background-color: #253541;
  border: 1px solid #636c75;
}

.vti__dropdown-item.highlighted {
  background-color: #69767f;
}

.vti__dropdown.open,
.vti__dropdown:hover {
  background-color: #213b44;
}
</style>
