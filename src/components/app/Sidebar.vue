<script setup lang="ts">
import SidebarNav from "@/components/app/SidebarNav.vue";
import { useAppOptionStore } from "@/stores/app-option";
import { useAppSidebarMenuStore } from "@/stores/app-sidebar-menu";
import { onMounted, reactive } from "vue";
import { AxiosAPIInstance } from "@/services/axios.js";

const appOption = useAppOptionStore();

function appSidebarMobileToggled() {
  appOption.appSidebarMobileToggled = !appOption.appSidebarMobileToggled;
}

const appSidebarMenuOptions = useAppSidebarMenuStore();

const state: any = reactive({
  grantedPolicies: {},
  menuItems: appSidebarMenuOptions.UserSidebar,
});

onMounted(async () => {
  const { data } = await AxiosAPIInstance.get(
    "/api/abp/application-configuration?includeLocalizationResources=false"
  );

  state.grantedPolicies = data?.auth?.grantedPolicies;

  state.menuItems = state?.menuItems
    ?.map((item: any) => {
      if (item.children) {
        item.children = item?.children
          ?.map((item: any) => {
            if (
              item?.slugs &&
              !item?.slugs
                ?.map((key: any) => state.grantedPolicies[key])
                .includes(true)
            ) {
              return null;
            }
            return item;
          })
          .filter((x: any) => x !== null);
      }

      if (
        item?.slugs &&
        !item?.slugs
          ?.map((key: any) => state.grantedPolicies[key])
          .includes(true)
      ) {
        return null;
      }
      return item;
    })
    .filter((x: any) => x !== null);

  const handleSidebarMenuToggle = function (menus: any[]) {
    menus.map(function (menu: { onclick: (e: any) => void }) {
      menu.onclick = function (e: { preventDefault: () => void }) {
        e.preventDefault();
        const target = this.nextElementSibling;

        menus.map(function (m: { nextElementSibling: any }) {
          const otherTarget = m.nextElementSibling;
          if (otherTarget !== target) {
            otherTarget.style.display = "none";
            otherTarget.closest(".menu-item").classList.remove("expand");
          }
        });

        const targetItemElm = target.closest(".menu-item");

        if (
          targetItemElm.classList.contains("expand") ||
          (targetItemElm.classList.contains("active") && !target.style.display)
        ) {
          targetItemElm.classList.remove("expand");
          target.style.display = "none";
        } else {
          // targetItemElm.classList.add('expand');
          target.style.display = "block";
        }
      };
    });
  };

  const menuBaseSelector = ".app-sidebar .menu > .menu-item.has-sub";
  const submenuBaseSelector = " > .menu-submenu > .menu-item.has-sub";

  // menu
  const menuLinkSelector = menuBaseSelector + " > .menu-link";
  const menus = [].slice.call(document.querySelectorAll(menuLinkSelector));
  handleSidebarMenuToggle(menus);

  // submenu lvl 1
  const submenuLvl1Selector = menuBaseSelector + submenuBaseSelector;
  const submenusLvl1 = [].slice.call(
    document.querySelectorAll(submenuLvl1Selector + " > .menu-link")
  );
  handleSidebarMenuToggle(submenusLvl1);

  // submenu lvl 2
  const submenuLvl2Selector =
    menuBaseSelector + submenuBaseSelector + submenuBaseSelector;
  const submenusLvl2 = [].slice.call(
    document.querySelectorAll(submenuLvl2Selector + " > .menu-link")
  );
  handleSidebarMenuToggle(submenusLvl2);
});
</script>
<template>
  <div id="sidebar" class="app-sidebar">
    <perfect-scrollbar class="app-sidebar-content">
      <div class="menu" v-if="state.menuItems.length > 0">
        <template v-for="menu in state.menuItems">
          <div class="menu-header" v-if="menu.is_header">{{ menu.text }}</div>
          <div class="menu-divider" v-else-if="menu.is_divider"></div>
          <template v-else>
            <sidebar-nav
              v-if="menu.text"
              v-bind:grantedPolicies="state.grantedPolicies"
              v-bind:menu="menu"
            ></sidebar-nav>
          </template>
        </template>
      </div>
    </perfect-scrollbar>
  </div>
  <button
    class="app-sidebar-mobile-backdrop"
    v-on:click="appSidebarMobileToggled"
  ></button>
</template>
