<template>
  <div class="timer">
    <button class="btn_default" v-show="timer.status === 'stoped'" @click="() => timer.start()">开始</button>
    <button class="btn_info" v-show="timer.status === 'continue'" @click="() => timer.pause()">暂停</button>
    <button
      class="btn_default"
      v-show="timer.status === 'paused'"
      @click="() => timer.continue()"
    >继续</button>
    <button class="btn_warn" @click="() => timer.stop()">停止</button>
    <span>{{timer.time}}</span>
  </div>
</template>


<script>
import Timer from "./Timer";

export default {
  data() {
    return {
      timer: new Timer()
    };
  },
};
</script>


<style scoped>
.timer {
  /*  */
}

button {
  margin: 5px 10px;
  padding: 10px 20px;
  font-size: 20px;
  color: white;
}

.btn_default {
  /*  */
  background-color: blue;
}

.btn_info {
  /*  */
  background-color: yellow;
}

.btn_warn {
  /*  */
  background-color: red;
}
</style>