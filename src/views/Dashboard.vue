<template>
  <perfect-scrollbar class="app-content-inner-padding h-100">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">HOME</a></li>
      <li class="breadcrumb-item active">OWNER DASHBOARD</li>
    </ul>
    <h1 class="page-header">Tenant Dashboard</h1>
    <hr class="mb-4 mt-n1" />

    <card class="mb-3 bg-opacity-5 bg-default">
      <card-body>
        <div class="d-flex fw-bold medium mb-3">
          <span class="flex-grow-1">OPERATORS ACTIVITY</span>
        </div>
        <div class="row align-items-center mb-2">
          <chartjs :data="chart.data" :type="chart.type" />
        </div>
      </card-body>
    </card>
    <card class="mb-3 bg-opacity-5 bg-default">
      <card-body>
        <div class="d-flex fw-bold medium mb-3">
          <span class="flex-grow-1">OPERATORS ACTIVITY</span>
        </div>
        <div class="row align-items-center mb-2">
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
      </card-body>
    </card>
    <card class="mb-3 bg-opacity-5 bg-default">
      <card-body>
        <div class="d-flex fw-bold medium mb-3">
          <span class="flex-grow-1">OPERATORS ACTIVITY</span>
        </div>
        <div class="row align-items-center mb-2">
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
      </card-body>
    </card>
    <card class="mb-3 bg-opacity-5 bg-default">
      <card-body>
        <div class="d-flex fw-bold medium mb-3">
          <span class="flex-grow-1">LATEST OPERATION ACTIVITIES</span>
        </div>
        <div class="row align-items-center mb-2">
          <!-- default table -->
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Operation name</th>
                <th scope="col">Date started</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </card-body>
    </card>
    <card class="mb-3 bg-opacity-5 bg-default">
      <card-body>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </card-body>
    </card>
  </perfect-scrollbar>
</template>

<script>
import { useAppAuth } from "@/stores/app-auth";
import { useAppOptionStore } from "@/stores/app-option";
import chartjs from "@/components/plugins/Chartjs.vue";
import { useAppVariableStore } from "@/stores/app-variable";
import VueCookies from "vue-cookies";

const appAuth = useAppAuth();

const appOption = useAppOptionStore();

const appVariable = useAppVariableStore();

export default {
  name: "Dashboard",
  components: {
    chartjs: chartjs,
  },
  data() {
    return {
      User: appAuth.$state.userInfo || {},
      chart: {
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
      },
    };
  },
  async created() {
    try {
      const res = await this.$auth.loginCallback(window.location.href);
      if (res?.access_token) {
        console.log(res);
        VueCookies.set("user-token", res?.access_token, { secure: true });
        VueCookies.set("code-verifier", res?.code_verifier, { secure: true });
        VueCookies.set("id_token", res?.id_token, { secure: true });
      }
    } catch (e) {
      console.error(e);
    }
  },
  mounted() {
    appOption.appSidebarHide = false;
    appOption.appHeaderHide = false;

    appOption.appContentClass = "p-0";
    appOption.appContentFullHeight = true;
  },
  methods: {},
};
</script>
