<template>
  <div class="wrapper">
    <button @click="toggleInfo" type="button" class="btn-details">
      Contacts
      <span>&#9650;</span>
    </button>
    <div v-if="showInfo">
      <div class="contact-info">
        <label for="phone">Phone*</label>
        <input
          type="text"
          name="phone"
          v-model="contact.phone"
          maxlength="12"
          @input="contactData"
        />
      </div>
      <div class="contact-info">
        <label for="email">Email*</label>
        <input
          type="text"
          name="email"
          v-model="contact.email"
          maxlength="64"
          @input="contactData"
        />
      </div>
      <div class="contact-info">
        <label for="linkedIn">LinkedIn*</label>
        <input
          type="text"
          name="linkedIn"
          v-model="contact.linkedInURL"
          maxlength="128"
          @input="contactData"
        />
      </div>
      <div class="contact-info">
        <label for="telegram">Telegram*</label>
        <input
          type="text"
          name="telegram"
          v-model="contact.telegramURL"
          maxlength="128"
          @input="contactData"
        />
      </div>
      <div class="contact-info">
        <label for="gitHub">GitHub*</label>
        <input
          type="text"
          name="gitHub"
          v-model="contact.gitHubURL"
          maxlength="128"
          @input="contactData"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showInfo: false,
        contact: {
          phone: '',
          email: '',
          linkedInURL: '',
          telegramURL: '',
          gitHubURL: '',
        }
      };
    },
    methods: {
      toggleInfo() {
        this.showInfo = !this.showInfo;
      },
      contactData() {
        this.$emit('contact-data', { ...this.contact });
      }
    }
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

  .contact-info {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 300;
    color: #2e3c51;
  }

  input, textarea {
    padding: 5px 10px;
    font-size: 16px;
    font-weight: 500;
    border: 1px solid #2e3c51;
    border-radius: 10px;
    color: #2e3c51;
  }
</style>
