<template>
  <perfect-scrollbar class="app-content-inner-padding h-100">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">HOME</a></li>
      <li class="breadcrumb-item">
        <a href="/operations">OPERATIONS</a>
      </li>
      <li class="breadcrumb-item active">NARRATIVE</li>
    </ul>
    <h1 class="page-header">New Narrative</h1>
    <hr class="mb-4 mt-n1" />
    <el-form ref="narrativeForm" :model="pageState.form" :rules="rules">
      <div class="row">
        <!-- narrative information -->
        <div class="col-xl-12">
          <card class="mb-3 bg-opacity-5 bg-default">
            <card-body>
              <div class="d-flex fw-bold medium mb-3">
                <span class="flex-grow-1">Narrative Information</span>
              </div>

              <div class="row">
                <div class="col-sm-12 col-md-3">
                  <div class="form-group mb-3">
                    <label class="form-label" for="name">Name</label>
                    <input
                      id="name"
                      v-model="pageState.form.name"
                      class="form-control"
                      placeholder=""
                      type="text"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6">
                  <div class="form-group mb-3">
                    <label class="form-label" for="description"
                      >Description</label
                    >
                    <input
                      id="description"
                      v-model="pageState.form.description"
                      class="form-control"
                      placeholder=""
                      type="text"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-3">
                  <div class="form-group mb-3">
                    <label class="form-label" for="date">Date</label>
                    <datepicker v-model="pageState.form.narrativeDate" />
                  </div>
                </div>
              </div>
            </card-body>
          </card>
        </div>
        <!-- detailed narrative  -->
        <div class="col-xl-12">
          <card class="mb-3 bg-opacity-5 bg-default">
            <card-body>
              <div class="d-flex fw-bold medium mb-3">
                <span class="flex-grow-1">Detailed Timeline</span>
                <button
                  class="btn btn-outline-theme btn-sm float-end d-inline-block loading"
                  type="button"
                >
                  + Attack Narrative ⌵
                </button>
              </div>

              <div class="row mb-4">
                <div id="narrativeAccordion" class="accordion">
                  <div class="accordion-item">
                    <h2 id="headingOne" class="accordion-header">
                      <button
                        class="accordion-button text-theme"
                        data-bs-target="#collapseOne"
                        data-bs-toggle="collapse"
                        type="button"
                      >
                        Mimikatz attack excuted active directory
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse show"
                      data-bs-parent="#narrativeAccordion"
                    >
                      <div class="accordion-body">...</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 id="headingTwo" class="accordion-header">
                      <button
                        aria-controls="collapseTwo"
                        aria-expanded="false"
                        class="accordion-button collapsed"
                        data-bs-target="#collapseTwo"
                        data-bs-toggle="collapse"
                        type="button"
                      >
                        Mimikatz attack detected
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      aria-labelledby="headingTwo"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body"></div>
                    </div>
                  </div>
                </div>
              </div>
            </card-body>
          </card>
        </div>
      </div>
    </el-form>
    <div class="d-flex justify-content-end gap-3">
      <button
        class="btn btn-outline-theme btn-sm float-end d-inline-block loading"
        style="width: 120px"
        type="button"
        @click="addNarration"
      >
        <i v-if="pageState.ui.loading" class="fa fa-spinner"></i> Save
      </button>
      <button
        class="btn btn-outline-theme btn-sm float-end d-inline-block loading"
        style="width: 120px"
        type="button"
        @click="resetFields"
      >
        Discard
      </button>
    </div>
  </perfect-scrollbar>
  <div class="toasts-container">
    <div
      id="notification"
      :class="pageState.ui.success_message != null ? 'bg-theme' : 'bg-danger'"
      class="toast fade-hide"
      data-autohide="false"
    >
      <div class="toast-header">
        <i class="far fa-bell text-muted me-2"></i>
        <strong class="me-auto">{{
          pageState.ui.success_message != null ? "Success" : "Failed"
        }}</strong>

        <button
          class="btn-close"
          data-bs-dismiss="toast"
          type="button"
        ></button>
      </div>
      <div class="toast-body">
        {{
          pageState.ui.error_message == null
            ? pageState.ui.success_message
            : pageState.ui.error_message
        }}
      </div>
    </div>
  </div>
</template>

<script>
import datepicker from "@/components/plugins/Datepicker.vue";
import { ScrollSpy, Toast } from "bootstrap";
import { reactive } from "vue";
import { useAppOptionStore } from "@/stores/app-option";
import Service from "@/services/narrations";

const appOption = useAppOptionStore();

const pageState = reactive({
  form: {
    name: "",
    description: "",
    narrativeDate: new Date(),
  },
  ui: {
    loading: false,
    error_message: null,
    success_message: null,
  },
});
export default {
  components: {
    datepicker,
  },
  methods: {
    resetFields() {
      pageState.form = {
        name: "",
        description: "",
        narrativeDate: new Date(),
      };
      pageState.ui = {
        loading: false,
        error_message: null,
        success_message: null,
      };
    },
    showToast(target) {
      const toast = new Toast(document.getElementById(target));
      toast.show();
    },
    async addNarration() {
      this.$refs["narrativeForm"].validate(async (valid) => {
        if (valid) {
          console.log(pageState.form);
          pageState.ui.loading = true;
          const result = await Service.addNarration({
            name: pageState.form.name,
            description: pageState.form.description,
            narrativeDate: pageState.form.narrativeDate,
          });
          pageState.ui.loading = false;
          if (result != null && result.status === 200) {
            pageState.ui.success_message = "Registered successfully";
            pageState.ui.error_message = null;
          } else {
            pageState.ui.error_message =
              "Whoops! Could not registered with values";
            pageState.ui.success_message = null;
          }
          this.showToast("notification");
          // console.log(result);
        }
      });
    },
  },
  setup() {
    return {
      pageState,
      rules: {
        name: [
          {
            required: true,
            message: "Please enter narration name",
            trigger: "change",
          },
        ],
        description: [
          {
            required: true,
            message: "Please enter narration description",
            trigger: "change",
          },
        ],
        narrativeDate: [
          {
            type: "date",
            required: true,
            message: "Please enter narration date",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    new ScrollSpy(document.body, {
      target: "#sidebar-bootstrap",
      offset: 200,
    });
    appOption.appContentFullHeight = true;
    appOption.appContentClass = "p-0";
  },
};
</script>
