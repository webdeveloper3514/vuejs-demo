<script setup lang="ts">
import SidebarNav from "@/components/app/SidebarNav.vue";
import router from "@/router";
import { RouterLink, useRouter } from "vue-router";

import { ref } from "vue";

const isToggled = ref(false);

defineProps<{
  menu: {
    [x: string]: any;
    icon: string;
    text: string;
    url: string;
    highlight: boolean;
    children: Object;
    slugs: Array<string> | null;
  };
  grantedPolicies: any;
}>();

function switchs(path: any) {
  if (path == "/switch-to-admin") {
    window.location.replace("/admin/tenants");
  } else if (path == "/switch-to-app") {
    window.location.replace("/app/dashboard");
  } else {
    router.push(path);
  }
}

function subIsActive(urls: any) {
  const currentRoute = useRouter().currentRoute.value.path;
  let match = false;

  for (let x = 0; x < urls.length; x++) {
    if (urls[x].url == currentRoute) {
      match = true;
    }
  }

  return match;
}

function toggleDropdown() {
  isToggled.value = !isToggled.value;
}
</script>
<template>
  <!-- menu with submenu -->
  <div
    v-if="menu.children"
    :class="isToggled ? 'menu-item has-sub expand' : 'menu-item has-sub'"
    v-bind:class="{ active: subIsActive(menu.children) }"
    v-on:click="toggleDropdown()"
  >
    <a class="menu-link">
      <span class="menu-icon" v-if="menu.icon">
        <i v-bind:class="menu.icon"></i>
        <span
          class="w-5px h-5px rounded-3 bg-theme position-absolute top-0 end-0 mt-3px me-3px"
          v-if="menu.highlight"
        ></span>
      </span>
      <span class="menu-text">{{ menu.text }} </span>
      <span class="menu-caret" v-if="menu.children"><b class="caret"></b></span>
    </a>
    <div class="menu-submenu">
      <template v-for="(submenu, index) in menu.children">
        <sidebar-nav
          v-bind:menu="submenu"
          v-bind:grantedPolicies="grantedPolicies"
        ></sidebar-nav>
      </template>
    </div>
  </div>

  <!-- menu without submenu -->

  <router-link
    v-else
    v-bind:to="menu.url"
    custom
    v-slot="{ navigate, href, isActive }"
  >
    <div v-if="!menu.slug || grantedPolicies[menu.slug] == true">
      <div class="menu-item" v-bind:class="{ active: isActive }">
        <a @click="switchs(menu.url)" class="menu-link cursor-pointer">
          <span class="menu-icon" v-if="menu.icon">
            <i v-bind:class="menu.icon"></i>
            <span class="menu-icon-label" v-if="menu.label">{{
              menu.label
            }}</span>
          </span>
          <span class="menu-text">{{ menu.text }}</span>
        </a>
      </div>
    </div>
  </router-link>
</template>
