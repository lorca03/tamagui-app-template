export const DEFAULT_PLANS = {
  FREE: 'Free',
  PRO: 'Pro',
  ENTERPRISE: 'Enterprise',
} as const

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  CANCELED: 'canceled',
  PAST_DUE: 'past_due',
  TRIALING: 'trialing',
} as const

export const PLAN_INTERVALS = {
  MONTH: 'month',
  YEAR: 'year',
} as const
