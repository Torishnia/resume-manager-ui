<template>
  <div class="input-block">
    <label :for=inputId>{{inputLabel}}</label>

    <select
      v-if="inputType === 'select'"
      :class="{'input-error': !isValid, 'input': true}"
      :id="inputId"
      :name="inputName"
      :value="modelValue"
      @change="handleChange"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>

    <input
      v-else
      :class="{'input-error': !isValid, 'input': true}"
      :id=inputId
      :type=inputType
      :name=inputName
      :placeholder=inputPlaceholder
      :required=inputRequire
      :maxlength=inputLength
      :value="modelValue"
      @input="handleInput"
    />
    <p v-if="!isValid" class="error-text">{{ validationErrorMessage }}</p>
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
      inputPlaceholder: String,
      inputRequire: Boolean,
      inputLength: Number,
      validationErrorMessage: String,
      isValid: {
        type: Boolean,
        default: true,
      },
      modelValue: {
        type: [String, Number],
      },
      options: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      handleInput(event) {
        this.$emit('update:modelValue', event.target.value);
      },
      handleChange(event) {
        this.$emit('update:modelValue', event.target.value);
      }
    }
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

  .input {
    padding: 5px 10px;
    font-size: 16px;
    font-weight: 500;
    border: 1px solid #2e3c51;
    border-radius: 10px;
    color: #2e3c51;
  }
  .input-error {
    border-color: #be1313;
  }

  .error-text {
    margin-top: 10px;
    color: #be1313;
    font-size: 14px;
  }

  @media screen and (min-width: 426px) {
    .error-text {
      font-size: 16px;
    }
  }
</style>
