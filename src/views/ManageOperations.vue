<template>
  <perfect-scrollbar class="app-content-inner-padding h-100">
    <!-- breadcrumb -->
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">HOME</a></li>
      <li class="breadcrumb-item">
        <a href="/operations">OPERATIONS</a>
      </li>
      <li class="breadcrumb-item active">MANAGE OPERATION</li>
    </ul>
    <!-- title -->
    <div class="d-flex fw-bold align-items-center">
      <h1 class="flex-grow-1">Operation SkyFall</h1>
      <div>
        <button class="btn btn-theme" type="button" @click="goModifyOperation">
          Modify Operation
        </button>
      </div>
    </div>
    <hr class="mb-4 mt-n1" />
    <div>
      <!-- detail section -->
      <div class="row">
        <div class="col-xl-4 col-lg-6">
          <card class="bg-default bg-opacity-10 mb-3">
            <card-header class="border-theme fw-bold small text-white"
              >MEAN TIME TO DETECT
            </card-header>
            <card-body class="p-5">
              <h5 class="card-title text-success">
                2 DAYS AND 15 HOURS AND 05 MINUTES
              </h5>
              <p class="card-text text-white text-opacity-75">
                The average time it took to detect the attacks
              </p>
            </card-body>
          </card>
        </div>
        <div class="col-xl-4 col-lg-6">
          <card class="bg-default bg-opacity-10 mb-3">
            <card-header class="border-theme fw-bold small text-white"
              >MEAN TIME TO RESPOND
            </card-header>
            <card-body class="px-4 py-5">
              <h5 class="card-title text-success">
                26 DAYS AND 23 HOURS AND 12 MINUTES
              </h5>
              <p class="card-text text-white text-opacity-75">
                The average time it took to respond to the attacks
              </p>
            </card-body>
          </card>
        </div>
        <div class="col-xl-4 col-lg-6">
          <card class="bg-default bg-opacity-10 mb-3">
            <card-header class="border-theme fw-bold small text-white"
              >DETECTION COVERAGE
            </card-header>
            <card-body class="p-5">
              <h1 class="card-title text-success">80%</h1>
              <p class="card-text text-white text-opacity-75">
                Of the attacks were detected by the blue team
              </p>
            </card-body>
          </card>
        </div>
      </div>
      <!-- summary -->
      <card class="bg-default bg-opacity-10 mb-3">
        <card-body class="p-4">
          <div
            class="d-flex fw-bold medium mb-3 align-items-center justify-content-between"
          >
            <h5>EXCUTE SUMMARY</h5>
          </div>
          <div class="col-xs-12 mb-4">
            <quill-editor theme="snow" />
          </div>
        </card-body>
      </card>
      <!-- goals -->
      <card class="bg-default bg-opacity-10 mb-3">
        <card-body class="p-4">
          <div
            class="d-flex fw-bold medium mb-3 align-items-center justify-content-between"
          >
            <h5>GOLAS AND OBJECTIVES</h5>
          </div>
          <div class="col-xs-12 mb-4">
            <perfect-scrollbar>
              <div
                v-if="pageState.loadingObjective"
                class="w-100 d-flex justify-content-center p-2"
              >
                <div class="spinner-border text-danger" role="status"></div>
              </div>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Operation name</th>
                    <th scope="col">Date started</th>
                    <th scope="col">Status</th>
                    <th scope="col" width="120">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(objective, index) in pageState.objectives">
                    <td scope="row">{{ index + 1 }}</td>
                    <td>{{ getOperationName(objective.operationId) }}</td>
                    <td>{{ objective.startedDate }}</td>
                    <td>
                      {{ getOperationStatusName(objective.operationStatusId) }}
                    </td>
                    <td>
                      <div class="d-flex gap-2">
                        <button class="btn btn-default btn-sm" type="button">
                          Edit
                        </button>
                        <button class="btn btn-default btn-sm" type="button">
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </perfect-scrollbar>
          </div>
        </card-body>
      </card>
      <!-- chart -->
      <card class="mb-3 bg-opacity-10 bg-default">
        <card-body>
          <div class="d-flex fw-bold medium mb-3">
            <h5 class="flex-grow-1">ATTACK VS DEFENCES</h5>
          </div>
          <div class="row align-items-center mb-2">
            <div v-if="chart != null">
              <chartjs :data="chart.data" :type="chart.type" height="100" />
            </div>
          </div>
        </card-body>
      </card>
      <card class="mb-3 bg-opacity-10 bg-default">
        <card-body>
          <div class="row">
            <div
              class="d-flex fw-bold medium mb-3 justify-content-between flex-wrap"
            >
              <h5 class="flex-grow-1">NARRATIVE</h5>
              <div class="d-flex gap-2">
                <button class="btn btn-warning" type="button">
                  + Objective Accomplishment
                </button>
                <button
                  class="btn btn-theme"
                  type="button"
                  @click="goNarrative"
                >
                  + Narrative Block
                </button>
              </div>
            </div>

            <div class="d-none d-sm-none d-md-none d-lg-block d-xl-block">
              <perfect-scrollbar style="height: 530px">
                <div
                  v-if="pageState.loadingNarrations"
                  class="spinner-border text-danger"
                ></div>
                <horizontal-timeline
                  v-if="!pageState.loadingNarrations"
                  :list="pageState.narrations"
                ></horizontal-timeline>
              </perfect-scrollbar>
            </div>
            <div class="w-100 d-lg-none d-block">
              <vertical-timeline></vertical-timeline>
            </div>
          </div>
        </card-body>
      </card>
      <!-- finding table -->
      <card class="bg-default bg-opacity-10 mb-3">
        <card-body class="p-4">
          <div
            class="d-flex fw-bold medium mb-3 align-items-center justify-content-between"
          >
            <h5>FINDING</h5>
            <div class="d-flex gap-2">
              <button class="btn btn-theme" type="button" @click="goFinding">
                +
              </button>
            </div>
          </div>
          <div class="col-xs-12 mb-4">
            <perfect-scrollbar>
              <div
                v-if="pageState.loadingFinding"
                class="w-100 d-flex justify-content-center p-2"
              >
                <div class="spinner-border text-danger" role="status"></div>
              </div>
              <table v-if="!pageState.loadingFinding" class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Operation name</th>
                    <th scope="col">Date started</th>
                    <th scope="col">Status</th>
                    <th scope="col" width="120">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(finding, index) in pageState.findings">
                    <td scope="row">{{ index + 1 }}</td>
                    <td>{{ getOperationName(finding.operationId) }}</td>
                    <td>{{ finding.openedDate }}</td>
                    <td>
                      {{ getOperationStatusName(finding.operationStatusId) }}
                    </td>
                    <td>
                      <div class="d-flex gap-2">
                        <button class="btn btn-default btn-sm" type="button">
                          Edit
                        </button>
                        <button class="btn btn-default btn-sm" type="button">
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </perfect-scrollbar>
          </div>
        </card-body>
      </card>
      <!-- recommendation table -->
      <card class="bg-default bg-opacity-10 mb-3">
        <card-body class="p-4">
          <div
            class="d-flex fw-bold medium mb-3 align-items-center justify-content-between"
          >
            <h5>RECOMMENDATION</h5>
            <div class="d-flex gap-2">
              <button
                class="btn btn-theme"
                type="button"
                @click="goRecommendation"
              >
                +
              </button>
            </div>
          </div>
          <div class="col-xs-12 mb-4">
            <perfect-scrollbar>
              <div
                v-if="pageState.loadingRecommendation"
                class="w-100 d-flex justify-content-center p-2"
              >
                <div class="spinner-border text-danger" role="status"></div>
              </div>
              <table v-if="!pageState.loadingRecommendation" class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Recommendation</th>
                    <th scope="col">Kind</th>
                    <th scope="col">Type</th>
                    <th scope="col" width="120">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(finding, index) in pageState.findings">
                    <td scope="row">{{ index + 1 }}</td>
                    <td>{{ getOperationName(finding.operationId) }}</td>
                    <td>{{ finding.openedDate }}</td>
                    <td>
                      {{ getOperationStatusName(finding.operationStatusId) }}
                    </td>
                    <td>
                      <div class="d-flex gap-2">
                        <button class="btn btn-default btn-sm" type="button">
                          Edit
                        </button>
                        <button class="btn btn-default btn-sm" type="button">
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </perfect-scrollbar>
          </div>
        </card-body>
      </card>
    </div>
  </perfect-scrollbar>
  <!-- </div> -->
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useAppVariableStore } from "@/stores/app-variable";
import { useAppOperation } from "@/stores/app-operations";
import quillEditor from "@/components/plugins/QuillEditor.vue";
import chartjs from "@/components/plugins/Chartjs.vue";
import horizontalTimeline from "@/components/plugins/HorizontalTimeline.vue";
import verticalTimeline from "@/components/plugins/VerticalTimeline.vue";
import { useAppOptionStore } from "@/stores/app-option";
import FindingService from "@/services/finding";
import ObjectivService from "@/services/objective";
import NarrationService from "@/services/narrations";

const appOption = useAppOptionStore();
const appVariable = useAppVariableStore();
const operationId = ref(null);
const chart = ref(null);

const pageState = reactive({
  loadingObjective: false,
  loadingFinding: false,
  loadingRecommendation: false,
  loadingNarrations: false,
  objectives: [],
  findings: [],
  recommendations: [],
  narrations: [],
});

export default {
  components: {
    horizontalTimeline,
    verticalTimeline,
    chartjs,
    quillEditor,
  },
  methods: {
    goRecommendation() {
      this.$router.push({
        name: "recommendation.add",
        params: { id: operationId.value },
      });
    },
    goModifyOperation() {
      this.$router.push({
        name: "operations.modify",
        params: { id: operationId.value },
      });
    },
    goNarrative() {
      this.$router.push({ name: "narrative.add" });
    },
    goFinding() {
      this.$router.push({ name: "finding.add" });
    },
  },
  setup() {
    const operationState = useAppOperation();
    const route = useRoute();
    operationId.value = route.params.id;
    onMounted(() => {
      appOption.appContentFullHeight = true;
      appOption.appContentClass = "p-0";
      // initialize chart
      chart.value = {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Total Visitors",
              data: [11, 16, 20, 10, 5, 12],
              backgroundColor: "rgba(" + appVariable.color.themeRgb + ", .5)",
              borderColor: appVariable.color.theme,
              borderWidth: 1.5,
            },
            {
              label: "New Visitors",
              data: [12, 16, 20, 14, 23, 21],
              backgroundColor:
                "rgba(" + appVariable.color.whiteRgb + ", .2)" + ", .5)",
              borderColor: "rgba(" + appVariable.color.whiteRgb + ", .65)",
              borderWidth: 1.5,
            },
          ],
        },
      };
      pageState.loadingObjective = true;
      pageState.loadingFinding = true;
      pageState.loadingNarrations = true;
      // load objectives
      const objectives = ObjectivService.getObjectiveByOperationId(
        operationId.value
      )
        .then((list) => {
          if (list != null) {
            pageState.objectives = list;
            pageState.loadingObjective = false;
          }
        })
        .finally(() => {
          pageState.loadingObjective = false;
        });
      // load findings
      const findings = FindingService.getFindings()
        .then((list) => {
          if (list != null) {
            pageState.findings = list;
            pageState.loadingFinding = false;
          }
        })
        .finally(() => {
          pageState.loadingFinding = false;
        });
      // load narrations
      const narrations = NarrationService.getNarrations()
        .then((list) => {
          pageState.narrations = list;
          pageState.loadingNarrations = false;
        })
        .finally(() => {
          pageState.loadingNarrations = false;
        });
    });
    return {
      chart,
      pageState,
      getOperationName(operationId) {
        const filtered = operationState.operations?.filter(
          (op) => op.id == operationId
        );
        if (filtered.length > 0) {
          return filtered[0].operationName;
        } else {
          return "unknown operation";
        }
      },

      getOperationStatusName(statusId) {
        const filtered = operationState.operationStatus?.filter(
          (op) => op.id == statusId
        );
        if (filtered.length > 0) {
          return filtered[0].operationName;
        } else {
          return "unknown operation";
        }
      },
    };
  },
};
</script>
