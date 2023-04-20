<!--//TODO
Fix pagination
remove all undefined CSS attributes from the classes
remove all the tags starting with ABP
-->

<template>
  <!-- Audit and EntityChange header tab -->
  <perfect-scrollbar class="app-content-inner-padding h-100">
    <div class="setting-sec p-0">
      <div class="top_bar mb-4">
        <div class="row align-items-center">
          <div class="tac-links">
            <ul id="pills-tab" class="nav nav-tabs nav-tabs-v2">
              <li class="nav-item me-3">
                <a
                  :class="
                    ActiveTab === 'AuditLogs' ? 'nav-link active' : 'nav-link'
                  "
                  data-bs-toggle="pill"
                  v-on:click="ActiveTab = 'AuditLogs'"
                  >Audit Logs</a
                >
              </li>
              <li class="nav-item me-3">
                <a
                  :class="
                    ActiveTab === 'EntityChange'
                      ? 'nav-link active'
                      : 'nav-link'
                  "
                  data-bs-toggle="pill"
                  v-on:click="this.ActionsApiHandler('getEntityChanges')"
                  >Entity Change</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="setting-sec p-0">
      <!-- AuditLogs structure -->
      <div v-if="ActiveTab === 'AuditLogs'" class="tbl_wrap">
        <card>
          <card-body>
            <div>
              <form>
                <div class="row">
                  <div class="col-md-12 col-lg-3 col-xxl-2">
                    <div class="mb-3">
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
                  <div class="col-md-6 col-lg-3 col-xxl-2">
                    <div class="mb-3">
                      <label class="form-label">User Name</label
                      ><input
                        v-model="filterAuditLogsParams.userName"
                        class="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-3 col-xxl-2">
                    <div class="mb-3">
                      <label class="form-label">URL</label
                      ><input
                        v-model="filterAuditLogsParams.filterUrl"
                        class="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-3 col-xxl-2">
                    <div class="mb-3">
                      <label class="form-label">Min. Duration</label>
                      <input
                        v-model="filterAuditLogsParams.minExecutionDuration"
                        class="form-control"
                        type="number"
                      />
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-3 col-xxl-2">
                    <div class="mb-3">
                      <label class="form-label">Max. Duration</label
                      ><input
                        v-model="filterAuditLogsParams.maxExecutionDuration"
                        class="form-control"
                        type="number"
                      />
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-3 col-xxl-2">
                    <div class="mb-3">
                      <label class="form-label">HTTP Method</label
                      ><select
                        v-model="filterAuditLogsParams.httpMethod"
                        class="form-select form-control"
                      >
                        <option></option>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="DELETE">DELETE</option>
                        <option value="PUT">PUT</option>
                        <option value="HEAD">HEAD</option>
                        <option value="CONNECT">CONNECT</option>
                        <option value="OPTIONS">OPTIONS</option>
                        <option value="TRACE">TRACE</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-3 col-xxl-2">
                    <div class="mb-3">
                      <label class="form-label">HTTP Status Code</label
                      ><select
                        v-model="filterAuditLogsParams.httpStatusCode"
                        class="form-select form-control"
                      >
                        <option value=""></option>
                        <option
                          v-for="item in this.statusCodes"
                          :value="item.key"
                        >
                          {{ `${item.key} - ${item.value}` }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-3 col-xxl-2">
                    <div class="mb-3 mb-lg-0">
                      <label class="form-label">Application Name</label
                      ><input
                        v-model="filterAuditLogsParams.applicationName"
                        class="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-3 col-xxl-2">
                    <div class="mb-3 mb-lg-0">
                      <label class="form-label">Client IP Address</label
                      ><input
                        v-model="filterAuditLogsParams.clientIpAddress"
                        class="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-3 col-xxl-2">
                    <div class="mb-3 mb-lg-0">
                      <label class="form-label">Correlation Id</label
                      ><input
                        v-model="filterAuditLogsParams.correlationId"
                        class="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-3 col-xxl-2">
                    <div class="mb-3 mb-lg-0">
                      <label class="form-label">Has Exception</label
                      ><select
                        v-model="filterAuditLogsParams.hasException"
                        class="form-select form-control"
                      >
                        <option></option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-3 col-xxl-2">
                    <div class="mb-lg-0 d-grid" style="margin-top: 28px">
                      <button
                        class="btn btn-outline-theme"
                        type="button"
                        v-on:click="this.ActionsApiHandler('filterAuditLogs')"
                      >
                        Refresh
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div class="table-responsive mt-4">
                <table class="table">
                  <thead>
                    <tr class="border-bottom-trans">
                      <th scope="col"></th>
                      <th scope="col">HTTP REQUEST</th>
                      <th scope="col">USER</th>
                      <th scope="col">IP ADRDRESS</th>
                      <th scope="col">DATE</th>
                      <th scope="col">DURATION</th>
                      <th scope="col">APPLICATION NAME</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="loading">
                      <td v-loading="loading" class="p-5" colspan="7"></td>
                    </tr>
                    <tr
                      v-for="(item, index) in auditLogsDetails"
                      v-bind:key="index"
                    >
                      <td>
                        <button
                          class="btn btn-outline-default"
                          v-on:click="openActionsModals(item, 'detailsModal')"
                        >
                          <span><i class="fas fa-search"></i></span> Detail
                        </button>
                      </td>
                      <td>
                        <span
                          :class="
                            item.httpStatusCode === '200'
                              ? 'badge bg-success me-1'
                              : item.httpStatusCode === '302'
                              ? 'badge bg-warning me-1'
                              : 'badge bg-danger me-1'
                          "
                          >{{ item.httpStatusCode }}</span
                        >
                        <span
                          :class="
                            item.httpMethod === 'POST'
                              ? 'badge bg-success me-1'
                              : item.httpMethod === 'GET'
                              ? 'badge bg-info me-1'
                              : item.httpMethod === 'DELETE'
                              ? 'badge bg-danger me-1'
                              : item.httpMethod === 'PUT'
                              ? 'badge bg-warning me-1'
                              : item.httpMethod === 'HEAD'
                              ? 'badge bg-purple me-1'
                              : ''
                          "
                          >{{ item.httpMethod }}</span
                        >
                        {{ item.url }}
                      </td>
                      <td>{{ item.userName }}</td>
                      <td>{{ item.clientIpAddress }}</td>
                      <td>{{ item.executionTime }}</td>
                      <td>{{ item.executionDuration }}</td>
                      <td>{{ item.applicationName }}</td>
                    </tr>
                    <tr v-if="Languages?.length === 0 && loading === false">
                      <td class="text-center pt-15px pb-15px" colspan="7">
                        No records found based on your search
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <td colspan="7">{{ auditLogsDetails.length }} Total</td>
                  </tfoot>
                </table>
              </div>
            </div>
          </card-body>
        </card>
      </div>
      <!-- EntityChange structure -->
      <div v-if="ActiveTab === 'EntityChange'" class="tbl_wrap">
        <card>
          <card-body>
            <form>
              <div class="row">
                <div class="col-md-12 col-lg-4 col-xxl-3">
                  <div class="mb-3">
                    <label class="form-label">Time</label>
                    <div class="row">
                      <div class="col-12">
                        <datepicker multiCalendars range />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3 col-xxl-3">
                  <div class="mb-3">
                    <label class="form-label">Change Type</label
                    ><select
                      v-model="filterEntityChangeParams.entityChangeType"
                      class="form-select form-control"
                      @change="ActionsApiHandler('filterEntityChanges')"
                    >
                      <option></option>
                      <option value="0">Created</option>
                      <option value="1">Updated</option>
                      <option value="2">Deleted</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3 col-xxl-3">
                  <div class="mb-3">
                    <label class="form-label">Entity Type Full Name</label
                    ><input
                      v-model="filterEntityChangeParams.entityTypeFullName"
                      class="form-control"
                      type="text"
                    />
                  </div>
                </div>
                <div class="col-md-12 col-lg-2">
                  <div class="" style="margin-top: 28px">
                    <div class="col-6 d-grid text-end">
                      <button
                        class="btn btn-outline-theme"
                        type="button"
                        v-on:click="
                          this.ActionsApiHandler('filterEntityChanges')
                        "
                      >
                        Refresh
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr class="border-bottom-trans">
                    <th scope="col">DETAIL</th>
                    <th scope="col">TIME</th>
                    <th scope="col">CHANGE TYPE</th>
                    <th scope="col">TENANTID</th>
                    <th scope="col">ENTRY TYPE FULL NAME</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="loading">
                    <td v-loading="loading" class="p-5" colspan="5"></td>
                  </tr>
                  <tr
                    v-for="(item, index) in EntityChangeDetails"
                    v-bind:key="index"
                  >
                    <td>
                      <!-- <select
                    class="form-select form-select-lg"
                    style="width: 170px"
                    v-model="selectedOption"
                    @change="handleSelectOption(item)"
                  >
                    <option value="null" hidden>Action</option>
                    <option value="changeDetails">Change Details</option>
                    <option value="fullChangeHistory">
                      Full Change History
                    </option>
                  </select> -->
                    </td>
                    <td>
                      <!-- {{ item.changeTime }} -->
                    </td>
                    <td>
                      <!-- {{
                    item.changeType == "0"
                      ? "Created"
                      : item.changeType == "1"
                      ? "Updated"
                      : item.changeType == "2"
                      ? "Deleted"
                      : ""
                  }} -->
                    </td>
                    <td>
                      <!-- {{ item.tenantId }} -->
                    </td>
                    <td>
                      <!-- {{ item.entityTypeFullName }} -->
                    </td>
                  </tr>
                  <tr
                    v-if="
                      EntityChangeDetails?.length === 0 && loading === false
                    "
                  >
                    <td class="text-center pt-15px pb-15px" colspan="5">
                      No records found based on your search
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <td colspan="5">Total</td>
                </tfoot>
              </table>
            </div>
          </card-body>
        </card>
      </div>
    </div>

    <!--details Modal -->
    <div id="detailsModal" class="modal fade" data-backdrop="false">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detail</h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <div class="tac-links">
              <ul id="pills-tab" class="nav nav-tabs nav-tabs-v2">
                <li class="nav-item me-3">
                  <a
                    :class="
                      ActiveModalTab === 'Overall'
                        ? 'nav-link active'
                        : 'nav-link'
                    "
                    data-bs-toggle="pill"
                    v-on:click="ActiveModalTab = 'Overall'"
                    >Overall</a
                  >
                </li>
                <li class="nav-item me-3">
                  <a
                    :class="
                      ActiveModalTab === 'Actions'
                        ? 'nav-link active'
                        : 'nav-link'
                    "
                    data-bs-toggle="pill"
                    v-on:click="ActiveModalTab = 'Actions'"
                    >Actions</a
                  >
                </li>
              </ul>
            </div>

            <!-- Body Overall -->
            <div v-if="ActiveModalTab === 'Overall'">
              <div>
                <div
                  aria-labelledby="ngb-nav-11"
                  class="tab-pane fade show active"
                >
                  <div class="row">
                    <div class="col-form-label col col-lg-3">
                      <strong>HTTP Status Code</strong>
                    </div>
                    <div class="col-form-label col col-lg-9">
                      <span
                        :class="
                          getSingleAuditLog.httpStatusCode == '200'
                            ? 'badge bg-success me-1'
                            : getSingleAuditLog.httpStatusCode == '302'
                            ? 'badge bg-warning me-1'
                            : 'badge bg-danger me-1'
                        "
                        >{{ getSingleAuditLog.httpStatusCode }}</span
                      >
                    </div>
                  </div>
                  <hr class="m-0" />
                  <div class="row">
                    <div class="col-form-label col col-lg-3">
                      <strong>HTTP Method</strong>
                    </div>
                    <div class="col-form-label col col-lg-9">
                      <span
                        :class="
                          getSingleAuditLog.httpMethod == 'POST'
                            ? 'badge bg-success me-1'
                            : getSingleAuditLog.httpMethod == 'GET'
                            ? 'badge bg-info me-1'
                            : getSingleAuditLog.httpMethod == 'DELETE'
                            ? 'badge bg-danger me-1'
                            : getSingleAuditLog.httpMethod == 'PUT'
                            ? 'badge bg-warning me-1'
                            : ''
                        "
                        >{{ getSingleAuditLog.httpMethod }}</span
                      >
                    </div>
                  </div>
                  <hr class="m-0" />
                  <div class="row">
                    <div class="col-form-label col col-lg-3">
                      <strong>URL</strong>
                    </div>
                    <div class="col-form-label col col-lg-9">
                      {{ getSingleAuditLog.url }}
                    </div>
                  </div>
                  <hr class="m-0" />
                  <div class="row">
                    <div class="col-form-label col col-lg-3">
                      <strong>Client IP Address</strong>
                    </div>
                    <div class="col-form-label col col-lg-9">
                      <!-- 219.91.133.131 -->
                      {{ getSingleAuditLog.clientIpAddress }}
                    </div>
                  </div>
                  <hr class="m-0" />
                  <div class="row">
                    <div class="col-form-label col col-lg-3">
                      <strong>Client Name</strong>
                    </div>
                    <div class="col-form-label col col-lg-9">
                      {{ getSingleAuditLog.clientName }}
                    </div>
                  </div>
                  <hr class="m-0" />
                  <div class="row">
                    <div class="col-form-label col col-lg-3">
                      <strong>Exceptions</strong>
                    </div>
                    <div class="col-form-label col col-lg-9">
                      {{ getSingleAuditLog.exceptions }}
                    </div>
                  </div>
                  <hr class="m-0" />
                  <div class="row">
                    <div class="col-form-label col col-lg-3">
                      <strong>User Name</strong>
                    </div>
                    <div class="col-form-label col col-lg-9">
                      {{ getSingleAuditLog.userName }}
                    </div>
                  </div>
                  <hr class="m-0" />

                  <div class="row">
                    <div class="col-form-label col col-lg-3">
                      <strong>Time</strong>
                    </div>
                    <div class="col-form-label col col-lg-9">
                      {{ getSingleAuditLog.executionTime }}
                    </div>
                  </div>
                  <hr class="m-0" />
                  <div class="row">
                    <div class="col-form-label col col-lg-3">
                      <strong>Duration</strong>
                    </div>
                    <div class="col-form-label col col-lg-9">
                      {{ getSingleAuditLog.executionDuration }}
                    </div>
                  </div>
                  <hr class="m-0" />
                  <div class="row">
                    <div class="col-form-label col col-lg-3">
                      <strong>Browser Info</strong>
                    </div>
                    <div class="col-form-label col col-lg-9">
                      {{ getSingleAuditLog.browserInfo }}
                    </div>
                  </div>
                  <hr class="m-0" />
                  <div class="row">
                    <div class="col-form-label col col-lg-3">
                      <strong>Application Name</strong>
                    </div>
                    <div class="col-form-label col col-lg-9">
                      {{ getSingleAuditLog.applicationName }}
                    </div>
                  </div>
                  <hr class="m-0" />
                  <div class="row">
                    <div class="col-form-label col col-lg-3">
                      <strong>Correlation Id</strong>
                    </div>
                    <div class="col-form-label col col-lg-9">
                      {{ getSingleAuditLog.correlationId }}
                    </div>
                  </div>
                  <hr class="m-0" />
                  <div class="row">
                    <div class="col-form-label col col-lg-3">
                      <strong>Comments</strong>
                    </div>
                    <div class="col-form-label col col-lg-9">
                      {{ getSingleAuditLog.comments }}
                    </div>
                  </div>
                  <hr class="m-0" />
                  <div class="row">
                    <div class="col-form-label col col-lg-3">
                      <strong>Extra properties</strong>
                    </div>
                    <div class="col-form-label col col-lg-9">
                      <pre class="p-2" lang="json">
                {{ getSingleAuditLog.extraProperties }}
              </pre
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Body Actions -->
            <div v-if="ActiveModalTab === 'Actions'">
              <div>
                <div class="tab-pane fade active show">
                  <div class="mb-3 border border-dark rounded">
                    <div class="d-grid">
                      <!-- <button
                    type="button"
                    v-on:click="toggleAccordian = !toggleAccordian"
                    class="btn btn-primary d-flex justify-content-between text-break"
                  >
                    TenantAppService - GetAsync
                    <i
                      class="fa align-self-center fa-chevron-up"
                    ></i>
                  </button> -->
                      <div
                        v-for="(item, index) in this.getSingleAuditLog.actions"
                      >
                        <div id="accordionExample" class="accordion">
                          <div class="accordion-item">
                            <h2
                              :id="'headingOne' + index"
                              class="accordion-header"
                            >
                              <button
                                :aria-controls="'collapseOne' + index"
                                :data-bs-target="'#collapseOne' + index"
                                aria-expanded="true"
                                class="accordion-button"
                                data-bs-toggle="collapse"
                                type="button"
                              >
                                TenantAppService - GetAsync
                              </button>
                            </h2>
                            <div
                              :id="'collapseOne' + index"
                              :aria-labelledby="'headingOne' + index"
                              class="accordion-collapse collapse show"
                              data-bs-parent="accordionExample"
                            >
                              <div class="accordion-body">
                                <div class="m-3">
                                  <div class="row">
                                    <div class="col-form-label col col-lg-3">
                                      <strong>Duration</strong>
                                    </div>
                                    <div class="col-form-label col col-lg-9">
                                      {{ item.executionDuration }}
                                    </div>
                                  </div>
                                  <hr class="m-0" />
                                  <div class="row">
                                    <div class="col-form-label col col-lg-3">
                                      <strong>Parameters</strong>
                                    </div>
                                    <div class="col-form-label col col-lg-9">
                                      <pre class="p-2" lang="json">
                                      {{ item.extraProperties }}
                                      </pre>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-default"
              data-bs-dismiss="modal"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Change Details Modal -->
    <!--  <div class="modal fade" data-backdrop="false" id="changeDetailsModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Volo.Abp.OpenIddict.Tokens.OpenIddictToken
            (15035c40-c6a5-2027-a250-3a09d7b0bf54)
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                >
                  Created Mar 9, 2023, 8:36:41 AM by admin.
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div
                    class="mb-3 border border-dark rounded ng-tns-c174-8"
                  >
                    <div
                      class="ng-tns-c174-8 ng-trigger ng-trigger-collapse"
                      id="73621fc3-36b9-4ab8-bccd-eccea7d67324"
                      style="overflow: hidden"
                    >
                      <div class="m-3 ng-tns-c174-8">
                        <table class="table table-striped ng-tns-c174-8">
                          <thead class="ng-tns-c174-8">
                            <tr class="ng-tns-c174-8">
                              <th class="ng-tns-c174-8">Property Name</th>
                              <th class="ng-tns-c174-8">Original Value</th>
                              <th class="ng-tns-c174-8">New Value</th>
                            </tr>
                          </thead>
                          <tbody class="ng-tns-c174-8">
                            <tr class="ng-tns-c174-8">
                              <td class="ng-tns-c174-8">CreationDate</td>
                              <td class="ng-tns-c174-8"></td>
                              <td class="ng-tns-c174-8">
                                "2023-03-09T08:36:41Z"
                              </td>
                            </tr>
                            <tr class="ng-tns-c174-8">
                              <td class="ng-tns-c174-8">Properties</td>
                              <td class="ng-tns-c174-8"></td>
                              <td class="ng-tns-c174-8">null</td>
                            </tr>
                            <tr class="ng-tns-c174-8">
                              <td class="ng-tns-c174-8">Subject</td>
                              <td class="ng-tns-c174-8"></td>
                              <td class="ng-tns-c174-8">
                                "63f03283-0ed6-ceb5-9216-3a08e2017a95"
                              </td>
                            </tr>
                            <tr class="ng-tns-c174-8">
                              <td class="ng-tns-c174-8">RedemptionDate</td>
                              <td class="ng-tns-c174-8"></td>
                              <td class="ng-tns-c174-8">null</td>
                            </tr>
                            <tr class="ng-tns-c174-8">
                              <td class="ng-tns-c174-8">ReferenceId</td>
                              <td class="ng-tns-c174-8"></td>
                              <td class="ng-tns-c174-8">null</td>
                            </tr>
                            <tr class="ng-tns-c174-8">
                              <td class="ng-tns-c174-8">ExpirationDate</td>
                              <td class="ng-tns-c174-8"></td>
                              <td class="ng-tns-c174-8">
                                "2023-03-09T08:56:41Z"
                              </td>
                            </tr>
                            <tr class="ng-tns-c174-8">
                              <td class="ng-tns-c174-8">ApplicationId</td>
                              <td class="ng-tns-c174-8"></td>
                              <td class="ng-tns-c174-8">
                                "03cfd6ee-5275-a265-a074-3a08e2019914"
                              </td>
                            </tr>
                            <tr class="ng-tns-c174-8">
                              <td class="ng-tns-c174-8">Status</td>
                              <td class="ng-tns-c174-8"></td>
                              <td class="ng-tns-c174-8">"valid"</td>
                            </tr>
                            <tr class="ng-tns-c174-8">
                              <td class="ng-tns-c174-8">Type</td>
                              <td class="ng-tns-c174-8"></td>
                              <td class="ng-tns-c174-8">"id_token"</td>
                            </tr>
                            <tr class="ng-tns-c174-8">
                              <td class="ng-tns-c174-8">AuthorizationId</td>
                              <td class="ng-tns-c174-8"></td>
                              <td class="ng-tns-c174-8">
                                "e7c8b995-405d-7642-3720-3a09c8b33f88"
                              </td>
                            </tr>
                            <tr class="ng-tns-c174-8">
                              <td class="ng-tns-c174-8">Payload</td>
                              <td class="ng-tns-c174-8"></td>
                              <td class="ng-tns-c174-8">null</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-bs-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-outline-theme">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>

  &lt;!&ndash; Full Change History Modal &ndash;&gt;
  <div class="modal fade" data-backdrop="false" id="fullChangeHistoryModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">MODAL TITLE</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                >
                  Created Mar 9, 2023, 8:36:41 AM by admin.
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div class="d-grid ng-tns-c174-4"></div>
                  <div
                    class="ng-tns-c174-4 ng-trigger ng-trigger-collapse"
                    id="6a333801-55e8-4215-9bd7-ea8972a6b1d8"
                    style="overflow: hidden"
                  >
                    <div class="m-3 ng-tns-c174-4">
                      <table class="table table-striped ng-tns-c174-4">
                        <thead class="ng-tns-c174-4">
                          <tr class="ng-tns-c174-4">
                            <th class="ng-tns-c174-4">Property Name</th>
                            <th class="ng-tns-c174-4">Original Value</th>
                            <th class="ng-tns-c174-4">New Value</th>
                          </tr>
                        </thead>
                        <tbody class="ng-tns-c174-4">
                          <tr class="ng-tns-c174-4">
                            <td class="ng-tns-c174-4">CreationDate</td>
                            <td class="ng-tns-c174-4"></td>
                            <td class="ng-tns-c174-4">
                              "2023-03-09T08:36:41Z"
                            </td>
                          </tr>
                          <tr class="ng-tns-c174-4">
                            <td class="ng-tns-c174-4">Properties</td>
                            <td class="ng-tns-c174-4"></td>
                            <td class="ng-tns-c174-4">null</td>
                          </tr>
                          <tr class="ng-tns-c174-4">
                            <td class="ng-tns-c174-4">Subject</td>
                            <td class="ng-tns-c174-4"></td>
                            <td class="ng-tns-c174-4">
                              "63f03283-0ed6-ceb5-9216-3a08e2017a95"
                            </td>
                          </tr>
                          <tr class="ng-tns-c174-4">
                            <td class="ng-tns-c174-4">RedemptionDate</td>
                            <td class="ng-tns-c174-4"></td>
                            <td class="ng-tns-c174-4">null</td>
                          </tr>
                          <tr class="ng-tns-c174-4">
                            <td class="ng-tns-c174-4">ReferenceId</td>
                            <td class="ng-tns-c174-4"></td>
                            <td class="ng-tns-c174-4">null</td>
                          </tr>
                          <tr class="ng-tns-c174-4">
                            <td class="ng-tns-c174-4">ExpirationDate</td>
                            <td class="ng-tns-c174-4"></td>
                            <td class="ng-tns-c174-4">
                              "2023-03-09T08:56:41Z"
                            </td>
                          </tr>
                          <tr class="ng-tns-c174-4">
                            <td class="ng-tns-c174-4">ApplicationId</td>
                            <td class="ng-tns-c174-4"></td>
                            <td class="ng-tns-c174-4">
                              "03cfd6ee-5275-a265-a074-3a08e2019914"
                            </td>
                          </tr>
                          <tr class="ng-tns-c174-4">
                            <td class="ng-tns-c174-4">Status</td>
                            <td class="ng-tns-c174-4"></td>
                            <td class="ng-tns-c174-4">"valid"</td>
                          </tr>
                          <tr class="ng-tns-c174-4">
                            <td class="ng-tns-c174-4">Type</td>
                            <td class="ng-tns-c174-4"></td>
                            <td class="ng-tns-c174-4">"id_token"</td>
                          </tr>
                          <tr class="ng-tns-c174-4">
                            <td class="ng-tns-c174-4">AuthorizationId</td>
                            <td class="ng-tns-c174-4"></td>
                            <td class="ng-tns-c174-4">
                              "e7c8b995-405d-7642-3720-3a09c8b33f88"
                            </td>
                          </tr>
                          <tr class="ng-tns-c174-4">
                            <td class="ng-tns-c174-4">Payload</td>
                            <td class="ng-tns-c174-4"></td>
                            <td class="ng-tns-c174-4">null</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>-->
  </perfect-scrollbar>
</template>

<script>
import AuditLogs from "../../services/admin/auditLogs";
import { Modal } from "bootstrap";
import datepicker from "@/components/plugins/Datepicker.vue";
import jQuery from "jquery";

export default {
  name: "AuditLogs",
  components: {
    datepicker: datepicker,
  },
  data() {
    return {
      loading: false,
      ActiveTab: "AuditLogs",
      ActiveModalTab: "Overall",
      toggleAccordian: false,
      auditLogsDetails: [],
      EntityChangeDetails: [],
      selectedDates: [],
      getSingleAuditLog: {},
      selectedOption: null,
      filterEntityChangeParams: {
        startTime: "",
        endTime: "",
        entityChangeType: "",
        entityTypeFullName: "",
        skipCount: 0,
        maxResultCount: 200,
      },
      filterAuditLogsParams: {
        userName: "",
        filterUrl: "",
        minExecutionDuration: "",
        maxExecutionDuration: "",
        httpMethod: "",
        httpStatusCode: "",
        applicationName: "",
        clientIpAddress: "",
        correlationId: "",
        hasException: "",
        skipCount: 0,
        maxResultCount: 200,
      },
      statusCodes: [
        {
          key: "101",
          value: "Switching Protocols",
        },
        {
          key: "102",
          value: "Processing",
        },
        {
          key: "103",
          value: "Early Hints",
        },
        {
          key: "200",
          value: "OK",
        },
        {
          key: "201",
          value: "Created",
        },
        {
          key: "202",
          value: "Accepted",
        },
        {
          key: "203",
          value: "Non-authoritative Information",
        },
        {
          key: "204",
          value: "No Content",
        },
        {
          key: "205",
          value: "Reset Content",
        },
        {
          key: "206",
          value: "Partial Content",
        },
        {
          key: "207",
          value: "Multi-Status",
        },
        {
          key: "208",
          value: "Already Registered",
        },
        {
          key: "226",
          value: "IM Used",
        },
        {
          key: "300",
          value: "Multiple Choices",
        },
        {
          key: "301",
          value: "Moved Permanently",
        },
        {
          key: "302",
          value: "Found",
        },
        {
          key: "303",
          value: "See Other",
        },
        {
          key: "304",
          value: "Not Modified",
        },
        {
          key: "305",
          value: "Use Proxy",
        },
        {
          key: "306",
          value: "Switch Proxy",
        },
        {
          key: "307",
          value: "Temporary Redirect",
        },
        {
          key: "308",
          value: "Permanent Redirect",
        },
        {
          key: "400",
          value: "Bad Request",
        },
        {
          key: "401",
          value: "Unauthorized",
        },
        {
          key: "402",
          value: "Payment Required",
        },
        {
          key: "403",
          value: "Forbidden",
        },
        {
          key: "404",
          value: "Not Found",
        },
        {
          key: "405",
          value: "Method Not Allowed",
        },
        {
          key: "406",
          value: "Not Acceptable",
        },
        {
          key: "407",
          value: "Proxy Authentication Required",
        },
        {
          key: "408",
          value: "Request Timeout",
        },
        {
          key: "409",
          value: "Conflict",
        },
        {
          key: "410",
          value: "Gone",
        },
        {
          key: "411",
          value: "Length Required",
        },
        {
          key: "412",
          value: "Precondition Failed",
        },
        {
          key: "413",
          value: "Payload Too Large",
        },
        {
          key: "414",
          value: "Request-URI Too Long",
        },
        {
          key: "415",
          value: "Unsupported Media Type",
        },
        {
          key: "416",
          value: "Requested Range Not Satisfiable",
        },
        {
          key: "417",
          value: "Expectation Failed",
        },
        {
          key: "421",
          value: "Misdirected Request",
        },
        {
          key: "423",
          value: "Locked",
        },
        {
          key: "424",
          value: "Failed Dependency",
        },
        {
          key: "426",
          value: "Upgrade Required",
        },
        {
          key: "428",
          value: "Precondition Required",
        },
        {
          key: "429",
          value: "Too Many Requests",
        },
        {
          key: "431",
          value: "Request Header Fields Too Large",
        },
        {
          key: "451",
          value: "Unavailable For Legal Reasons",
        },
        {
          key: "500",
          value: "Internal Server Error",
        },
        {
          key: "501",
          value: "Not Implemented",
        },
        {
          key: "502",
          value: "Bad Gateway",
        },
        {
          key: "503",
          value: "Service Unavailable",
        },
        {
          key: "504",
          value: "Gateway Timeout",
        },
        {
          key: "505",
          value: "HTTP Version Not Supported",
        },
        {
          key: "506",
          value: "Variant Also Negotiates",
        },
        {
          key: "507",
          value: "Insufficient Storage",
        },
        {
          key: "508",
          value: "Loop Detected",
        },
        {
          key: "510",
          value: "Not Extended",
        },
        {
          key: "511",
          value: "Network Authentication Required",
        },
      ],
    };
  },
  mounted() {
    this.ActionsApiHandler("getAuditLogs");
  },
  watch: {
    selectedDates: {
      handler(newValue, oldValue) {
        const proxyConvert = JSON.parse(JSON.stringify(this.selectedDates));
        const startDate =
          proxyConvert[0] !== null && proxyConvert[0].substr(0, 10);
        const endDate =
          proxyConvert[1] !== null && proxyConvert[1].substr(0, 10);

        this.filterAuditLogsParams.startTime = startDate;
        this.filterAuditLogsParams.endTime = endDate;
      },
    },
  },
  methods: {
    openActionsModals(item, action) {
      if (action === "detailsModal") {
        this.ActiveModalTab = "Overall";
        this.ActionsApiHandler("getSingleAuditLog", item);
      }

      this.myModal = new Modal(document.getElementById(action), {
        keyboard: false,
      });
      this.myModal.show();
      jQuery(`#${action}`).appendTo(jQuery("body"));
    },
    handleSelectOption(item) {
      if (this.selectedOption === "changeDetails") {
        this.openActionsModals(item, "changeDetailsModal");
      } else if (this.selectedOption === "fullChangeHistory") {
        this.openActionsModals(item, "fullChangeHistoryModal");
      }
      this.selectedOption = null;
    },
    ActionsApiHandler(action, item) {
      if (action === "getAuditLogs") {
        this.loading = true;
        try {
          AuditLogs.getAuditLogs().then(
            (response) => {
              this.loading = false;
              this.auditLogsDetails = response.data.items;
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
      if (action === "getSingleAuditLog") {
        this.loading = true;
        try {
          AuditLogs.getSingleAuditLog(item.id).then(
            (response) => {
              this.loading = false;
              console.log(response.data);
              this.getSingleAuditLog = response.data;
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
      if (action === "getEntityChanges") {
        if (this.ActiveTab !== "EntityChange") {
          this.ActiveTab = "EntityChange";
          this.loading = true;
          try {
            AuditLogs.getEntityChanges().then(
              (response) => {
                this.loading = false;
                this.EntityChangeDetails = response.data.items;
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
      }
      if (action === "filterEntityChanges") {
        this.filterEntityChangeParams.entityChangeType === "" &&
          delete this.filterEntityChangeParams["entityChangeType"];
        this.filterEntityChangeParams.entityTypeFullName === "" &&
          delete this.filterEntityChangeParams["entityTypeFullName"];
        try {
          AuditLogs.filterEntityChanges(this.filterEntityChangeParams).then(
            (res) => {
              this.EntityChangeDetails = res.data.items;
            },
            (error) => {
              console.log("error", error);
            }
          );
        } catch (err) {
          console.log("error", err);
        }
      }
      if (action === "filterAuditLogs") {
        this.filterAuditLogsParams.userName === "" &&
          delete this.filterAuditLogsParams["userName"];
        this.filterAuditLogsParams.filterUrl === "" &&
          delete this.filterAuditLogsParams["filterUrl"];
        this.filterAuditLogsParams.minExecutionDuration === "" &&
          delete this.filterAuditLogsParams["minExecutionDuration"];
        this.filterAuditLogsParams.maxExecutionDuration === "" &&
          delete this.filterAuditLogsParams["maxExecutionDuration"];
        this.filterAuditLogsParams.httpMethod === "" &&
          delete this.filterAuditLogsParams["httpMethod"];
        this.filterAuditLogsParams.httpStatusCode === "" &&
          delete this.filterAuditLogsParams["httpStatusCode"];
        this.filterAuditLogsParams.applicationName === "" &&
          delete this.filterAuditLogsParams["applicationName"];
        this.filterAuditLogsParams.clientIpAddress === "" &&
          delete this.filterAuditLogsParams["clientIpAddress"];
        this.filterAuditLogsParams.correlationId === "" &&
          delete this.filterAuditLogsParams["correlationId"];
        this.filterAuditLogsParams.hasException === "" &&
          delete this.filterAuditLogsParams["hasException"];
        this.filterAuditLogsParams.startTime === "" ||
          this.filterAuditLogsParams.startTime === null ||
          (this.filterAuditLogsParams.startTime === false &&
            delete this.filterAuditLogsParams["startTime"]);
        this.filterAuditLogsParams.endTime === "" ||
          this.filterAuditLogsParams.endTime === null ||
          (this.filterAuditLogsParams.endTime === false &&
            delete this.filterAuditLogsParams["endTime"]);
        try {
          AuditLogs.filterAuditLogs(this.filterAuditLogsParams).then(
            (res) => {
              this.auditLogsDetails = res.data.items;
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
  },
};
</script>
