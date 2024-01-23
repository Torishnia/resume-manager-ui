<template>
  <div>
    <AppHeader />
    <router-view />
  </div>
</template>

<script>
  import AppHeader from '@/views/AppHeader.vue';

  export default {
  components: {
    AppHeader
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
