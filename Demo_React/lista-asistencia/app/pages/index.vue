<template>
  <div>

    <PageHeader
      title="Sistema de Asistencias"
      subtitle="Administración escolar"
    />

    <div class="grid grid-cols-2 gap-6">

      <NuxtLink
        to="/dashboard"
        class="home-card"
      >
        Dashboard
      </NuxtLink>

      <NuxtLink
        to="/groups"
        class="home-card"
      >
        Grupos
      </NuxtLink>

      <NuxtLink
        to="/students"
        class="home-card"
      >
        Estudiantes
      </NuxtLink>

      <NuxtLink
        to="/attendance"
        class="home-card"
      >
        Pase de lista
      </NuxtLink>

    </div>

  </div>
</template>

<style scoped>
.home-card {
  @apply bg-white rounded-2xl p-10 shadow-sm text-2xl font-semibold transition hover:scale-[1.02];
}
</style>