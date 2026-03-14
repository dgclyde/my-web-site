# AGENTS.md - AI Coding Agent Guidelines

This document provides guidelines for AI coding agents working in this repository.

## Project Overview

A personal portfolio website built with Vue 3, TypeScript, Vite, and Supabase.

**Tech Stack:**
- Vue 3 (Composition API with `<script setup>`)
- TypeScript
- Vite (build tool)
- Tailwind CSS v4
- Vue Router (client-side routing)
- Pinia (state management)
- VueUse (utility composables)
- Supabase (database & authentication)
- pnpm (package manager)
- Vercel (deployment)

---

## Build / Lint / Test Commands

```bash
# Install dependencies
pnpm install

# Development server (http://localhost:5173)
pnpm dev

# Production build
pnpm build

# Preview production build locally
pnpm preview

# Type checking (no emit)
pnpm type-check

# Lint and fix issues
pnpm lint

# Format code with Prettier
pnpm format
```

### Testing

Testing is not yet configured. When added, use:
```bash
# Run all tests
pnpm test

# Run single test file
pnpm test -- path/to/file.spec.ts

# Run tests matching pattern
pnpm test -- -t "pattern"
```

---

## Project Structure

```
src/
├── assets/          # Static assets, global CSS
│   └── main.css     # Tailwind imports and global styles
├── components/      # Reusable Vue components
│   ├── ui/          # Base UI components (buttons, inputs, etc.)
│   ├── AppHeader.vue
│   └── AppFooter.vue
├── composables/     # Vue composables (useAuth, etc.)
├── layouts/         # Page layouts (DefaultLayout, etc.)
├── lib/             # Utilities and external service clients
│   └── supabaseClient.ts
├── router/          # Vue Router configuration
├── stores/          # Pinia stores
├── types/           # TypeScript type definitions
│   ├── database.types.ts  # Supabase generated types
│   └── env.d.ts     # Environment variable types
├── views/           # Page-level components
├── App.vue          # Root component
└── main.ts          # Application entry point
```

---

## Code Style Guidelines

### Vue Components

1. **Use `<script setup>` syntax** for all components
2. **Block order:** `<script>`, `<template>`, `<style>`
3. **Component names:** PascalCase (e.g., `UserProfile.vue`)
4. **Props/emits:** Use TypeScript interfaces with `defineProps<T>()` and `defineEmits<T>()`

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
})

const emit = defineEmits<{
  update: [value: number]
}>()

const localCount = ref(props.count)
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="emit('update', localCount)">Update</button>
  </div>
</template>
```

### TypeScript

1. **Strict mode enabled** - no implicit any
2. **Prefer interfaces** over type aliases for object shapes
3. **Use explicit return types** for exported functions
4. **Avoid `any`** - use `unknown` and narrow types instead
5. **Unused variables:** Prefix with underscore `_unused`

### Imports

1. **Use path aliases:** `@/` maps to `src/`
2. **Order imports:**
   - Vue/external packages first
   - Internal modules second
   - Types last (with `type` keyword)
3. **Use named imports** unless default is conventional

```typescript
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/composables/useAuth'

import type { User } from '@supabase/supabase-js'
```

### Composables

1. **Naming:** Always prefix with `use` (e.g., `useAuth`, `useFetch`)
2. **Return refs, not reactive objects** (allows destructuring)
3. **Clean up side effects** in `onUnmounted()`
4. **Accept refs as arguments** using `MaybeRefOrGetter` pattern

```typescript
import { ref, onMounted, onUnmounted } from 'vue'

export function useFeature() {
  const data = ref<string | null>(null)
  const loading = ref(true)

  onMounted(() => {
    // setup
  })

  onUnmounted(() => {
    // cleanup
  })

  return { data, loading }  // Return plain object with refs
}
```

### Styling (Tailwind CSS)

1. **Use Tailwind utility classes** - avoid custom CSS when possible
2. **Dark mode:** Use `dark:` variant for dark mode styles
3. **Responsive:** Use `sm:`, `md:`, `lg:` breakpoint prefixes
4. **Component classes:** Group related utilities, longest classes last

```html
<div class="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile.vue` |
| Composables | camelCase with `use` prefix | `useAuth.ts` |
| Stores | camelCase with `use` prefix | `useUserStore.ts` |
| Types/Interfaces | PascalCase | `interface User {}` |
| Constants | SCREAMING_SNAKE_CASE | `const API_URL = ''` |
| Functions | camelCase | `function fetchData()` |
| Files (non-component) | camelCase | `supabaseClient.ts` |

---

## Error Handling

### Async Operations

Always wrap async operations in try-catch and return error state:

```typescript
async function fetchData() {
  try {
    const { data, error } = await supabase.from('table').select()
    if (error) throw error
    return { data, error: null }
  } catch (err) {
    console.error('Failed to fetch:', err)
    return { data: null, error: err as Error }
  }
}
```

### Supabase Queries

The Supabase client returns `{ data, error }` - always check for errors:

```typescript
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single()

if (error) {
  // Handle error
  return
}
// Use data safely
```

---

## Environment Variables

- Prefix client-side variables with `VITE_`
- Access via `import.meta.env.VITE_*`
- Define types in `src/types/env.d.ts`
- Never commit secrets - use `.env.local` (gitignored)

```typescript
// Typed access
const url = import.meta.env.VITE_SUPABASE_URL
```

---

## Routing

Routes are defined in `src/router/index.ts` with lazy loading:

```typescript
{
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('@/views/DashboardView.vue'),
  meta: { requiresAuth: true }
}
```

### Protected Routes

Use route meta and navigation guards for auth-protected pages.

---

## Supabase Integration

### Client Location
`src/lib/supabaseClient.ts` - singleton instance with typed Database

### Database Types
Generate with: `npx supabase gen types typescript --project-id <id> > src/types/database.types.ts`

### Auth Pattern
Use `src/composables/useAuth.ts` for authentication logic.

---

## Common Patterns

### Reactive Data Fetching

```typescript
import { ref, watchEffect } from 'vue'

const data = ref<Item[]>([])
const loading = ref(true)

watchEffect(async () => {
  loading.value = true
  const result = await fetchItems()
  data.value = result
  loading.value = false
})
```

### Form Handling

```vue
<script setup lang="ts">
const form = ref({ email: '', password: '' })
const isSubmitting = ref(false)

async function handleSubmit() {
  isSubmitting.value = true
  try {
    await submitForm(form.value)
  } finally {
    isSubmitting.value = false
  }
}
</script>
```

---

## Do's and Don'ts

### Do
- Use Composition API with `<script setup>`
- Use TypeScript strictly
- Use Tailwind for styling
- Use VueUse composables when available
- Clean up subscriptions in `onUnmounted`
- Handle loading and error states

### Don't
- Use Options API
- Use `any` type
- Write custom CSS for utility-style rules
- Mutate props directly
- Forget to handle async errors
- Commit `.env.local` or secrets
