<template>
  <perfect-scrollbar class="app-content-inner-padding h-100">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">HOME</a></li>
      <li class="breadcrumb-item">
        <a href="/operations">OPERATIONS</a>
      </li>
      <li class="breadcrumb-item active">FINDING</li>
    </ul>
    <h1 class="page-header">New Finding</h1>
    <hr class="mb-4 mt-n1" />

    <card class="mb-3 bg-opacity-5 bg-default">
      <card-body>
        <div class="d-flex fw-bold medium mb-3">
          <span class="flex-grow-1">Finding Information</span>
        </div>
        <el-form
          ref="form"
          :model="pageState.form"
          :rules="rules"
          label-position="right"
          label-width="150px"
        >
          <div class="row">
            <div class="col-xs-12 col-md-6 col-lg-3">
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
            <div class="col-xs-12 col-md-6 col-lg-3">
              <div class="form-group mb-3">
                <label class="form-label" for="resources"
                  >Assigned Resources</label
                >
                <vue-select
                  v-model="pageState.form.resources"
                  :options="pageState.resourcesOptions"
                  multiple
                  placeholder="Select resources"
                ></vue-select>
              </div>
            </div>
            <div class="col-xs-12 col-md-6 col-lg-3">
              <div class="form-group mb-3">
                <label class="form-label" for="name">Closure Term</label>
                <input
                  id="name"
                  v-model="pageState.form.term"
                  class="form-control"
                  placeholder=""
                  type="text"
                />
              </div>
            </div>
            <div class="col-xs-12 col-md-6 col-lg-3">
              <div class="form-group mb-3">
                <label class="form-label" for="date">Opened Date</label>
                <datepicker v-model="pageState.form.opened" />
              </div>
            </div>
            <div class="col-xs-12 col-md-6 col-lg-3">
              <div class="form-group mb-3">
                <label class="form-label" for="severityOptions">Severity</label>
                <select v-model="pageState.form.severity" class="form-select">
                  <option></option>
                </select>
              </div>
            </div>
            <div class="col-xs-12 col-md-6 col-lg-3">
              <div class="form-group mb-3">
                <label class="form-label" for="cvss">CVSS(if applicable)</label>
                <select v-model="pageState.form.cvss" class="form-select">
                  <option></option>
                </select>
              </div>
            </div>
          </div>
        </el-form>
      </card-body>
    </card>
    <!-- detailed description  -->
    <card class="mb-3 bg-opacity-5 bg-default">
      <card-body>
        <div class="d-flex fw-bold medium mb-3">
          <span class="flex-grow-1">Description</span>
        </div>
        <div class="col-xs-12 mb-4">
          <quill-editor theme="snow" />
        </div>
      </card-body>
    </card>
    <!-- evidences  -->
    <card class="mb-3 bg-opacity-5 bg-default">
      <card-body>
        <div class="d-flex fw-bold medium mb-3">
          <span class="flex-grow-1">Evidences</span>
        </div>
        <div class="row mb-4">
          <input
            id="image"
            accept="image/*"
            hidden
            onChange="{imageChange}"
            type="file"
          />
          <label for="image">
            <div
              class="w-100 d-flex justify-content-center bg-gray-800 rounded align-items-center"
              style="height: 60px"
            >
              <i class="bi bi-upload fs-3"></i>
            </div>
          </label>
        </div>
      </card-body>
    </card>
    <!-- detailed recommendation  -->
    <card class="mb-3 bg-opacity-5 bg-default">
      <card-body>
        <div class="d-flex fw-bold medium mb-3">
          <span class="flex-grow-1">Recommendations</span>
        </div>
        <div class="col-xs-12 mb-4">
          <quill-editor theme="snow" />
        </div>
      </card-body>
    </card>
    <!-- command server history table -->
    <card class="mb-3 bg-opacity-5 bg-default">
      <card-body>
        <div class="d-flex fw-bold medium mb-3">
          <span class="flex-grow-1">Command Server Instance History</span>
          <button class="btn btn-outline-theme btn-sm">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div class="col-xl-12 align-items-center mb-4 table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Link</th>
                <th scope="col" width="120">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">1</td>
                <td>CWE LINK 1</td>
                <td>{{ new Date() }}</td>
                <td>
                  <div class="d-flex gap-1">
                    <button class="btn btn-default btn-sm">edit</button>
                    <button class="btn btn-default btn-sm">remove</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td scope="row">2</td>
                <td>CWE LINK 2</td>
                <td>/www/www/www</td>
                <td>
                  <div class="d-flex gap-1">
                    <button class="btn btn-default btn-sm">edit</button>
                    <button class="btn btn-default btn-sm">remove</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td scope="row">3</td>
                <td>CWE LINK 3</td>
                <td>/www/www/www</td>
                <td>
                  <div class="d-flex gap-1">
                    <button class="btn btn-default btn-sm">edit</button>
                    <button class="btn btn-default btn-sm">remove</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td scope="row">4</td>
                <td>CWE LINK 4</td>
                <td>/www/www/www</td>
                <td>
                  <div class="d-flex gap-1">
                    <button class="btn btn-default btn-sm">edit</button>
                    <button class="btn btn-default btn-sm">remove</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav>
          <ul class="pagination justify-content-center">
            <li class="page-item disabled">
              <a class="page-link">Previous</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
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
      @click="addFinding()"
    >
      <i v-if="loading" aria-hidden="true" class="fa fa-spinner fa-spin"></i>
      Save
    </button>
  </perfect-scrollbar>
</template>

<script>
import datepicker from "@/components/plugins/Datepicker.vue";
import vueSelect from "@/components/plugins/VueSelect.vue";
import quillEditor from "@/components/plugins/QuillEditor.vue";
import Service from "@/services/finding";
import { useAppAuth } from "@/stores/app-auth";
import { reactive } from "vue";
import { ScrollSpy } from "bootstrap";
import { useAppOptionStore } from "@/stores/app-option";

const appAuth = useAppAuth();
const User = appAuth.$state.userInfo || {};

const appOption = useAppOptionStore();
const pageState = reactive({
  form: {
    name: "",
    resources: [],
    term: "",
    opened: "",
    severity: "",
    cvss: "",
    description: "",
    recommendation: "",
  },
  resourcesOptions: [],
});

export default {
  components: {
    datepicker,
    vueSelect,
    quillEditor,
  },

  async mounted() {
    new ScrollSpy(document.body, {
      target: "#sidebar-bootstrap",
      offset: 200,
    });
    appOption.appContentFullHeight = true;
    appOption.appContentClass = "p-0";

    const resources = await Service.getResources();
    if (resources != null && resources.items?.length > 0) {
      resources.items?.forEach((e) => {
        pageState.resourcesOptions.push({
          value: e.id,
          label: e.name,
        });
      });
      console.log(pageState.resourcesOptions);
    }
  },
  methods: {
    async addFinding() {
      this.$refs["form"].validate(async (valid) => {
        const data = {
          name: pageState.form.name,
          // userId:Array.from(pageState.form.resources.map((rs)=>{ return {userId:rs.value}})),
          // userId:JSON.stringify(Array.from(pageState.form.resources.map((rs)=>rs.value))) ,
          userId: Array.from(pageState.form.resources.map((rs) => rs.value)),
          closureTerm: pageState.form.term,
          openedDate: pageState.form.opened,
          severity: pageState.form.severity,
          cvss: pageState.form.cvss,
          description: pageState.form.description,
          recommendation: pageState.form.recommendation,
          evidences: pageState.form.evidences,
        };
        await Service.addFinding(data);
      });
      console.log(pageState.form);
    },
  },
  setup() {
    return {
      pageState,
      rules: {
        name: [
          {
            required: true,
            message: "Please enter find name",
            trigger: "blur",
          },
        ],
        resources: [
          {
            type: "array",
            required: true,
            message: "Please select assigned roles",
            trigger: "change",
          },
        ],
        term: [
          {
            required: true,
            message: "Please input terms",
            trigger: "change",
          },
        ],
        opened: [
          {
            type: "date",
            required: true,
            message: "Please select opened date ",
            trigger: "change",
          },
        ],
        severity: [
          {
            require: true,
            message: "Please select severity",
            trigger: "change",
          },
        ],
        cvss: [
          {
            require: true,
            message: "Please select cvss",
            trigger: "change",
          },
        ],
        description: [
          {
            require: true,
            message: "Please input description",
            trigger: "change",
          },
        ],
        recommendation: [
          {
            require: true,
            message: "Please input recommendation",
            trigger: "change",
          },
        ],
      },
    };
  },
};
</script>
