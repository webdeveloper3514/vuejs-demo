<!--
<script>
import VueCookies from "vue-cookies";

export default {
  name: "UnauthorizedOIDC",
  async created() {
    let isLoggedIn = VueCookies.get("user-token");
    isLoggedIn = !!isLoggedIn;
    if (!isLoggedIn) {
      this.$auth.login();
    } else {
      this.$router.replace("/");
    }
  },
};
</script>
-->
