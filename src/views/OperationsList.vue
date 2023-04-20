<template>
  <perfect-scrollbar class="app-content-inner-padding h-100">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">HOME</a></li>
      <li class="breadcrumb-item active">OPERATIONS</li>
    </ul>
    <h1 class="page-header">Operations List</h1>
    <hr class="mb-4 mt-n1" />
    <card class="mb-3 bg-opacity-5 bg-default">
      <card-body>
        <div class="d-flex fw-bold medium mb-3">
          <span class="flex-grow-1">LIST OF OPERATIONS</span>
          <button
            class="btn btn-outline-theme btn-sm"
            type="button"
            @click="goAddOperation"
          >
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div class="row align-items-center mb-2">
          <!-- default table -->
          <perfect-scrollbar class="pt-2">
            <div
              v-if="pageState.loading"
              class="justify-content-center d-flex w-100"
            >
              <div>
                <div class="spinner-border text-danger" role="status"></div>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Operation name</th>
                  <th scope="col">Date started</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody v-for="(operation, index) in pageState.shows">
                <tr>
                  <td scope="row">{{ index + 1 }}</td>
                  <td>{{ operation?.operationName }}</td>
                  <td>{{ formatDate(operation?.creationTime) }}</td>
                  <td>
                    <span class="badge text-default">{{
                      getOperationStatus(operation?.operationStatusId)
                        .statusName
                    }}</span>
                  </td>
                  <td>
                    <button
                      class="btn btn-default btn-sm"
                      type="button"
                      @click="goManageOperation(operation.id)"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </perfect-scrollbar>
        </div>
        <nav v-if="pageState.totalCount > 0" aria-label="Page navigation">
          <ul class="pagination justify-content-center">
            <li
              :class="pageState.currentPage <= 1 ? 'disabled' : ''"
              class="page-item"
              @click="previous()"
            >
              <a class="page-link">Previous</a>
            </li>
            <li
              v-for="index in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
              :class="
                (pageState.currentPage - 1) * pageState.perCount + index >
                pageState.totalPages
                  ? 'd-none'
                  : pageState.currentPage ==
                    (index - 1) * pageState.perCount + 1
                  ? 'active'
                  : ''
              "
              class="page-item"
              @click="goPage((index - 1) * pageState.perCount + 1)"
            >
              <a class="page-link">{{
                (pageState.currentPage - 1) * pageState.perCount + index
              }}</a>
            </li>
            <li
              :class="
                pageState.currentPage >= pageState.totalPages ? 'disabled' : ''
              "
              class="page-item"
              @click="next()"
            >
              <a class="page-link">Next</a>
            </li>
          </ul>
        </nav>
      </card-body>
    </card>
  </perfect-scrollbar>
</template>
<script lang="ts">
import { onMounted, reactive } from "vue";
import { useAppOptionStore } from "@/stores/app-option";
import { useAppOperation } from "@/stores/app-operations";
import dateUtils from "@/application/DateUtils";

const appOption = useAppOptionStore();

const pageState = reactive({
  operations: [],
  shows: [],
  loading: false,
  totalCount: 0,
  currentPage: 0,
  perCount: 10,
  totalPages: 0,
  pageGroup: 0,
  operationStatus: [],
});

export default {
  methods: {
    goManageOperation(id: string) {
      this.$router.push({ name: "operations.manage", params: { id } });
    },
    getOperationStatus(id: string) {
      console.log(id, pageState.operationStatus);
      const filtered = pageState.operationStatus.filter(
        (value) => value.id == id
      );

      return filtered.length > 0 ? filtered[0] : { statusName: "unknown" };
    },
    goAddOperation() {
      this.$router.push({ name: "operations.add" });
    },
    formatDate(date: string) {
      return dateUtils.dateYMDHMS(date);
    },
    previous() {
      const currentPage = Math.max(pageState.currentPage - 1, 1);
      if (currentPage != pageState.currentPage) {
        this.goPage(currentPage);
      }
    },
    next() {
      const currentPage = Math.min(
        pageState.currentPage + 1,
        pageState.totalPages
      );

      if (currentPage != pageState.currentPage) {
        this.goPage(currentPage);
      }
    },
    goPage(pageIndex: number) {
      if (pageIndex >= 1 && pageIndex <= pageState.totalPages) {
        pageState.shows = pageState.operations.slice(
          (pageIndex - 1) * pageState.perCount,
          Math.min(
            pageState.operations.length,
            pageState.perCount + pageIndex * pageState.perCount
          )
        );

        pageState.currentPage = pageIndex;
      }
    },
  },
  setup() {
    const appOperation = useAppOperation();

    onMounted(async () => {
      appOption.appContentFullHeight = true;
      appOption.appContentClass = "p-0";
      pageState.loading = true;
      // await service.addOperationKind({kindName:'Operation kind - 1'});
      const status = await appOperation.getOperationStatus();

      if (status != null && status?.items?.length > 0) {
        pageState.operationStatus = status.items;
      }
      const data = await appOperation.getOperations();

      if (data != null && data.items && data.items.length > 0) {
        pageState.operations = data.items;
        pageState.shows = pageState.operations.slice(
          0,
          Math.min(pageState.operations.length, pageState.perCount)
        );
        pageState.totalCount = data.totalCount;
        pageState.totalPages =
          data.totalCount < pageState.perCount
            ? 1
            : Math.ceil(data.totalCount / pageState.perCount);
        pageState.currentPage = 1;
        pageState.pageGroup = 1;
      }
      pageState.loading = false;
      console.log(pageState.operations);
    });
    return {
      pageState,
      // dateYMDHMS
    };
  },
};
</script>
