<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>
  import Header from '@/views/Header.vue';

  export default {
  components: {
    Header
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
