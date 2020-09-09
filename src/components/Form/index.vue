<template>
  <form class="form" :style="{ width }">
    <fieldset>
      <legend>{{legend}}</legend>
      <content>
        <div class="form-item" v-for="(item, idx) in datasource" :key="idx">
          <label :class="{ required: item.required }">{{item.label}}</label>
          <component
            :is="adaptComponent(item)"
            :field="item.field"
            :value="item.value"
            :options="adaptOptions(item.options)"
            :required="item.validation.required"
            :validation="item.validation"
            @[item.validation.trigger]="handleTrigger"
          />
        </div>
      </content>
      <footer>
        <Submit
          class="btn_save"
          label="保存"
          @click="save"
          :disabled="!canSave"
          :class="{ disabled: !canSave }"
        />
        <Submit class="btn_cancel" label="取消" @click="cancel" />
      </footer>
    </fieldset>
  </form>
</template>

<script>
import CheckboxGroup from "./CheckboxGroup.vue";
import RadioGroup from "./RadioGroup.vue";
import Date from "./Date.vue";
import DateTime from "./DateTime.vue";
import CustomSelect from "./Select.vue";
import Submit from "./Submit.vue";
import CustomSwitch from "./Switch.vue";
import TextArea from "./TextArea.vue";
import InputText from "./InputText.vue";
import InputNumber from "./InputNumber.vue";
// import { capital } from '@/utils/string.js'
const capital = (str) => str[0].toUpperCase() + str.slice(1);

export default {
  name: "CustomForm",
  components: {
    CheckboxGroup,
    RadioGroup,
    Date,
    DateTime,
    CustomSelect,
    Submit,
    CustomSwitch,
    InputText,
    InputNumber,
    TextArea,
  },
  props: {
    legend: {
      type: String,
      default: "请填写内容",
    },
    datasource: {
      type: Array,
      required: true,
    },
    width: {
      type: String,
    },
  },
  data() {
    return {
      formData: this.datasource,
      canSave: false,
    };
  },
  methods: {
    adaptComponent(item) {
      const { type } = item.validation;
      switch (type) {
        case "radio":
          return "RadioGroup";
        case "checkbox":
          return "CheckboxGroup";
        case "text":
          return "InputText";
        case "number":
          return "InputNumber";
        case "textarea":
          return "TextArea";
        case "select":
          return "CustomSelect";
        case "switch":
          return "CustomSwitch";
        default:
          // console.log(capital(type));
          return capital(type);
      }
    },
    adaptOptions(options = []) {
      return options.map((option) => {
        return typeof option == "string"
          ? { label: option, value: option }
          : option;
      });
    },
    handleTrigger({ field, value, valid = true, message = "" }) {
      const formItem = this.formData.find((item) => item.field == field);
      formItem.value = value;
      formItem.validation.valid = valid;
      formItem.validation.message = message;
      this.canSave = this.formData.every((item) => item.validation.valid);
    },
    save() {
      // console.log(this.formData);
      this.$emit("operate", { operate: "save", data: this.formData });
    },
    cancel() {
      this.$emit("operate", { operate: "cancel" });
    },
  },
};
</script>


<style lang="less" scoped>
form {
  padding: 40px;
  > fieldset {
    padding-bottom: 40px;
    > legend {
    }
    > content {
      > .form-item {
        display: flex;
        align-items: center;
        margin-top: 20px;
        > label {
          margin: 10px 10px;
          &:before {
            content: " ";
            padding-right: 5px;
            color: red;
          }
          &.required:before {
            content: "*";
            padding-right: 5px;
            color: red;
          }
          &:after {
            padding: 0 5px;
            content: ":";
          }
        }
      }
    }
    > footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 40px;
      .btn_save {
        margin-right: 24px;
      }
      .btn_save.disabled {
        background: grey;
      }
      .btn_cancel {
        background: red;
        margin-right: 40px;
      }
    }
  }
}
</style>