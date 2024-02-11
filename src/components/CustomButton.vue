<template>
  <button type="button" class="btn-add" @click="$emit('click')">
    {{ title }}
  </button>
</template>

<script>
  export default {
    props: {
      title: String,
    },
  }
</script>

<style scoped>
  .btn-add {
    margin-top: 14px;
    padding: 5px;
    height: 30px;
    width: 120px;
    font-weight: 600;
    border-radius: 10px;
    border: 2px solid #2e3c51;
    background: #2e3c51;
    color: white;
    cursor: pointer;
  }

  .btn-add:hover {
    background: none;
    color: #2e3c51;
  }
</style>
