<script setup>
defineProps({
  title: String,
  value: [String, Number]
})
</script>

<template>
  <div
    class="
      bg-white
      rounded-2xl
      p-6
      shadow-sm
    "
  >

    <p class="text-zinc-500">
      {{ title }}
    </p>

    <h2 class="text-4xl font-bold mt-3">
      {{ value }}
    </h2>

  </div>
</template>