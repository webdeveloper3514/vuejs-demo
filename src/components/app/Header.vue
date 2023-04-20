<script setup lang="ts">
import { useAppAuth } from "@/stores/app-auth";
import VueCookies from "vue-cookies";
import { RouterLink } from "vue-router";
import router from "../../router";
import { useAppOptionStore } from "@/stores/app-option";

import { Auth } from "@/services/auth.js";
import { ref } from "vue";

const appAuth = useAppAuth();
const User = appAuth.$state.userInfo || {};
const appOption = useAppOptionStore();
const searchWorkspaceText = ref("");
const searchWorkspaceCount = ref(0);
const workspaceData = ref([{}]);

// const workspaceData = [{}];
async function logout() {
  await Auth.revokeToken(VueCookies.get("user-token")); //TODO
  const logout_endpoint = await Auth.logout();
  VueCookies.remove("user-token");
  window.location.assign(logout_endpoint);
}

function toggleAppSidebarCollapsed() {
  if (appOption.appSidebarCollapsed) {
    appOption.appSidebarToggled = !appOption.appSidebarToggled;
  } else if (appOption.appSidebarToggled) {
    appOption.appSidebarToggled = !appOption.appSidebarToggled;
  }
  appOption.appSidebarCollapsed = !appOption.appSidebarCollapsed;
}

function toggleAppSidebarMobileToggled() {
  appOption.appSidebarMobileToggled = !appOption.appSidebarMobileToggled;
}

function toggleAppHeaderSearch(event) {
  event.preventDefault();

  appOption.appHeaderSearchToggled = !appOption.appHeaderSearchToggled;
}

function checkForm(event) {
  event.preventDefault();
}

function addOperation() {
  if (window.location.pathname == "/operations/add") {
    window.location.reload();
  } else {
    router.push("/operations/add");
  }
}

function refreshPage() {
  router.push("/dashboard");
}

function SearchIntoOperations() {
  this.searchOperationsCount = 0;
  User.currentTenant.workspaces.find((item) => {
    item.hideData = !!item.name
      .toLowerCase()
      .indexOf(this.searchWorkspaceText.toLowerCase());

    if (item.hideData == true) {
      this.searchWorkspaceCount = this.searchWorkspaceCount + 1;
    }
  });
}
</script>

<template>
  <div id="header" class="app-header">
    <!-- BEGIN desktop-toggler -->
    <div class="desktop-toggler">
      <button
        type="button"
        class="menu-toggler"
        v-on:click="toggleAppSidebarCollapsed"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
    <!-- BEGIN desktop-toggler -->

    <!-- BEGIN mobile-toggler -->
    <div class="mobile-toggler">
      <button
        type="button"
        class="menu-toggler"
        v-on:click="toggleAppSidebarMobileToggled"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
    <!-- END mobile-toggler -->

    <!-- BEGIN brand -->
    <div class="brand">
      <a class="brand-logo cursor-pointer" @click="refreshPage()">
        <span class="w-150px">
          <img src="/src/assets/main_logo.png" alt="main-logo" />
        </span>
      </a>
    </div>
    <!-- END brand -->

    <!-- BEGIN menu -->

    <div class="menu" v-if="User.role !== 'admin'">
      <RouterLink class="btn btn-warning" to="/upgrade">Upgrade</RouterLink>

      <div class="menu-item dropdown dropdown-mobile-full">
        <a
          href="#"
          data-bs-toggle="dropdown"
          data-bs-display="static"
          class="menu-link"
        >
          <div class="menu-icon"><i class="bi bi-plus-lg plus-icon"></i></div>
        </a>
        <div class="dropdown-menu dropdown-menu-end mt-1 w-300px fs-11px pt-2">
          <!--					<template v-if="plusData && plusData.length > 0">-->
          <a
            @click="addOperation()"
            class="d-flex align-items-center py-10px dropdown-item text-wrap"
          >
            <div class="fs-20px">
              <i class="bi bi-plus-circle text-theme"></i>
            </div>
            <div class="flex-1 flex-wrap ps-3">
              <div class="mb-1 text-white text-uppercase">Add an Operation</div>
              <div class="small">
                If you have more than 1 Operation, add its details.
              </div>
            </div>
          </a>
          <!--					</template>-->
          <!--					<template v-else>-->
          <!--						<div class="dropdown-notification-item">No record found</div>-->
          <!--					</template>-->
        </div>
      </div>

      <div class="menu-item dropdown dropdown-mobile-full">
        <a
          href="#"
          data-bs-toggle="dropdown"
          data-bs-display="static"
          class="menu-link"
        >
          <div class="menu-icon"><i class="bi bi-card-heading"></i></div>
        </a>
        <div
          class="dropdown-menu dropdown-menu-end mt-1 w-300px fs-11px pt-2 pb-0"
        >
          <template v-if="workspaceData && workspaceData.length > 0">
            <div class="input-group flex-nowrap">
              <div class="input-group p-2 px-3">
                <button class="btn btn-outline-default" type="button">
                  <i class="fa fa-search text-muted"></i>
                </button>
                <input
                  @keyup="SearchIntoOperations()"
                  v-model="searchWorkspaceText"
                  type="text"
                  class="form-control"
                  placeholder="Search for..."
                />
              </div>
            </div>
            <div class="item-list">
              <a
                v-for="(workspace, index) in User?.currentTenant?.workspaces"
                v-show="!workspace.hideData"
                class="p-2 px-3 dropdown-item p-0 cursor-pointer"
              >
                <div>
                  <p class="mb-0 text-white">{{ workspace.name }}</p>
                </div>
              </a>
            </div>
            <div
              class="item-list"
              v-if="
                searchWorkspaceCount == User?.currentTenant?.workspaces.length
              "
            >
              <a class="p-2 px-3 dropdown-item p-0 cursor-pointer text-center"
                >Invalid search</a
              >
            </div>
            <div
              class="create-organization p-2 px-3 border-top-trans text-center"
            >
              <a
                @click="addOperation()"
                class="cursor-pointer text-decoration-none h6 fw-600 text-theme"
                >Add</a
              >
            </div>
          </template>
          <template v-else>
            <div class="dropdown-notification-item">No record found</div>
          </template>
        </div>
      </div>

      <div class="menu-item dropdown dropdown-mobile-full">
        <a
          href="#"
          data-bs-toggle="dropdown"
          data-bs-display="static"
          class="menu-link"
        >
          <div class="menu-img online">
            <img
              :src="
                User.avatar != '' && User.avatar != null
                  ? User.avatar
                  : '/src/assets/user.jpg'
              "
              alt="Profile"
              height="60"
            />
          </div>
          <div class="menu-text d-sm-block d-none">{{ User.unique_name }}</div>
        </a>
        <div class="dropdown-menu dropdown-menu-end me-lg-3 fs-11px mt-1">
          <RouterLink
            to="/app/settings/profile"
            class="dropdown-item d-flex align-items-center"
            >PROFILE
            <i class="bi bi-person-circle ms-auto text-theme fs-16px my-n1"></i
          ></RouterLink>

          <div class="dropdown-divider"></div>
          <a
            v-on:click="logout()"
            class="dropdown-item d-flex align-items-center cursor-pointer"
            >LOGOUT
            <i class="bi bi-toggle-off ms-auto text-theme fs-16px my-n1"></i
          ></a>
        </div>
      </div>
    </div>

    <div class="menu" v-if="User.role === 'admin'">
      <div class="menu-item dropdown dropdown-mobile-full">
        <a
          href="#"
          data-bs-toggle="dropdown"
          data-bs-display="static"
          class="menu-link"
        >
          <div class="menu-img online">
            <img
              :src="
                User.avatar != '' && User.avatar != null
                  ? User.avatar
                  : '/src/assets/user.jpg'
              "
              alt="Profile"
              height="60"
            />
          </div>
          <div class="menu-text d-sm-block d-none">{{ User.email }}</div>
        </a>
        <div class="dropdown-menu dropdown-menu-end me-lg-3 fs-11px mt-1">
          <RouterLink
            to="/admin/profile"
            class="dropdown-item d-flex align-items-center"
            >PROFILE
            <i class="bi bi-person-circle ms-auto text-theme fs-16px my-n1"></i
          ></RouterLink>
          <div class="dropdown-divider"></div>
          <a
            v-on:click="logout()"
            class="dropdown-item d-flex align-items-center cursor-pointer"
            >LOGOUT
            <i class="bi bi-toggle-off ms-auto text-theme fs-16px my-n1"></i
          ></a>
        </div>
      </div>
    </div>
    <!-- END menu -->

    <!-- BEGIN menu-search -->
    <form class="menu-search" name="header_search_form" v-on:submit="checkForm">
      <div class="menu-search-container">
        <div class="menu-search-icon"><i class="bi bi-search"></i></div>
        <div class="menu-search-input">
          <input
            type="text"
            class="form-control form-control-lg"
            placeholder="Search menu..."
          />
        </div>
        <div class="menu-search-icon">
          <a href="#" v-on:click="toggleAppHeaderSearch"
            ><i class="bi bi-x-lg"></i
          ></a>
        </div>
      </div>
    </form>
    <!-- END menu-search -->
  </div>
</template>
