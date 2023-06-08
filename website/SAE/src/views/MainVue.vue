<script setup>
import NavbarBestDates from '../components/NavbarBestDates.vue';
import ButtonDates from '../components/ButtonDates.vue';
</script>

<template>
    <NavbarBestDates class="navbar"></NavbarBestDates>
    <div class="conteneur">
        <div class="research">
            <h1 class="Title">BestDates</h1>
            <p class="subtitle">Avec BestDates, organisez quand VOUS voulez et où VOUS voulez votre date parfait !</p>
            <p class="desc">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores aliquid iusto, optio perferendis omnis minus voluptatum earum vel asperiores exercitationem tempore porro reiciendis odio quis praesentium at esse vitae beatae!</p>

            <div class="form">
                <va-input v-model="ville" class="mb-6" label="Ville" placeholder="Ville" />
                <h6 class="date">Date :</h6>
                <va-date-picker
                    mode="multiple"
                    class="date dateColor"
                    v-model="date"
                    color="#FF6F6F"
                    stateful
                    @click="test"
                />
                <ButtonDates name="BestDate !" class="buttonDate"></ButtonDates>
            </div>
        </div>
    </div>

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
    }
  }
};
</script>

<style scoped>
    .navbar {
        width: 100vw;
        height: 5vh;
    }
    .conteneur {
        height: 95vh;
        width: 100vw;
        /* background-color: black; */
        display: flex;
        top: 0%;
        /* justify-content: center; */
    }
    .research {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items : center;
        justify-content: center;
        /* background-color: red; */
        margin-top: 2vh;
    }

    .Title {
        font-size: 1.5vw;
        width: fit-content;
        /* background-color: blue; */
    }

    .subtitle {
        width: fit-content;
        margin-top: 0.8vh;
        flex-wrap: wrap;
        /* background-color: green; */
    }

    .desc {
        margin-top: 1vh;
        width: 25vw;
    }

    .form {
        display: flex;
        flex-direction: column;
        margin-top: 5vh;
    }

    .date {
        margin-top: 2vh;
    }

    .buttonDate:hover {
        color: #FF6F6F;
        border: 2px solid #FF6F6F;
    }           

</style>