<template>
  <div class="wrapper">
    <h1>ViewResume</h1>
  </div>
</template>

<script>
  export default {
    name: 'ViewResume',
    data() {
      return {
      };
    },
    mounted() {
      const resumeId = this.$route.params.id;
    },
  }
</script>

<style scoped>
</style>
