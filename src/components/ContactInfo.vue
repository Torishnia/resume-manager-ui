<template>
  <div class="wrapper">
    <button @click="toggleInfo" type="button" class="btn-details">
      Contacts
      <span>&#9650;</span>
    </button>
    <div v-if="showInfo">
      <CustomInput 
        v-for="(input, index) in contactData"
        :key="index"
        :inputId="input.inputId"
        :inputType="input.inputType"
        :inputLabel="input.inputLabel"
        :inputName="input.inputName"
        :inputLength="input.inputLength"
        v-model="contact[input.inputName]"
        @input="emitContactData"
      />
    </div>
  </div>
</template>

<script>
  import CustomInput from '@/components/CustomInput.vue';
  import { contactData } from '@/mockData';

  export default {
    data() {
      return {
        showInfo: false,
        contactData,
        contact: {
          phone: '',
          email: '',
          linkedInURL: '',
          telegramURL: '',
          gitHubURL: '',
        }
      };
    },
    components: { CustomInput },
    methods: {
      toggleInfo() {
        this.showInfo = !this.showInfo;
      },
      emitContactData() {
        this.$emit('contact-data', { ...this.contact });
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
  }
</style>
