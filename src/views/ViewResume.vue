<template>
  <div class="wrapper">
    <div class="left-part">
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
      <div class="contact-info">
        <div class="contact-header">
          <font-awesome-icon class="icon" :icon="['fas', 'id-card']" />
          <span>Contacts</span>
        </div>
        <div class="contact-items">
          <div class="contact-item">
            <font-awesome-icon :icon="['fas', 'phone']" />
            <span>{{ resume.contact?.phone }}</span>&nbsp;
            <font-awesome-icon style="margin-right: 5px;" :icon="['fab', 'telegram']" />
            <font-awesome-icon :icon="['fab', 'viber']" />
          </div>
          <hr/>
          <div class="contact-item">
            <font-awesome-icon :icon="['fas', 'envelope']" />
            <span>{{ resume.contact?.email }}</span>
          </div>
          <hr/>
          <div class="contact-item">
            <font-awesome-icon :icon="['fab', 'linkedin']" />
            <a :href="resume.contact?.linkedInURL" target="_blank">
              {{ resume.contact?.linkedInURL }}
            </a>
          </div>
          <hr/>
          <div class="contact-item">
            <font-awesome-icon :icon="['fab', 'telegram']" />
            <a :href="resume.contact?.telegramURL" target="_blank">
              {{ resume.contact?.telegramURL }}
            </a>
          </div>
          <hr/>
          <div class="contact-item">
            <font-awesome-icon :icon="['fab', 'github']" />
            <a :href="resume.contact?.gitHubURL" target="_blank">
              {{ resume.contact?.gitHubURL }}
            </a>
          </div>
        </div>
        <hr/>
      </div>
      <div class="language-info" v-if="resume.languages?.length > 0">
        <div class="language-header">
          <font-awesome-icon class="icon" :icon="['fas', 'language']" />
          <span>Languages</span>
        </div>
        <LanguageLevel
          v-for="(language, index) in resume.languages"
          :key="index" 
          :language="language"
        />
      </div>
      <div class="skill-info">
        <div class="skill-header">
          <font-awesome-icon class="icon" :icon="['fas', 'id-card']" />
          <span>Skills</span>
        </div>
        <div class="skill-item" v-for="(skill, index) in resume.skills" :key="index">
          <span>{{ skill.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faLocationDot, faInfo, faIdCard, faPhone, faEnvelope, faLanguage } from '@fortawesome/free-solid-svg-icons';
  import { faTelegram, faViber, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

  import LanguageLevel from '@/components/LanguageLevel.vue';

  library.add(faLocationDot, faInfo, faIdCard, faPhone, faEnvelope, faTelegram, faViber, faLinkedin, faGithub, faLanguage);

  export default {
    name: 'ViewResume',
    data() {
      return {
        resume: {},
      };
    },
    components: { FontAwesomeIcon, LanguageLevel },
    mounted() {
      const resumeId = this.$route.params.id;

      fetch(`https://resume-manager-api-git-main-torishnia.vercel.app/resumes/${resumeId}`)
      .then(response => response.json())
      .then(data => {
        this.resume = data;
      })
      .catch(error => {
        console.error('Error fetching resume:', error);
      });
    },
  }
</script>

<style scoped>
  .wrapper {
    margin: 40px 15px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    height: auto;
    /* height: 1240px; */
    border: 2px solid #eeeeee;
    border-radius: 10px;
    box-sizing: border-box;
    background-color: green;
  }

  .left-part {
    width: 100%;
    background: #afcbf0;
    border-radius: 5px;
    box-sizing: border-box;
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
  .skill-info {
    margin: 10px auto;
    width: 90%;
    box-sizing: border-box;
  }

  .contact-header,
  .language-header,
  .skill-header {
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    background: #FAFAFA;
    border-radius: 5px;
  }

  .contact-header span,
  .language-header span,
  .skill-header span {
    margin-left: 10px;
    font-size: 20px;
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
    padding: 3px 0;
    font-weight: 500;
  }

  .icon {
    font-size: 35px;
  }


  @media screen and (min-width: 768px) {
    .wrapper {
      margin: 40px auto;
      width: 738px;
    }
  }

  @media screen and (min-width: 1024px) {
    .wrapper {
      width: 850px;
    }
  }

</style>
