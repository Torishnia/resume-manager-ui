<template>
  <div class="card-wrapper">
    <CustomIconRemove
      additionalClass="remove-card"
      :arrayName="arrayName"
      :index="index"
      @remove="handleRemove"
    />

    <h2 style="color: #b2a89b;">{{ name }}</h2>
    <h3>{{ title }}</h3>
    <p><strong>{{ details }}</strong></p>
    <p style="color: #b47f55;" v-if="startDate || endDate">
      <strong>
        {{ startDate }} &#8212;
        {{ endDate ? endDate : 'until now' }}
      </strong>
    </p>
    <p style="color: #a2a2a2;"><strong>{{ description }}</strong></p>
  </div>
</template>

<script>
  import CustomIconRemove from '@/components/CustomIconRemove.vue';

  export default {
    props: {
      arrayName: {
        type: String,
        required: true
      },
      index: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
      details: {
        type: String,
        default: '',
      },
      startDate: {
        type: String,
        default: '',
      },
      endDate: {
        type: String,
        default: '',
      },
      description: {
        type: String,
        default: '',
      }
    },
    components: { CustomIconRemove },
    methods: {
      handleRemove(arrayName, index) {
        this.$emit('remove', arrayName, index);
      },
    },
  }

</script>

<style scoped>
  .card-wrapper {
    position: relative;
    margin: 20px auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    color: #f4f2e7;
    background: #2e3c51;
    border: 1px solid #2e3c51;
    border-radius: 10px;
  }

  p {
    margin-bottom: 8px;
  }

  .remove-card {
    position: absolute;
    right: 10px;
    top: 8px;
  }
</style>
