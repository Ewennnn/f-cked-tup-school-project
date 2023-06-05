<script>
    export default {
        props: ['title', 'subtitle']
    }
</script>
<template>
<div class="card">
<div class="card-img"></div>
  <div class="card-info">
    <div class="card-text">
      <p class="text-title">{{ title }}</p>
      <p class="text-subtitle">{{ subtitle }}</p>
    </div>
    <div class="card-icon">
      <svg viewBox="0 0 28 25" class="icon">
        <path d="M13.145 2.13l1.94-1.867 12.178 12-12.178 12-1.94-1.867 8.931-8.8H.737V10.93h21.339z"></path>
      </svg>
    </div>
  </div>
</div>
</template>

<style scoped>
.card {
  width: 190px;
  height: 254px;
  position: relative;
  border-radius: 16px;
  background: #f5f5f5;
  transition: box-shadow .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  cursor: pointer;
}

.card-img {
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: url("https://us.123rf.com/450wm/shushanto/shushanto2209/shushanto220900703/191842443-destruction-des-plan%C3%A8tes-concept-art-illustration-image-d-arri%C3%A8re-plan.jpg?ver=6");
}

.card-info {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 1rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  background-color: #ffffff8a;
  backdrop-filter: blur(4px);
  border-radius: 16px;
}

.card-icon {
  opacity: 0;
  transform: translateX(-20%);
  width: 2em;
  height: 2em;
  transition: all .3s ease-in-out;
}

.icon {
  --size: 20px;
  width: var(--size);
  height: var(--size);
}

/*Text*/
.card-text p {
  line-height: 140%;
 /*Delete this line for multi-line text*/
  white-space: nowrap;
}

.text-title {
  font-weight: 900;
  font-size: 1.2rem;
  color: #222;
}

.text-subtitle {
  color: #333;
  font-weight: 500;
  font-size: 1rem;
}

/*Hover*/
.card:hover {
  box-shadow: 0 10px 20px 4px rgba(35, 35, 35, .1);
}

.card:hover .card-icon {
  opacity: 1;
  transform: translateX(20%);
}
</style>