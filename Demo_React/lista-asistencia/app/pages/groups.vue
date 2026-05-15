<script setup>
const groups = ref([])
const name = ref('')

const loadGroups = async () => {

  groups.value =
    await $fetch('/api/groups')

}

const createGroup = async () => {

  if (!name.value) return

  await $fetch('/api/groups', {
    method: 'POST',
    body: {
      name: name.value
    }
  })

  name.value = ''

  loadGroups()
}

onMounted(loadGroups)
</script>

<template>
  <div>

    <PageHeader
      title="Grupos"
      subtitle="Administración de grupos"
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

      <div class="flex gap-3">

        <input
          v-model="name"
          placeholder="Nombre grupo"
          class="
            flex-1
            border
            p-4
            rounded-xl
          "
        >

        <button
          @click="createGroup"
          class="
            bg-black
            text-white
            px-6
            rounded-xl
          "
        >

          Crear

        </button>

      </div>

    </div>

    <div class="grid gap-4">

      <div
        v-for="group in groups"
        :key="group.id"
        class="
          bg-white
          rounded-2xl
          p-5
          shadow-sm
        "
      >

        <h2 class="text-xl font-semibold">
          {{ group.name }}
        </h2>

      </div>

    </div>

  </div>
</template>