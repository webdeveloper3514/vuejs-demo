<template>
  <div class="vertical-time-line w-100">
    <div class="vertical-time-line-bar">
      <div>
        <timeline-item
          value="1"
          :active="active"
          direction="up"
          title="Spear Phishing"
          description="Started at xxxx-xx-xx xx:xx:xx"
          name="spear"
        ></timeline-item>
      </div>
      <div class="item-2">
        <timeline-item
          value="2"
          direction="up"
          name="command"
          :active="active"
          title="Command Execusion"
          description="Started at xxxx-xx-xx xx:xx:xx"
        ></timeline-item>
      </div>
      <div class="item-3">
        <timeline-item
          value="3"
          color="error"
          direction="down"
          name="active"
          :active="active"
          title="Active Directory Compromise"
          description="Started at xxxx-xx-xx xx:xx:xx"
        ></timeline-item>
      </div>
      <div class="item-4">
        <timeline-item
          value="4"
          direction="down"
          name="callback"
          :active="active"
          title="Excute and Yah! Callback!"
          description="Started at xxxx-xx-xx xx:xx:xx"
        ></timeline-item>
      </div>
      <div class="item-5">
        <timeline-item
          value="5"
          direction="up"
          name="report"
          :active="active"
          title="Reporting and Presentation"
          description="Started at xxxx-xx-xx xx:xx:xx"
        ></timeline-item>
      </div>
    </div>
  </div>
</template>
<style scoped>
.vertical-time-line-bar {
  border-left: 10px solid var(--bs-theme);
  height: 100%;
  margin-left: 20px;
}
</style>
<script>
import timelineItem from "@/components/plugins/TimelineItem.vue";
import { reactive } from "vue";

export default {
  components: {
    timelineItem,
  },
  props: {
    items: Array,
  },

  setup() {
    return {
      active: reactive("spear"),
    };
  },
};
</script>
