<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="form">
    <p class="title">Créer ton compte ! </p>
    <p class="message">Plus qu'une étape pour profiter des meilleurs dates de ta région ! </p>
        <div class="flex">
        <label>
            <input required="true" placeholder="" type="text" class="input">
            <span>Nom d'utilisateur</span>
        </label>
    </div>  
            
    <label>
        <input required="true" placeholder="" type="email" class="input">
        <span>Email</span>
    </label> 
        
    <label>
        <input required="true" placeholder="" type="password" class="input" v-model="password">
        <span>Mot de passe</span>
    </label>
    <label>
        <input required="true" placeholder="" type="password" class="input" v-model="confirmpassword" @input="checkPassword()">
        <span v-if="checkPass == true">Confirmer le mot de passe</span>
        <span v-else style="color: red;">Les mot de passe ne correspondent pas !</span>
    </label>
    <button class="submit" @click="submit()">Envoyer</button>
    <p class="signin">Vous avez déjà un compte ? <RouterLink to="/" class="signin">Se connecter</RouterLink> </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        password: "",
        confirmpassword: "",
        checkPass: true
      }
    },
    methods: {
      checkPassword() {
        if (this.password == this.confirmpassword) {
          this.checkPass = true
          console.log(this.confirmpassword)
        }
        else {
          this.checkPass = false;
          console.log(this.password);
          console.log(this.confirmpassword)
          
        }
      }
    }
  }

</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  position: relative;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.title {
  font-size: 28px;
  color: royalblue;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
}

.title::before,.title::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: royalblue;
}

.title::before {
  width: 18px;
  height: 18px;
  background-color: royalblue;
}

.title::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.message, .signin {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
}

.signin {
  text-align: center;
}

.signin a {
  color: royalblue;
}

.signin a:hover {
  text-decoration: underline royalblue;
}

.flex {
  display: flex;
  width: 100%;
  gap: 6px;
}

.form label {
  position: relative;
}

.form label .input {
  width: 100%;
  padding: 10px 10px 20px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
}

.form label .input + span {
  position: absolute;
  left: 10px;
  top: 15px;
  color: grey;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

.form label .input:placeholder-shown + span {
  top: 15px;
  font-size: 0.9em;
}

.form label .input:focus + span,.form label .input:valid + span {
  top: 30px;
  font-size: 0.7em;
  font-weight: 600;
}

.form label .input:valid + span {
  color: green;
}

.submit {
  border: none;
  outline: none;
  background-color: royalblue;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  transform: .3s ease;
}

.submit:hover {
  background-color: rgb(56, 90, 194);
}

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
}
</style>