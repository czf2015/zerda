<template>
  <Card class="modal" v-show="show">
    <template v-slot:header>
      <header>
        <span>头部</span>
        <i @click="handleClose">X</i>
      </header>
    </template>
    <template v-slot:main>
      <main>内容</main>
    </template>
    <template v-slot:footer>
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
    </template>
  </Card>
</template>


<script>
import Card from "@/components/Card";
import Submit from "@/components/Form/Submit";

export default {
  components: {
    Card,
    Submit,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      canSave: false,
      formData: null,
    };
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    save() {
      // console.log(this.formData);
      this.$emit("operate", { name: "save", message: this.formData });
    },
    cancel() {
      this.$emit("operate", { name: "cancel" });
    },
  },
};
</script>


<style lang="less" scope>
.modal {
  padding: 10px;
  header {
    display: flex;
    justify-content: space-between;
    color: #409eff;
    > *:last-child {
      font-style: normal;
      &:not(:hover) {
        color: #222;
      }
    }
  }
  main {
    background: olivedrab;
  }
  footer {
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
</style>