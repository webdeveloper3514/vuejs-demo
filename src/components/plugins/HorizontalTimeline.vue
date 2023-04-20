<template>
  <div class="d-flex">
    <!-- <div class="timeline-before">
      <div class="timeline-line-content"></div>
    </div> -->
    <div class="timeline-container position-relative">
      <div class="timeline-item-wrapper">
        <canvas
          ref="canvas"
          width="1500"
          height="350"
          @click="handleClickCanvas"
        ></canvas>
        <div
          class="position-absolute"
          v-for="(item, index) in itemList"
          :key="item.id"
          :style="{
            left: `${calcXFromIndex(index)}px`,
            top: `${getYForXInCanvas(calcXFromIndex(index))}px`,
          }"
        >
          <timeline-item
            value="1"
            :active="active"
            :direction="index % 2 ? 'down' : 'up'"
            :title="item.name"
            :description="item.description"
            :name="item.name.split(' ')[0].toLowerCase()"
          ></timeline-item>
        </div>
        <!-- <div class="position-absolute item-1">
          <timeline-item
            value="1"
            :active="active"
            direction="up"
            title="Spear Phishing"
            description="Started at xxxx-xx-xx xx:xx:xx"
            name="spear"
          ></timeline-item>
        </div>-->
      </div>
    </div>
    <!-- <div class="timeline-after">
      <div class="timeline-line-content right"></div>
    </div> -->
  </div>
</template>
<style scoped>
.timeline-container {
  height: 500px;
  /* overflow-y: hidden; */
  /* overflow-x: hidden; */
  width: 1191px !important;
}

.timeline-line-content {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: var(--bs-theme);
  width: 100%;
  height: 10px;
  position: absolute;
  right: -20px;
}

.timeline-line-content.right {
  border-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  left: -20px;
}

.timeline-before {
  height: 10px;
  margin-top: 156px;

  width: calc((100% - 1191px) / 2);
  position: relative;
}

#timeline-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.timeline-after {
  height: 10px;
  width: calc((100% - 1191px) / 2);
  margin-top: 334px;
  position: relative;
}

/* .timeline-item-wrapper::before { */
/* background: url("../../assets/line.svg") no-repeat; */
/* background-size: 1191px; */
/* background-position: left 175px;
  content: "";
  width: 100%;
  height: 100%;
  position: absolute; */
/* } */
</style>
<script>
import timelineItem from "@/components/plugins/TimelineItem.vue";
import { reactive } from "vue";

export default {
  components: {
    timelineItem,
  },
  props: {
    list: Array,
  },

  mounted() {
    /** Canvas Draw Timeline */
    const ctx = this.$refs.canvas.getContext("2d");

    //draw circles
    ctx.lineWidth = 0;
    ctx.fillStyle = "#3cd2a5";
    ctx.beginPath();
    ctx.arc(5, 180, 5, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(1300, 340, 5, 0, Math.PI * 2, true);
    ctx.fill();

    //draw path
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#3cd2a5";

    ctx.beginPath();
    //------------------------
    ctx.moveTo(5, 180);
    ctx.lineTo(360, 180);
    //------------------------
    ctx.moveTo(400, 220);
    ctx.arc(360, 220, 40, 0, (Math.PI * 3) / 2, true);
    //------------------------
    ctx.moveTo(440, 260);
    ctx.arc(440, 220, 40, Math.PI / 2, Math.PI);
    //------------------------
    ctx.moveTo(440, 260);
    ctx.lineTo(560, 260);
    //------------------------
    ctx.moveTo(600, 300);
    ctx.arc(560, 300, 40, 0, (Math.PI * 3) / 2, true);
    //------------------------
    ctx.moveTo(640, 340);
    ctx.arc(640, 300, 40, Math.PI / 2, Math.PI);
    //------------------------
    ctx.moveTo(640, 340);
    ctx.lineTo(1300, 340);
    //------------------------
    ctx.stroke();
    this.canvasCtx = ctx;
    /**----------------------------------------------- */
    this.itemList = [
      {
        id: "123123123-123123123123-213213",
        name: "abc",
        description: "desc-abc",
        narrativeDate: "2023-01-01",
      },
      {
        id: "123123123-123123123123-213",
        name: "abc",
        description: "desc-abc",
        narrativeDate: "2023-01-01",
      },
      {
        id: "123123123-23123123-213213",
        name: "abc",
        description: "desc-abc",
        narrativeDate: "2023-01-01",
      },
      {
        id: "12312-123123123123-213213",
        name: "abc",
        description: "desc-abc",
        narrativeDate: "2023-01-01",
      },
      {
        id: "123123123-12313-213213",
        name: "abc",
        description: "desc-abc",
        narrativeDate: "2023-01-01",
      },
      {
        id: "123123123-213213",
        name: "abc",
        description: "desc-abc",
        narrativeDate: "2023-01-01",
      },
    ];
  },

  setup() {
    return {
      active: reactive("spear"),
    };
  },

  data() {
    return {
      canvasCtx: null,
      itemList: [],
    };
  },

  methods: {
    handleClickCanvas(event) {
      let { clientX: pointX, clientY: pointY } = event;
      const rect = this.$refs.canvas.getBoundingClientRect();
      pointX -= rect.left;
      console.log(`y point for ${pointX} is ${this.getYForXInCanvas(pointX)}`);
    },
    getYForXInCanvas(pointX) {
      // get X point for a given Y point in Canvas
      let bottomY, topY;
      for (let y = 350; y >= 0; --y) {
        if (!bottomY && this.canvasCtx.isPointInStroke(pointX, y)) {
          bottomY = y;
        }
        if (bottomY && !this.canvasCtx.isPointInStroke(pointX, y)) {
          topY = y + 1;
          break;
        }
      }
      return (bottomY + topY) / 2;
    },
    calcXFromIndex(index) {
      return Math.floor(index / 2) * 300 + (index % 2 ? 300 : 120);
    },
  },
};
</script>
