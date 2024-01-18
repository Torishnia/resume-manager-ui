<template>
  <div class="wrapper">
    <button @click="toggleInfo" type="button" class="btn-details">
      Contacts
      <span>&#9650;</span>
    </button>
    <div v-if="showInfo">
      <div class="contact-info">
        <label for="phone">Phone</label>
        <input
          type="text"
          name="phone"
          v-model="phone"
          maxlength="12"
          @input="contactData"
        />
      </div>
      <div class="contact-info">
        <label for="email">Email</label>
        <input
          type="text"
          name="email"
          v-model="email"
          maxlength="64"
          @input="contactData"
        />
      </div>
      <div class="contact-info">
        <label for="linkedIn">LinkedIn</label>
        <input
          type="text"
          name="linkedIn"
          v-model="linkedInURL"
          maxlength="128"
          @input="contactData"
        />
      </div>
      <div class="contact-info">
        <label for="telegram">Telegram</label>
        <input
          type="text"
          name="telegram"
          v-model="telegramURL"
          maxlength="128"
          @input="contactData"
        />
      </div>
      <div class="contact-info">
        <label for="gitHub">GitHub</label>
        <input
          type="text"
          name="gitHub"
          v-model="gitHubURL"
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
        phone: '',
        email: '',
        linkedInURL: '',
        telegramURL: '',
        gitHubURL: '',
      };
    },
    methods: {
      toggleInfo() {
        console.log(this.showInfo);
        this.showInfo = !this.showInfo;
      },
      contactData() {
        console.log('contactData');
        this.$emit('contact-data', {
          phone: this.phone,
          email: this.email,
          linkedInURL: this.linkedInURL,
          telegramURL: this.telegramURL,
          gitHubURL: this.gitHubURL,
        })
      }
    }
  }

</script>

<style scoped>
  .wrapper {
    margin: 30px 0;
  }

  .btn-details {
    font-size: 18px;
    font-weight: 500;
    color: #2e3c51;
    border: none;
    cursor: pointer;
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
