<template>
  <perfect-scrollbar class="app-content-inner-padding h-100">
    <card>
      <card-body class="p-0">
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
                    :src="
                      User.avatar !== '' && User.avatar != null
                        ? User.avatar
                        : '/src/assets/user.jpg'
                    "
                    alt="Profile Image"
                    class="w-100"
                  />
                </div>
              </div>

              <div class="profile-name mt-3">
                <h5 class="mb-1">
                  {{ this.User.family_name + " " + this.User.given_name }}
                </h5>
                <a class="text-decoration-none mt-0" href="#">
                  {{ email }}
                </a>
              </div>
            </div>
          </div>

          <div class="user-info col-12 col-md-12 col-lg-8 col-xl-9 col-xxl-10">
            <div class="tac-links">
              <ul id="pills-tab" class="nav nav-tabs nav-tabs-v2 px-4">
                <li
                  class="nav-item me-3"
                  @click="$router.push({ name: 'app.settings.profile' })"
                >
                  <a
                    id="pills-profile-tab"
                    class="nav-link"
                    data-bs-toggle="pill"
                    href="#pills-profile"
                    v-bind:class="
                      $route.path === '/app/settings/profile' ? 'active' : ''
                    "
                    >Profile</a
                  >
                </li>
                <li
                  class="nav-item me-3"
                  @click="$router.push({ name: 'app.settings.personal' })"
                >
                  <a
                    id="pills-personal-tab"
                    class="nav-link"
                    data-bs-toggle="pill"
                    href="#pills-subscription"
                    v-bind:class="
                      $route.path === '/app/settings/personal' ? 'active' : ''
                    "
                    >Personal Data</a
                  >
                </li>
                <li
                  class="nav-item me-3"
                  @click="$router.push({ name: 'app.settings.subscription' })"
                >
                  <a
                    id="pills-subscription-tab"
                    class="nav-link"
                    data-bs-toggle="pill"
                    href="#pills-subscription"
                    v-bind:class="
                      $route.path === '/app/settings/subscription'
                        ? 'active'
                        : ''
                    "
                    >Subscription</a
                  >
                </li>
              </ul>
            </div>
            <div id="pills-tabContent" class="tab-content">
              <div
                v-if="$route.path === '/app/settings/profile'"
                id="pills-profile"
                class="tab-pane fade"
                v-bind:class="
                  $route.path === '/app/settings/profile' ? 'active show' : ''
                "
              >
                <Profile></Profile>
              </div>

              <div
                v-if="$route.path === '/app/settings/personal'"
                id="pills-personal"
                class="tab-pane fade"
                v-bind:class="
                  $route.path === '/app/settings/personal' ? 'active show' : ''
                "
              >
                <PersonalData></PersonalData>
              </div>
              <div
                v-if="$route.path === '/app/settings/subscription'"
                id="pills-subscription"
                class="tab-pane fade py-4"
                v-bind:class="
                  $route.path === '/app/settings/subscription'
                    ? 'active show'
                    : ''
                "
              >
                <Subscription></Subscription>
              </div>
            </div>
          </div>
        </div>
      </card-body>
    </card>
    <!-- toasts-container -->
    <div class="toasts-container">
      <div id="toast-1" class="toast fade hide" data-autohide="false">
        <div class="toast-header">
          <i class="far fa-bell text-muted me-2"></i>
          <strong class="me-auto">Settings</strong>
          <button
            class="btn-close"
            data-bs-dismiss="toast"
            type="button"
          ></button>
        </div>
        <div id="toast-body" class="toast-body">
          Hello, world! This is a toast message.
        </div>
      </div>
      <div id="toast-2" class="toast fade hide" data-autohide="false">...</div>
    </div>
  </perfect-scrollbar>
</template>

<script>
import { useAppAuth } from "@/stores/app-auth";
import Profile from "./UserProfile.vue";
import PersonalData from "../views/PersonalData.vue";

import { useAppOptionStore } from "@/stores/app-option";

const appAuth = useAppAuth();

const appOption = useAppOptionStore();

export default {
  name: "UserSettings",
  components: {
    Profile,
    PersonalData,
  },
  data() {
    return {
      User: appAuth.$state.userInfo || {},
      UserID: appAuth.$state.userInfo.id || "",
      email: appAuth.$state.userInfo.email || "",
    };
  },
  computed: {},
  async created() {
    // if (!appAuth.$state.userLoggedIn) {
    //     this.$router.push("/");
    // }
  },
  async mounted() {
    appOption.appContentFullHeight = true;
    appOption.appContentClass = "p-0";
  },
  methods: {},
};
</script>
