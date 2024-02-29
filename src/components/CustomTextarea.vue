<template>
  <div class="textarea-block">
    <label :for=textareaId>{{ textareaLabel }}</label>
    <textarea
      :id=textareaId
      :name=textareaName
      :required=textareaRequire
      :maxlength=textareaLength
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
  export default {
    name: 'CustomTextarea',
    props: {
      textareaId: String,
      textareaLabel: String,
      textareaName: String,
      textareaRequire: Boolean,
      textareaLength: Number,
      modelValue: String,
    },
  }
</script>

<style scoped>
  .textarea-block {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 300;
    color: #2e3c51;
  }

  textarea {
    padding: 5px 10px;
    height: 120px;
    font-size: 16px;
    font-weight: 500;
    border: 1px solid #2e3c51;
    border-radius: 10px;
    color: #2e3c51;
  }
</style>
