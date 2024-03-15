<template>
  <div class="header">
    <font-awesome-icon :icon="icon" class="icon" />
    <span>{{ title }}</span>
  </div>
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  export default {
    props: {
      icon: {
        type: Array,
        required: true
      },
      title: {
        type: String,
        required: true
      }
    },
    components: {
      FontAwesomeIcon,
    },
  }
</script>

<style scoped>
  .header {
    margin: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    background: #FAFAFA;
    border-radius: 5px;
  }

  .header span {
    margin-left: 10px;
    font-size: 20px;
  }

  .icon {
    font-size: 35px;
  }
</style>
