<script>
    export default {
        props: ['name']
    }
</script>

<template>
    <button class="buttonDate">{{ name }}</button>
</template>

<style scoped>
.buttonDate {
    --color: #FF6F6F;
    font-family: inherit;
    /* display: inline-block; */
    width: 7em;
    height: 2.6em;
    line-height: 2.5em;
    overflow: hidden;
    font-size: 17px;
    z-index: 1;
    color: var(--color);
    border: 2px solid var(--color);
    border-radius: 50px;
    position: relative;
}

.buttonDate::before {
  position: absolute;
  content: "";
  background: var(--color);
  width: 150px;
  height: 200px;
  z-index: -1;
  border-radius: 50%;
}

.buttonDate:hover {
  color: white !important;
  border: 2px solid white;
  cursor: pointer;
}

.buttonDate:before {
  top: 100%;
  left: 100%;
  transition: .3s all;
}

.buttonDate:hover::before {
  top: -50px;
  left: -30px;
}
</style>