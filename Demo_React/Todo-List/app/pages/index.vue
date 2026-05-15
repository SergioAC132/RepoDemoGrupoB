<script setup>
import { ref, onMounted } from 'vue'

const tasks = ref([])
const newTask = ref('')

const fetchTasks = async () => {
  tasks.value = await $fetch('/api/tasks')
}

const addTask = async () => {
  if (!newTask.value.trim()) return

  await $fetch('/api/tasks', {
    method: 'POST',
    body: {
      title: newTask.value
    }
  })

  newTask.value = ''

  fetchTasks()
}

const deleteTask = async (id) => {
  await $fetch(`/api/tasks/${id}`, {
    method: 'DELETE'
  })

  fetchTasks()
}

const toggleCompleted = async (task) => {
  await $fetch(`/api/tasks/${task.id}`, {
    method: 'PUT',
    body: {
      completed: !task.completed
    }
  })

  fetchTasks()
}

const toggleFavorite = async (task) => {
  await $fetch(`/api/tasks/${task.id}`, {
    method: 'PUT',
    body: {
      favorite: !task.favorite
    }
  })

  fetchTasks()
}

const editTask = async (task) => {
  const title = prompt('Nuevo nombre', task.title)

  if (!title) return

  await $fetch(`/api/tasks/${task.id}`, {
    method: 'PUT',
    body: {
      title
    }
  })

  fetchTasks()
}

onMounted(() => {
  fetchTasks()
})
</script>

<template>
  <div class="container">
    <h1>TODO LIST</h1>

    <div class="form">
      <input
        v-model="newTask"
        type="text"
        placeholder="Nueva tarea"
      >

      <button @click="addTask">
        Agregar
      </button>
    </div>

    <div
      v-for="task in tasks"
      :key="task.id"
      class="task"
    >
      <div>
        <h2>
          {{ task.title }}
        </h2>

        <p>
          Estado:
          {{ task.completed ? 'Realizada' : 'Pendiente' }}
        </p>

        <p v-if="task.favorite">
          ⭐ Favorita
        </p>
      </div>

      <div class="buttons">
        <button @click="toggleCompleted(task)">
          Completar
        </button>

        <button @click="toggleFavorite(task)">
          Favorita
        </button>

        <button @click="editTask(task)">
          Editar
        </button>

        <button @click="deleteTask(task.id)">
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 700px;
  margin: auto;
  padding: 30px;
  font-family: Arial;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.task {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>