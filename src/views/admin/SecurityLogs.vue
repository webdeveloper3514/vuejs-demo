<!--//TODO Review entire page, replace the table with https://seantheme.com/hud-vue/table/plugins and fix table pagination-->

<template>
  <perfect-scrollbar class="app-content-inner-padding h-100">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">ADMINISTRATION</a></li>
      <li class="breadcrumb-item"><a href="/">IDENTITY MANAGEMENT</a></li>
      <li class="breadcrumb-item active">SECURITY LOGS</li>
    </ul>
    <div class="row align-items-center">
      <div class="col-sm-10">
        <h1 class="page-header">Security Logs</h1>
      </div>
    </div>
    <hr class="mb-4 mt-n1" />

    <div class="tbl_wrap">
      <card>
        <card-body>
          <div>
            <form>
              <div class="row ">
                <div class="col-md-12 col-lg-3 col-xxl-2 ">
                  <div class="mb-3 ">
                    <label class="form-label">Date </label>
                    <div class="row">
                      <div class="col-12">
                        <datepicker
                          v-model="selectedDates"
                          multiCalendars
                          range
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3 col-xxl-2 ">
                  <div class="mb-3 ">
                    <label class="form-label">Application</label
                    ><input
                      v-model="securityLogFilterParams.applicationName"
                      class="form-control"
                      type="text"
                    />
                  </div>
                </div>
                <div class="col-md-6 col-lg-3 col-xxl-2 ">
                  <div class="mb-3 ">
                    <label class="form-label">Identity</label
                    ><input
                      v-model="securityLogFilterParams.identity"
                      class="form-control"
                      type="text"
                    />
                  </div>
                </div>
                <div class="col-md-6 col-lg-3 col-xxl-2 ">
                  <div class="mb-3">
                    <label class="form-label">UserName</label
                    ><input
                      v-model="securityLogFilterParams.userName"
                      class="form-control"
                      type="text"
                    />
                  </div>
                </div>
                <div class="col-md-6 col-lg-3 col-xxl-2 ">
                  <div class="mb-3">
                    <label class="form-label">Action</label>
                    <input
                      v-model="securityLogFilterParams.action"
                      class="form-control"
                      type="text"
                    />
                  </div>
                </div>
                <div class="col-md-6 col-lg-3 col-xxl-2">
                  <div class="mb-3 ">
                    <label class="form-label" >Client</label>
                    <input
                      v-model="securityLogFilterParams.clientId"
                      class="form-control"
                      type="text"
                    />
                  </div>
                </div>
                <div class="col-md-6 col-lg-3 col-xxl-2 ">
                  <div class="mb-3 ">
                    <label class="form-label">Correlation Id</label
                    ><input
                      v-model="securityLogFilterParams.correlationId"
                      class="form-control"
                      type="text"
                    />
                  </div>
                </div>
                <div class="col-md-6 col-lg-3 col-xxl-2 ">
                  <div
                    style="margin-top: 28px"
                  >
                    <button
                      class="btn btn-theme"
                      type="button"
                      v-on:click="this.ActionsApiHandler('filterSecurityLogs')"
                    >
                      <i class="fas fa-search"></i> Refresh
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </card-body>
      </card>
    </div>
    <!-- security logs table -->
    <div class="mt-4">
      <card>
        <card-body>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="border-bottom-trans">
                  <th scope="col">Date</th>
                  <th scope="col">Action</th>
                  <th scope="col">Ip Address</th>
                  <th scope="col">BROWSER</th>
                  <th scope="col">APPLICATION</th>
                  <th scope="col">IDENTITY</th>
                  <th scope="col">USERNAME</th>
                  <th scope="col">CLIENT</th>
                  <th scope="col">CORRELATION ID</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td v-loading="loading" class="p-5" colspan="9"></td>
                </tr>
                <tr v-for="(item, index) in SecurityLogs" v-bind:key="index">
                  <td>{{ formattedDate(item.creationTime) }}</td>
                  <td>{{ item.action }}</td>
                  <td>{{ item.clientIpAddress }}</td>
                  <td>{{ item.browserInfo }}</td>
                  <td>{{ item.applicationName }}</td>
                  <td>{{ item.identity }}</td>
                  <td>{{ item.userName }}</td>
                  <td>{{ item.clientId }}</td>
                  <td>{{ item.correlationId }}</td>
                </tr>
                <tr v-if="SecurityLogs?.length === 0 && loading === false">
                  <td class="text-center pt-15px pb-15px" colspan="9">
                    No records found based on your search
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <td colspan="5">{{ SecurityLogs?.length }} Total</td>
              </tfoot>
            </table>
          </div>
        </card-body>
      </card>
    </div>
  </perfect-scrollbar>
</template>

<script>
import SecurityLogs from "../../services/admin/securityLogs";
import datepicker from "@/components/plugins/Datepicker.vue";
import moment from "moment";

export default {
  name: "SecurityLogs",
  components: {
    datepicker: datepicker,
  },
  data() {
    return {
      loading: false,
      SecurityLogs: [],
      selectedDates: [],
      securityLogFilterParams: {
        startTime: "",
        endTime: "",
        applicationName: "",
        identity: "",
        action: "",
        userName: "",
        clientId: "",
        correlationId: "",
        skipCount: 0,
        maxResultCount: 200,
      },
    };
  },
  mounted() {
    this.ActionsApiHandler("getSecurityLogs");
  },
  watch: {
    selectedDates: {
      handler(newValue, oldValue) {
        const proxyConvert = JSON.parse(JSON.stringify(this.selectedDates));
        const startDate =
          proxyConvert[0] !== null && proxyConvert[0].substr(0, 10);
        const endDate =
          proxyConvert[1] !== null && proxyConvert[1].substr(0, 10);

        this.securityLogFilterParams.startTime = startDate;
        this.securityLogFilterParams.endTime = endDate;
      },
    },
  },
  methods: {
    ActionsApiHandler(action) {
      if (action === "getSecurityLogs") {
        this.loading = true;
        try {
          SecurityLogs.getSecurityLogs().then(
            (res) => {
              this.SecurityLogs = res.data.items;
              this.loading = false;
            },
            (error) => {
              this.loading = false;
              console.log("error", error);
            }
          );
        } catch (err) {
          this.loading = false;
          console.log("error", err);
        }
      }
      if (action === "filterSecurityLogs") {
        this.securityLogFilterParams.startTime === "" &&
          delete this.securityLogFilterParams["startTime"];
        this.securityLogFilterParams.endTime === "" &&
          delete this.securityLogFilterParams["endTime"];
        this.securityLogFilterParams.applicationName === "" &&
          delete this.securityLogFilterParams["applicationName"];
        this.securityLogFilterParams.identity === "" &&
          delete this.securityLogFilterParams["identity"];
        this.securityLogFilterParams.action === "" &&
          delete this.securityLogFilterParams["action"];
        this.securityLogFilterParams.userName === "" &&
          delete this.securityLogFilterParams["userName"];
        this.securityLogFilterParams.clientId === "" &&
          delete this.securityLogFilterParams["clientId"];
        this.securityLogFilterParams.correlationId === "" &&
          delete this.securityLogFilterParams["correlationId"];
        this.securityLogFilterParams.startTime === "" ||
          this.securityLogFilterParams.startTime === null ||
          (this.securityLogFilterParams.startTime === false &&
            delete this.securityLogFilterParams["startTime"]);
        this.securityLogFilterParams.endTime === "" ||
          this.securityLogFilterParams.endTime === null ||
          (this.securityLogFilterParams.endTime === false &&
            delete this.securityLogFilterParams["endTime"]);
        try {
          SecurityLogs.filterSecurityLogs(this.securityLogFilterParams).then(
            (res) => {
              this.SecurityLogs = res.data.items;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
    },
    formattedDate(date) {
      const dateObj = moment(date, "YYYY-MM-DD[T]HH:mm:ss.SSSSSS");
      return dateObj.format("M/D/YYYY h:mm a");
    },
  },
};
</script>
