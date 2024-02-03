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
      :isValid="input.validation.isValid"
      :validationErrorMessage="input.validation.errorMessage"
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
        :isValid="input.validation.isValid"
        :validationErrorMessage="input.validation.errorMessage"
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
      async onSubmit() {
        if (this.isFormValid()) {
          try {
            await this.createResume();
            this.clearForm();
          } catch (err) {
            console.error('Error creating resume:', err);
          }
        }
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
      },
      isFormValid() {
        // Check if valid mainData
        let isMainDataValid = true;

        for (const input of this.mainData) {
          if (input.inputName === 'age') {
            this.validationAgeInput(input);
          } else if (input.inputName === 'positionDescription') {
            if (input.value === '') {
              input.validation.isValid = true;
            }
          } else {
            this.validationRequiredInput(input);
          }

          if (!input.validation.isValid) {
            isMainDataValid = false;
          }
        }

        // Check if valid contactData
        let isContactDataValid = true;

        const validationMapping = {
          'phone': this.validationPhoneInput,
          'email': this.validationEmailInput,
          'linkedInURL': this.validationUrlInput,
          'telegramURL': this.validationUrlInput,
          'gitHubURL': this.validationUrlInput
        };

        for (const input of this.contactData) {
          const value = this.contact[input.inputName];
          if (value !== '') {
            const isValid = validationMapping[input.inputName]?.(input, value);
            if (!isValid) {
              isContactDataValid = false;
            }
          }
        }

        return (isMainDataValid && isContactDataValid);
      },
      setValidationState(input, isValid, errorMessage = '') {
        input.validation.isValid = isValid;
        input.validation.errorMessage = isValid ? '' : errorMessage;
        return isValid;
      },
      validationRequiredInput(input) {
        const fieldValue = input.value?.trim() ?? '';
        return this.setValidationState(
          input,
          fieldValue !== '',
          `Please enter a valid ${input.inputLabel}`
        );
      },
      validationAgeInput(input) {
        const ageValue = Number(input.value);
        const isValid = ageValue >= 18 && ageValue <= 99;
        return this.setValidationState(
          input,
          isValid,
          'Please enter a valid age (18-100)'
        );
      },
      validateInputWithRegex(input, value, regex, errorMessage) {
        if (!regex.test(value)) {
          input.validation.isValid = false;
          input.validation.errorMessage = errorMessage;
        } else {
          input.validation.isValid = true;
          input.validation.errorMessage = '';
        }
        return input.validation.isValid;
      },
      validationPhoneInput(input, value) {
        const phoneRegex = /^380\d{9}$/;
        return this.validateInputWithRegex(
          input,
          value,
          phoneRegex,
          'Please enter a valid phone number (380*********)'
        );
      },
      validationEmailInput(input, value) {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return this.validateInputWithRegex(
          input,
          value,
          emailRegex,
          'Please enter a valid email'
        );
      },
      validationUrlInput(input, value) {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return this.validateInputWithRegex(
          input,
          value,
          urlRegex,
          'Please enter a valid url'
        );
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
