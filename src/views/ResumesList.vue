<template>
  <div class="container">
    <ul>
      <li
        v-for="resume in resumes"
        :key="resume.id"
        class="resume"
        @click="() => viewResume(resume.id)"
      >
        <div class="resume-group">
          <div class="group-item">
            <font-awesome-icon :icon="['fas', 'circle-user']" class="group-icon"/>
            <span class="group-name">{{ resume.lastName }} {{ resume.firstName }}</span>
          </div>
          <div class="group-date">{{ formattedDate(resume.createdAt) }}</div>
        </div>
        <div class="resume-position">{{ resume.positionTitle }}</div>
      </li>
      <LoadingSpinner :loading="loading" />
      <li v-if="!loading && resumes.length === 0" class="no-data">No resumes available.</li>
    </ul>
  </div>
</template>

<script>
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  import LoadingSpinner from '@/components/LoadingSpinner.vue';

  library.add(faCircleUser);

  export default {
    name: 'ResumesList',
    data() {
      return {
        resumes: [],
        loading: true,
      }
    },
    components: {
      FontAwesomeIcon,
      LoadingSpinner,
    },
    methods: {
      formattedDate(dateString) {
        const dateObject = new Date(dateString);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        return `${year}.${month}`;
      },
      viewResume(id) {
        this.$router.push({ name: 'view', params: { id } })
          .catch(error => {
            console.error('Error navigating to view:', error);
          })
      }
    },
    mounted() {
      fetch('https://resume-manager-api-git-main-torishnia.vercel.app/resumes')
        .then(response => response.json())
        .then(json => {
          this.resumes = json;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching resumes:', error);
          this.loading = false;
        });
    }
  }
</script>

<style scoped>
  .container {
    margin: 100px auto;
    cursor: pointer;
  }

  .resume {
    margin-bottom: 30px;
    padding: 8px;
    list-style: none;
    border-radius: 10px;
    border: 2px solid #2e3c51;
    box-sizing: content-box;
    overflow-wrap: anywhere;
  }

  .resume:hover {
    border-color: #f7d201;
  }

  .resume-group {
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .group-item {
    display: flex;
    align-items: center;
  }

  .group-icon {
    font-size: 24px;
    color: #c1af89
  }

  .group-name {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 600;
    color: #b47f55
  }

  .group-date {
    font-size: 14px;
    font-style: italic;
    color: #c1af89
  }

  .resume-position {
    margin: 10px 30px;
    color: #2e3c51
  }

  .no-data {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: #2e3c51;
  }

  @media screen and (min-width: 426px) {
    .container {
      margin: 150px auto;
      width: 330px;
    }
  }

  @media screen and (min-width: 768px) {
    .container {
      width: 460px;
    }
  }
</style>
