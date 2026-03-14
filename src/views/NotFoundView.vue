<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center px-4">
    <h1 class="mb-4 text-6xl font-bold text-gray-900 dark:text-white">404</h1>
    <p class="mb-8 text-xl text-gray-600 dark:text-gray-300">
      Oops! This page doesn't exist.
    </p>
    <RouterLink
      to="/"
      class="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
    >
      Go Home
    </RouterLink>
  </div>
</template>
