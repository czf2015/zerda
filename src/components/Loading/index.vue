<template>
  <div :class="theme">
    <span></span>
    <!-- <span></span> -->
  </div>
</template>

<script>
export default {
    props: {
        theme: {
            type: String,
            default: 'rotate'
        }
    }
}
</script>