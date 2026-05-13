<script setup>
import { ref, onMounted } from 'vue'
import PokemonCard from './components/PokemonCard.vue'

const pokemones = ref([])
const loading = ref(true)

const obtenerPokemones = async () => {
  try {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=20'
    )

    const data = await response.json()

    const detalles = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url)
        return await res.json()
      })
    )

    pokemones.value = detalles
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  obtenerPokemones()
})
</script>

<template>
  <main class="container">
    <h1 class="title">
      Pokédex Vue
    </h1>

    <p v-if="loading" class="loading">
      Cargando pokemones...
    </p>

    <div v-else class="grid">
      <PokemonCard
        v-for="pokemon in pokemones"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>
  </main>
</template>

<style scoped>
.container {
  min-height: 100vh;
  padding: 40px;
  background:
    linear-gradient(
      135deg,
      #0f172a,
      #1e293b
    );
}

.title {
  text-align: center;
  color: white;
  font-size: 48px;
  margin-bottom: 40px;
  letter-spacing: 2px;
}

.loading {
  text-align: center;
  color: white;
  font-size: 22px;
}

.grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
}
</style>