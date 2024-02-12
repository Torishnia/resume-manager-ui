<template>
  <font-awesome-icon 
    :class="['icon-remove', additionalClass]"
    :icon="['fas', 'circle-xmark']"
    @click="emitRemove"
  />
</template>

<script>
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

  library.add(faCircleXmark);

  export default {
    props: {
      additionalClass: {
        type: String,
        default: ''
      },
      arrayName: {
        type: String,
        required: true
      },
      index: {
        type: Number,
        required: true
      },
    },
    components: { FontAwesomeIcon },
    methods: {
      emitRemove() {
        this.$emit('remove', this.arrayName, this.index);
      },
    },
  }
</script>

<style scoped>
  .icon-remove {
    margin-left: 8px;
    cursor: pointer;
    color: #f4f2e7;
    transition: .2s ease-out;
  }

  .icon-remove:hover {
    color: #b47f55;
  }
</style>
