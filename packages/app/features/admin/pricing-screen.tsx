'use client'

import { H1, H2, H3, Paragraph, XStack, YStack, Button, Card } from 'tamagui'
import { Check } from '@tamagui/lucide-icons'
import { useState } from 'react'

// Tipo para los planes de pricing
type PricingPlan = {
  name: string
  description: string
  price: string
  originalPrice?: string
  priceSuffix?: string
  features: string[]
  buttonText: string
  highlighted?: boolean
  badge?: string
  isCurrent?: boolean
  // Precios para Monthly/Annually
  monthlyPrice?: string
  monthlyOriginalPrice?: string
  annualPrice?: string
  annualOriginalPrice?: string
}

// Datos para Pricing Table 1
const pricingTable1Plans: PricingPlan[] = [
  {
    name: 'Starter',
    description: 'For solo designers & freelancers',
    price: '$5.00', // Precio mensual por defecto
    originalPrice: '$12.00',
    monthlyPrice: '$5.00',
    monthlyOriginalPrice: '$12.00',
    annualPrice: '$50.00',
    annualOriginalPrice: '$120.00',
    features: [
      '5 website',
      '500 MB Storage',
      'Unlimited Sub-Domain',
      '3 Custom Domain',
      'Free SSL Certificate',
      'Unlimited Traffic',
    ],
    buttonText: 'Choose Starter',
  },
  {
    name: 'Medium',
    description: 'For working on commercial projects',
    price: '$10.99',
    originalPrice: '$30.00',
    monthlyPrice: '$10.99',
    monthlyOriginalPrice: '$30.00',
    annualPrice: '$109.90',
    annualOriginalPrice: '$300.00',
    features: [
      '10 website',
      '1 GB Storage',
      'Unlimited Sub-Domain',
      '5 Custom Domain',
      'Free SSL Certificate',
      'Unlimited Traffic',
    ],
    buttonText: 'Choose Medium',
    highlighted: true,
  },
  {
    name: 'Large',
    description: 'For teams larger than 5 members',
    price: '$15.00',
    originalPrice: '$59.00',
    monthlyPrice: '$15.00',
    monthlyOriginalPrice: '$59.00',
    annualPrice: '$150.00',
    annualOriginalPrice: '$590.00',
    features: [
      '15 website',
      '10 GB Storage',
      'Unlimited Sub-Domain',
      '10 Custom Domain',
      'Free SSL Certificate',
      'Unlimited Traffic',
    ],
    buttonText: 'Choose Large',
  },
]

// Datos para Pricing Table 3
const pricingTable3Plans: PricingPlan[] = [
  {
    name: 'Personal',
    description: 'Perfect plan for Starters',
    price: 'Free',
    priceSuffix: 'For a Lifetime',
    features: ['Unlimited Projects', 'Share with 5 team members', 'Sync across devices'],
    buttonText: 'Current Plan',
    isCurrent: true,
  },
  {
    name: 'Professional',
    description: 'For users who want to do more',
    price: '$99.00',
    priceSuffix: '/year',
    features: [
      'Unlimited Projects',
      'Share with 5 team members',
      'Sync across devices',
      '30 days version history',
    ],
    buttonText: 'Try for Free',
  },
  {
    name: 'Team',
    description: 'Your entire team in one place',
    price: '$299',
    priceSuffix: '/year',
    features: [
      'Unlimited Projects',
      'Share with 5 team members',
      'Sync across devices',
      'Sharing permissions',
      'Admin tools',
    ],
    buttonText: 'Try for Free',
    highlighted: true,
    badge: 'Recommended',
  },
  {
    name: 'Enterprise',
    description: 'Run your company on your terms',
    price: 'Custom',
    priceSuffix: 'Reach out for a quote',
    features: [
      'Unlimited Projects',
      'Share with 5 team members',
      'Sync across devices',
      'Sharing permissions',
      'User provisioning (SCIM)',
      'Advanced security',
    ],
    buttonText: 'Try for Free',
  },
]

// Componente para el toggle Monthly/Annually
const PricingToggle = ({
  isMonthly,
  onToggle,
}: {
  isMonthly: boolean
  onToggle: (value: boolean) => void
}) => {
  return (
    <XStack
      alignItems="center"
      gap="$3"
      backgroundColor="$backgroundHover"
      padding="$1"
      borderRadius="$10"
      width={280}
      alignSelf="center"
    >
      <Button
        flex={1}
        size="$4"
        backgroundColor={isMonthly ? '$blue9' : 'transparent'}
        color={isMonthly ? 'white' : '$color'}
        fontWeight={isMonthly ? '600' : '500'}
        borderRadius="$8"
        borderWidth={0}
        onPress={() => onToggle(true)}
        pressStyle={{ scale: 0.98 }}
        animation="quick"
      >
        Monthly
      </Button>
      <Button
        flex={1}
        size="$4"
        backgroundColor={!isMonthly ? '$blue9' : 'transparent'}
        color={!isMonthly ? 'white' : '$color'}
        fontWeight={!isMonthly ? '600' : '500'}
        borderRadius="$8"
        borderWidth={0}
        onPress={() => onToggle(false)}
        pressStyle={{ scale: 0.98 }}
        animation="quick"
      >
        Annually
      </Button>
    </XStack>
  )
}

// Componente para una tarjeta de plan (Pricing Table 1)
const PricingCard = ({ plan, isMonthly = true }: { plan: PricingPlan; isMonthly?: boolean }) => {
  const isHighlighted = plan.highlighted
  const isCurrent = plan.isCurrent

  return (
    <Card
      flex={1}
      minWidth={280}
      width="100%"
      padding="$6"
      borderRadius="$6"
      borderWidth={isHighlighted ? 0 : 1}
      borderColor="$borderColor"
      backgroundColor={isHighlighted ? '$blue9' : '$background'}
      elevation={isHighlighted ? 8 : 2}
      shadowColor={isHighlighted ? '$blue9' : '$shadowColor'}
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={isHighlighted ? 0.3 : 0.1}
      shadowRadius={12}
      position="relative"
      hoverStyle={{
        transform: [{ scale: 1.02 }],
        elevation: isHighlighted ? 12 : 4,
      }}
      animation="quick"
    >
      {plan.badge && (
        <YStack
          position="absolute"
          top={-12}
          right={20}
          backgroundColor="white"
          paddingHorizontal="$3"
          paddingVertical="$1"
          borderRadius="$10"
          elevation={4}
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.2}
          shadowRadius={4}
        >
          <Paragraph size="$2" fontWeight="700" color="$blue9">
            {plan.badge}
          </Paragraph>
        </YStack>
      )}

      <YStack gap="$4">
        {/* Header */}
        <YStack gap="$2">
          <H3
            size="$8"
            fontWeight="800"
            color={isHighlighted ? 'white' : '$color'}
            letterSpacing={-0.5}
          >
            {plan.name}
          </H3>
          <Paragraph size="$4" color={isHighlighted ? 'rgba(255,255,255,0.8)' : '$colorFocus'}>
            {plan.description}
          </Paragraph>
        </YStack>

        {/* Price */}
        <YStack gap="$1">
          <XStack alignItems="baseline" gap="$2" flexWrap="wrap">
            <H1
              size="$10"
              fontWeight="800"
              color={isHighlighted ? 'white' : '$color'}
              letterSpacing={-1}
            >
              {isMonthly ? plan.monthlyPrice || plan.price : plan.annualPrice || plan.price}
            </H1>
            {plan.priceSuffix ? (
              <Paragraph size="$4" color={isHighlighted ? 'rgba(255,255,255,0.8)' : '$colorFocus'}>
                {plan.priceSuffix}
              </Paragraph>
            ) : (
              <Paragraph size="$4" color={isHighlighted ? 'rgba(255,255,255,0.8)' : '$colorFocus'}>
                {isMonthly ? '/month' : '/year'}
              </Paragraph>
            )}
          </XStack>
          {(isMonthly
            ? plan.monthlyOriginalPrice || plan.originalPrice
            : plan.annualOriginalPrice || plan.originalPrice) && (
            <Paragraph
              size="$3"
              color={isHighlighted ? 'rgba(255,255,255,0.6)' : '$colorFocus'}
              textDecorationLine="line-through"
            >
              {isMonthly
                ? plan.monthlyOriginalPrice || plan.originalPrice
                : plan.annualOriginalPrice || plan.originalPrice}
            </Paragraph>
          )}
        </YStack>

        {/* Features */}
        <YStack gap="$3" marginTop="$2">
          {plan.features.map((feature, index) => (
            <XStack key={index} alignItems="center" gap="$3">
              <YStack
                width={20}
                height={20}
                borderRadius="$10"
                backgroundColor={isHighlighted ? 'rgba(255,255,255,0.2)' : '$green2'}
                alignItems="center"
                justifyContent="center"
              >
                <Check size={14} color={isHighlighted ? 'white' : '$green10'} strokeWidth={3} />
              </YStack>
              <Paragraph
                flex={1}
                size="$4"
                color={isHighlighted ? 'white' : '$color'}
                fontWeight="500"
              >
                {feature}
              </Paragraph>
            </XStack>
          ))}
        </YStack>

        {/* Button */}
        <Button
          marginTop="$4"
          size="$5"
          backgroundColor={isCurrent ? '$background' : isHighlighted ? 'white' : '$blue9'}
          color={isCurrent ? '$colorFocus' : isHighlighted ? '$blue9' : 'white'}
          fontWeight="600"
          borderRadius="$4"
          borderWidth={isCurrent ? 1 : 0}
          borderColor="$borderColor"
          onPress={() => console.log(`Selected plan: ${plan.name}`)}
          hoverStyle={{
            backgroundColor: isCurrent
              ? '$backgroundHover'
              : isHighlighted
              ? 'rgba(255,255,255,0.95)'
              : '$blue10',
            scale: 1.02,
          }}
          pressStyle={{ scale: 0.98 }}
          animation="quick"
        >
          {plan.buttonText}
        </Button>
      </YStack>
    </Card>
  )
}

// Componente para una tarjeta de plan (Pricing Table 3) - Diseño diferente
const PricingCardV2 = ({ plan }: { plan: PricingPlan }) => {
  const isHighlighted = plan.highlighted
  const isCurrent = plan.isCurrent

  return (
    <Card
      flex={1}
      minWidth={280}
      width="100%"
      padding="$6"
      borderRadius="$6"
      borderWidth={1}
      borderColor={isHighlighted ? 'transparent' : '$borderColor'}
      backgroundColor={isHighlighted ? '$blue9' : '$background'}
      elevation={isHighlighted ? 8 : 2}
      shadowColor={isHighlighted ? '$blue9' : '$shadowColor'}
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={isHighlighted ? 0.3 : 0.1}
      shadowRadius={12}
      position="relative"
      hoverStyle={{
        transform: [{ scale: 1.02 }],
        elevation: isHighlighted ? 12 : 4,
      }}
      animation="quick"
    >
      {plan.badge && (
        <YStack
          position="absolute"
          top={16}
          right={16}
          backgroundColor="$backgroundHover"
          paddingHorizontal="$2.5"
          paddingVertical="$1"
          borderRadius="$2"
          borderWidth={1}
          borderColor="$borderColor"
        >
          <Paragraph
            size="$1"
            fontWeight="600"
            color="$colorFocus"
            textTransform="uppercase"
            letterSpacing={0.5}
          >
            {plan.badge}
          </Paragraph>
        </YStack>
      )}

      <YStack gap="$5">
        {/* Header */}
        <YStack gap="$2">
          <H3
            size="$8"
            fontWeight="700"
            color={isHighlighted ? 'white' : '$color'}
            letterSpacing={-0.3}
          >
            {plan.name}
          </H3>
          <Paragraph size="$3" color={isHighlighted ? 'rgba(255,255,255,0.7)' : '$colorFocus'}>
            {plan.description}
          </Paragraph>
        </YStack>

        {/* Price */}
        <YStack gap="$1">
          <XStack alignItems="baseline" gap="$2" flexWrap="wrap">
            <H1
              size="$10"
              fontWeight="800"
              color={isHighlighted ? 'white' : '$color'}
              letterSpacing={-1}
            >
              {plan.price}
            </H1>
            {plan.priceSuffix && (
              <Paragraph size="$3" color={isHighlighted ? 'rgba(255,255,255,0.7)' : '$colorFocus'}>
                {plan.priceSuffix}
              </Paragraph>
            )}
          </XStack>
        </YStack>

        {/* Features */}
        <YStack gap="$3" marginTop="$2">
          {plan.features.map((feature, index) => (
            <XStack key={index} alignItems="center" gap="$3">
              <YStack
                width={20}
                height={20}
                borderRadius="$10"
                backgroundColor={isHighlighted ? 'rgba(255,255,255,0.2)' : '$green2'}
                alignItems="center"
                justifyContent="center"
              >
                <Check size={14} color={isHighlighted ? 'white' : '$green10'} strokeWidth={3} />
              </YStack>
              <Paragraph
                flex={1}
                size="$3"
                color={isHighlighted ? 'white' : '$color'}
                fontWeight="400"
              >
                {feature}
              </Paragraph>
            </XStack>
          ))}
        </YStack>

        {/* Button */}
        <Button
          marginTop="$4"
          size="$5"
          backgroundColor={isCurrent ? '$background' : isHighlighted ? 'white' : '$blue9'}
          color={isCurrent ? '$colorFocus' : isHighlighted ? '$blue9' : 'white'}
          fontWeight="600"
          borderRadius="$4"
          borderWidth={isCurrent ? 1 : 0}
          borderColor="$borderColor"
          onPress={() => console.log(`Selected plan: ${plan.name}`)}
          hoverStyle={{
            backgroundColor: isCurrent
              ? '$backgroundHover'
              : isHighlighted
              ? 'rgba(255,255,255,0.95)'
              : '$blue10',
            scale: 1.02,
          }}
          pressStyle={{ scale: 0.98 }}
          animation="quick"
        >
          {plan.buttonText}
        </Button>
      </YStack>
    </Card>
  )
}

export const AdminPricingScreen = () => {
  const [isMonthly, setIsMonthly] = useState(true)

  return (
    <YStack flex={1} gap="$10">
      {/* Header */}
      <YStack gap="$2">
        <H1 size="$10" fontWeight="800" color="$color" letterSpacing={-1}>
          Pricing Tables
        </H1>
        <Paragraph size="$5" color="$colorFocus">
          Ejemplos de tablas de precios con diferentes diseños y configuraciones
        </Paragraph>
      </YStack>

      {/* Pricing Table 1 */}
      <YStack gap="$6">
        <YStack gap="$2">
          <H2 size="$8" fontWeight="700" color="$color" letterSpacing={-0.5}>
            Pricing Table 1
          </H2>
          <Paragraph size="$4" color="$colorFocus">
            Planes flexibles adaptados a tus necesidades únicas
          </Paragraph>
        </YStack>

        <YStack gap="$6" alignItems="center">
          <H2 size="$7" fontWeight="600" color="$color" textAlign="center">
            Flexible Plans Tailored to Fit Your Unique Needs!
          </H2>

          <PricingToggle isMonthly={isMonthly} onToggle={setIsMonthly} />

          <XStack
            gap="$4"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="stretch"
            width="100%"
            $lg={{ flexWrap: 'nowrap' }}
          >
            {pricingTable1Plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} isMonthly={isMonthly} />
            ))}
          </XStack>
        </YStack>
      </YStack>

      {/* Separator */}
      <YStack height={1} backgroundColor="$borderColor" marginVertical="$4" width="100%" />

      {/* Pricing Table 3 */}
      <YStack gap="$6">
        <YStack gap="$2">
          <H2 size="$8" fontWeight="700" color="$color" letterSpacing={-0.5}>
            Pricing Table 3
          </H2>
          <Paragraph size="$4" color="$colorFocus">
            Planes para diferentes necesidades empresariales
          </Paragraph>
        </YStack>

        <XStack
          gap="$4"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="stretch"
          width="100%"
          $lg={{ flexWrap: 'nowrap' }}
        >
          {pricingTable3Plans.map((plan) => (
            <PricingCardV2 key={plan.name} plan={plan} />
          ))}
        </XStack>
      </YStack>
    </YStack>
  )
}
