<template>
  <form class="form" :style="{ width, margin, padding }">
    <content v-if="auto">
      <div class="form-item" v-for="(item, idx) in datasource" :key="idx">
        <label :class="{ required: item.required }">{{item.label}}</label>
        <component
          :is="adaptComponent(item)"
          :field="item.field"
          :value="item.value"
          :options="adaptOptions(item.options)"
          :required="item.required"
          :validation="item.validation"
          @[item.validation.trigger]="handleTrigger"
        />
      </div>
    </content>
    <!-- <fieldset v-else> -->
    <!-- <legend>{{legend}}</legend> -->
    <div class="modal" v-else>
      <content>
        <div class="form-item" v-for="(item, idx) in datasource" :key="idx">
          <label :class="{ required: item.required }">{{item.label}}</label>
          <component
            :is="adaptComponent(item)"
            :field="item.field"
            :value="item.value"
            :options="adaptOptions(item.options)"
            :required="item.required"
            :validation="item.validation"
            @[item.validation.trigger]="handleTrigger"
          />
        </div>
      </content>
      <footer>
        <Submit
          class="btn_save"
          label="确定"
          @click="save"
          :disabled="!canSave"
          :class="{ disabled: !canSave }"
        />
        <Submit class="btn_cancel" label="取消" @click="cancel" />
      </footer>
    </div>
    <!-- </fieldset> -->
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
import InputImage from "./InputImage.vue";

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
    InputImage,
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
      type: Number,
    },
    auto: {
      type: Boolean,
    },
    padding: {
      type: String,
    },
    margin: {
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
        case "link":
          return "InputText";
        case "number":
          return "InputNumber";
        case "image":
          return "InputImage";
        case "textarea":
          return "TextArea";
        case "select":
          return "CustomSelect";
        case "boolean":
        case "bool":
          return "CustomSwitch";
        default:
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
      this.canSave = this.formData.every((item) => item.validation.valid !== false);
      console.log(this.canSave)
      if (this.auto) {
        this.$emit("change", this.formData);
      }
    },
    save() {
      this.$emit("save", this.formData);
    },
    cancel() {
      if (confirm("放弃修改？")) {
        this.$emit("cancel");
      }
    },
  },
};
</script>


<style lang="less" scoped>
form {
  padding: 40px;
  content {
    > .form-item {
      display: flex;
      // align-items: center;
      margin-top: 10px;
      > label {
        margin: 0px 10px;
        min-width: 100px;
        line-height: 36px;
        text-align: right;
        font-weight: bold;
        color: #409eff;
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
  // > fieldset {
  //   padding-bottom: 40px;
  //   > legend {
  //       color: #409EFF;
  //   }
  .modal {
    > footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 40px;
      .btn_save {
        margin-right: 24px;
      }
      .btn_save.disabled {
        background: #c0c4cc;
      }
      .btn_cancel {
        margin-right: 40px;
        background: red;
      }
    }
  }
  // }
}
</style>
