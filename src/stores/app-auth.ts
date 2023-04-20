import router from "@/router";
import { defineStore } from "pinia";
import VueCookies from "vue-cookies";
import VueJwtDecode from "vue-jwt-decode";
import Authentication from "@/services/authentication.js";
import { AxiosAPIInstance, AxiosAUTHInstance } from "@/services/axios.js";
import { Auth } from "@/services/auth.js";
import axios from "axios";

const token = VueCookies.get("user-token") || null;
const user = VueCookies.get("id_token") || null;

export const useAppAuth = defineStore({
  id: "appAuth",
  state: () => {
    return {
      userInfo: user,
      userToken: token,
      userLoggedIn: !!token,
      userIsAdmin: false,
      returnUrl: null,
      userAPI: null,
      grantedPolicies: {},
    };
  },
  actions: {
    async doLogin(email = "", password = "") {
      try {
        this.$state.userAPI = await Authentication.login({
          client_id: "ManticoreSaaS_App",
          username: email,
          password: password,
          grant_type: "password",
          scope: "offline_access ManticoreSaaS",
        });
        const proxyConvert = JSON.parse(JSON.stringify(this.$state.userAPI));
        const userDetail = VueJwtDecode.decode(proxyConvert.access_token);
        console.log("this.$state.userAPI", userDetail);
        if (this.$state.userAPI) {
          this.$state.userInfo = userDetail;
          this.$state.userToken = this.$state.userAPI;
          this.$state.userLoggedIn = true;

          AxiosAPIInstance.defaults.headers.common.Authorization = `Bearer ${this.$state.userAPI?.access_token}`;
          AxiosAUTHInstance.defaults.headers.common.Authorization = `Bearer ${this.$state.userAPI?.access_token}`;
        }
        return true;
      } catch (err) {
        console.log("err: ", err);
        return err;
      }
    },
    async initComponent() {
      const { data } = await AxiosAPIInstance.get(
        "/api/abp/application-configuration?includeLocalizationResources=false"
      );
      this.$state.grantedPolicies = data?.auth?.grantedPolicies || {};

      const routes = router.getRoutes();
      const item = routes.find((item) => item.path == window.location.pathname);
      if (
        item?.meta?.slug &&
        this.$state.grantedPolicies[item?.meta?.slug] == false
      ) {
        router.replace("/not-found");
      }

      this.$state.userInfo = {
        ...this.$state.userInfo,
        email: data?.currentUser?.email,
      };

      if (!data?.currentUser?.isAuthenticated) {
        if (
          !window.location.href?.includes("unauthorized") &&
          !window.location.href.includes("signin-oidc")
        ) {
          VueCookies.remove("user-token");
          await Auth.login();
        }
      }
    },
    async doLogout() {
      this.$state.userInfo = {};
      this.$state.userToken = null;
      this.$state.userLoggedIn = false;
      delete axios.defaults.headers.common.Authorization;
      await Auth.logout();
    },

    updateUserStateAvatar(avatar) {
      this.$state.userInfo.avatar = avatar;
      localStorage.removeItem("user-info");
      localStorage.setItem("user-info", JSON.stringify(this.$state.userInfo));

      return true;
    },
    updateUserStateInformation(firstName, lastName, phone) {
      this.$state.userInfo.family_name = firstName;
      this.$state.userInfo.given_name = lastName;
      this.$state.userInfo.phone = phone;
      localStorage.removeItem("user-info");
      localStorage.setItem("user-info", JSON.stringify(this.$state.userInfo));

      return true;
    },
    async doRegister(body = {}) {
      try {
        this.$state.userAPI = await Authentication.register(body);
        if (this.$state.userAPI) {
          this.$state.userInfo = this.$state.userAPI.user;
          this.$state.userToken = this.$state.userAPI.token;
          this.$state.userLoggedIn = true;
        }

        return this.$state.userAPI;
      } catch (err) {
        console.log("err: ", err);
        return err;
      }
    },
  },
});
