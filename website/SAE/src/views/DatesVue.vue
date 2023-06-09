<script setup>
import axios from 'axios';
import ButtonDates from '../components/ButtonDates.vue';
</script>

<template>
  <h1>Dates</h1>
  <ButtonDates @click="getDates()"></ButtonDates>
</template>

<script>
export default {
  setup() {
    this.getDates()
 
    ButtonDates },
  data() {
    return {
      city: "",
      date: ""
    }
  },
  methods: {
  async getDates() {
    try {
      // const url = new URL('http://127.0.0.1:3200/generate');
      // url.search = new URLSearchParams({
      //   city: 'Nantes'
      // });

      // fetch(url)
      //   .then(response => {
      //     if (response.ok) {
      //       // Traitement de la réponse si la requête est réussie
      //       console.log(reponse.data);
      //     } else {
      //       // Gestion des erreurs si la requête échoue
      //     }
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
      let date = new Date(Date.now())
      let ville = "Nantes"
      const response = await fetch(`http://127.0.0.1:3200/generate/${ville}/${date}`, {method: "GET"})

      console.log(await response.json());
    } catch (error) {
      console.error(error);
    }
  }
}


}
</script>