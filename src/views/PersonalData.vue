<template>
  <div class="px-4">
    <div class="row">
      <div class="col-12 mb-4"></div>
      <div class="col-12 mb-4">
        <card>
          <card-body>
            <div class="row">
              <div class="col-12 d-flex justify-content-end gap-2 mb-4">
                <button class="btn btn-outline-theme">
                  Request For Personal Data
                </button>
                <button class="btn btn-outline-danger">
                  Request For Personal Data
                </button>
              </div>
              <div class="col-12 table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Actions</th>
                      <th scope="col">Creation Date</th>
                      <th scope="col">Ready Time</th>
                      <th scope="col" width="120">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Preparing</td>
                      <td>1/8/2023 18:12:22 AM</td>
                      <td>1/8/2023 18:12:22 AM</td>
                      <td>
                        <button class="btn btn-default btn-sm" type="button">
                          Download
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row">
              <nav aria-label="Page navigation example">
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
            </div>
          </card-body>
        </card>
      </div>
    </div>
  </div>
</template>

<script setup></script>
