import { OIDCClient } from "./odic-client";

const APP_URL = import.meta.env.VITE_APP_URL;
const VITE_OIDC_ISSUER = import.meta.env.VITE_OIDC_ISSUER;
const VITE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

export const Auth = new OIDCClient({
  issuer: VITE_OIDC_ISSUER,
  client_id: VITE_CLIENT_ID,
  redirect_uri: APP_URL + "dashboard",
  silent_redirect_uri: APP_URL + "silent-renew",
  post_logout_redirect_uri: APP_URL,
  response_type: "code",
  scope: "openid profile ManticoreSaaS",
  checkSession: true,
  autoSilentRenew: true,
  requestUserInfo: true,
});

Auth.on("silent_renew_error", console.error);
Auth.on("session_change", console.debug);
Auth.on("session_error", console.error);
Auth.on("silent_renew_success", console.debug);
