<template>
  <div></div>
</template>
<script>
import { OIDCClient } from "@/services/odic-client";

export default {
  name: "SilentRenew",
  async mounted() {
    await new OIDCClient({
      issuer: import.meta.env.VITE_OIDC_ISSUER,
    }).loginCallback();
  },
};
</script>
