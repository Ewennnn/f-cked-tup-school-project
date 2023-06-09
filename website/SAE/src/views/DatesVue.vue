<script setup>
</script>

<template>
<div class="wrapper">
  <h1 class="title">Dates</h1>
  <div class="container">
    <div class="card" v-for="date in dates" :key="date.id">
      <img :src="date.place.photos[0].link" alt="image" class="img">
      <h1>{{ date.place.name }}</h1>
      <p>{{ new Date(date.date).toLocaleDateString('fr') }}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  setup() { 
    // this.getDates()
  },
  data() {
    return {
      dates: [] // Variable pour stocker les données reçues
    }
  },
  mounted() {
    this.getDates();
  },
  methods: {
  async getDates() {
    try {
      let date = new Date(Date.now())
      let ville = this.$route.params.ville
      const response = await fetch(`http://127.0.0.1:3200/generate/${ville}/${date}`, {method: "GET"})

      this.dates = await response.json(); // Stocke les données dans la variable 'dates'
      console.log(this.dates);
    } catch (error) {
      console.error(error);
    }
  }
}
}
</script>

<style scoped>
.wrapper {
  width: 70vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.container {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
}
.card {
  border: 1px solid #000;
  border-radius: 15px;
  width: 10rem;
  margin: 1rem;
  padding: 1rem;
}

.title {
  font-size: 5rem;
  width: 100%;
  height: fit-content;
  text-justify: distribute;
  margin: 1rem 0;
}

.img {
  width: 100%;
}
</style>