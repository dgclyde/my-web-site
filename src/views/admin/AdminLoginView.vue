<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { ADMIN_EMAILS } from '@/lib/constants'

const router = useRouter()
const route = useRoute()
const { user, loading: authLoading, signInWithMagicLink } = useAuth()

const email = ref('')
const isSubmitting = ref(false)
const magicLinkSent = ref(false)
const errorMessage = ref('')

// Redirect if already authenticated
onMounted(() => {
  if (user.value && ADMIN_EMAILS.includes(user.value.email ?? '')) {
    const redirect = (route.query.redirect as string) || '/admin/messages'
    router.push(redirect)
  }
})

async function handleSubmit() {
  errorMessage.value = ''

  // Check if email is in allowed admin list
  if (!ADMIN_EMAILS.includes(email.value.toLowerCase())) {
    errorMessage.value = 'This email is not authorized for admin access.'
    return
  }

  isSubmitting.value = true

  const redirectUrl = `${window.location.origin}/admin/messages`
  const { error } = await signInWithMagicLink(email.value, redirectUrl)

  if (error) {
    errorMessage.value = error.message
  } else {
    magicLinkSent.value = true
  }

  isSubmitting.value = false
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-4">
    <div class="w-full max-w-md">
      <h1
        class="mb-2 text-center text-3xl font-bold text-gray-900 dark:text-white"
      >
        Admin Login
      </h1>
      <p class="mb-8 text-center text-gray-600 dark:text-gray-400">
        Sign in to manage contact submissions
      </p>

      <!-- Loading state -->
      <div
        v-if="authLoading"
        class="text-center text-gray-600 dark:text-gray-400"
      >
        Loading...
      </div>

      <!-- Magic link sent confirmation -->
      <div
        v-else-if="magicLinkSent"
        class="rounded-lg bg-green-50 p-6 text-center dark:bg-green-900/30"
      >
        <svg
          class="mx-auto mb-4 h-12 w-12 text-green-600 dark:text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <h2
          class="mb-2 text-xl font-semibold text-green-800 dark:text-green-200"
        >
          Check your email
        </h2>
        <p class="text-green-700 dark:text-green-300">
          We sent a magic link to <strong>{{ email }}</strong
          >. Click the link in the email to sign in.
        </p>
      </div>

      <!-- Login form -->
      <form v-else class="space-y-6" @submit.prevent="handleSubmit">
        <!-- Error message -->
        <div
          v-if="errorMessage"
          class="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/30 dark:text-red-300"
        >
          {{ errorMessage }}
        </div>

        <div>
          <label
            for="email"
            class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Email address
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="admin@example.com"
          />
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {{ isSubmitting ? 'Sending...' : 'Send Magic Link' }}
        </button>

        <p class="text-center text-sm text-gray-500 dark:text-gray-400">
          A sign-in link will be sent to your email
        </p>
      </form>
    </div>
  </div>
</template>
