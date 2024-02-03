<template>
  <div class="wrapper">
    <button @click="toggleInfo" type="button" class="btn-details">
      {{ title }}
      <span :class="{'rotate': showInfo}">&#9650;</span>
    </button>
    <slot v-if="showInfo"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
    },
    data() {
      return {
        showInfo: false,
      };
    },
    methods: {
      toggleInfo() {
        this.showInfo = !this.showInfo;
      }
    },
  }
</script>

<style scoped>
  .wrapper {
    margin: 30px 0;
  }

  .btn-details {
    display: flex;
    font-size: 18px;
    font-weight: 500;
    color: #2e3c51;
    border: none;
    cursor: pointer;
  }

  .btn-details span {
    margin-left: 5px;
    transition: transform 0.3s ease;
  }

  .rotate {
    transform: rotate(180deg);
  }
</style>
