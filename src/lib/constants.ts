/**
 * Application constants
 */

/**
 * Email addresses allowed to access the admin panel
 */
export const ADMIN_EMAILS: string[] = ['dgclyde@mjclyde.com', 'me@mjclyde.com']

/**
 * Check if an email is an admin
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase())
}
