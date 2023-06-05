
<template>
    <va-navbar
      v-bind="NavbarColors"
      class="main-container"
    >
    <div class="navbar">
      <div class="left">
        <va-navbar-item>
          <img src="../assets/logo.png" alt="" class="logo">
        </va-navbar-item>
      </div>
      <div class="right" v-if="connected">
        <va-navbar-item class="item">
          <ButtonDates name="Compte"></ButtonDates></va-navbar-item>
        <va-navbar-item class="item">
          <va-avatar> J.K. </va-avatar>
        </va-navbar-item>
      </div>
      <div class="right" v-else >
        <va-navbar-item>
        <ButtonDates name="Connection"></ButtonDates></va-navbar-item>
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
  }

  .right {
    display: flex;
    justify-content: space-between;
    width: 7vw;
  }
  .logo {
    height: 4vh;
    width: auto;
  }
  </style>
  