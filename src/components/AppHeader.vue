<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'

const route = useRoute()
const isDark = useDark()
const toggleDark = useToggle(isDark)

const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
]

function isActive(path: string): boolean {
  return route.path === path
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-700 dark:bg-gray-900/80"
  >
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
      <!-- Logo -->
      <RouterLink
        to="/"
        class="text-xl font-bold text-gray-900 dark:text-white"
      >
        Dakota
      </RouterLink>

      <!-- Desktop Navigation -->
      <div class="hidden items-center gap-8 md:flex">
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          :class="[
            'text-sm font-medium transition-colors',
            isActive(link.path)
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white',
          ]"
        >
          {{ link.name }}
        </RouterLink>

        <!-- Dark mode toggle -->
        <button
          type="button"
          class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          aria-label="Toggle dark mode"
          @click="toggleDark()"
        >
          <svg
            v-if="isDark"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <svg
            v-else
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile menu button -->
      <button
        type="button"
        class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
        aria-label="Toggle menu"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <svg
          v-if="!isMobileMenuOpen"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </nav>

    <!-- Mobile Navigation -->
    <div
      v-if="isMobileMenuOpen"
      class="border-t border-gray-200 px-4 py-4 dark:border-gray-700 md:hidden"
    >
      <div class="flex flex-col gap-4">
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          :class="[
            'text-sm font-medium transition-colors',
            isActive(link.path)
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white',
          ]"
          @click="closeMobileMenu"
        >
          {{ link.name }}
        </RouterLink>

        <button
          type="button"
          class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
          @click="toggleDark()"
        >
          <span>{{ isDark ? 'Light mode' : 'Dark mode' }}</span>
        </button>
      </div>
    </div>
  </header>
</template>
