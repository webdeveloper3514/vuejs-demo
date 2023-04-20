<script>
import TextTemplate from "@/services/admin/textTemplate";

export default {
  name: "TextTemplate",
  data() {
    return {
      loading: false,
      searchText: "",
      TextTemplates: [],
    };
  },
  mounted() {
    this.ActionsApiHandler("getTextTemplate");
  },
  methods: {
    ActionsApiHandler(action, item) {
      if (action === "getTextTemplate") {
        this.loading = true;
        try {
          TextTemplate.getTextTemplate().then(
            (response) => {
              this.TextTemplates = response.data.items;
              this.loading = false;
            },
            (error) => {
              console.log("error", error);
              this.loading = false;
            }
          );
        } catch (err) {
          console.log("error", err);
          this.loading = false;
        }
      }
      if (action === "searchTextTemplate") {
        const payload = {
          filterText: this.searchText.toLowerCase(),
          skipCount: 0,
          maxResultCount: 10,
        };
        if (this.searchText === "") delete payload["filterText"];
        try {
          TextTemplate.searchTextTemplate(payload).then(
            (response) => {
              this.TextTemplates = response.data.items;
            },
            (error) => {
              this.loading = false;
            }
          );
        } catch (err) {
          this.loading = false;
        }
      }
      if (action === "editContent") {
        // router.push(`/admin/text-template-management/text-templates/content/${item.name}`);
        try {
          TextTemplate.templateContent(item.name).then(
            (response) => {},
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
    },
  },
};
</script>

<template>
  <perfect-scrollbar class="app-content-inner-padding h-100">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">ADMINISTRATION</a></li>
      <li class="breadcrumb-item active">TEXT TEMPLATES</li>
    </ul>
    <div class="row align-items-center">
      <div class="col-sm-10">
        <h1 class="page-header">Text Templates</h1>
      </div>
    </div>
    <hr class="mb-4 mt-n1" />

    <!-- Text Templates heading -->

    <!-- Text Templates search -->
    <div class="search_bar">
      <div class="row">
        <div class="col-12 mb-4">
          <div class="input-group">
            <input
              v-model="searchText"
              class="form-control"
              placeholder="Search for..."
              type="text"
              v-on:keyup="this.ActionsApiHandler('searchTextTemplate')"
            />
            <button class="btn btn-outline-default" type="button">
              <i class="fa fa-search text-muted"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Text Templates table -->
    <div class="tbl_wrap">
      <card>
        <card-body>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="border-bottom-trans">
                  <th scope="col">ACTION</th>
                  <th scope="col">NAME</th>
                  <th scope="col">INLINE LOCALIZED</th>
                  <th scope="col">IS LAYOUT</th>
                  <th scope="col">LAYOUT</th>
                  <th scope="col">DEFAULT CULTURE NAME</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td v-loading="loading" class="p-5" colspan="6"></td>
                </tr>
                <tr v-for="(item, index) in TextTemplates" v-bind:key="index">
                  <td>
                    <button
                      class="btn btn-outline-success ms-2"
                      type="button"
                      v-on:click="this.ActionsApiHandler('editContent', item)"
                    >
                      Edit Contents
                    </button>
                  </td>
                  <td>{{ item.displayName }}</td>
                  <td v-if="item.isInlineLocalized">
                    <i class="fa fa-check"></i>
                  </td>
                  <td v-if="!item.isInlineLocalized"></td>
                  <td v-if="item.isLayout">
                    <i class="fa fa-check"></i>
                  </td>
                  <td v-if="!item.isLayout"></td>
                  <td>{{ item.layout }}</td>
                  <td>{{ item.defaultCultureName }}</td>
                </tr>
                <tr v-if="TextTemplates?.length === 0 && loading === false">
                  <td class="text-center pt-15px pb-15px" colspan="6">
                    No records found based on your search
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <td colspan="6">{{ TextTemplates?.length }} Total Records</td>
              </tfoot>
            </table>
          </div>
        </card-body>
      </card>
    </div>
  </perfect-scrollbar>
</template>
