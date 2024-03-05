<template>
  <div class="language-item">
    <span>{{ language.name }}</span>
    <div class="item-level">
      <p v-for="star in 5" :key="star" class="star" :class="{ 'filled': star <= level }">&#9733;</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LanguageLevel',
    props: {
      language: {
        type: Object,
        required: true
      }
    },
    computed: {
      level() {
        switch (this.language.level) {
          case 'BAD':
            return 1;
          case 'NORMAL':
            return 2;
          case 'MIDDLE':
            return 3;
          case 'GOOD':
            return 4;
          case 'NATIVE':
            return 5;
          default:
            return 0;
        }
      }
    }
  }
</script>

<style scoped>
  .language-item {
    padding: 5px;
    display: flex;
    justify-content: space-between;
  }

  .language-item span {
    margin-left: 5px;
    width: 40%;
  }

  .item-level {
    display: flex;
  }

  .star {
    padding: 0 3px;
    color: #afcbf0;
  }

  .filled {
    color: #FFD700;
  }
</style>
