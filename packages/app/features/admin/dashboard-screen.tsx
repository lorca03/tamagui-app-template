'use client'

import { Button, Card, H1, H2, Paragraph, Popover, Separator, XStack, YStack } from 'tamagui'
import {
  TrendingUp,
  Users,
  DollarSign,
  TrendingDown,
  Filter,
  ArrowUpRight,
  Activity,
} from '@tamagui/lucide-icons'
import { useState } from 'react'
import { FilterModal, TabSwitcher, type DashboardFilterKey } from '@my/ui'
import {
  BarChartComponent,
  DonutChart,
  LineAreaChart,
  ResponsiveChart,
  Sparkline,
  StackedBarChart,
  type ChartPoint,
} from '@my/ui'

type TimeRange = 'weekly' | 'monthly' | 'yearly'
type MetricKey = DashboardFilterKey

const PRODUCT_TABS = [
  { key: 'daily' as const, label: 'Ventas diarias' },
  { key: 'online' as const, label: 'Ventas en línea' },
  { key: 'users' as const, label: 'Nuevos usuarios' },
] as const

const PRODUCT_TAB_DATA = {
  daily: {
    donutSubtitle: 'Últimos 7 días',
    donutData: [
      { label: 'Orgánico', value: 62 },
      { label: 'Pago', value: 22 },
      { label: 'Referidos', value: 8 },
      { label: 'Otros', value: 8 },
    ],
  },
  online: {
    donutSubtitle: 'Canales online',
    donutData: [
      { label: 'Web', value: 48 },
      { label: 'App', value: 34 },
      { label: 'Marketplace', value: 12 },
      { label: 'Otros', value: 6 },
    ],
  },
  users: {
    donutSubtitle: 'Origen de usuarios',
    donutData: [
      { label: 'Orgánico', value: 55 },
      { label: 'Invitados', value: 18 },
      { label: 'Ads', value: 17 },
      { label: 'Otros', value: 10 },
    ],
  },
} as const

type StatCardProps = {
  title: string
  value: string
  subtitle: string
  icon: React.ReactNode
  trend: { value: number; isPositive: boolean }
}

const formatCurrency = (value: number) =>
  value.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })

const formatNumber = (value: number) => value.toLocaleString('es-ES')

const METRICS: Record<TimeRange, Record<MetricKey, StatCardProps[]>> = {
  weekly: {
    all: [
      {
        title: 'Ingresos Totales',
        value: formatCurrency(20045.87),
        subtitle: 'vs. semana anterior',
        icon: <DollarSign size={22} color="$color" />,
        trend: { value: 2.5, isPositive: true },
      },
      {
        title: 'Usuarios Activos',
        value: formatNumber(9528),
        subtitle: 'crecimiento semanal',
        icon: <Users size={22} color="$color" />,
        trend: { value: 1.9, isPositive: true },
      },
      {
        title: 'Valor de Vida del Cliente',
        value: formatCurrency(849.54),
        subtitle: 'tendencia semanal',
        icon: <TrendingDown size={22} color="$color" />,
        trend: { value: 1.6, isPositive: false },
      },
    ],
    subscriptions: [
      {
        title: 'Ingresos (Suscripciones)',
        value: formatCurrency(15420.12),
        subtitle: 'vs. semana anterior',
        icon: <DollarSign size={22} color="$color" />,
        trend: { value: 3.1, isPositive: true },
      },
      {
        title: 'Usuarios Activos',
        value: formatNumber(8120),
        subtitle: 'crecimiento semanal',
        icon: <Users size={22} color="$color" />,
        trend: { value: 2.2, isPositive: true },
      },
      {
        title: 'LTV (Suscripciones)',
        value: formatCurrency(921.3),
        subtitle: 'tendencia semanal',
        icon: <TrendingUp size={22} color="$color" />,
        trend: { value: 0.8, isPositive: true },
      },
    ],
    one_time: [
      {
        title: 'Ingresos (Único pago)',
        value: formatCurrency(4625.75),
        subtitle: 'vs. semana anterior',
        icon: <DollarSign size={22} color="$color" />,
        trend: { value: 1.1, isPositive: true },
      },
      {
        title: 'Compradores Activos',
        value: formatNumber(2180),
        subtitle: 'crecimiento semanal',
        icon: <Users size={22} color="$color" />,
        trend: { value: 0.4, isPositive: true },
      },
      {
        title: 'Ticket Promedio',
        value: formatCurrency(39.8),
        subtitle: 'tendencia semanal',
        icon: <TrendingDown size={22} color="$color" />,
        trend: { value: 0.7, isPositive: false },
      },
    ],
  },
  monthly: {
    all: [
      {
        title: 'Ingresos Totales',
        value: formatCurrency(200458.7),
        subtitle: 'vs. mes anterior',
        icon: <DollarSign size={22} color="$color" />,
        trend: { value: 4.2, isPositive: true },
      },
      {
        title: 'Usuarios Activos',
        value: formatNumber(39528),
        subtitle: 'crecimiento mensual',
        icon: <Users size={22} color="$color" />,
        trend: { value: 9.5, isPositive: true },
      },
      {
        title: 'Valor de Vida del Cliente',
        value: formatCurrency(832.1),
        subtitle: 'tendencia mensual',
        icon: <TrendingDown size={22} color="$color" />,
        trend: { value: 1.6, isPositive: false },
      },
    ],
    subscriptions: [
      {
        title: 'Ingresos (Suscripciones)',
        value: formatCurrency(154201.2),
        subtitle: 'vs. mes anterior',
        icon: <DollarSign size={22} color="$color" />,
        trend: { value: 5.9, isPositive: true },
      },
      {
        title: 'Usuarios Activos',
        value: formatNumber(32120),
        subtitle: 'crecimiento mensual',
        icon: <Users size={22} color="$color" />,
        trend: { value: 10.1, isPositive: true },
      },
      {
        title: 'LTV (Suscripciones)',
        value: formatCurrency(910.4),
        subtitle: 'tendencia mensual',
        icon: <TrendingUp size={22} color="$color" />,
        trend: { value: 1.2, isPositive: true },
      },
    ],
    one_time: [
      {
        title: 'Ingresos (Único pago)',
        value: formatCurrency(46257.5),
        subtitle: 'vs. mes anterior',
        icon: <DollarSign size={22} color="$color" />,
        trend: { value: 1.8, isPositive: true },
      },
      {
        title: 'Compradores Activos',
        value: formatNumber(10180),
        subtitle: 'crecimiento mensual',
        icon: <Users size={22} color="$color" />,
        trend: { value: 1.5, isPositive: true },
      },
      {
        title: 'Ticket Promedio',
        value: formatCurrency(42.6),
        subtitle: 'tendencia mensual',
        icon: <TrendingUp size={22} color="$color" />,
        trend: { value: 0.9, isPositive: true },
      },
    ],
  },
  yearly: {
    all: [
      {
        title: 'Ingresos Totales',
        value: formatCurrency(2405500.25),
        subtitle: 'vs. año anterior',
        icon: <DollarSign size={22} color="$color" />,
        trend: { value: 12.8, isPositive: true },
      },
      {
        title: 'Usuarios Activos',
        value: formatNumber(485200),
        subtitle: 'crecimiento anual',
        icon: <Users size={22} color="$color" />,
        trend: { value: 18.3, isPositive: true },
      },
      {
        title: 'Valor de Vida del Cliente',
        value: formatCurrency(875.9),
        subtitle: 'tendencia anual',
        icon: <TrendingUp size={22} color="$color" />,
        trend: { value: 2.1, isPositive: true },
      },
    ],
    subscriptions: [
      {
        title: 'Ingresos (Suscripciones)',
        value: formatCurrency(1860000.0),
        subtitle: 'vs. año anterior',
        icon: <DollarSign size={22} color="$color" />,
        trend: { value: 14.6, isPositive: true },
      },
      {
        title: 'Usuarios Activos',
        value: formatNumber(402100),
        subtitle: 'crecimiento anual',
        icon: <Users size={22} color="$color" />,
        trend: { value: 19.8, isPositive: true },
      },
      {
        title: 'LTV (Suscripciones)',
        value: formatCurrency(940.2),
        subtitle: 'tendencia anual',
        icon: <TrendingUp size={22} color="$color" />,
        trend: { value: 3.4, isPositive: true },
      },
    ],
    one_time: [
      {
        title: 'Ingresos (Único pago)',
        value: formatCurrency(545500.25),
        subtitle: 'vs. año anterior',
        icon: <DollarSign size={22} color="$color" />,
        trend: { value: 6.2, isPositive: true },
      },
      {
        title: 'Compradores Activos',
        value: formatNumber(165000),
        subtitle: 'crecimiento anual',
        icon: <Users size={22} color="$color" />,
        trend: { value: 8.7, isPositive: true },
      },
      {
        title: 'Ticket Promedio',
        value: formatCurrency(44.9),
        subtitle: 'tendencia anual',
        icon: <TrendingDown size={22} color="$color" />,
        trend: { value: 0.8, isPositive: false },
      },
    ],
  },
}

const buildSeries = ({
  timeRange,
  metricKey,
}: {
  timeRange: TimeRange
  metricKey: MetricKey
}): { main: ChartPoint[]; mini: ChartPoint[] } => {
  const points = timeRange === 'weekly' ? 7 : timeRange === 'monthly' ? 30 : 12
  const base = metricKey === 'subscriptions' ? 1.15 : metricKey === 'one_time' ? 0.85 : 1
  const volatility = timeRange === 'monthly' ? 0.18 : timeRange === 'yearly' ? 0.28 : 0.12
  const trend = timeRange === 'yearly' ? 0.045 : timeRange === 'monthly' ? 0.02 : 0.012

  const main = Array.from({ length: points }, (_, i) => {
    const x = i + 1
    const noise = Math.sin(i / 2) * volatility + Math.cos(i / 3) * (volatility / 2)
    const y = Math.max(0.12, base * (1 + i * trend + noise))
    return { x, y }
  })

  const mini = Array.from({ length: 10 }, (_, i) => {
    const x = i + 1
    const noise = Math.sin(i / 1.7) * 0.22 + Math.cos(i / 2.8) * 0.12
    const y = Math.max(0.1, base * (0.9 + i * 0.02 + noise))
    return { x, y }
  })

  return { main, mini }
}

const StatCard = ({ title, value, subtitle, icon, trend }: StatCardProps) => {
  return (
    <Card
      padding="$6"
      borderRadius="$5"
      borderWidth={1}
      borderColor="$borderColor"
      backgroundColor="$background"
      hoverStyle={{ borderColor: '$borderColorHover' }}
      pressStyle={{ scale: 0.99 }}
      animation="quick"
    >
      <YStack gap="$4">
        <XStack justifyContent="space-between" alignItems="flex-start" gap="$3">
          <YStack gap="$2" flex={1}>
            <Paragraph
              size="$2"
              fontWeight="700"
              letterSpacing={0.8}
              textTransform="uppercase"
              color="$colorFocus"
            >
              {title}
            </Paragraph>
            <H2 size="$9" fontWeight="800" letterSpacing={-1} color="$color">
              {value}
            </H2>
          </YStack>
          <Card
            width={52}
            height={52}
            borderRadius="$5"
            backgroundColor="$backgroundHover"
            borderWidth={1}
            borderColor="$borderColor"
            alignItems="center"
            justifyContent="center"
          >
            {icon}
          </Card>
        </XStack>

        <XStack justifyContent="space-between" alignItems="center" gap="$3">
          <Paragraph size="$4" color="$colorFocus" fontWeight="500">
            {subtitle}
          </Paragraph>
          <XStack
            gap="$1.5"
            alignItems="center"
            backgroundColor={trend.isPositive ? '$green2' : '$red2'}
            borderRadius="$3"
            px="$2.5"
            py="$1"
          >
            {trend.isPositive ? (
              <TrendingUp size={14} color="$green10" />
            ) : (
              <TrendingDown size={14} color="$red10" />
            )}
            <Paragraph size="$3" fontWeight="700" color={trend.isPositive ? '$green11' : '$red11'}>
              {trend.isPositive ? '+' : '-'}
              {Math.abs(trend.value)}%
            </Paragraph>
          </XStack>
        </XStack>
      </YStack>
    </Card>
  )
}

export const AdminDashboardScreen = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('weekly')
  const [metricKey, setMetricKey] = useState<MetricKey>('all')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [productTab, setProductTab] = useState<'daily' | 'online' | 'users'>('daily')
  const series = buildSeries({ timeRange, metricKey })
  const miniDown = series.mini.map((p) => ({ x: p.x, y: Math.max(0.06, p.y * 0.78) }))
  const funnel = [
    { label: 'Impresiones (anuncios)', value: 380, color: '#3b82f6' },
    { label: 'Sesiones web', value: 300, color: '#2563eb' },
    { label: 'Descargas app', value: 200, color: '#4f46e5' },
    { label: 'Nuevos usuarios', value: 160, color: '#60a5fa' },
  ] as const

  return (
    <YStack flex={1} gap="$4" $md={{ gap: '$6' }}>
      {/* Encabezado (más simple y limpio) */}
      <XStack justifyContent="space-between" alignItems="center" flexWrap="wrap" gap="$4">
        <YStack gap="$2">
          <H1 size="$9" $md={{ size: '$10' }} fontWeight="800" color="$color" letterSpacing={-1}>
            Panel de Control
          </H1>
          <Paragraph size="$4" $md={{ size: '$5' }} color="$color" opacity={0.7} fontWeight="500">
            Bienvenido de vuelta, aquí está tu resumen de hoy
          </Paragraph>
        </YStack>
      </XStack>

      <FilterModal
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        value={metricKey}
        onChange={(next) => {
          setMetricKey(next)
          setFiltersOpen(false)
        }}
      />

      {/* Estadísticas (3 tarjetas en una fila, responsivo) */}
      <XStack 
        gap="$3" 
        flexWrap="nowrap" 
        flexDirection="column" 
        alignItems="stretch" 
        $md={{ 
          gap: '$4', 
          flexDirection: 'row' 
        }}
      >
        {METRICS[timeRange][metricKey].map((card) => (
          <YStack 
            key={card.title} 
            width="100%"
            $md={{ 
              flex: 1,
              flexBasis: 0,
              minWidth: 0,
              width: 'auto'
            }}
          >
            <StatCard {...card} />
          </YStack>
        ))}
      </XStack>

      {/* Contenido principal (estructura de referencia) */}
      <XStack
        gap="$3"
        flexWrap="wrap"
        flexDirection="column"
        alignItems="stretch"
        $md={{ gap: '$4', flexDirection: 'row', alignItems: 'flex-start' }}
        $xl={{
          flexWrap: 'nowrap',
          alignItems: 'stretch',
        }}
      >
        {/* Columna izquierda (2/3): 2 tarjetas arriba + embudo abajo */}
        <YStack
          flex={1}
          width="100%"
          minWidth={0}
          $md={{ flex: 2, width: 'auto' }}
          $xl={{ flexBasis: '66.6666%', maxWidth: '66.6666%' }}
          gap="$4"
        >
          <XStack gap="$3" flexDirection="column" $md={{ gap: '$4', flexDirection: 'row', flexWrap: 'nowrap' }}>
            <Card
              flex={1}
              width="100%"
              minWidth={0}
              maxWidth="100%"
              $md={{ width: 'auto' }}
              padding="$5"
              borderRadius="$5"
              borderWidth={1}
              borderColor="$borderColor"
              backgroundColor="$background"
            >
              <XStack justifyContent="space-between" alignItems="flex-start" gap="$3">
                <YStack gap="$2" flex={1}>
                  <Paragraph size="$5" fontWeight="800" color="$color">
                    Tasa de abandono (Churn)
                  </Paragraph>
                  <Paragraph size="$3" color="$colorFocus">
                    Desuscripción al plan gratuito
                  </Paragraph>
                </YStack>
              </XStack>
              <XStack justifyContent="space-between" alignItems="flex-end" mt="$4" flexWrap="wrap" gap="$2">
                <YStack gap="$2" flex={1} minWidth={120}>
                  <Paragraph size="$6" fontWeight="900" color="$color">
                    4.26%
                  </Paragraph>
                  <Paragraph size="$3" color="$red10" fontWeight="700">
                    0.31% más que la semana pasada
                  </Paragraph>
                </YStack>
                <Sparkline data={miniDown} width={120} height={46} color="#ef4444" withArea />
              </XStack>
            </Card>

            <Card
              flex={1}
              width="100%"
              minWidth={0}
              maxWidth="100%"
              $md={{ width: 'auto' }}
              padding="$5"
              borderRadius="$5"
              borderWidth={1}
              borderColor="$borderColor"
              backgroundColor="$background"
            >
              <XStack justifyContent="space-between" alignItems="flex-start" gap="$3">
                <YStack gap="$2" flex={1}>
                  <Paragraph size="$5" fontWeight="800" color="$color">
                    Crecimiento de usuarios
                  </Paragraph>
                  <Paragraph size="$3" color="$colorFocus">
                    Nuevos registros web + móvil
                  </Paragraph>
                </YStack>
              </XStack>
              <XStack justifyContent="space-between" alignItems="flex-end" mt="$4" flexWrap="wrap" gap="$2">
                <YStack gap="$2" flex={1} minWidth={120}>
                  <Paragraph size="$6" fontWeight="900" color="$color">
                    3,768
                  </Paragraph>
                  <Paragraph size="$3" color="$green10" fontWeight="700">
                    +3.85% respecto a la semana pasada
                  </Paragraph>
                </YStack>
                <Sparkline data={series.mini} width={140} height={46} withArea />
              </XStack>
            </Card>
          </XStack>

          <Card
            padding="$6"
            borderRadius="$5"
            borderWidth={1}
            borderColor="$borderColor"
            backgroundColor="$background"
          >
            <XStack justifyContent="space-between" alignItems="center">
              <Paragraph size="$6" fontWeight="900" color="$color">
                Embudo de conversión
              </Paragraph>
            </XStack>
            {/* Leyenda estilo chips */}
            <XStack gap="$3" mt="$4" flexWrap="wrap" alignItems="center">
              {funnel.map((item) => (
                <XStack
                  key={item.label}
                  gap="$2"
                  alignItems="center"
                  backgroundColor="$backgroundHover"
                  borderRadius="$10"
                  px="$3"
                  py="$2"
                  borderWidth={1}
                  borderColor="$borderColor"
                >
                  <YStack
                    width={10}
                    height={10}
                    borderRadius={5}
                    backgroundColor={item.color as any}
                  />
                  <Paragraph size="$3" color="$color" fontWeight="700">
                    {item.label}
                  </Paragraph>
                </XStack>
              ))}
            </XStack>
            <YStack
              mt="$4"
              backgroundColor="$background"
              borderRadius="$5"
              borderWidth={1}
              borderColor="$borderColor"
              padding="$4"
              overflow="hidden"
            >
              {/* Gráfica de barras (mock) responsiva + animada */}
              <ResponsiveChart height={260}>
                {(w) => (
                  <BarChartComponent
                    width={w}
                    height={260}
                    padding={14}
                    yAxisLabelWidth={36}
                    plotLeftPadding={14}
                    barGap={60}
                    gridLines={4}
                    showGrid
                    data={[...funnel]}
                    animateOnMount
                    animationDurationMs={900}
                  />
                )}
              </ResponsiveChart>
            </YStack>
          </Card>
        </YStack>

        {/* Columna derecha (1/3): Rendimiento del Producto */}
        <YStack
          flex={1}
          width="100%"
          minWidth={0}
          $md={{ width: 'auto' }}
          $xl={{ flexBasis: '33.3333%', maxWidth: '33.3333%' }}
          gap="$4"
        >
          <Card
            padding="$6"
            borderRadius="$5"
            borderWidth={1}
            borderColor="$borderColor"
            backgroundColor="$background"
          >
            <XStack justifyContent="space-between" alignItems="center">
              <Paragraph size="$6" fontWeight="900" color="$color">
                Rendimiento del producto
              </Paragraph>
            </XStack>

            <YStack mt="$4">
              <TabSwitcher
                tabs={PRODUCT_TABS}
                value={productTab}
                onValueChange={(next) => setProductTab(next)}
                // Estilo tipo “segmented control” como en tu captura
                tabBarProps={{
                  backgroundColor: '$background',
                  borderColor: '$borderColor',
                  borderRadius: '$6',
                  padding: '$1.5',
                }}
                tabButtonProps={{
                  borderRadius: '$6',
                  borderWidth: 0,
                  height: 42,
                  fontWeight: '700',
                  backgroundColor: 'transparent',
                  hoverStyle: { backgroundColor: 'transparent' },
                }}
                activeTabButtonProps={{
                  backgroundColor: '$backgroundHover',
                  shadowColor: '$shadowColor',
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 6 },
                }}
                inactiveTabButtonProps={{
                  opacity: 0.75,
                }}
                renderContent={(active) => {
                  const tab = PRODUCT_TAB_DATA[active]
                  const stats =
                    active === 'daily'
                      ? {
                          a: { label: 'Producto digital', isPositive: true, value: 790 },
                          b: { label: 'Producto físico', isPositive: false, value: 572 },
                        }
                      : active === 'online'
                      ? {
                          a: { label: 'Conversión online', isPositive: true, value: 312 },
                          b: { label: 'Carritos abandonados', isPositive: false, value: 128 },
                        }
                      : {
                          a: { label: 'Registros', isPositive: true, value: 248 },
                          b: { label: 'Bajas', isPositive: false, value: 31 },
                        }

                  return (
                    <YStack gap="$4">
                      <Card
                        borderRadius="$5"
                        borderWidth={1}
                        borderColor="$borderColor"
                        backgroundColor="$background"
                        overflow="hidden"
                      >
                        <XStack>
                          <YStack flex={1} p="$4" gap="$2" alignItems="center">
                            <Paragraph size="$3" color="$colorFocus" fontWeight="700">
                              {stats.a.label}
                            </Paragraph>
                            <XStack gap="$2" alignItems="center">
                              <Paragraph
                                color={stats.a.isPositive ? '$green10' : '$red10'}
                                fontWeight="900"
                              >
                                {stats.a.isPositive ? '↑' : '↓'}
                              </Paragraph>
                              <Paragraph size="$6" fontWeight="900" color="$color">
                                {stats.a.value}
                              </Paragraph>
                            </XStack>
                          </YStack>
                          <YStack width={1} backgroundColor="$borderColor" />
                          <YStack flex={1} p="$4" gap="$2" alignItems="center">
                            <Paragraph size="$3" color="$colorFocus" fontWeight="700">
                              {stats.b.label}
                            </Paragraph>
                            <XStack gap="$2" alignItems="center">
                              <Paragraph
                                color={stats.b.isPositive ? '$green10' : '$red10'}
                                fontWeight="900"
                              >
                                {stats.b.isPositive ? '↑' : '↓'}
                              </Paragraph>
                              <Paragraph size="$6" fontWeight="900" color="$color">
                                {stats.b.value}
                              </Paragraph>
                            </XStack>
                          </YStack>
                        </XStack>
                      </Card>

                      <Card
                        borderRadius="$5"
                        borderWidth={1}
                        borderColor="$borderColor"
                        backgroundColor="$background"
                        padding="$5"
                      >
                        <XStack justifyContent="space-between" alignItems="center">
                          <Paragraph size="$4" color="$colorFocus" fontWeight="800">
                            Fuentes de tráfico
                          </Paragraph>
                          <Paragraph size="$3" color="$colorFocus" fontWeight="700">
                            {tab.donutSubtitle}
                          </Paragraph>
                        </XStack>
                        <YStack mt="$4" alignItems="center" justifyContent="center">
                          <DonutChart
                            size={180}
                            thickness={18}
                            data={[...tab.donutData]}
                            animateOnMount
                            animationDurationMs={900}
                          />
                        </YStack>
                      </Card>
                    </YStack>
                  )
                }}
              />
            </YStack>
          </Card>
        </YStack>
      </XStack>
    </YStack>
  )
}
