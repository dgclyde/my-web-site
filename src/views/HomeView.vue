<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      class="flex flex-col items-center justify-center px-4 py-20 text-center"
    >
      <h1
        class="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-6xl"
      >
        Hi, I'm Dakota
      </h1>
      <p
        class="mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl"
      >
        Welcome to my portfolio. I'm learning to code and building cool things
        along the way.
      </p>
      <div class="flex gap-4">
        <RouterLink
          to="/projects"
          class="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          View My Projects
        </RouterLink>
        <RouterLink
          to="/about"
          class="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          About Me
        </RouterLink>
      </div>
    </section>

    <!-- Featured Section -->
    <section class="bg-gray-50 px-4 py-16 dark:bg-gray-800/50">
      <div class="mx-auto max-w-4xl">
        <h2
          class="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white"
        >
          What I'm Learning
        </h2>
        <div class="grid gap-6 md:grid-cols-3">
          <div class="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <h3 class="mb-2 font-semibold text-gray-900 dark:text-white">
              Vue.js
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Building interactive user interfaces with Vue 3 and the
              Composition API.
            </p>
          </div>
          <div class="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <h3 class="mb-2 font-semibold text-gray-900 dark:text-white">
              TypeScript
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Adding type safety to JavaScript for better code quality.
            </p>
          </div>
          <div class="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <h3 class="mb-2 font-semibold text-gray-900 dark:text-white">
              Supabase
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Learning about databases and authentication with Supabase.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
