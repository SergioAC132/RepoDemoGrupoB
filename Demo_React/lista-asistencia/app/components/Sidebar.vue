<template>
  <aside
    class="
      w-72
      bg-zinc-900
      text-white
      flex
      flex-col
      p-6
    "
  >

    <div class="mb-10">

      <h1 class="text-3xl font-bold">
        Attendance
      </h1>

      <p class="text-zinc-400 mt-2">
        Sistema Escolar
      </p>

    </div>

    <nav class="flex flex-col gap-3">

      <NuxtLink
        to="/"
        class="menu-link"
      >
        Inicio
      </NuxtLink>

      <NuxtLink
        to="/dashboard"
        class="menu-link"
      >
        Dashboard
      </NuxtLink>

      <NuxtLink
        to="/groups"
        class="menu-link"
      >
        Grupos
      </NuxtLink>

      <NuxtLink
        to="/students"
        class="menu-link"
      >
        Estudiantes
      </NuxtLink>

      <NuxtLink
        to="/attendance"
        class="menu-link"
      >
        Pase de lista
      </NuxtLink>

    </nav>

  </aside>
</template>

<style scoped>
.menu-link {
  @apply p-4 rounded-xl transition bg-zinc-800 hover:bg-zinc-700;
}

.router-link-active {
  @apply bg-white text-black font-semibold;
}
</style>