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
      :isValid="isButtonTouched ? input.validation.isValid : true"
      :validationErrorMessage="isButtonTouched ? input.validation.errorMessage : ''"
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
        :isValid="isButtonTouched ? input.validation.isValid : true"
        :validationErrorMessage="isButtonTouched ? input.validation.errorMessage : ''"
      />
    </ContentWrapper>

    <ContentWrapper title="Skills">
      <CustomInput
        inputId="skills"
        inputType="text"
        inputName="skills"
        inputPlaceholder="Add tag and press Enter"
        :inputLength=64
        v-model="newSkill"
        @keydown.enter.prevent="addSkill"
      />
      <span
        class="tag"
        v-for="(skill, index) in skills"
        :key="index"
      >
        {{ skill }}
        <font-awesome-icon 
          class="icon-remove"
          :icon="['fas', 'circle-xmark']"
          @click="removeItem('skills', index)"
        />
      </span>
    </ContentWrapper>

    <ContentWrapper title="Experience">
      <CustomInput
        v-for="(input, index) in experienceData"
        :key="index"
        :inputId="input.inputId"
        :inputType="input.inputType"
        :inputLabel="input.inputLabel"
        :inputName="input.inputName"
        :inputLength="input.inputLength"
        v-model="input.value"
        :isValid="isButtonTouched ? input.validation.isValid : true"
        :validationErrorMessage="isButtonTouched ? input.validation.errorMessage : ''"
      />

      <CustomTextarea 
        textareaId="companyDescription"
        textareaLabel="Description"
        textareaName="companyDescription"
        :textareaLength=500
        v-model="companyDescription"
      />

      <CustomButton title="Add Experience" @click="addExperience" />

      <div class="experience-card" v-for="(experience, index) in experiences" :key="index">
        <font-awesome-icon 
          class="icon-remove remove-card"
          :icon="['fas', 'circle-xmark']"
          @click="removeItem('experiences', index)"
        />
        <h2 style="color: #b2a89b;">{{ experience.companyName }}</h2>
        <h3>{{ experience.companyPosition }}</h3>
        <p><strong>{{ experience.companyStack }}</strong></p>
        <p style="color: #b47f55;" v-if="experience.startDate || experience.endDate">
          <strong>
            {{ experience.startDate }} &#8212;
            {{ experience.endDate ? experience.endDate : 'until now' }}
          </strong>
        </p>
        <p style="color: #a2a2a2;"><strong>{{ experience.companyDescription }}</strong></p>
      </div>
    </ContentWrapper>

    <button
      type="submit"
      :class="{'btn-create-disabled': !isFormValid, 'btn-create': true}"
      :disabled="!isFormValid"
    >Create</button>
  </form>
</template>

<script>
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

  import ContentWrapper from '@/components/ContentWrapper.vue';
  import CustomInput from '@/components/CustomInput.vue';
  import CustomTextarea from '@/components/CustomTextarea.vue';
  import CustomButton from '@/components/CustomButton.vue';
  import { contactData, experienceData, mainData } from '@/mockData';

  library.add(faCircleXmark);

  const VALIDATION_TYPE = {
    REQUIRED: 'required',
    EMPTY: 'empty',
    AGE: 'age',
    PHONE: 'phone',
    EMAIL: 'email',
    URL: 'url',
  }

  export default {
    name: 'CreateResume',
    data() {
      return {
        mainData,
        contactData,
        experienceData,
        interests: '',
        companyDescription: '',
        contact: {
          phone: '',
          email: '',
          linkedInURL: '',
          telegramURL: '',
          gitHubURL: '',
        },
        skills: [],
        newSkill: '',
        experiences: [],
        isButtonTouched: false,
      };
    },
    components: {
      ContentWrapper,
      CustomInput,
      CustomTextarea,
      CustomButton,
      FontAwesomeIcon,
    },
    computed: {
      resumeData() {
        const mainDataAccumulated = this.mainData.reduce((acc, item) => {
          acc[item.inputName] = item.value;
          return acc;
        }, {});

        return {
          ...mainDataAccumulated,
          interests: this.interests,
          contact: this.contact,
          skills: this.skills,
          experiences: this.experiences,
        };
      },
      isFormValid() {
        if (!this.isButtonTouched) {
          return true;
        }

        // Check if valid mainData
        let isMainDataValid = true;

        for (const input of this.mainData) {
          if (input.inputName === VALIDATION_TYPE.AGE) {
            this.validationInput(input, input.value, VALIDATION_TYPE.AGE);
          } else if (input.inputName === 'positionDescription') {
            if (input.value === '') {
              input.validation.isValid = true;
            }
          } else {
            this.validationInput(input, input.value, VALIDATION_TYPE.REQUIRED);
          }

          if (!input.validation.isValid) {
            isMainDataValid = false;
          }
        }

        // Check if valid contactData
        let isContactDataValid = true;

        const validationMapping = {
          'phone': { method: this.validationInput, type: VALIDATION_TYPE.PHONE },
          'email': { method: this.validationInput, type: VALIDATION_TYPE.EMAIL },
          'linkedInURL': { method: this.validationInput, type: VALIDATION_TYPE.URL },
          'telegramURL': { method: this.validationInput, type: VALIDATION_TYPE.URL },
          'gitHubURL': { method: this.validationInput, type: VALIDATION_TYPE.URL }
        };

        for (const input of this.contactData) {
          const value = this.contact[input.inputName];
          if (value !== '') {
            const validation = validationMapping[input.inputName];
            const isValid = validation.method(input, value, validation.type);
            if (!isValid) {
              isContactDataValid = false;
            }
          }
        }

        // Check if valid experienceData
        let isExperienceDataValid = true;

        for (const input of this.experienceData) {
          if (input.value === '') {
            this.validationInput(input, input.value, VALIDATION_TYPE.EMPTY);
          }
          
          if (!input.validation.isValid) isExperienceDataValid = false;
        }

        return (
          isMainDataValid &&
          isContactDataValid &&
          isExperienceDataValid
        );
      },
    },
    methods: {
      addSkill() {
        if (this.newSkill.trim() !== '') {
          this.skills.push(this.newSkill.trim());
          this.newSkill = '';
        }
      },
      addExperience() {
        const newExperience = {};
        let fieldFilled = false;

        this.experienceData.forEach(input => {
          if (input.value.trim()) {
            newExperience[input.inputName] = input.value.trim();
            fieldFilled = true;
          }
        });

        if (this.companyDescription.trim()) {
          newExperience.companyDescription = this.companyDescription.trim();
          fieldFilled = true;
        }

        if (fieldFilled) {
          this.experiences.push(newExperience);
          this.experienceData.forEach(input => input.value = '');
          this.companyDescription = '';
        }
      },
      removeItem(arrayName, index) {
        this[arrayName].splice(index, 1);
      },
      async onSubmit() {
        this.isButtonTouched = true;
        if (this.isFormValid) {
          try {
            await this.createResume();
            this.clearForm();
            this.isButtonTouched = false;
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
        this.skills = [];
        this.experienceData.forEach(item => item.value = '');
        this.experiences = [];
      },
      setValidationState(input, isValid, errorMessage = '') {
        input.validation.isValid = isValid;
        input.validation.errorMessage = isValid ? '' : errorMessage;
        return isValid;
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
      validationInput(input, value = input.value, validationType) {
        switch(validationType) {
          case VALIDATION_TYPE.REQUIRED:
            return this.setValidationState(
              input,
              value.trim() !== '',
              `Please enter a valid ${input.inputLabel}`
            );
          case VALIDATION_TYPE.EMPTY:
            return this.setValidationState(
              input,
              value.trim() === '',
              `Please enter a valid ${input.inputLabel}`
            );
          case VALIDATION_TYPE.AGE:
            return this.setValidationState(
              input,
              value >= 18 && value <= 99,
              'Please enter a valid age (18-99)'
            );
          case VALIDATION_TYPE.PHONE:
            return this.validateInputWithRegex(
              input,
              value,
              /^380\d{9}$/,
              'Please enter a valid phone number (380*********)'
            );
          case VALIDATION_TYPE.EMAIL:
            return this.validateInputWithRegex(
              input,
              value,
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              'Please enter a valid email'
            );
          case VALIDATION_TYPE.URL:
            return this.validateInputWithRegex(
              input,
              value,
              /^(ftp|http|https):\/\/[^ "]+$/,
              'Please enter a valid url'
            );
          default:
            return true;
        }
      },
  },
}

</script>

<style scoped>
  .container {
    padding: 15px;
    border: 1px solid red;
  }

  .tag {
    margin-top: 10px;
    margin-right: 5px;
    padding: 5px 10px;
    display: inline-flex;
    align-items: center;
    border-radius: 10px;
    font-size: 14px;
    color: #f4f2e7;
    background-color: #2e3c51;
  }

  .icon-remove {
    margin-left: 8px;
    cursor: pointer;
    color: #f4f2e7;
    transition: .2s ease-out;
  }

  .icon-remove:hover {
    color: #b47f55;
  }

  .experience-card {
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

  .btn-create-disabled {
    background: #cccccc;
    border-color: #cccccc;
    cursor: not-allowed;
  }

  .btn-create-disabled:hover {
    color: #f4f2e7;
    background: #cccccc;
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

    .tag {
      font-size: 18px;
    }

    .btn-create {
      width: 120px;
    }
  }
</style>
