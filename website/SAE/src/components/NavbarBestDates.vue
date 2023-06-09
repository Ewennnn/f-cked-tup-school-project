
<template>
    <va-navbar
      v-bind="NavbarColors"
      class="main-container"
    >
    <div class="navbar">
      <div class="left">
        <router-link to="/home">
          <va-navbar-item>
            <img src="../assets/logo.png" alt="" class="logo">
          </va-navbar-item>
        </router-link>
      </div>
      <div v-if="connected">
        <va-navbar-item class="item">
          <router-link to="/favoris">
            <va-avatar class="profile"> J.K. </va-avatar>
          </router-link>
        </va-navbar-item>
      </div>
      <div v-else >
        <va-navbar-item>
          <ButtonDates name="Connexion"></ButtonDates>
        </va-navbar-item>
      </div>
    </div>
  </va-navbar>
</template>
  
<script setup>
  import { computed } from "vue";
  import { useColors } from "vuestic-ui";
  import ButtonDates from './ButtonDates.vue';
  
  const { currentPresetName } = useColors(  );
  
  const connected = true;
  const NavbarColors = computed(() => {
    if (currentPresetName.value === "light") {
      return {
        color: "#FF6F6F",
        textColor: "#BAFFC5",
      };
    } else {
      return {
        color: "#FBCAF6",
        textColor: "#481269",
      };
    }
  });
</script>

<style scoped>
  .main-container {
    display: flex;
    justify-content: center;  /*Ajout de cette ligne*/ 
    align-items: center; /*Ajout de cette ligne*/
  }

  .navbar {
    width: 70vw;
    /* max-width: 100%; */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .profile {
    width: 4rem;
    height: 4rem;
  }

  .logo {
    height: 4rem;
    width: auto;
  }
</style>