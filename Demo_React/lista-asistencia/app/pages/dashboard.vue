<script setup>
const stats = ref([])

const loadStats = async () => {

  stats.value =
    await $fetch('/api/dashboard')

}

const totalStudents = computed(() => {
  return stats.value.length
})

const totalAttendance = computed(() => {

  return stats.value.reduce(
    (acc, student) =>
      acc + (student.total_classes || 0),
    0
  )

})

onMounted(loadStats)
</script>

<template>
  <div>

    <PageHeader
      title="Dashboard"
      subtitle="Resumen general del sistema"
    />

    <div class="grid grid-cols-2 gap-5 mb-10">

      <StatCard
        title="Total estudiantes"
        :value="totalStudents"
      />

      <StatCard
        title="Asistencias registradas"
        :value="totalAttendance"
      />

    </div>

    <div
      class="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
      "
    >

      <h2 class="text-2xl font-bold mb-5">
        Estadísticas
      </h2>

      <div
        v-for="student in stats"
        :key="student.id"
        class="
          border-b
          py-4
          flex
          justify-between
        "
      >

        <div>

          <h3 class="font-semibold text-lg">
            {{ student.name }}
          </h3>

          <p class="text-zinc-500">
            Clases:
            {{ student.total_classes || 0 }}
          </p>

        </div>

        <div class="text-right">

          <p class="text-2xl font-bold">

            {{
              student.total_classes
              ?
              Math.round(
                (
                  student.total_present
                  /
                  student.total_classes
                ) * 100
              )
              :
              0
            }}%

          </p>

        </div>

      </div>

    </div>

  </div>
</template>