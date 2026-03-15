import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type {
  ContactSubmission,
  ContactSubmissionInsert,
} from '@/types/database.types'

/**
 * Composable for managing contact form submissions
 */
export function useContactSubmissions() {
  const submissions = ref<ContactSubmission[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Fetch all contact submissions (requires authentication)
   */
  async function fetchSubmissions() {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      submissions.value = data ?? []
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to fetch submissions'
    } finally {
      loading.value = false
    }
  }

  /**
   * Submit a new contact form (public, no auth required)
   */
  async function submitContactForm(
    formData: Omit<ContactSubmissionInsert, 'id' | 'read' | 'created_at'>
  ) {
    error.value = null

    try {
      const { error: insertError } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        })

      if (insertError) throw insertError

      return { success: true, error: null }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to submit form'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    }
  }

  /**
   * Mark a submission as read
   */
  async function markAsRead(id: string) {
    error.value = null

    try {
      const { error: updateError } = await supabase
        .from('contact_submissions')
        .update({ read: true })
        .eq('id', id)

      if (updateError) throw updateError

      // Update local state
      const submission = submissions.value.find((s) => s.id === id)
      if (submission) {
        submission.read = true
      }

      return { success: true, error: null }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to mark as read'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    }
  }

  /**
   * Mark a submission as unread
   */
  async function markAsUnread(id: string) {
    error.value = null

    try {
      const { error: updateError } = await supabase
        .from('contact_submissions')
        .update({ read: false })
        .eq('id', id)

      if (updateError) throw updateError

      // Update local state
      const submission = submissions.value.find((s) => s.id === id)
      if (submission) {
        submission.read = false
      }

      return { success: true, error: null }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to mark as unread'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    }
  }

  /**
   * Delete a submission
   */
  async function deleteSubmission(id: string) {
    error.value = null

    try {
      const { error: deleteError } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      // Remove from local state
      submissions.value = submissions.value.filter((s) => s.id !== id)

      return { success: true, error: null }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to delete submission'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    }
  }

  return {
    // State
    submissions,
    loading,
    error,

    // Methods
    fetchSubmissions,
    submitContactForm,
    markAsRead,
    markAsUnread,
    deleteSubmission,
  }
}
