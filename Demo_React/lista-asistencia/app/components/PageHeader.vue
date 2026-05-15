<script setup>
defineProps({
  title: String,
  subtitle: String
})
</script>

<template>
  <div class="mb-10">

    <h1 class="text-4xl font-bold text-zinc-800">
      {{ title }}
    </h1>

    <p class="text-zinc-500 mt-2">
      {{ subtitle }}
    </p>

  </div>
</template>