<template>
  <div class="setting-sec p-0">
    <!-- heading in Contents -->
    <div class="row entry-row">
      <div class="col-auto"><h1 class="content-header-title">Contents</h1></div>
    </div>
    <!-- danger alert -->
    <div class="alert alert-danger" role="alert">
      This template uses inline localization. You can use the <b>L</b> function
      to localize a text, like <b>{{ "Hello" }}</b
      >. If you still want to define a completely new template for a culture,
      use the "Customize per culture" button. <br />
      To get more information about syntax and other details, please check the
      <a
        href="https://docs.abp.io/en/abp/latest/Text-Templating"
        target="_blank"
        >Text Templates documentation</a
      >.
    </div>

    <!-- Text Template Content  -->
    <div class="px-4 tbl_wrap">
      <card>
        <card-body>
          <div class="card-header">
            <label class="form-label"
              >Name: <strong>Abp.StandardEmailTemplates.Message</strong></label
            >
          </div>
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label"
                      >Template Content</label
                    ><span> * </span
                    ><textarea
                      class="form-control"
                      formcontrolname="content"
                      rows="10"
                    >
                    </textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div
                  class="d-flex flex-column gap-2 flex-column flex-md-row justify-content-between"
                >
                  <a
                    class="btn btn-primary"
                    role="button"
                    routerlink="/text-template-management/text-templates"
                    v-on:click="RedirectPreviousRoute"
                  >
                    <i class="fa fa-arrow-left me-1"></i>
                    <span>Return To Templates</span></a
                  >
                  <div class="d-flex gap-2 flex-column flex-md-row">
                    <button
                      class="btn btn-primary"
                      type="button"
                    >
                      <span>Save Content</span>
                    </button>
                    <button
                      class="btn btn-danger"
                      type="button"
                    >
                      <span>Restore To Default</span>
                    </button>
                    <button
                      class="btn btn-link"
                      type="button"
                    >
                      <span>Customize per culture</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </card-body>
      </card>
    </div>
  </div>
</template>

<script>
import router from "../../router";

export default {
  name: "TextTemplateContent",
  data() {
    return {};
  },
  methods: {
    RedirectPreviousRoute() {
      router.push("/admin/text-template-management/text-templates");
    },
  },
};
</script>
