import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // App Routes
    {
      path: "/",
      name: "login",
      redirect: { name: "dashboard" },
    },
    {
      path: "/silent-renew.html", // Token silent renew uri
      name: "SilentRenew",
      component: () => import("../views/SilentRenew.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",

      component: () => import("../views/Dashboard.vue"),
    },
    {
      path: "/operations",
      name: "operations",
      component: () => import("../views/OperationsList.vue"),
    },
    {
      path: "/operations/add",
      name: "operations.add",
      component: () => import("../views/AddOperations.vue"),
    },
    {
      path: "/operations/modify/:id",
      name: "operations.modify",
      component: () => import("../views/ModifyOperation.vue"),
    },
    {
      path: "/narrative/add",
      name: "narrative.add",
      component: () => import("../views/ModifyNarrative.vue"),
    },
    {
      path: "/recommendation/add",
      name: "recommendation.add",
      component: () => import("../views/AddRecommendation.vue"),
    },
    {
      path: "/finding/add",
      name: "finding.add",
      component: () => import("../views/AddFinding.vue"),
    },
    {
      path: "/operations/manage/:id",
      name: "operations.manage",
      component: () => import("../views/ManageOperations.vue"),
    },

    {
      path: "/app/settings/profile",
      name: "app.settings.profile",
      component: () => import("../views/UserSettings.vue"),
    },

    {
      path: "/app/settings/personal",
      name: "app.settings.personal",
      component: () => import("../views/UserSettings.vue"),
    },

    // Admin Routes
    {
      path: "/admin/tenants",
      name: "admin.tenants",
      meta: {
        slug: "Saas.Tenants",
      },
      component: () => import("../views/admin/Tenants.vue"),
    },
    {
      path: "/admin/edition",
      name: "admin.edition",
      meta: {
        slug: "Saas.Editions",
      },
      component: () => import("../views/admin/Edition.vue"),
    },
    {
      path: "/admin/identity/organization-units",
      name: "admin.identity.organizationUnits",
      meta: {
        slug: "AbpIdentity.OrganizationUnits",
      },
      component: () => import("../views/admin/OrganizationUnits.vue"),
    },
    {
      path: "/admin/identity/roles",
      name: "admin.identity.roles",
      meta: {
        slug: "AbpIdentity.Roles",
      },
      component: () => import("../views/admin/Roles.vue"),
    },
    {
      path: "/admin/identity/users",
      name: "admin.identity.users",
      meta: {
        slug: "AbpIdentity.Users",
      },
      component: () => import("../views/admin/Users.vue"),
    },
    {
      path: "/admin/identity/claim-types",
      name: "admin.identity.claimTypes",
      meta: {
        slug: "AbpIdentity.ClaimTypes",
      },
      component: () => import("../views/admin/ClaimTypes.vue"),
    },
    {
      path: "/admin/identity/security-logs",
      name: "admin.identity.securityLogs",
      meta: {
        slug: "AbpIdentity.SecurityLogs",
      },
      component: () => import("../views/admin/SecurityLogs.vue"),
    },
    {
      path: "/admin/language-management/languages",
      name: "admin.languages",
      meta: {
        slug: "LanguageManagement.Languages",
      },
      component: () => import("../views/admin/Languages.vue"),
    },
    {
      path: "/admin/language-management/texts",
      name: "admin.languageTexts",
      meta: {
        slug: "LanguageManagement.LanguageTexts",
      },
      component: () => import("../views/admin/LanguagesTexts.vue"),
    },
    {
      path: "/admin/text-template-management/text-templates",
      name: "admin.textTemplates",
      meta: {
        slug: "TextTemplateManagement.TextTemplates",
      },
      component: () => import("../views/admin/TextTemplate.vue"),
    },
    {
      path: "/admin/text-template-management/text-templates/content",
      name: "admin.textTemplates.content",
      component: () => import("../views/admin/TextTemplateContent.vue"),
    },
    {
      path: "/admin/audit-logs",
      name: "admin.AuditLogs",
      meta: {
        slug: "AuditLogging.AuditLogs",
      },
      component: () => import("../views/admin/AuditLogs.vue"),
    },
    {
      path: "/admin/setting-management",
      name: "admin.settingManagement",
      meta: {
        slug: "AbpAccount.SettingManagement",
      },
      component: () => import("../views/admin/SettingManagement.vue"),
    },

    {
      path: "/admin/users",
      name: "admin.users",
      component: () => import("../views/admin/Users.vue"),
    },
    {
      path: "/upgrade",
      name: "admin.upgrade",
      component: import("../views/Upgrade.vue"),
    },
    /*  {
      path: "/admin/profile",
      name: "admin.profile",
      component: import("../views/admin/AdminProfile.vue"),
    },*/
    {
      path: "/:pathMatch(.*)*",
      name: "page.not.found",
      component: () => import("../views/PageNotFound.vue"),
    },
  ],
});

export default router;
