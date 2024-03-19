<template>
  <div class="container">
    <h1>Resume Manager</h1>
    <nav>
      <router-link to="/">
        <font-awesome-icon
          :icon="['fas', 'house']"
          v-if="isMobile"
        />
        <span v-else>Home</span>
      </router-link>
      <router-link to="/create">
        <font-awesome-icon
          :icon="['fas', 'circle-plus']"
          v-if="isMobile"
        />
        <span v-else-if="!isDesktop">Create</span>
        <span v-else>Create Resume</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faHome, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  library.add(faHome, faCirclePlus);

  export default {
  name: 'AppHeader',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      isMobile: false,
      isDesktop: false,
    };
  },
  mounted() {
    this.updateIsMobile();
    this.updateIsDesktop();
    window.addEventListener('resize', this.updateIsMobile);
    window.addEventListener('resize', this.updateIsDesktop);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateIsMobile);
    window.removeEventListener('resize', this.updateIsDesktop);
  },
  methods: {
    updateIsMobile() {
      this.isMobile = window.innerWidth <= 425;
    },
    updateIsDesktop() {
      this.isDesktop = window.innerWidth >= 768;
    },
  },
};
</script>

<style scoped>
  .container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 5px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    background-color: #b47f55d6;
  }

  h1 {
    margin: 0;
    font-size: 18px;
    font-weight: 900;
    color: #f4f2e7;
  }

  nav {
    font-size: 16px;
    cursor: pointer;
  }

  nav a {
    margin-right: 14px;
    font-weight: bold;
    color: #f4f2e7;
    text-decoration: none;
  }

  nav a:hover {
    color: #f7d201;
  }

  nav .router-link-exact-active {
    color: #f7d201;
  }

  @media screen and (min-width: 426px) {
    .container {
      padding: 5px 30px;
    }
  }

  @media screen and (min-width: 768px) {
    h1 {
      font-size: 24px;
    }

    nav a {
      margin-right: 40px;
    }
  }

  @media screen and (min-width: 1024px) {
    .container {
      padding: 5px 80px;
    }

    nav {
      font-size: 18px;
    }

    nav a {
      margin-right: 50px;
    }
  }

</style>
