<template>
  <div class="spinner">
    <div v-if="loading" class="lds-dual-ring"></div>
  </div>
</template>

<script>
  export default {
    name: 'LoadingSpinner',
    props: {
      loading: {
        type: Boolean,
        default: true,
      },
    },
  }
</script>

<style scoped>
  .spinner {
    margin: 250px auto;
    width: 100px;
  }

  .lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
  }

  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #2e3c51;
    border-color: #2e3c51 transparent #2e3c51 transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
