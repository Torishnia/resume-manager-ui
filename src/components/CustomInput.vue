<template>
  <div class="input-block">
    <label :for=inputId>{{inputLabel}}</label>
    <input
      :id=inputId
      :type=inputType
      :name=inputName
      :required=inputRequire
      :maxlength=inputLength
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
  export default {
    name: 'CustomInput',
    props: {
      inputId: String,
      inputLabel: String,
      inputType: String,
      inputName: String,
      inputRequire: Boolean,
      inputLength: Number,
      modelValue: {
        type: [String, Number],
      },
    },
  }
</script>

<style scoped>
  .input-block {
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

  input {
    padding: 5px 10px;
    font-size: 16px;
    font-weight: 500;
    border: 1px solid #2e3c51;
    border-radius: 10px;
    color: #2e3c51;
  }
</style>
