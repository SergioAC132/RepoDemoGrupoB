<script setup>
defineProps({
  pokemon: Object
})
</script>

<template>
  <div class="card">
    <div class="card-bg"></div>

    <img
      class="pokemon-img"
      :src="pokemon.sprites.other['official-artwork'].front_default"
      :alt="pokemon.name"
    />

    <div class="content">
      <span class="pokemon-id">
        #{{ pokemon.id }}
      </span>

      <h2>
        {{ pokemon.name }}
      </h2>

      <div class="tipos">
        <span
          v-for="tipo in pokemon.types"
          :key="tipo.slot"
          class="tipo"
        >
          {{ tipo.type.name }}
        </span>
      </div>

      <div class="stats">
        <div class="stat">
          <span class="label">Altura</span>
          <span class="value">{{ pokemon.height }}</span>
        </div>

        <div class="stat">
          <span class="label">Peso</span>
          <span class="value">{{ pokemon.weight }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  justify-self: center;
  width: 100%;
  max-width: 340px;
  margin: 50px auto;
  border-radius: 28px;
  overflow: hidden;
  background: linear-gradient(145deg, #1f2937, #111827);
  box-shadow:
    0 15px 35px rgba(0,0,0,0.35),
    0 5px 15px rgba(0,0,0,0.2);
  color: white;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-8px) scale(1.02);
}

.card-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top right,
      rgba(255,255,255,0.15),
      transparent 35%);
}

.pokemon-img {
  width: 220px;
  height: 220px;
  display: block;
  margin: 20px auto 0;
  object-fit: contain;
  filter: drop-shadow(0 10px 12px rgba(0,0,0,0.4));
}

.content {
  padding: 25px;
  text-align: center;
}

.pokemon-id {
  display: inline-block;
  padding: 5px 12px;
  border-radius: 999px;
  background: rgba(255,255,255,0.12);
  font-size: 14px;
  margin-bottom: 10px;
}

h2 {
  text-transform: capitalize;
  font-size: 32px;
  margin-bottom: 18px;
  letter-spacing: 1px;
}

.tipos {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.tipo {
  padding: 8px 16px;
  border-radius: 999px;
  background: linear-gradient(135deg, #42b883, #347474);
  font-size: 14px;
  font-weight: bold;
  text-transform: capitalize;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.stats {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.stat {
  flex: 1;
  padding: 15px;
  border-radius: 18px;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(8px);
}

.label {
  display: block;
  font-size: 13px;
  opacity: 0.7;
  margin-bottom: 5px;
}

.value {
  font-size: 22px;
  font-weight: bold;
}
</style>