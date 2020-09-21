<template>
  <div class="date-picker">
    <el-date-picker type="date" placeholder="选择日期" v-model="date" />
    <p :class="valid ? 'none' : 'warning'">{{message}}</p>
  </div>
</template>


<script>
import { validate } from "@/utils/validate.js";

function formatDate(date = new Date(), fmt = "YYYY-MM-DD hh:mm:ss") {
  const _date = new Date(date);
  const patterns = {
    "M+": _date.getMonth() + 1, // 月份
    "D+": _date.getDate(), // 日
    "h+": _date.getHours(), // 小时
    "m+": _date.getMinutes(), // 分
    "s+": _date.getSeconds(), // 秒
    "q+": Math.floor((_date.getMonth() + 3) / 3), // 季度
    S: _date.getMilliseconds(), // 毫秒
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (_date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let key in patterns) {
    if (new RegExp("(" + key + ")").test(fmt)) {
      const replacement =
        RegExp.$1.length === 1
          ? patterns[key]
          : ("00" + patterns[key]).substr(("" + patterns[key]).length);
      fmt = fmt.replace(RegExp.$1, replacement);
    }
  }
  return fmt;
}

export default {
  name: "Date",
  props: {
    field: {
      type: String,
      required: true,
    },
    value: {
      type: Date,
    },
    required: {
      type: Boolean,
      default: false,
    },
    validation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      date: this.value ? new Date(this.value) : new Date(),
      valid: this.validation.valid || true,
      message: this.validation.message || "",
    };
  },
  methods: {
    handleChange() {
      const dateTime = new Date(
        `${formatDate(this.date, "YYYY-MM-DD")} ${formatDate(
          this.time,
          "hh:mm:ss"
        )}`
      );
      // console.log(dateTime)
      const { valid, message } = validate({
        value: dateTime,
        validation: this.validation,
        required: this.required,
      });
      this.valid = valid;
      this.message = message;
      this.$emit(this.validation.trigger || 'change', {
        field: this.field,
        value: dateTime,
        valid,
        message,
      });
    },
  },
  watch: {
    date() {
      this.handleChange();
    },
  },
};
</script>




<style lang="less" scoped>
.date-picker {
  position: relative;
  .none {
    display: none;
  }

  .warning {
    position: absolute;
    bottom: -28px;
    font-size: 12px;
    color: red;
  }
}
</style>
