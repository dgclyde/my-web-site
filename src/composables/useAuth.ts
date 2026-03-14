import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Session, User, AuthError } from '@supabase/supabase-js'

/**
 * Composable for handling Supabase authentication
 *
 * Usage:
 * ```vue
 * <script setup lang="ts">
 * import { useAuth } from '@/composables/useAuth'
 *
 * const { user, loading, signInWithMagicLink, signOut } = useAuth()
 * </script>
 * ```
 */
export function useAuth() {
  const session = ref<Session | null>(null)
  const user = ref<User | null>(null)
  const loading = ref(true)
  const error = ref<AuthError | null>(null)

  let subscription: { unsubscribe: () => void } | null = null

  async function getSession() {
    try {
      const { data, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) {
        error.value = sessionError
        return
      }
      session.value = data.session
      user.value = data.session?.user ?? null
    } finally {
      loading.value = false
    }
  }

  function setupAuthListener() {
    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      session.value = newSession
      user.value = newSession?.user ?? null
    })
    subscription = authSubscription
  }

  onMounted(() => {
    getSession()
    setupAuthListener()
  })

  onUnmounted(() => {
    subscription?.unsubscribe()
  })

  // Auth methods

  async function signInWithMagicLink(email: string, redirectTo?: string) {
    error.value = null
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    })
    if (signInError) {
      error.value = signInError
    }
    return { error: signInError }
  }

  async function signInWithPassword(email: string, password: string) {
    error.value = null
    const { data, error: signInError } = await supabase.auth.signInWithPassword(
      {
        email,
        password,
      }
    )
    if (signInError) {
      error.value = signInError
    }
    return { data, error: signInError }
  }

  async function signInWithOAuth(
    provider: 'github' | 'google' | 'discord',
    redirectTo?: string
  ) {
    error.value = null
    const { data, error: signInError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
      },
    })
    if (signInError) {
      error.value = signInError
    }
    return { data, error: signInError }
  }

  async function signUp(
    email: string,
    password: string,
    metadata?: Record<string, unknown>
  ) {
    error.value = null
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })
    if (signUpError) {
      error.value = signUpError
    }
    return { data, error: signUpError }
  }

  async function signOut() {
    error.value = null
    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) {
      error.value = signOutError
    }
    return { error: signOutError }
  }

  async function resetPassword(email: string, redirectTo?: string) {
    error.value = null
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo,
      }
    )
    if (resetError) {
      error.value = resetError
    }
    return { error: resetError }
  }

  return {
    // State
    session,
    user,
    loading,
    error,

    // Computed helpers
    isAuthenticated: () => !!user.value,

    // Methods
    signInWithMagicLink,
    signInWithPassword,
    signInWithOAuth,
    signUp,
    signOut,
    resetPassword,
  }
}
