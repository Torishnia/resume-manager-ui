<template>
  <div class="wrapper" v-if="!loading">

    <div :class="leftPartClasses">
      <div class="main-info">
        <p class="fio">{{ resume.lastName }}</p>
        <p class="fio">{{ resume.firstName }}</p>
        <br/>
        <p class="position">{{ resume.positionTitle }}</p>
        <p class="position">{{ resume.positionDescription }}</p>
        <hr/>
        <div class="location">
          <font-awesome-icon :icon="['fas', 'location-dot']" />
          <span>{{ resume.location }}</span>
        </div>
        <div class="age">
          <font-awesome-icon :icon="['fas', 'info']" />
          <span>Age: {{ resume.age }}</span>
        </div>
      </div>

      <div class="contact-info" v-if="resume.contact?.length > 0">
        <HeaderIcon title="Contacts" :icon="['fas', 'id-card']" />

        <div class="contact-items">
          <div class="contact-item" v-for="contact in contactList" :key="contact.key">
            <font-awesome-icon :icon="[contact.iconPrefix, contact.icon]" />

            <a v-if="contact.hasOwnProperty('url')" :href="contact.url" target="_blank">
              {{ contact.url }}
            </a>

            <span v-else-if="contact.hasOwnProperty('value')">{{ contact.value }}</span>
            <font-awesome-icon v-if="contact.key === 'phone'" style="margin-right: 5px;" :icon="['fab', 'telegram']" />
            <font-awesome-icon v-if="contact.key === 'phone'" :icon="['fab', 'viber']" />
          </div>
        </div>

      </div>

      <div class="language-info" v-if="resume.languages?.length > 0">
        <HeaderIcon title="Languages" :icon="['fas', 'language']" />

        <LanguageLevel
          v-for="(language, index) in resume.languages"
          :key="index" 
          :language="language"
        />
      </div>

      <div class="skill-info" v-if="resume.skills?.length > 0">
        <HeaderIcon title="Skills" :icon="['fas', 'id-card']" />

        <div class="skill-item" v-for="(skill, index) in resume.skills" :key="index">
          <span>{{ skill.name }}</span>
        </div>
      </div>

    </div>

    <div class="right-part" v-if="hasRightContent">
      <div class="experience-info" v-if="resume.experiences?.length > 0">
        <HeaderIcon title="Experience" :icon="['fas', 'briefcase']" />

        <InfoItem v-for="(experience, index) in resume.experiences"
          :key="index"
          :title="experience.companyName"
          :subtitle="experience.companyPosition"
          :details="experience.companyStack"
          :description="experience.companyDescription"
          :startDate="experience.startDate"
          :endDate="experience.endDate"
        />
      </div>

      <div class="education-info" v-if="resume.educations?.length > 0">
        <HeaderIcon title="Education" :icon="['fas', 'graduation-cap']" />

        <InfoItem v-for="(education, index) in resume.educations"
          :key="index"
          :title="education.institutionName"
          :subtitle="education.institutionDegree"
          :details="education.institutionFaculty"
          :startDate="education.startDate"
          :endDate="education.endDate"
        />
      </div>

      <div class="course-info" v-if="resume.courses?.length > 0">
        <HeaderIcon title="Courses" :icon="['fas', 'chalkboard-user']" />

        <InfoItem v-for="(course, index) in resume.courses"
          :key="index"
          :title="course.courseName"
          :subtitle="course.courseAuthor"
          :details="course.courseResourse"
          :startDate="course.startDate"
          :endDate="course.endDate"
        />
      </div>

      <div class="interest-info" v-if="resume.interests?.length > 0">
        <HeaderIcon title="Interests" :icon="['fas', 'circle-user']" />

        <div class="interest-item">
          <span>{{ resume.interests }}</span>
        </div>
      </div>
    </div>
  </div>

  <LoadingSpinner :loading="loading" />
</template>

<script>
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faTelegram, faViber, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
  import {
    faLocationDot,
    faInfo,
    faIdCard,
    faPhone,
    faEnvelope,
    faLanguage,
    faBriefcase,
    faGraduationCap,
    faChalkboardUser,
    faCircleUser } from '@fortawesome/free-solid-svg-icons';

  import LanguageLevel from '@/components/LanguageLevel.vue';
  import HeaderIcon from '@/components/HeaderIcon.vue';
  import InfoItem from '@/components/InfoItem.vue';
  import LoadingSpinner from '@/components/LoadingSpinner.vue';

  library.add(
    faLocationDot,
    faInfo,
    faIdCard,
    faPhone,
    faEnvelope,
    faTelegram,
    faViber,
    faLinkedin,
    faGithub,
    faLanguage,
    faBriefcase,
    faGraduationCap,
    faChalkboardUser,
    faCircleUser
  );

  export default {
    name: 'ViewResume',
    data() {
      return {
        loading: true,
        resume: {},
        contactList: [],
      };
    },
    components: { 
      FontAwesomeIcon,
      LanguageLevel,
      HeaderIcon,
      InfoItem,
      LoadingSpinner 
    },
    beforeCreate() {
      const resumeId = this.$route.params.id;

      fetch(`https://resume-manager-api-git-main-torishnia.vercel.app/resumes/${resumeId}`)
        .then(response => response.json())
        .then(data => {
          this.loading = false;
          this.resume = data;
        })
        .catch(error => {
          console.error('Error fetching resume:', error);
          this.loading = false;
        });
    },
    computed: {
      hasRightContent() {
        return (
          this.resume.experiences.length > 0 ||
          this.resume.educations.length > 0 ||
          this.resume.courses.length > 0 ||
          this.resume.interests.length > 0
        );
      },
      leftPartClasses() {
        return {
          'left-part': true,
          'centered-left-part': !this.hasRightContent
        };
      }
    },
    watch: {
      resume: {
        handler() {
          this.populateContactList();
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      populateContactList() {
        if (this.resume.contact) {
          this.contactList = [
            {
              key: 'phone',
              icon: 'phone',
              iconPrefix: 'fa',
              value: this.resume.contact.phone
            },
            {
              key: 'email',
              icon: 'envelope',
              iconPrefix: 'fa',
              value: this.resume.contact.email
            },
            {
              key: 'linkedInURL',
              icon: 'linkedin',
              iconPrefix: 'fab',
              url: this.resume.contact.linkedInURL
            },
            {
              key: 'telegramURL',
              icon: 'telegram',
              iconPrefix: 'fab',
              url: this.resume.contact.telegramURL
            },
            {
              key: 'gitHubURL',
              icon: 'github',
              iconPrefix: 'fab',
              url: this.resume.contact.gitHubURL
            }
          ];
        }
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    margin: 40px 15px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    height: auto;
    border-radius: 10px;
    box-sizing: border-box;
  }

  .left-part {
    width: 100%;
    background: #afcbf0;
    border-radius: 5px 5px 0 0;
    box-sizing: border-box;
  }

  .centered-left-part {
    border-radius: 5px;
  }

  .main-info {
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 80%;
    box-sizing: border-box;
  }

  hr {
    height: 1px;
    background-color: #eeeeee;
    border-radius: 10px;
    margin-top: 10px;
    margin-bottom: 10px;  
  }

  .fio {
    margin: 5px;
    font-size: 20px; 
    font-weight: bold;
  }

  .position {
    margin: 8px;
    font-size: 15px;
    font-weight: bold;
  }

  .location, .age {
    margin: 5px;
    display: flex;
    justify-content: center;
  }

  .location span, .age span {
    margin-left: 8px;
  }

  .contact-info,
  .language-info,
  .skill-info,
  .experience-info,
  .education-info,
  .course-info,
  .interest-info {
    margin: 10px auto;
    width: 90%;
    box-sizing: border-box;
  }

  .contact-items {
    padding: 5px;
    box-sizing: border-box;
  }

  .contact-item {
    padding: 5px;
    display: flex;
    align-items: center;
  }

  .contact-item span, a {
    margin: 0 8px;
    font-size: 15px;
  }

  .contact-item a {
    color: #023d8c;
    text-decoration: none;
    cursor: pointer;
  }

  .contact-item a:hover {
    color: #1964c9;
  }

  .skill-item {
    padding: 3px 10px;
    font-weight: 500;
  }

  .right-part {
    width: 100%;
    background: #afcbf0;
    border-radius: 0 0 5px 5px;
  }

  .interest-item span {
    font-style: italic;
  }

  @media screen and (min-width: 768px) {
    .wrapper {
      margin: 70px auto;
      flex-direction: row;
      width: 738px;
    }

    .left-part {
      width: 35%;
      border-radius: 5px;
    }

    .centered-left-part {
      margin: auto;
    }

    .right-part {
      width: 65%;
      background: #fff;
      border-radius: 0 5px 5px 0;
    }
  }

  @media screen and (min-width: 1024px) {
    .wrapper {
      width: 850px;
    }
  }
</style>
