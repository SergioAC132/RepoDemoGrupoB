<script setup>
import { ref } from 'vue'

const contador = ref(0)

const incrementar = () => {
  contador.value++
}

const decrementar = () => {
  contador.value--
}
</script>

<template>
  <div class="contador-container">
    <h2>Contador: {{ contador }}</h2>

    <div class="botones">
      <button @click="decrementar">-</button>
      <button @click="incrementar">+</button>
    </div>
  </div>
</template>

<style scoped>
.contador-container {
  text-align: center;
  margin-top: 40px;
}

.botones {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: #42b883;
  color: white;
  transition: 0.2s;
}

button:hover {
  opacity: 0.8;
}
</style>