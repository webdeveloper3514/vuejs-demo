<template>
  <perfect-scrollbar class="app-content-inner-padding h-100">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">HOME</a></li>
      <li class="breadcrumb-item active">
        <a href="/operations">OPERATIONS</a>
      </li>
      <li class="breadcrumb-item active">RECOMMENDATION</li>
    </ul>
    <h1 class="page-header">New Recommendation</h1>
    <hr class="mb-4 mt-n1" />

    <!-- basic information -->
    <card class="mb-3 bg-opacity-5 bg-default">
      <card-body>
        <div class="d-flex fw-bold medium mb-3">
          <span class="flex-grow-1">Recommendation Information</span>
        </div>

        <div class="row align-items-center mb-2">
          <el-form ref="basicForm" :model="form" label-position="top">
            <div class="row">
              <div class="col-md-4 col-sm-6">
                <el-form-item label="Name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </div>
              <div class="col-md-4 col-sm-6">
                <el-form-item label="Type">
                  <el-select
                    v-model="form.type"
                    class="w-100"
                    placeholder="Select Option"
                  >
                    <el-option
                      v-for="item in recommendationTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="col-md-4 col-sm-6">
                <el-form-item label="Type">
                  <el-select
                    v-model="form.type"
                    class="w-100"
                    placeholder="Select Option"
                  >
                    <el-option
                      v-for="item in recommendationTearms"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </card-body>
    </card>
    <!-- description -->
    <card class="mb-3 bg-opacity-5 bg-default">
      <card-body>
        <div class="d-flex fw-bold medium mb-3">
          <span class="flex-grow-1">Description</span>
        </div>
        <div class="row align-items-center mb-4">
          <el-form ref="basicForm" :model="form" label-position="top">
            <div class="row">
              <div class="col-xs-12 mb-4">
                <quill-editor theme="snow" />
              </div>
            </div>
          </el-form>
        </div>
      </card-body>
    </card>
    <button
      class="btn btn-outline-theme btn-sm float-end d-inline-block loading"
      style="width: 120px"
      type="button"
    >
      Discard
    </button>
    <button
      class="btn btn-outline-theme btn-sm float-end me-2 d-inline-block loading"
      style="width: 120px"
      type="button"
      @click="addOperation()"
    >
      <i v-if="loading" aria-hidden="true" class="fa fa-spinner fa-spin"></i>
      Save
    </button>
  </perfect-scrollbar>
  <div class="toasts-container">
    <div
      id="notification"
      :class="success_message != null ? 'bg-theme' : 'bg-danger'"
      class="toast fade-hide"
      data-autohide="false"
    >
      <div class="toast-header">
        <i class="far fa-bell text-muted me-2"></i>
        <strong class="me-auto">{{
          success_message != null ? "Success" : "Failed"
        }}</strong>

        <button
          class="btn-close"
          data-bs-dismiss="toast"
          type="button"
        ></button>
      </div>
      <div class="toast-body">
        {{ error_message == null ? success_message : error_message }}
      </div>
    </div>
  </div>
</template>

<script>
import { useAppOptionStore } from "@/stores/app-option";
import Service from "@/services/operations";
import { Toast } from "bootstrap";
import quillEditor from "@/components/plugins/QuillEditor.vue";

const appOption = useAppOptionStore();

export default {
  name: "AddOperations",
  components: {
    quillEditor,
  },
  data() {
    return {
      loading: false,
      success_message: null,
      error_message: null,
      reportingOptions: [],
      form: {
        name: "",
        type: "",
        summary: "",
        red_team_operator: "",
        blue_team_analysts: "",
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "Please enter valid email address",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  async mounted() {
    appOption.appContentFullHeight = true;
    appOption.appContentClass = "p-0";
    // Service.addOperationKind({kindName:'Operation Kind-1'});
    const kinds = await Service.getOperationKinds();
    if (kinds?.items?.length > 0) {
      kinds.items.forEach((kind) => {
        this.reportingOptions.push({ label: kind.kindName, value: kind.id });
      });
    }
  },
  methods: {
    showToast(target) {
      const toast = new Toast(document.getElementById(target));
      toast.show();
    },
    async addOperation() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          // console.log(this.form);
          this.loading = true;
          const result = await Service.addOperation({
            operationName: this.form.name,
            exerciseType: this.form.reporting_format,
            summary: this.form.summary,
          });
          this.loading = false;
          if (result != null && result.status === 200) {
            this.success_message = "Registered successfully";
            this.error_message = null;
          } else {
            this.error_message = "Whoops! Could not registered with values";
            this.success_message = null;
          }
          this.showToast("notification");
          // console.log(result);
        }
      });
    },
  },
};
</script>
