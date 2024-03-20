<template>
  <div class="info-item">
    <div>
      <h3>{{ title }}</h3>
      <span class="item-subtitle">{{ subtitle }}</span>
      <p class="item-details" v-if="!isLink">{{ details }}</p>
      <p class="item-details" v-else>
        <a :href="details" target="_blank">{{ details }}</a>
      </p>
      <p class="item-description">{{ description }}</p>
    </div>
    <div v-if="hasStartDate || hasEndDate">
      <span class="item-dates">{{ formattedDate }}</span>
    </div>
    <hr/>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      subtitle: String,
      details: String,
      description: String,
      startDate: String,
      endDate: String,
      isLink: Boolean,
    },
    computed: {
      hasStartDate() {
        return !!this.startDate;
      },
      hasEndDate() {
        return !!this.endDate;
      },
      formattedDate() {
        if (this.startDate && this.endDate) {
          return `${this.formatDate(this.startDate)} - ${this.formatDate(this.endDate)}`;
        } else if (this.startDate) {
          return `Start Date: ${this.formatDate(this.startDate)}`;
        } else if (this.endDate) {
          return `End Date: ${this.formatDate(this.endDate)}`;
        } else {
          return '';
        }
      }
    },
    methods: {
      formatDate(dateString) {
        if (!dateString) return '';

        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${month}.${year}`;
      }
    }
  }
</script>

<style scoped>
  .info-item {
    margin-top: 15px;
  }

  .item-subtitle {
    font-size: 14px;
    font-style: italic;
  }

  .item-details {
    font-size: 14px;
    font-weight: 700;
  }

  .item-details a {
    color: #023d8c;
    text-decoration: none;
    cursor: pointer;
  }

  .item-details a:hover {
    color: #1964c9;
  }

  .item-description {
    margin-top: 10px;
  }

  .item-dates {
    font-size: 14px;
    font-weight: 500;
    font-style: italic;
  }

  hr {
    height: 1px;
    background-color: #eeeeee;
    border-radius: 10px;
  }

  @media screen and (min-width: 768px) {
    hr {
      height: 2px;
      background-color: #afcbf0;
      border-radius: 10px;
    }
  }
</style>
