<script setup>
import { RouterView } from 'vue-router';
import NavbarBestDates from './components/NavbarBestDates.vue';
</script>

<template>
  <NavbarBestDates class="navbar"></NavbarBestDates>
  <div class="conteneur">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
  .navbar {
    width: 100vw;
    height: 5rem;
  }

  .conteneur {
        position: relative;
        height: calc(100% - 5rem);
        width: 100%;
        display: flex;
        justify-content: center;
        background-color: #ffffffdd;
    }

    .conteneur::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-image: url('/public/Le-«-Love-bombing-»-la-meilleure-arme-des-pervers-narcissiques2.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        filter: blur(5px); /* Valeur de flou pour l'élément superposé */
        z-index: -1;
    }
</style>
