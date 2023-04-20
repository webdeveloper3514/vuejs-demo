<template>
  <perfect-scrollbar class="app-content-inner-padding h-100">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">HOME</a></li>
      <li class="breadcrumb-item">
        <a href="/operations">OPERATION DASHBOARD</a>
      </li>
      <li class="breadcrumb-item active">MODIFY</li>
    </ul>
    <h1>OPERATION SKYFALL</h1>
    <hr class="mb-4 mt-n1" />
    <div>
      <div class="row">
        <div class="col-xl-12">
          <card class="mb-3 bg-opacity-5 bg-default">
            <card-body>
              <div
                class="d-flex fw-bold smal align-items-center justify-content-between row"
              >
                <div
                  class="d-flex gap-2 align-items-center col-sm-12 col-md-6 text-capitalize"
                >
                  <h6>{{ formState?.currentOperation?.operationName }}</h6>
                  <h6
                    :class="
                      formState?.currentState === 'running' ? 'text-theme' : ''
                    "
                  >
                    {{ formState?.currentState }}
                  </h6>
                </div>
                <div
                  class="d-flex gap-2 col-sm-12 col-md-6 justify-content-end"
                >
                  <button
                    class="btn btn-warning text-white"
                    type="button"
                    @click="changeStatus('stop')"
                  >
                    Stop
                  </button>
                  <button
                    class="btn btn-theme text-white"
                    type="button"
                    @click="changeStatus('reboot')"
                  >
                    Reboot
                  </button>
                  <button
                    class="btn btn-theme text-white"
                    type="button"
                    @click="changeStatus('re-provision')"
                  >
                    Re-provision
                  </button>
                </div>
              </div>
            </card-body>
          </card>
        </div>
        <div class="col-xl-12">
          <card class="mb-3 bg-opacity-5 bg-default">
            <card-body>
              <div class="d-flex fw-bold medium mb-3">
                <h5 class="flex-grow-1">COMMAND SERVER INSTANCE HISTORY</h5>
              </div>
              <div class="row align-items-center mb-4 table-responsive">
                <!-- default table -->
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row">1</td>
                      <td>{{ "Date=1" }}</td>
                      <td class="text-theme">Reboot</td>
                    </tr>
                    <tr>
                      <td scope="row">2</td>
                      <td>{{ "Date=2" }}</td>
                      <td class="text-danger">Stop</td>
                    </tr>
                    <tr>
                      <td scope="row">3</td>
                      <td>{{ "Date=2" }}</td>
                      <td class="text-theme">Reboot</td>
                    </tr>
                    <tr>
                      <td scope="row">4</td>
                      <td>{{ "Date=2" }}</td>
                      <td class="text-danger">Stop</td>
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
        </div>
      </div>
    </div>
  </perfect-scrollbar>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

import { useAppOptionStore } from "@/stores/app-option";
import Service from "@/services/operations";

const appOption = useAppOptionStore();
const formState = reactive({
  currentOperation: {},
  operationHistories: [],
  currentStatus: "",
});
export default {
  name: "Operations",
  components: {},
  props: {
    id: String,
  },
  setup() {
    const route = useRoute();
    let status = [];
    let actions = [];
    let histories = [];
    onMounted(async () => {
      appOption.appContentFullHeight = true;
      appOption.appContentClass = "p-0";
      // get data all
      actions = await Service.getOperationActions();
      status = await Service.getOperationStatus();

      //
      const operationId = route.params.id;
      if (operationId) {
        // get curren operation
        const operation = await Service.getOperationById(operationId);
        histories = await Service.getOperationHistoryById(operationId);
        if (operation != null) {
          console.log(operation, status);
          formState.currentOperation = operation;
          formState.operationHistories = histories != null ? histories : [];
          const filtered = status.filter(
            (st) => operation.operationStatusId === st.id
          );

          formState.currentState =
            filtered != null && filtered.length > 0
              ? filtered[0].statusName
              : "unknown";
        }
      }
    });
    return {
      formState,
      status,
      actions,
    };
  },
  created() {},

  methods: {
    async changeStatus(operationName) {
      let state = "";
      if (operationName.toLowerCase() === "stop") {
        state = "due";
      }
      if (operationName.toLowerCase() === "re-provision") {
        state = "inprogress";
      }
      if (operationName.toLowerCase() === "stop") {
        state = "inprogress";
      }
      const filteredStatus = this.status.filter(
        (st) => st.statusName.toLowerCase() === state
      );
      const filteredActions = this.actions.filter(
        (ac) => ac.actionName.toLowerCase() === operationName``
      );
      if (filteredStatus.length > 0 && filteredActions.length > 0) {
        const operationId = route.params.id;
        const result = await Service.changeStatus(
          operationId,
          filteredStatus.id,
          filteredActions[0].id
        );
        if (result.history) {
          this.formState.operationHistories.push(result.history);
        }
      }
    },
  },
};
</script>
