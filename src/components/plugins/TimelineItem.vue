<template>
  <!-- desktop -->
  <div class="position-relative overflow-visible">
    <div
      class="gap-2 d-none d-md-none d-lg-flex"
      :class="direction == 'down' ? 'down-coord' : 'up-coord'"
    >
      <div class="mt-4 z-index-99" v-if="direction == 'up'">
        <div class="custom-line"></div>
        <div
          class="custom-radio"
          :class="color == 'error' ? 'custom-radio-error' : ''"
        ></div>
      </div>
      <div
        class="d-flex gap-1 flex-column"
        :class="direction == 'down' ? 'justify-content-end mb-n4' : ''"
      >
        <div class="d-flex gap-1 align-items-center">
          <div
            class="timeline-badge"
            :class="name == active ? 'active' : ''"
            v-if="direction == 'down'"
          >
            {{ value }}
          </div>
          <span class="fs-5 text-white">
            {{ title }}
          </span>
          <div
            class="timeline-badge"
            :class="name == active ? 'active' : ''"
            v-if="direction == 'up'"
          >
            {{ value }}
          </div>
        </div>
        <div class="">
          {{ description }}
        </div>
      </div>
      <div class="z-index-99" v-if="direction == 'down'">
        <div
          class="custom-radio custom-radio-down"
          :class="color == 'error' ? 'custom-radio-error' : ''"
        ></div>

        <div class="custom-line custom-line-down"></div>
      </div>
    </div>
  </div>
  <!-- mobile -->
  <div class="d-lg-none d-xl-lone ms-n4 w-100">
    <div class="d-flex gap-1 w-100">
      <div
        class="custom-radio"
        :class="color == 'error' ? 'custom-radio-error' : ''"
      ></div>
      <div class="custom-line custom-line-mobile"></div>
    </div>
    <div class="d-flex gap-1 flex-column time-line-mobile-content">
      <div class="d-flex gap-1">
        <span class="fs-5 text-white">
          {{ title }}
        </span>
        <div class="timeline-badge" :class="name == active ? 'active' : ''">
          {{ value }}
        </div>
      </div>
      <div class="">
        {{ description }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.time-line-mobile-content {
  margin-top: -80px;
  margin-left: 60px;
  padding-bottom: 20px;
}
.custom-radio {
  background-color: var(--bs-theme);
  border-radius: 50%;
  border: 8px solid white;
  width: 40px;
  height: 40px;
}

.custom-radio-error {
  background-color: var(--bs-danger);
}

.custom-radio-down {
  margin-left: 12px;
}

.custom-line-down {
  transform: rotate(180deg);

  margin-left: 16px !important;
  width: 20px;
}

.custom-line-mobile {
  transform: rotate(90deg);
  margin-top: 16px !important;
  margin-left: -4px !important;
  width: 120px;
  background-repeat: no-repeat !important;
}

.z-index-99 {
  z-index: 99;
}

.custom-line {
  /* width: 12px;
    
    border-left: 1px solid white;
    margin-left: 10px;
    border-top: 1px solid white;
    border-top-left-radius: 50%; */
  background: url("../../assets/Vectorround.svg");
  height: 120px;
  margin-left: 20px;
}

.timeline-badge {
  background-color: var(--bs-secondary);
  border-radius: 50%;
  min-width: 22px;
  width: 22px;
  height: 22px;
  text-align: center;
}

.active {
  background-color: var(--bs-theme);
}

.down-coord {
  position: absolute;
  top: -20px;
  right: -20px;
  justify-content: end;
  white-space: nowrap;
}

.up-coord {
  position: absolute;
  left: -20px;
  bottom: -20px;
  justify-content: start;
  white-space: nowrap;
}
</style>
<script>
export default {
  props: {
    direction: String,
    title: String,
    description: String,
    value: Number,
    name: String,
    active: String,
    color: String,
  },

  setup() {
    return {};
  },
};
</script>
