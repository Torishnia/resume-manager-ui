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

    <ContentWrapper title="Language">
      <CustomInput
        v-for="(input, index) in languageData"
        :key="index"
        :inputId="input.inputId"
        :inputType="input.inputType"
        :inputLabel="input.inputLabel"
        :inputName="input.inputName"
        :inputLength="input.inputLength"
        :options="input.options"
        v-model="input.value"
        :isValid="isButtonTouched ? input.validation.isValid : true"
        :validationErrorMessage="isButtonTouched ? input.validation.errorMessage : ''"
      />

      <CustomButton title="Add Language" @click="addEntry(this.languageData, this.languages)" />

      <CustomCard 
        v-for="(language, index) in languages"
        :key="index"
        :arrayName="'languages'"
        :index="index"
        :name="language.name"
        :details="language.level"
        @remove="removeItem"
      />
    </ContentWrapper>

    <ContentWrapper title="Skills">
      <CustomInput
        v-for="(input, index) in skillData"
        :key="index"
        :inputId="input.inputId"
        :inputType="input.inputType"
        :inputName="input.inputName"
        :inputPlaceholder="input.inputPlaceholder"
        :inputLength="input.inputLength"
        :options="input.options"
        v-model="input.value"
        :isValid="isButtonTouched ? input.validation.isValid : true"
        :validationErrorMessage="isButtonTouched ? input.validation.errorMessage : ''"
        @keydown.enter.prevent="addEntry(this.skillData, this.skills)"
      />

      <span
        class="tag"
        v-for="(skill, index) in skills"
        :key="index"
      >
        {{ skill.name }}
        <CustomIconRemove
          arrayName="skills"
          :index="index"
          @remove="removeItem"
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

      <CustomButton title="Add Experience" @click="addEntry(this.experienceData, this.experiences)" />

      <CustomCard 
        v-for="(experience, index) in experiences"
        :key="index"
        :arrayName="'experiences'"
        :index="index"
        :name="experience.companyName"
        :title="experience.companyPosition"
        :details="experience.companyStack"
        :startDate="experience.startDate"
        :endDate="experience.endDate"
        :description="experience.companyDescription"
        @remove="removeItem"
      />
    </ContentWrapper>

    <ContentWrapper title="Education">
      <CustomInput
        v-for="(input, index) in educationData"
        :key="index"
        :inputId="input.inputId"
        :inputType="input.inputType"
        :inputLabel="input.inputLabel"
        :inputName="input.inputName"
        :inputLength="input.inputLength"
        :options="input.options"
        v-model="input.value"
        :isValid="isButtonTouched ? input.validation.isValid : true"
        :validationErrorMessage="isButtonTouched ? input.validation.errorMessage : ''"
      />

      <CustomButton title="Add Education" @click="addEntry(this.educationData, this.educations)" />

      <CustomCard 
        v-for="(education, index) in educations"
        :key="index"
        :arrayName="'educations'"
        :index="index"
        :name="education.institutionName"
        :title="education.institutionDegree"
        :details="education.institutionFaculty"
        :startDate="education.startDate"
        :endDate="education.endDate"
        @remove="removeItem"
      />
    </ContentWrapper>

    <ContentWrapper title="Course">
      <CustomInput
        v-for="(input, index) in courseData"
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

      <CustomButton title="Add Course" @click="addEntry(this.courseData, this.courses)" />

      <CustomCard 
        v-for="(course, index) in courses"
        :key="index"
        :arrayName="'courses'"
        :index="index"
        :name="course.courseName"
        :title="course.courseAuthor"
        :details="course.courseResourse"
        :startDate="course.startDate"
        :endDate="course.endDate"
        @remove="removeItem"
      />
    </ContentWrapper>

    <button
      type="submit"
      :class="{'btn-create-disabled': !isFormValid, 'btn-create': true}"
      :disabled="!isFormValid"
    >Create</button>
  </form>
</template>

<script>
  import ContentWrapper from '@/components/ContentWrapper.vue';
  import CustomInput from '@/components/CustomInput.vue';
  import CustomTextarea from '@/components/CustomTextarea.vue';
  import CustomButton from '@/components/CustomButton.vue';
  import CustomCard from '@/components/CustomCard.vue';
  import CustomIconRemove from '@/components/CustomIconRemove.vue';
  import { 
    contactData, 
    experienceData, 
    mainData, 
    educationData, 
    courseData, 
    languageData, 
    skillData,
  } from '@/mockData';
  import { validateInput, validateData, VALIDATION_TYPE } from '@/validation';

  export default {
    name: 'CreateResume',
    data() {
      return {
        mainData,
        contactData,
        languageData,
        skillData,
        experienceData,
        educationData,
        courseData,
        interests: '',
        companyDescription: '',
        contact: {
          phone: '',
          email: '',
          linkedInURL: '',
          telegramURL: '',
          gitHubURL: '',
        },
        languages: [],
        skills: [],
        experiences: [],
        educations: [],
        courses: [],
        isButtonTouched: false,
      };
    },
    components: {
      ContentWrapper,
      CustomInput,
      CustomTextarea,
      CustomButton,
      CustomCard,
      CustomIconRemove,
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
          languages: this.languages,
          skills: this.skills,
          experiences: this.experiences,
          educations: this.educations,
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
            validateInput(input, input.value, VALIDATION_TYPE.AGE);
          } else if (input.inputName === 'positionDescription') {
            if (input.value === '') {
              input.validation.isValid = true;
            }
          } else {
            validateInput(input, input.value, VALIDATION_TYPE.REQUIRED);
          }

          if (!input.validation.isValid) {
            isMainDataValid = false;
          }
        }

        // Check if valid contactData
        let isContactDataValid = true;

        const validationMapping = {
          'phone': { method: validateInput, type: VALIDATION_TYPE.PHONE },
          'email': { method: validateInput, type: VALIDATION_TYPE.EMAIL },
          'linkedInURL': { method: validateInput, type: VALIDATION_TYPE.URL },
          'telegramURL': { method: validateInput, type: VALIDATION_TYPE.URL },
          'gitHubURL': { method: validateInput, type: VALIDATION_TYPE.URL }
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

        // Check if valid languageData
        const isLanguageDataValid = validateData(this.languageData);

        // Check if valid experienceData
        const isExperienceDataValid = validateData(this.experienceData);

        // Check if valid educationData
        const isEducationDataValid = validateData(this.educationData);

        // Check if valid courseData
        const isCourseDataValid = validateData(this.courseData);

        return (
          isMainDataValid &&
          isContactDataValid &&
          isLanguageDataValid &&
          isExperienceDataValid &&
          isEducationDataValid &&
          isCourseDataValid
        );
      },
    },
    methods: {
      addEntry(fieldsData, entriesArray) {
        const newEntry = {};
        let fieldFilled = false;

        fieldsData.forEach(field => {
          if (field.value.trim()) {
            newEntry[field.inputName] = field.value.trim();
            fieldFilled = true;
          }
        });

        if (this.companyDescription.trim()) {
          newEntry.companyDescription = this.companyDescription.trim();
          fieldFilled = true;
        }

        if (fieldFilled) {
          entriesArray.push(newEntry);
          fieldsData.forEach(field => field.value = '');
          this.companyDescription = '';
        }
      },
      removeItem(arrayName, index) {
        this[arrayName].splice(index, 1);
      },
      formatEntries(entries) {
        return entries.map(entry => {
          const formattedEntry = { ...entry };

          if (entry.startDate) {
            formattedEntry.startDate = new Date(entry.startDate).toISOString();
          } else {
            formattedEntry.startDate = null;
          }

          if (entry.endDate) {
            formattedEntry.endDate = new Date(entry.endDate).toISOString();
          } else {
            formattedEntry.endDate = null;
          }

          return formattedEntry;
        });
      },
      async onSubmit() {
        this.isButtonTouched = true;
        if (this.isFormValid) {
          try {
            await this.createResume();
            this.clearForm();
            this.$router.push({ path: '/' });
            this.isButtonTouched = false;
          } catch (err) {
            console.error('Error creating resume:', err);
          }
        }
      },
      async createResume() {
        const ageField = this.mainData.find((input) => input.inputName === 'age');
        if (ageField) ageField.value = Number(ageField.value);

        const formattedExperiences = this.formatEntries(this.experiences);
        const formattedEducations = this.formatEntries(this.educations);
        const formattedCourses = this.formatEntries(this.courses);

        const resumeDataWithFormattedDates = {
          ...this.resumeData,
          experiences: formattedExperiences,
          educations: formattedEducations,
          courses: formattedCourses
        };

        try {
          const response = await fetch('https://resume-manager-api-git-main-torishnia.vercel.app/resumes/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(resumeDataWithFormattedDates),
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
        this.languageData.forEach(item => item.value = '');
        this.languages = [];
        this.skills = [];
        this.experienceData.forEach(item => item.value = '');
        this.experiences = [];
        this.educationData.forEach(item => item.value = '');
        this.educations = [];
        this.courseData.forEach(item => item.value = '');
        this.courses = [];
      },
  },
}

</script>

<style scoped>
  .container {
    margin-top: 50px;
    padding: 15px;
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
      margin: 120px auto 0;
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
