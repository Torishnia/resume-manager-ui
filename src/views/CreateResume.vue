<template>
  <form class="container" @submit.prevent="onSubmit">
    <CustomInput
      v-for="(input, index) in mainData"
      :key="index"
      :inputId="input.inputId"
      :inputType="input.inputType"
      :inputLabel="input.inputLabel"
      :inputName="input.inputName"
      :inputLength="input.inputLength"
      :inputRequire="input.inputRequire"
      v-model="input.value"
    />

    <CustomTextarea
      textareaId="interests"
      textareaLabel="Interests"
      textareaName="interests"
      textareaLength="500"
      v-model="interests"
    />

    <ContactInfo @contact-data="handleContactData" />
    <button type="submit">Create</button>
  </form>
</template>

<script>
  import ContactInfo from '@/components/ContactInfo.vue';
  import CustomInput from '@/components/CustomInput.vue';
  import CustomTextarea from '@/components/CustomTextarea.vue';
  import { mainData } from '@/mockData';

  export default {
    name: 'CreateResume',
    data() {
      return {
        mainData,
        interests: '',
        contact: {
          phone: '',
          email: '',
          linkedInURL: '',
          telegramURL: '',
          gitHubURL: '',
        }
      };
    },
    components: { ContactInfo, CustomInput, CustomTextarea },
    computed: {
      resumeData() {
        return this.mainData.reduce((acc, item) => {
          acc[item.inputName] = item.value;
          return acc;
        }, { interests: this.interests, contact: this.contact });
      },
    },
    methods: {
      handleContactData(data) {
        this.contact = data;
      },
      async createResume() {
        const ageField = this.mainData.find((input) => input.inputName === 'age');
        if (ageField) ageField.value = Number(ageField.value);

        try {
          const response = await fetch('https://resume-manager-api-git-main-torishnia.vercel.app/resumes/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(this.resumeData),
          });

          if (!response.ok) throw new Error('Error creating resume');
          console.log('Resume created successfully');
        }
        catch (err) {
          console.error('Error creating resume:', err);
        }
      },
      async onSubmit() {
        try {
          await this.createResume();
          this.clearForm();
        } catch (err) {
          console.error('Error creating resume:', err);
        }
      },
      clearForm() {
        this.mainData.forEach(item => item.value = '');
        this.interests = '';
        this.contact = {
          phone: '',
          email: '',
          linkedInURL: '',
          telegramURL: '',
          gitHubURL: '',
        };
      }
  },
}

</script>

<style scoped>
  .container {
    padding: 15px;
    border: 1px solid red;
  }

  @media screen and (min-width: 426px) {
    .container {
      margin: 0 auto;
      width: 340px;
    }
  }

  @media screen and (min-width: 768px) {
    .container {
      width: 600px;
    }
  }
</style>
