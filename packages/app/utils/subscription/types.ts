export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing'

export type SubscriptionPlanInterval = 'month' | 'year'

export interface SubscriptionPlan {
  id: string
  name: string
  description: string | null
  price: number
  currency: string
  interval: SubscriptionPlanInterval
  features: {
    storage?: string
    users?: number | string
    support?: string
    api_access?: boolean
    custom_integrations?: boolean
    [key: string]: unknown
  } | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan_id: string
  status: SubscriptionStatus
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  created_at: string
  updated_at: string
  plan?: SubscriptionPlan
}

export interface BillingHistory {
  id: string
  user_id: string
  subscription_id: string | null
  amount: number
  currency: string
  status: 'pending' | 'paid' | 'failed' | 'refunded'
  invoice_url: string | null
  created_at: string
}
