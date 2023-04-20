<template>
  <div v-if="step == 1" class="sec-top-bar">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">HOME</a></li>
      <li class="breadcrumb-item active">PRODUCT SELECTION</li>
    </ul>
    <h1 class="page-header">Product Selection</h1>
    <hr class="mb-4 mt-n1" />
    <card class="p-4 bg-opacity-5 bg-default">
      <card-body>
        <div class="d-flex">
          <img alt="vector" class="w-auto me-3" src="/src/assets/vector.png" />
          <h2>Manticore Command Centre</h2>
        </div>
        <div class="fs-5 text-white mt-3 mb-4 fst-normal">
          Manticore C2 is an advanced command center with special <br />
          capabilities as listed below:
        </div>
        <ul class="text-white">
          <li>Machine learning engine for the Enterprise Edition</li>
          <li>
            Subscription-based, fully managed sophisticated attack simulation
            infrastructure in a matter of seconds with no Pain
          </li>
          <li>Team collaboration features (aka game-style hacking)</li>
          <li>Provides automated and intelligence-based reporting</li>
        </ul>
        <button
          class="btn btn-outline-theme btn-lg float-end d-inline-block loading"
          style="width: 250px"
          @click="step = 2"
        >
          Start 7 days free trial
        </button>
      </card-body>
    </card>
  </div>

  <div v-if="step === 2" class="sec-top-bar">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">HOME</a></li>
      <li class="breadcrumb-item active">SUBSCRIPTION</li>
    </ul>
    <h1 class="page-header">Subscription</h1>
    <hr class="mb-4 mt-n1" />
    <div class="row">
      <!-- BEGIN col-9 -->
      <div class="col-xl-9">
        <card class="p-3">
          <card-body>
            <p class="fs-4 text-white mb-3">Usage and Company Info</p>
            <el-form ref="ruleForm" :model="companyForm" label-position="top">
              <el-form-item label="Company Name*">
                <el-input v-model="companyForm.name"></el-input>
              </el-form-item>
              <el-form-item class="mb-4" label="Brief description of the use">
                <el-input
                  v-model="companyForm.description"
                  rows="8"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </el-form>
            <button
              class="btn btn-outline-theme btn-sm float-end d-inline-block loading"
              style="width: 120px"
              @click="step = 3"
            >
              Next
            </button>
          </card-body>
        </card>
      </div>
      <div class="col-xl-3">
        <nav
          id="sidebar-bootstrap"
          class="navbar navbar-sticky d-none d-xl-block"
        >
          <nav class="nav">
            <nav-scroll-to class="nav-link active"
              >Usage and Company Info
            </nav-scroll-to>
            <nav-scroll-to class="nav-link"
              >Operations and addons
            </nav-scroll-to>
            <nav-scroll-to class="nav-link">Billing contact</nav-scroll-to>
          </nav>
        </nav>
      </div>
    </div>
  </div>
  <div v-if="step === 3" class="sec-top-bar">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">HOME</a></li>
      <li class="breadcrumb-item active">SUBSCRIPTION</li>
    </ul>
    <h1 class="page-header">Subscription</h1>
    <hr class="mb-4 mt-n1" />
    <div class="row">
      <!-- BEGIN col-9 -->

      <div class="col-xl-9">
        <card class="bg-white bg-opacity-5">
          <card-body>
            <div class="row">
              <div class="col-xl-3">
                <h4 class="mb-5">Select your plan</h4>
                <div class="form-check">
                  <input
                    id="defaultRadio1"
                    checked
                    class="form-check-input"
                    name="billing_type"
                    type="radio"
                    value="yearly"
                  />
                  <label class="form-check-label" for="defaultRadio1"
                    >Yearly billing (Save 17%)</label
                  >
                </div>
                <div class="form-check">
                  <input
                    id="defaultRadio2"
                    class="form-check-input"
                    name="billing_type"
                    type="radio"
                    value="monthly"
                  />
                  <label class="form-check-label" for="defaultRadio2"
                    >Monthly billing</label
                  >
                </div>
              </div>
              <div class="col-xl-9">
                <card class="mb-4">
                  <card-header
                    class="d-flex align-items-center bg-white bg-opacity-15 fw-400"
                  >
                    <br />
                  </card-header>
                  <card-body class="p-0">
                    <table class="table m-0">
                      <thead>
                        <tr>
                          <th class="p-3" scope="col">
                            <h5>Features</h5>
                          </th>
                          <th class="p-3" scope="col">
                            <h5>Basic</h5>
                          </th>
                          <th class="p-3" scope="col">
                            <h5>Professional</h5>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="p-3" colspan="3">
                            <h6>
                              <a class="text-decoration-none" href="#"
                                >Cloud Subscription Quota</a
                              >
                            </h6>
                          </td>
                        </tr>
                        <tr class="border-0 border-top-0 border-bottom-0">
                          <td class="p-3 border-0 border-top-0 border-bottom-0">
                            Dashboard
                          </td>
                          <td class="p-3 border-0 border-top-0 border-bottom-0">
                            No
                          </td>
                          <td class="p-3 border-0 border-top-0 border-bottom-0">
                            Yes
                          </td>
                        </tr>
                        <tr class="border-0 border-top-0 border-bottom-0">
                          <td class="p-3 border-0 border-top-0 border-bottom-0">
                            -
                          </td>
                          <td class="p-3 border-0 border-top-0 border-bottom-0">
                            -
                          </td>
                          <td class="p-3 border-0 border-top-0 border-bottom-0">
                            -
                          </td>
                        </tr>
                        <tr class="border-0 border-top-0 border-bottom-0">
                          <td class="p-3 border-0 border-top-0 border-bottom-0">
                            -
                          </td>
                          <td class="p-3 border-0 border-top-0 border-bottom-0">
                            -
                          </td>
                          <td class="p-3 border-0 border-top-0 border-bottom-0">
                            -
                          </td>
                        </tr>
                        <tr class="border-0 border-top-0 border-bottom-0">
                          <td class="p-3 border-0 border-top-0 border-bottom-0">
                            -
                          </td>
                          <td class="p-3 border-0 border-top-0 border-bottom-0">
                            -
                          </td>
                          <td class="p-3 border-0 border-top-0 border-bottom-0">
                            -
                          </td>
                        </tr>
                        <tr class="border-0 border-top-0 border-bottom-0">
                          <td class="p-3 border-0 border-top-0 border-bottom-0">
                            -
                          </td>
                          <td class="p-3 border-0 border-top-0 border-bottom-0">
                            -
                          </td>
                          <td class="p-3 border-0 border-top-0 border-bottom-0">
                            -
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <button class="btn btn-theme" type="button">
                              Selected
                            </button>
                          </td>
                          <td>
                            <button
                              class="btn btn-outline-default"
                              type="button"
                            >
                              Select
                            </button>
                          </td>
                        </tr>
                        <tr class="border-0 border-top-0 border-bottom-0">
                          <td
                            class="p-3 border-0 border-top-0 border-bottom-0"
                            colspan="3"
                          >
                            <h6>
                              <a class="text-decoration-none" href="#"
                                >Customize your plan</a
                              >
                            </h6>
                          </td>
                        </tr>
                        <tr class="border-0 border-top-0 border-bottom-0">
                          <td
                            class="ps-3 border-0 border-top-0 border-bottom-0"
                          >
                            Default Users
                          </td>
                          <td
                            class="p-0 border-0 border-top-0 border-bottom-0"
                            colspan="2"
                          >
                            <button
                              class="btn btn-sm btn-dark"
                              disabled
                              type="button"
                            >
                              <i class="fas fa-minus"></i>
                            </button>
                            &nbsp;&nbsp;1&nbsp;&nbsp;
                            <button class="btn btn-sm btn-dark" type="button">
                              <i class="fas fa-plus"></i>
                            </button>
                          </td>
                        </tr>
                        <tr class="border-top-0">
                          <td class="ps-3 border-top-0">
                            Default Active Operations
                          </td>
                          <td class="p-0 border-top-0" colspan="2">
                            <button
                              class="btn btn-sm btn-dark"
                              disabled
                              type="button"
                            >
                              <i class="fas fa-minus"></i>
                            </button>
                            &nbsp;&nbsp;1&nbsp;&nbsp;
                            <button class="btn btn-sm btn-dark" type="button">
                              <i class="fas fa-plus"></i>
                            </button>
                          </td>
                        </tr>
                        <tr class="">
                          <td
                            class="ps-3 border-0 border-top-0 border-bottom-0"
                          >
                            <h6>
                              <a class="text-decoration-none" href="#">Total</a>
                            </h6>
                          </td>
                          <td
                            class="ps-3 border-0 border-top-0 border-bottom-0"
                          >
                            $199
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </card-body>
                </card>
              </div>
            </div>
            <button
              class="btn btn-outline-theme btn-sm float-end d-inline-block loading"
              style="width: 120px"
              @click="step = 4"
            >
              Next
            </button>
          </card-body>
        </card>
      </div>
      <div class="col-xl-3">
        <nav
          id="sidebar-bootstrap"
          class="navbar navbar-sticky d-none d-xl-block"
        >
          <nav class="nav">
            <nav-scroll-to class="nav-link"
              >Usage and Company Info
            </nav-scroll-to>
            <nav-scroll-to class="nav-link active"
              >Operations and addons
            </nav-scroll-to>
            <nav-scroll-to class="nav-link">Billing contact</nav-scroll-to>
          </nav>
        </nav>
      </div>
    </div>
  </div>
  <div v-if="step === 4" class="sec-top-bar">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">HOME</a></li>
      <li class="breadcrumb-item active">SUBSCRIPTION</li>
    </ul>
    <h1 class="page-header">Subscription</h1>
    <hr class="mb-4 mt-n1" />
    <div class="row">
      <!-- BEGIN col-9 -->
      <div class="col-xl-9">
        <card class="p-3">
          <card-body>
            <div class="row">
              <div class="col-xl-6">
                <p class="fs-4 text-white mb-3">Billing contact</p>
                <el-form
                  ref="contactForm"
                  :model="contactForm"
                  label-position="top"
                >
                  <el-form-item label="Company Name *">
                    <el-input v-model="contactForm.company_name"></el-input>
                  </el-form-item>
                  <el-form-item label="Country *">
                    <el-select
                      v-model="contactForm.country"
                      class="w-100"
                      placeholder="Select Country"
                    >
                      <el-option
                        v-for="item in countryListAllIsoData"
                        :key="item.number"
                        :label="item.name"
                        :value="item.name"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Address Line 1 *">
                    <el-input v-model="contactForm.address_line1"></el-input>
                  </el-form-item>
                  <el-form-item label="Address Line 2 *">
                    <el-input v-model="contactForm.address_line2"></el-input>
                  </el-form-item>
                  <el-form-item label="City *">
                    <el-input v-model="contactForm.city"></el-input>
                  </el-form-item>
                  <el-form-item label="State *">
                    <el-select
                      v-model="contactForm.state"
                      class="w-100"
                      placeholder="Select State"
                    >
                      <el-option label="State 1" value="State 1"></el-option>
                      <el-option label="State 2" value="State 2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Postal Code *">
                    <el-input v-model="contactForm.postal_code"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <button
              class="btn btn-outline-theme btn-sm float-end d-inline-block loading"
              style="width: 120px"
              @click="step = 3"
            >
              Previous
            </button>
            <button
              class="btn btn-outline-theme btn-sm float-end d-inline-block loading"
              style="width: 120px"
            >
              Subscribe
            </button>
          </card-body>
        </card>
      </div>
      <div class="col-xl-3">
        <nav
          id="sidebar-bootstrap"
          class="navbar navbar-sticky d-none d-xl-block"
        >
          <nav class="nav">
            <nav-scroll-to class="nav-link"
              >Usage and Company Info
            </nav-scroll-to>
            <nav-scroll-to class="nav-link"
              >Operations and addons
            </nav-scroll-to>
            <nav-scroll-to class="nav-link active"
              >Billing contact
            </nav-scroll-to>
          </nav>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { useAppAuth } from "@/stores/app-auth";
import { useAppOptionStore } from "@/stores/app-option";
import NavScrollTo from "@/components/app/NavScrollTo.vue";

const appAuth = useAppAuth();

const appOption = useAppOptionStore();

export default {
  name: "Upgrade",
  components: { NavScrollTo },
  data() {
    return {
      User: appAuth.$state.userInfo || {},
      step: 1,
      companyForm: {
        name: "",
        description: "",
      },
      contactForm: {
        company_name: "",
        country: "",
        address_line1: "",
        address_line2: "",
        state: "",
        city: "",
        postal_code: "",
      },
      countryListAllIsoData: [
        { code: "IN", code3: "IND", name: "India", number: "356" },
        { code: "AL", code3: "ALB", name: "Albania", number: "008" },
        { code: "DZ", code3: "DZA", name: "Algeria", number: "012" },
        { code: "AS", code3: "ASM", name: "American Samoa", number: "016" },
      ],
    };
  },
  created() {},
  mounted() {
    appOption.appSidebarHide = false;
    appOption.appHeaderHide = false;
    appOption.appContentClass = "";
  },
  methods: {},
};
</script>
