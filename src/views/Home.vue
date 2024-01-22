<template>
  <div class="home">
    <ResumesList />
  </div>
</template>

<script>
  import ResumesList from '@/views/ResumesList.vue';

  export default {
    name: 'HomeView',
    components: {
      ResumesList
    },
  }
</script>

<style scoped>
  .home {
    padding: 0 15px;
  }
</style>
