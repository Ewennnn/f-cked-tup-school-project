<script>
    export default {
        props: ['name']
    }
</script>

<template>
    <button class="buttonDate">{{ name }}</button>
</template>

<style>
.buttonDate {
    --color: #0077ff;
    font-family: inherit;
    /* display: inline-block; */
    width: 6em;
    height: 2.6em;
    line-height: 2.5em;
    overflow: hidden;
    font-size: 17px;
    z-index: 1;
    color: var(--color);
    border: 2px solid var(--color);
    border-radius: 6px;
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
  color: white;
}

.buttonDate:before {
  top: 100%;
  left: 100%;
  transition: .3s all;
}

.buttonDate:hover::before {
  top: -30px;
  left: -30px;
}
</style>