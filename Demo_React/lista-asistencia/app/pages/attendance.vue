<script setup>
const groups = ref([])
const students = ref([])

const selectedGroup = ref('')
const loading = ref(false)

const loadGroups = async () => {

  groups.value =
    await $fetch('/api/groups')

}

const loadStudents = async () => {

  if (!selectedGroup.value) return

  loading.value = true

  const data =
    await $fetch(
      `/api/students/${selectedGroup.value}`
    )

  students.value =
    data.map(student => ({
      ...student,
      present: true
    }))

  loading.value = false
}

const toggleAttendance = (student) => {

  student.present = !student.present

}

const saveAttendance = async () => {

  loading.value = true

  for (const student of students.value) {

    await $fetch('/api/attendance', {
      method: 'POST',
      body: {
        student_id: student.id,
        present: student.present
      }
    })

  }

  loading.value = false

  alert('Asistencia guardada')

}

watch(selectedGroup, () => {
  loadStudents()
})

onMounted(loadGroups)
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">

    <!-- Header -->
    <div class="mb-8">

      <h1 class="text-4xl font-bold text-gray-800">
        Pase de Lista
      </h1>

      <p class="text-gray-500 mt-2">
        Registra asistencia del grupo
      </p>

    </div>

    <!-- Selector -->
    <div class="bg-white rounded-2xl shadow p-6 mb-8">

      <label class="block text-sm font-semibold mb-2">
        Seleccionar grupo
      </label>

      <select
        v-model="selectedGroup"
        class="
          w-full
          border
          rounded-xl
          p-4
          outline-none
          focus:ring-2
          focus:ring-black
        "
      >

        <option value="">
          Selecciona un grupo
        </option>

        <option
          v-for="group in groups"
          :key="group.id"
          :value="group.id"
        >

          {{ group.name }}

        </option>

      </select>

    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="text-center py-10"
    >

      <p class="text-gray-500">
        Cargando...
      </p>

    </div>

    <!-- Lista -->
    <div
      v-else
      class="grid gap-4"
    >

      <div
        v-for="student in students"
        :key="student.id"
        @click="toggleAttendance(student)"
        class="
          bg-white
          rounded-2xl
          p-5
          shadow
          flex
          items-center
          justify-between
          cursor-pointer
          transition
          hover:scale-[1.01]
        "
      >

        <!-- Nombre -->
        <div>

          <h2 class="text-xl font-semibold text-gray-800">
            {{ student.name }}
          </h2>

          <p class="text-sm text-gray-400">
            Estudiante
          </p>

        </div>

        <!-- Estado -->
        <div>

          <div
            v-if="student.present"
            class="
              bg-green-100
              text-green-700
              px-5
              py-2
              rounded-full
              font-semibold
            "
          >

            Presente

          </div>

          <div
            v-else
            class="
              bg-red-100
              text-red-700
              px-5
              py-2
              rounded-full
              font-semibold
            "
          >

            Falta

          </div>

        </div>

      </div>

    </div>

    <!-- Footer -->
    <div
      v-if="students.length"
      class="mt-10 flex justify-end"
    >

      <button
        @click="saveAttendance"
        class="
          bg-black
          text-white
          px-8
          py-4
          rounded-2xl
          text-lg
          font-semibold
          hover:opacity-90
          transition
        "
      >

        Guardar asistencia

      </button>

    </div>

  </div>
</template>