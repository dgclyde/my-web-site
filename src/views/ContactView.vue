<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: '',
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

async function handleSubmit() {
  isSubmitting.value = true
  submitError.value = ''

  try {
    // TODO: Implement form submission with Supabase
    // For now, just simulate a submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    submitSuccess.value = true
    form.value = { name: '', email: '', message: '' }
  } catch {
    submitError.value = 'Failed to send message. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen px-4 py-16">
    <div class="mx-auto max-w-2xl">
      <h1
        class="mb-4 text-center text-4xl font-bold text-gray-900 dark:text-white"
      >
        Contact Me
      </h1>
      <p class="mb-12 text-center text-gray-600 dark:text-gray-300">
        Have a question or want to say hi? Fill out the form below!
      </p>

      <!-- Success Message -->
      <div
        v-if="submitSuccess"
        class="mb-8 rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      >
        Thanks for your message! I'll get back to you soon.
      </div>

      <!-- Error Message -->
      <div
        v-if="submitError"
        class="mb-8 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      >
        {{ submitError }}
      </div>

      <form
        v-if="!submitSuccess"
        class="space-y-6"
        @submit.prevent="handleSubmit"
      >
        <div>
          <label
            for="name"
            class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Name
          </label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            for="email"
            class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Email
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label
            for="message"
            class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Message
          </label>
          <textarea
            id="message"
            v-model="form.message"
            required
            rows="5"
            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Your message..."
          />
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {{ isSubmitting ? 'Sending...' : 'Send Message' }}
        </button>
      </form>

      <!-- Alternative contact methods -->
      <div class="mt-12 text-center">
        <p class="text-gray-600 dark:text-gray-400">
          You can also find me on
          <a
            href="https://github.com/dgclyde"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:underline dark:text-blue-400"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
