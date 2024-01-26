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
      :textareaLength=500
      v-model="interests"
    />

    <ContentWrapper title="Contacts">
      <CustomInput 
        v-for="(input, index) in contactData"
        :key="index"
        :inputId="input.inputId"
        :inputType="input.inputType"
        :inputLabel="input.inputLabel"
        :inputName="input.inputName"
        :inputLength="input.inputLength"
        v-model="contact[input.inputName]"
      />
    </ContentWrapper>
    <button type="submit" class="btn-create">Create</button>
  </form>
</template>

<script>
  import ContentWrapper from '@/components/ContentWrapper.vue';
  import CustomInput from '@/components/CustomInput.vue';
  import CustomTextarea from '@/components/CustomTextarea.vue';
  import { contactData, mainData } from '@/mockData';

  export default {
    name: 'CreateResume',
    data() {
      return {
        mainData,
        contactData,
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
    components: {
      ContentWrapper,
      CustomInput,
      CustomTextarea
    },
    computed: {
      resumeData() {
        return this.mainData.reduce((acc, item) => {
          acc[item.inputName] = item.value;
          return acc;
        }, { interests: this.interests, contact: this.contact });
      },
    },
    methods: {
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

  .btn-create {
    width: 100%;
    height: 35px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: #f4f2e7;
    background: #b47f55;
    border: 2px solid #b47f55;
    border-radius: 10px;
    cursor: pointer;
  }

  .btn-create:hover {
    color: #2e3c51;
    background: none;
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

    .btn-create {
      width: 120px;
    }
  }
</style>
