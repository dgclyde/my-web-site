<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useContactSubmissions } from '@/composables/useContactSubmissions'

const router = useRouter()
const { user, signOut } = useAuth()
const {
  submissions,
  loading,
  error,
  fetchSubmissions,
  markAsRead,
  markAsUnread,
  deleteSubmission,
} = useContactSubmissions()

const deleteConfirmId = ref<string | null>(null)
const actionLoading = ref<string | null>(null)

const unreadCount = computed(
  () => submissions.value.filter((s) => !s.read).length
)

onMounted(() => {
  fetchSubmissions()
})

async function handleMarkAsRead(id: string) {
  actionLoading.value = id
  await markAsRead(id)
  actionLoading.value = null
}

async function handleMarkAsUnread(id: string) {
  actionLoading.value = id
  await markAsUnread(id)
  actionLoading.value = null
}

async function handleDelete(id: string) {
  actionLoading.value = id
  await deleteSubmission(id)
  deleteConfirmId.value = null
  actionLoading.value = null
}

async function handleSignOut() {
  await signOut()
  router.push('/admin/login')
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
    <div class="mx-auto max-w-4xl">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Contact Messages
          </h1>
          <p class="mt-1 text-gray-600 dark:text-gray-400">
            {{ submissions.length }} total
            <span
              v-if="unreadCount > 0"
              class="text-blue-600 dark:text-blue-400"
            >
              ({{ unreadCount }} unread)
            </span>
          </p>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ user?.email }}
          </span>
          <button
            type="button"
            class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
            @click="handleSignOut"
          >
            Sign Out
          </button>
        </div>
      </div>

      <!-- Error state -->
      <div
        v-if="error"
        class="mb-6 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      >
        {{ error }}
      </div>

      <!-- Loading state -->
      <div
        v-if="loading"
        class="flex items-center justify-center py-12 text-gray-500 dark:text-gray-400"
      >
        <svg class="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        Loading messages...
      </div>

      <!-- Empty state -->
      <div
        v-else-if="submissions.length === 0"
        class="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-600"
      >
        <svg
          class="mx-auto mb-4 h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <p class="text-gray-500 dark:text-gray-400">
          No messages yet. They'll appear here when someone submits the contact
          form.
        </p>
      </div>

      <!-- Messages list -->
      <div v-else class="space-y-4">
        <article
          v-for="submission in submissions"
          :key="submission.id"
          :class="[
            'rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800',
            submission.read
              ? 'border-gray-200 dark:border-gray-700'
              : 'border-blue-300 dark:border-blue-600',
          ]"
        >
          <!-- Header -->
          <div class="mb-4 flex items-start justify-between">
            <div>
              <div class="flex items-center gap-2">
                <h2 class="font-semibold text-gray-900 dark:text-white">
                  {{ submission.name }}
                </h2>
                <span
                  v-if="!submission.read"
                  class="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                >
                  New
                </span>
              </div>
              <a
                :href="`mailto:${submission.email}`"
                class="text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                {{ submission.email }}
              </a>
            </div>
            <time
              class="text-sm text-gray-500 dark:text-gray-400"
              :datetime="submission.created_at"
            >
              {{ formatDate(submission.created_at) }}
            </time>
          </div>

          <!-- Message -->
          <p class="mb-4 whitespace-pre-wrap text-gray-700 dark:text-gray-300">
            {{ submission.message }}
          </p>

          <!-- Actions -->
          <div
            class="flex items-center gap-3 border-t border-gray-100 pt-4 dark:border-gray-700"
          >
            <button
              v-if="!submission.read"
              type="button"
              :disabled="actionLoading === submission.id"
              class="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 dark:text-gray-400 dark:hover:text-white"
              @click="handleMarkAsRead(submission.id)"
            >
              Mark as read
            </button>
            <button
              v-else
              type="button"
              :disabled="actionLoading === submission.id"
              class="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 dark:text-gray-400 dark:hover:text-white"
              @click="handleMarkAsUnread(submission.id)"
            >
              Mark as unread
            </button>

            <span class="text-gray-300 dark:text-gray-600">|</span>

            <a
              :href="`mailto:${submission.email}?subject=Re: Contact form submission`"
              class="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Reply
            </a>

            <span class="text-gray-300 dark:text-gray-600">|</span>

            <!-- Delete confirmation -->
            <template v-if="deleteConfirmId === submission.id">
              <span class="text-sm text-red-600 dark:text-red-400">
                Delete?
              </span>
              <button
                type="button"
                :disabled="actionLoading === submission.id"
                class="text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50 dark:text-red-400 dark:hover:text-red-300"
                @click="handleDelete(submission.id)"
              >
                Yes
              </button>
              <button
                type="button"
                class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                @click="deleteConfirmId = null"
              >
                No
              </button>
            </template>
            <button
              v-else
              type="button"
              class="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              @click="deleteConfirmId = submission.id"
            >
              Delete
            </button>
          </div>
        </article>
      </div>

      <!-- Refresh button -->
      <div class="mt-8 text-center">
        <button
          type="button"
          :disabled="loading"
          class="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          @click="fetchSubmissions"
        >
          {{ loading ? 'Refreshing...' : 'Refresh Messages' }}
        </button>
      </div>
    </div>
  </div>
</template>
