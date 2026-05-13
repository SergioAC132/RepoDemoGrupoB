<script setup>
import { ref } from 'vue'

const nombre = ref('')
const correo = ref('')
</script>

<template>
  <div class="form-container">
    <h2>Formulario de Usuario</h2>

    <input
      type="text"
      v-model="nombre"
      placeholder="Escribe tu nombre"
    />

    <input
      type="email"
      v-model="correo"
      placeholder="Escribe tu correo"
    />

    <div class="resultado">
      <h3>Datos ingresados:</h3>

      <p><strong>Nombre:</strong> {{ nombre }}</p>
      <p><strong>Correo:</strong> {{ correo }}</p>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  width: 300px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.resultado {
  margin-top: 20px;
  padding: 15px;
  border-radius: 10px;
  background-color: #f4f4f4;
}
</style>