import type { Subscription, SubscriptionPlan, SubscriptionStatus } from './types'

export function formatPrice(price: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function isSubscriptionActive(subscription: Subscription | null): boolean {
  if (!subscription) return false
  return subscription.status === 'active' || subscription.status === 'trialing'
}

export function getSubscriptionDaysRemaining(subscription: Subscription | null): number {
  if (!subscription || !isSubscriptionActive(subscription)) return 0
  const end = new Date(subscription.current_period_end)
  const now = new Date()
  const diff = end.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function getPlanDisplayName(plan: SubscriptionPlan | null): string {
  if (!plan) return 'No Plan'
  return plan.name
}

export function getStatusColor(status: SubscriptionStatus): string {
  switch (status) {
    case 'active':
      return '$green10'
    case 'trialing':
      return '$blue10'
    case 'past_due':
      return '$orange10'
    case 'canceled':
      return '$red10'
    default:
      return '$gray10'
  }
}

export function getStatusLabel(status: SubscriptionStatus): string {
  switch (status) {
    case 'active':
      return 'Active'
    case 'trialing':
      return 'Trial'
    case 'past_due':
      return 'Past Due'
    case 'canceled':
      return 'Canceled'
    default:
      return 'Unknown'
  }
}
