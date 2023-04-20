import { TenantUserRole } from "@/application/TenantUserRole";
import { defineStore } from "pinia";

export const useAppSidebarMenuStore = defineStore({
  id: "appSidebarMenu",
  state: () => {
    return [];
  },
  getters: {
    UserSidebar: () => {
      return [
        {
          text: "Navigation",
          is_header: true,
        },
        {
          url: "/dashboard",
          icon: "bi bi-house-door",
          text: "Dashboard",
        },
        {
          icon: "bi  bi-tools",
          text: "Operations",
          userRoles: [
            TenantUserRole.OWNER,
            TenantUserRole.ADMIN,
            TenantUserRole.MEMBER,
            TenantUserRole.GUEST,
          ],
          children: [
            {
              url: "/operations",
              text: "Operations",
            },
            {
              url: "/operations/add",
              text: "Add Operation",
            },

            {
              url: "/narrative/add",
              text: "Add Narrative",
            },
            {
              url: "/recommendation/add",
              text: "Add Recommendation",
            },
            {
              url: "/finding/add",
              text: "Add Finding",
            },
          ],
        },
        {
          icon: "bi bi-gear",
          text: "Settings",
          userRoles: [TenantUserRole.OWNER, TenantUserRole.ADMIN],
          children: [
            {
              url: "/app/settings/profile",
              text: "Profile",
            },
          ],
        },
        {
          text: "Admin",
          is_header: true,
          slugs: [
            "AbpIdentity.OrganizationUnits",
            "AbpIdentity.Roles",
            "AbpIdentity.User",
            "AbpIdentity.ClaimTypes",
            "AbpIdentity.SecurityLogs",
            "LanguageManagement.Languages",
            "LanguageManagement.LanguageTexts",
            "TextTemplateManagement.TextTemplates",
            "AuditLogging.AuditLogs",
            "AbpAccount.SettingManagement",
            "Saas.Tenants",
            "Saas.Editions",
          ],
        },
        {
          icon: "fa fa-users",
          text: "Saas",
          slugs: ["Saas.Tenants", "Saas.Editions"],
          children: [
            {
              url: "/admin/tenants",
              text: "Tenants",
              slug: "Saas.Tenants",
            },
            {
              url: "/admin/edition",
              text: "Edition",
              slug: "Saas.Editions",
            },
          ],
        },
        {
          text: "Administration",
          icon: "fa fa-wrench",
          slugs: [
            "AbpIdentity.OrganizationUnits",
            "AbpIdentity.Roles",
            "AbpIdentity.User",
            "AbpIdentity.ClaimTypes",
            "AbpIdentity.SecurityLogs",
            "LanguageManagement.Languages",
            "LanguageManagement.LanguageTexts",
            "TextTemplateManagement.TextTemplates",
            "AuditLogging.AuditLogs",
            "AbpAccount.SettingManagement",
          ],
          children: [
            {
              icon: "fa fa-id-card-o",
              text: "Identity Management",
              slugs: [
                "AbpIdentity.OrganizationUnits",
                "AbpIdentity.Roles",
                "AbpIdentity.Users",
                "AbpIdentity.ClaimTypes",
                "AbpIdentity.SecurityLogs",
              ],
              children: [
                {
                  url: "/admin/identity/organization-units",
                  text: "Organization Units",
                  slug: "AbpIdentity.OrganizationUnits",
                },
                {
                  url: "/admin/identity/roles",
                  text: "Roles",
                  slug: "AbpIdentity.Roles",
                },
                {
                  url: "/admin/identity/users",
                  text: "Users",
                  slug: "AbpIdentity.Users",
                },
                {
                  url: "/admin/identity/claim-types",
                  text: "Claim Types",
                  slug: "AbpIdentity.ClaimTypes",
                },
                {
                  url: "/admin/identity/security-logs",
                  text: "Security Logs ",
                  slug: "AbpIdentity.SecurityLogs",
                },
              ],
            },
            {
              icon: "fa fa-globe",
              text: "Language Management",
              slugs: [
                "LanguageManagement.Languages",
                "LanguageManagement.LanguageTexts",
              ],
              children: [
                {
                  url: "/admin/language-management/languages",
                  text: "Languages",
                  slug: "LanguageManagement.Languages",
                },
                {
                  url: "/admin/language-management/texts",
                  text: "Language Texts",
                  slug: "LanguageManagement.LanguageTexts",
                },
              ],
            },
            {
              url: "/admin/text-template-management/text-templates",
              icon: "fas fa-envelope-open-text",
              text: "Text Templates",
              slug: "TextTemplateManagement.TextTemplates",
            },
            {
              url: "/admin/audit-logs",
              icon: "fa fa-file-text",
              text: "Audit Logs",
              slug: "AuditLogging.AuditLogs",
            },
            {
              url: "/admin/setting-management",
              icon: "fa fa-cog",
              text: "Settings",
              slug: "AbpAccount.SettingManagement",
            },
          ],
        },
      ];
    },
  },
});
