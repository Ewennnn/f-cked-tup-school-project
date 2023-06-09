<script setup>
import ButtonDates from '../components/ButtonDates.vue';
</script>

<template>
        <div class="wrapper">
            <h1 class="title">BestDates</h1>
            <p class="subtitle">Avec BestDates, organisez quand VOUS voulez et où VOUS voulez pour votre date parfait !</p>
            <p class="desc">Choisissez une ville, une date, et laissez-vous porter !</p>

            <div class="form">
                <va-input v-model="ville" label="Ville" placeholder="Ville" required/>
                <h6 class="date">Date :</h6>
                <va-date-picker
                    mode="multiple"
                    class="date dateColor"
                    v-model="date"
                    color="#FF6F6F"
                    stateful
                    @click="test"
                />
                <ButtonDates @click="validate" name="Create Date !" class="buttonDate"></ButtonDates>
            </div>
        </div>
        <router-view></router-view>
</template>

<script>

const datePlusDay = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  console.log(date)
  return d;
};
const nextWeek = datePlusDay(new Date(), 7);

export default {
  data() {
    return {
      date : [new Date(), nextWeek],
      ville : new String()
    };
  },
  methods: {
    test() {
        console.log(this.date);
    },
    validate() {
        const param1 = this.ville;
        const param2 = this.date;
        this.$router.push({ name: "dates", params: { ville: param1, date: param2 } });
    }
  }
};
</script>

<style scoped>

    .wrapper {
        width: 50vw;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .title {
        font-size: 5rem;
        width: 100%;
        height: fit-content;
        text-justify: distribute;
        margin: 1rem 0;
    }

    .subtitle {
        width: 100%;
        font-size: 1.5rem;
        font-weight: bold;
        height: fit-content;
        flex-wrap: wrap;
    }

    .desc {
        margin-top: 1vh;
        width: 100%;
    }

    .form {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
    }

    .date {
        margin-top: 2rem;
    }

    .buttonDate {
        margin: 4rem auto;
    }
    .buttonDate:hover {
        color: #FF6F6F;
        border: 2px solid #FF6F6F;
    }

</style>