<script setup lang="ts">
import AppFooter from "@/components/app/Footer.vue";
import AppHeader from "@/components/app/Header.vue";
import AppSidebar from "@/components/app/Sidebar.vue";
import { useAppAuth } from "@/stores/app-auth";
import { useAppOptionStore } from "@/stores/app-option";
import { ProgressFinisher, useProgress } from "@marcoschulte/vue3-progress";
import { RouterView } from "vue-router";
import router from "./router";
import VueCookies from "vue-cookies";
import { Auth } from "@/services/auth.js";

const appOption = useAppOptionStore();
// const internalInstance = getCurrentInstance(); // unused

const appAuth = useAppAuth();
appAuth.initComponent();

const lastEle = window.location.pathname.split("/").pop();

if (
  lastEle == "/" ||
  lastEle == "" ||
  lastEle == "register" ||
  lastEle == "forgot-password"
) {
  appOption.appSidebarHide = true;
  appOption.appHeaderHide = true;
  appOption.appContentClass = "p-0";
}

let isLoggedIn = VueCookies.get("user-token");
isLoggedIn = !!isLoggedIn;
if (!window.location.href?.includes("signin-oidc") && !isLoggedIn) {
  Auth.login();
}

const progresses = [] as ProgressFinisher[];

router.beforeEach(async (to, from, next) => {
  localStorage.clear();
  progresses.push(useProgress().start());
  appOption.appSidebarMobileToggled = false;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  let isLoggedIn = VueCookies.get("user-token");
  isLoggedIn = !!isLoggedIn;
  if (!window.location.href?.includes("signin-oidc") && !isLoggedIn) {
    await Auth.login();
  }

  if (!to?.meta?.slug || appAuth.grantedPolicies[to?.meta?.slug] == true) {
    next();
  }

  next({
    path: "/not-found",
  });
  progresses.pop()?.finish();
});
router.afterEach(async (to, from) => {
  progresses.pop()?.finish();
});
</script>

<script lang="ts">
// redirect unauthorized users to login page
export default {
  async created() {},
};
</script>

<template>
  <div
    class="app"
    v-bind:v-if="Object.keys(appAuth.grantedPolicies || {}).length > 0"
    v-bind:class="{
      'app-header-menu-search-toggled': appOption.appHeaderSearchToggled,
      // @ts-ignore
      'app-sidebar-toggled': appOption.appSidebarToggled,
      'app-sidebar-collapsed': appOption.appSidebarCollapsed,
      'app-sidebar-mobile-toggled': appOption.appSidebarMobileToggled,
      'app-sidebar-mobile-closed': appOption.appSidebarMobileClosed,
      'app-content-full-height': appOption.appContentFullHeight,
      'app-content-full-width': appOption.appSidebarHide,
      'app-without-sidebar': appOption.appSidebarHide,
      'app-without-header': appOption.appHeaderHide,
      'app-boxed-layout': appOption.appBoxedLayout,
      'app-footer-fixed': appOption.appFooterFixed,
    }"
  >
    <vue3-progress-bar />
    <app-header v-if="!appOption.appHeaderHide" />
    <app-sidebar v-if="!appOption.appSidebarHide" />
    <div class="app-content" v-bind:class="appOption.appContentClass">
      <router-view></router-view>
    </div>
    <app-footer v-if="appOption.appFooter" />
  </div>
</template>
