<script setup>
const groups = ref([])
const students = ref([])

const selectedGroup = ref('')
const studentName = ref('')

const loadGroups = async () => {

  groups.value =
    await $fetch('/api/groups')

}

const loadStudents = async () => {

  if (!selectedGroup.value) return

  students.value =
    await $fetch(
      `/api/students/${selectedGroup.value}`
    )

}

const createStudent = async () => {

  if (!selectedGroup.value) {

    alert('Selecciona un grupo')

    return
  }

  if (!studentName.value.trim()) {

    alert('Escribe un nombre')

    return
  }

  await $fetch('/api/students', {

    method: 'POST',

    body: {

      group_id: selectedGroup.value,
      name: studentName.value

    }

  })

  studentName.value = ''

  loadStudents()

}

const deleteStudent = async (id) => {

  await $fetch(`/api/students/${id}`, {
    method: 'DELETE'
  })

  loadStudents()

}

watch(selectedGroup, loadStudents)

onMounted(loadGroups)
</script>

<template>
  <div>

    <PageHeader
      title="Estudiantes"
      subtitle="Administración de alumnos"
    />

    <div
      class="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
        mb-6
      "
    >

      <div class="flex gap-3 mb-4">

        <select
          v-model="selectedGroup"
          class="
            border
            p-4
            rounded-xl
            w-64
          "
        >

          <option value="">
            Selecciona grupo
          </option>

          <option
            v-for="group in groups"
            :key="group.id"
            :value="group.id"
          >

            {{ group.name }}

          </option>

        </select>

        <input
          v-model="studentName"
          placeholder="Nombre estudiante"
          class="
            flex-1
            border
            p-4
            rounded-xl
          "
        >

        <button
          @click="createStudent"
          class="
            bg-black
            text-white
            px-6
            rounded-xl
          "
        >

          Agregar

        </button>

      </div>

    </div>

    <div class="grid gap-4">

<div
  v-for="student in students"
  :key="student.id"
  class="
    bg-white
    rounded-2xl
    p-5
    shadow-sm
    flex
    items-center
    justify-between
  "
>

  <div>

    <h2 class="text-xl font-semibold">
      {{ student.name }}
    </h2>

  </div>

  <button
    @click="deleteStudent(student.id)"
    class="
      bg-red-500
      hover:bg-red-600
      text-white
      px-4
      py-2
      rounded-xl
      transition
    "
  >

    Eliminar

  </button>

</div>

    </div>

  </div>
</template>