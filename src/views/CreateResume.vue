<template>
  <form class="container" @submit.prevent="onSubmit">
    <div class="info">
      <label for="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        v-model="firstName"
        maxlength="64"
        required
      />
    </div>
    <div class="info">
      <label for="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        v-model="lastName"
        maxlength="64"
        required
      />
    </div>
    <div class="info">
      <label for="age">Age</label>
      <input
        type="number"
        name="age"
        v-model="age"
        required
      />
    </div>
    <div class="info">
      <label for="location">Location</label>
      <input
        type="text"
        name="location"
        v-model="location"
        maxlength="128"
        required
      />
    </div>
    <div class="info">
      <label for="position">Position</label>
      <input
        type="text"
        name="position"
        v-model="position"
        maxlength="128"
        required
      />
    </div>
    <div class="info">
      <label for="description">Description*</label>
      <textarea
        type="text"
        name="description"
        v-model="description"
        maxlength="128"
      ></textarea>
    </div>
    <div class="info">
      <label for="interests">Interests*</label>
      <textarea
        type="text"
        name="interests"
        v-model="interests"
        maxlength="500"
      ></textarea>
    </div>
    <ContactInfo @contact-data="handleContactData" />
    <button type="submit">Create</button>
  </form>
</template>

<script>
  import ContactInfo from '@/components/ContactInfo.vue';

  export default {
    name: 'CreateResume',
    data() {
      return {
        firstName: '',
        lastName: '',
        age: null,
        location: '',
        position: '',
        description: '',
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
    components: { ContactInfo },
    methods: {
      handleContactData(data) {
        this.contact = data;
      },
      async createResume() {
        try {
          const response = await fetch('https://resume-manager-api-git-main-torishnia.vercel.app/resumes/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                firstName: this.firstName,
                lastName: this.lastName,
                age: this.age,
                location: this.location,
                positionTitle: this.position,
                positionDescription: this.description,
                interests: this.interests,
                contact: this.contact,
              })
          });
          if (!response.ok) throw new Error('Error creating resume');
          console.log('Resume created successfully');
        }
        catch (err) {
          console.error('Error creating resume:', err);
        }
      },
      onSubmit() {
        this.createResume();
        this.firstName = '';
        this.lastName = '';
        this.age = null;
        this.location = '';
        this.position = '';
        this.description = '';
        this.interests = '';
        this.contact = {
          phone: '',
          email: '',
          linkedInURL: '',
          telegramURL: '',
          gitHubURL: '',
        };
      },
  },
}

</script>

<style scoped>
  .container {
    padding: 15px;
    border: 1px solid red;
  }

  .info {
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
  }
</style>
