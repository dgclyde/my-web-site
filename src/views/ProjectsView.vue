<script setup lang="ts">
import { ref } from 'vue'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  link?: string
  github?: string
}

const projects = ref<Project[]>([
  {
    id: 1,
    title: 'Portfolio Website',
    description:
      'This website! Built with Vue 3, TypeScript, and Tailwind CSS. Deployed on Vercel with Supabase ready for future features.',
    technologies: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/dgclyde/my-web-site',
  },
  // Add more projects here as you build them!
])
</script>

<template>
  <div class="min-h-screen px-4 py-16">
    <div class="mx-auto max-w-4xl">
      <h1
        class="mb-4 text-center text-4xl font-bold text-gray-900 dark:text-white"
      >
        My Projects
      </h1>
      <p class="mb-12 text-center text-gray-600 dark:text-gray-300">
        Here are some of the projects I've been working on.
      </p>

      <div class="grid gap-8 md:grid-cols-2">
        <article
          v-for="project in projects"
          :key="project.id"
          class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <h2 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            {{ project.title }}
          </h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            {{ project.description }}
          </p>

          <div class="mb-4 flex flex-wrap gap-2">
            <span
              v-for="tech in project.technologies"
              :key="tech"
              class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
            >
              {{ tech }}
            </span>
          </div>

          <div class="flex gap-4">
            <a
              v-if="project.link"
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:underline dark:text-blue-400"
            >
              View Project
            </a>
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-600 hover:underline dark:text-gray-400"
            >
              GitHub
            </a>
          </div>
        </article>
      </div>

      <!-- Empty state for when there are no projects -->
      <div
        v-if="projects.length === 0"
        class="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-600"
      >
        <p class="text-gray-500 dark:text-gray-400">
          Projects coming soon! Check back later.
        </p>
      </div>
    </div>
  </div>
</template>
