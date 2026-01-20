'use client'

import {
  Card,
  ScrollView,
  XStack,
  YStack,
  Button,
  Input,
  Paragraph,
  Checkbox,
  Sheet,
  Separator,
} from 'tamagui'
import {
  ChevronLeft,
  ChevronRight,
  Search,
  MoreVertical,
  Filter,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Check,
} from '@tamagui/lucide-icons'
import { useState, useMemo, ReactNode, useCallback } from 'react'
import type { LayoutChangeEvent } from 'react-native'

export type DataTableColumn<T = any> = {
  key: string
  label: string
  render?: (value: any, row: T, index: number) => ReactNode
  sortable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
}

export type DataTableAction<T = any> = {
  label: string
  icon?: ReactNode
  onPress: (row: T, index: number) => void
  destructive?: boolean
}

export type DataTableProps<T = any> = {
  data: T[]
  columns: DataTableColumn<T>[]
  title?: string
  searchable?: boolean
  searchPlaceholder?: string
  searchKeys?: string[]
  pagination?: boolean
  pageSize?: number
  selectable?: boolean
  onSelectionChange?: (selectedRows: T[]) => void
  actions?: DataTableAction<T>[]
  renderRowActions?: (row: T, index: number) => ReactNode
  filters?: ReactNode
  showFilters?: boolean
  onRowPress?: (row: T, index: number) => void
  emptyMessage?: string
  striped?: boolean
  hoverable?: boolean
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  title,
  searchable = false,
  searchPlaceholder = 'Search...',
  searchKeys,
  pagination = false,
  pageSize = 10,
  selectable = false,
  onSelectionChange,
  actions,
  renderRowActions,
  filters,
  showFilters = false,
  onRowPress,
  emptyMessage = 'No data available',
  striped = false,
  hoverable = true,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: 'asc' | 'desc'
  } | null>(null)
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined)

  const handleContainerLayout = useCallback((e: LayoutChangeEvent) => {
    const width = Math.round(e.nativeEvent.layout.width)
    if (width > 0) {
      setContainerWidth(width)
    }
  }, [])

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!search) return data

    const keys = searchKeys || columns.map((col) => col.key)
    return data.filter((row) =>
      keys.some((key) => {
        const value = row[key]
        return value?.toString().toLowerCase().includes(search.toLowerCase())
      })
    )
  }, [data, search, searchKeys, columns])

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue === bValue) return 0

      const comparison = aValue > bValue ? 1 : -1
      return sortConfig.direction === 'asc' ? comparison : -comparison
    })
  }, [filteredData, sortConfig])

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData

    const startIndex = (currentPage - 1) * pageSize
    return sortedData.slice(startIndex, startIndex + pageSize)
  }, [sortedData, currentPage, pageSize, pagination])

  const totalPages = pagination ? Math.ceil(sortedData.length / pageSize) : 1

  const handleSort = (key: string) => {
    const column = columns.find((col) => col.key === key)
    if (!column?.sortable) return

    setSortConfig((prev) => {
      if (prev?.key === key) {
        return prev.direction === 'asc' ? { key, direction: 'desc' } : null
      }
      return { key, direction: 'asc' }
    })
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIndices = new Set(paginatedData.map((_, index) => index))
      setSelectedRows(allIndices)
      if (onSelectionChange) {
        onSelectionChange(paginatedData)
      }
    } else {
      setSelectedRows(new Set())
      if (onSelectionChange) {
        onSelectionChange([])
      }
    }
  }

  const handleSelectRow = (index: number, checked: boolean) => {
    const newSelected = new Set(selectedRows)
    if (checked) {
      newSelected.add(index)
    } else {
      newSelected.delete(index)
    }
    setSelectedRows(newSelected)

    if (onSelectionChange) {
      const selectedData = Array.from(newSelected).map((i) => paginatedData[i])
      onSelectionChange(selectedData)
    }
  }

  const isAllSelected = paginatedData.length > 0 && selectedRows.size === paginatedData.length
  const isIndeterminate = selectedRows.size > 0 && selectedRows.size < paginatedData.length

  const renderCell = (column: DataTableColumn<T>, row: T, index: number) => {
    const value = row[column.key]
    if (column.render) {
      return column.render(value, row, index)
    }
    return (
      <Paragraph size="$4" color="$color" fontWeight="500">
        {String(value ?? '')}
      </Paragraph>
    )
  }

  const getAlignment = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return 'center'
      case 'right':
        return 'flex-end'
      default:
        return 'flex-start'
    }
  }

  return (
    <YStack flex={1} gap="$4" width="100%">
      {/* Título */}
      {title && (
        <Paragraph size="$7" fontWeight="700" color="$color">
          {title}
        </Paragraph>
      )}

      {/* Tabla */}
      <Card
        padding={0}
        borderRadius="$5"
        borderWidth={1}
        borderColor="$borderColor"
        backgroundColor="$background"
        overflow="hidden"
        width="100%"
        flex={1}
      >
        <YStack width="100%" flex={1}>
          {/* Búsqueda dentro de la tabla */}
          {searchable && (
            <XStack
              padding="$4"
              borderBottomWidth={1}
              borderBottomColor="$borderColor"
              alignItems="center"
              gap="$2"
            >
              <XStack
                alignItems="center"
                borderWidth={1}
                borderColor="$borderColor"
                borderRadius="$4"
                paddingHorizontal="$3"
                gap="$2"
                backgroundColor="$background"
                height={40}
                flex={1}
                hoverStyle={{
                  borderColor: '$borderColorHover',
                }}
              >
                <Search size={18} color="$colorFocus" />
                <Input
                  flex={1}
                  borderWidth={0}
                  backgroundColor="transparent"
                  placeholder={searchPlaceholder}
                  value={search}
                  onChangeText={setSearch}
                  fontSize="$4"
                  color="$color"
                  placeholderTextColor="$colorFocus"
                  unstyled
                />
              </XStack>

              {showFilters && filters && (
                <Button
                  size="$4"
                  icon={Filter}
                  variant="outlined"
                  borderColor="$borderColor"
                  onPress={() => setFiltersOpen(true)}
                >
                  <Paragraph>Filter</Paragraph>
                </Button>
              )}
            </XStack>
          )}
          {/* Scroll horizontal para la tabla */}
          <YStack flex={1} width="100%" onLayout={handleContainerLayout}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={true}
              flex={1}
            >
              <YStack 
                minWidth={containerWidth ? `${containerWidth}px` : "100%"} 
                width={containerWidth ? `${containerWidth}px` : "100%"} 
                flexShrink={0}
              >
              {/* Header de la tabla */}
              <XStack
                backgroundColor="$gray2"
                padding="$4"
                borderBottomWidth={1}
                borderBottomColor="$borderColor"
                gap="$4"
                alignItems="center"
                minWidth="100%"
                width="100%"
              >
              {selectable && (
                <XStack minWidth={50} alignItems="center" justifyContent="center">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    borderColor="$borderColor"
                  >
                    <Checkbox.Indicator>
                      {isIndeterminate ? (
                        <YStack
                          width={12}
                          height={2}
                          backgroundColor="$blue10"
                          borderRadius={1}
                        />
                      ) : isAllSelected ? (
                        <Check size={14} color="$blue10" />
                      ) : null}
                    </Checkbox.Indicator>
                  </Checkbox>
                </XStack>
              )}

              {columns.map((column) => (
                <XStack
                  key={column.key}
                  minWidth={column.width ? undefined : 120}
                  width={column.width}
                  flex={column.width ? 0 : 1}
                  flexBasis={column.width ? undefined : 0}
                  cursor={column.sortable ? 'pointer' : 'default'}
                  onPress={() => column.sortable && handleSort(column.key)}
                  alignItems={getAlignment(column.align)}
                  justifyContent={getAlignment(column.align)}
                >
                  <XStack
                    alignItems="center"
                    gap="$2"
                    hoverStyle={column.sortable ? { opacity: 0.7 } : undefined}
                  >
                    <Paragraph
                      size="$3"
                      fontWeight="700"
                      textTransform="uppercase"
                      letterSpacing={0.5}
                      color="$gray11"
                    >
                      {column.label}
                    </Paragraph>
                    {column.sortable && (
                      <YStack>
                        {sortConfig?.key === column.key ? (
                          sortConfig.direction === 'asc' ? (
                            <ArrowUp size={14} color="$blue9" />
                          ) : (
                            <ArrowDown size={14} color="$blue9" />
                          )
                        ) : (
                          <ArrowUpDown size={14} color="$gray8" opacity={0.5} />
                        )}
                      </YStack>
                    )}
                  </XStack>
                </XStack>
              ))}

              {(actions || renderRowActions) && (
                <XStack width={100} flexShrink={0} alignItems="center" justifyContent="center">
                  <Paragraph
                    size="$3"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing={0.5}
                    color="$gray11"
                  >
                    Acciones
                  </Paragraph>
                </XStack>
              )}
              </XStack>

              {/* Filas */}
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <XStack
                    key={index}
                    padding="$4"
                    borderBottomWidth={index < paginatedData.length - 1 ? 1 : 0}
                    borderBottomColor="$borderColor"
                    gap="$4"
                    alignItems="center"
                    minWidth="100%"
                    width="100%"
                    backgroundColor={
                      striped && index % 2 === 1 ? '$gray1' : 'transparent'
                    }
                    hoverStyle={
                      hoverable
                        ? {
                            backgroundColor: '$gray2',
                          }
                        : undefined
                    }
                    cursor={onRowPress ? 'pointer' : 'default'}
                    onPress={onRowPress ? () => onRowPress(row, index) : undefined}
                    animation="quick"
                  >
                  {selectable && (
                    <XStack minWidth={50} alignItems="center" justifyContent="center">
                      <Checkbox
                        checked={selectedRows.has(index)}
                        onCheckedChange={(checked) =>
                          handleSelectRow(index, checked as boolean)
                        }
                        borderColor="$borderColor"
                      >
                        <Checkbox.Indicator>
                          {selectedRows.has(index) && (
                            <Check size={14} color="$blue10" />
                          )}
                        </Checkbox.Indicator>
                      </Checkbox>
                    </XStack>
                  )}

                  {columns.map((column) => (
                    <XStack
                      key={column.key}
                      minWidth={column.width ? undefined : 120}
                      width={column.width}
                      flex={column.width ? 0 : 1}
                      flexBasis={column.width ? undefined : 0}
                      alignItems={getAlignment(column.align)}
                      justifyContent={getAlignment(column.align)}
                    >
                      {renderCell(column, row, index)}
                    </XStack>
                  ))}

                  {(actions || renderRowActions) && (
                    <XStack
                      width={100}
                      flexShrink={0}
                      alignItems="center"
                      justifyContent="center"
                      position="relative"
                    >
                      {renderRowActions ? (
                        renderRowActions(row, index)
                      ) : (
                        <YStack position="relative">
                          <Button
                            size="$3"
                            circular
                            icon={MoreVertical}
                            variant="outlined"
                            borderColor="transparent"
                            backgroundColor="transparent"
                            onPress={() =>
                              setActionMenuOpen(actionMenuOpen === index ? null : index)
                            }
                            hoverStyle={{
                              backgroundColor: '$gray3',
                            }}
                          />
                          {actionMenuOpen === index && actions && (
                            <YStack
                              position="absolute"
                              top={40}
                              right={0}
                              backgroundColor="$background"
                              borderWidth={1}
                              borderColor="$borderColor"
                              borderRadius="$4"
                              padding="$2"
                              minWidth={180}
                              zIndex={1000}
                              shadowColor="$color"
                              shadowOffset={{ width: 0, height: 4 }}
                              shadowOpacity={0.1}
                              shadowRadius={8}
                              elevation={8}
                            >
                              {actions.map((action, actionIndex) => (
                                <Button
                                  key={actionIndex}
                                  size="$3"
                                  justifyContent="flex-start"
                                  backgroundColor="transparent"
                                  color={action.destructive ? '$red10' : '$color'}
                                  onPress={() => {
                                    action.onPress(row, index)
                                    setActionMenuOpen(null)
                                  }}
                                  hoverStyle={{
                                    backgroundColor: '$gray2',
                                  }}
                                >
                                  {action.icon && (
                                    <XStack marginRight="$2">{action.icon}</XStack>
                                  )}
                                  {action.label}
                                </Button>
                              ))}
                            </YStack>
                          )}
                        </YStack>
                      )}
                    </XStack>
                  )}
                  </XStack>
                ))
              ) : (
                <YStack padding="$10" alignItems="center" gap="$3">
                  <Paragraph size="$5" color="$gray9" fontWeight="500">
                    {emptyMessage}
                  </Paragraph>
                </YStack>
              )}
            </YStack>
          </ScrollView>
          </YStack>

          {/* Paginación y resultados dentro de la tabla */}
          {(pagination || searchable) && (
            <YStack
              padding="$4"
              borderTopWidth={1}
              borderTopColor="$borderColor"
              gap="$3"
            >
              <XStack
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap="$3"
                $sm={{ flexDirection: 'row' }}
              >
                <Paragraph size="$4" color="$gray9" fontWeight="500">
                  {sortedData.length} {sortedData.length === 1 ? 'resultado' : 'resultados'}
                </Paragraph>
                {pagination && totalPages > 1 && (
                  <XStack gap="$2" alignItems="center" flexWrap="wrap">
                    <Button
                      size="$4"
                      icon={ChevronLeft}
                      disabled={currentPage === 1}
                      onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      variant="outlined"
                      borderColor="$borderColor"
                      backgroundColor={currentPage === 1 ? '$gray2' : '$background'}
                      hoverStyle={{
                        backgroundColor: currentPage === 1 ? '$gray2' : '$gray2',
                        borderColor: '$borderColorHover',
                      }}
                    >
                      <Paragraph size="$3" color={currentPage === 1 ? '$gray8' : '$gray12'}>
                        Prev
                      </Paragraph>
                    </Button>
                    <XStack gap="$1" alignItems="center" px="$2">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page =
                          currentPage <= 3
                            ? i + 1
                            : currentPage >= totalPages - 2
                              ? totalPages - 4 + i
                              : currentPage - 2 + i

                        if (page > totalPages || page < 1) return null

                        return (
                          <Button
                            key={page}
                            size="$3"
                            circular
                            backgroundColor={currentPage === page ? '$blue9' : 'transparent'}
                            onPress={() => setCurrentPage(page)}
                            hoverStyle={{
                              backgroundColor: currentPage === page ? '$blue10' : '$gray2',
                            }}
                          >
                            <Paragraph
                              size="$3"
                              color={currentPage === page ? 'white' : '$gray11'}
                              fontWeight={currentPage === page ? '700' : '500'}
                            >
                              {page}
                            </Paragraph>
                          </Button>
                        )
                      })}
                    </XStack>
                    <Button
                      size="$4"
                      iconAfter={ChevronRight}
                      disabled={currentPage === totalPages}
                      onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      variant="outlined"
                      borderColor="$borderColor"
                      backgroundColor={currentPage === totalPages ? '$gray2' : '$background'}
                      hoverStyle={{
                        backgroundColor: currentPage === totalPages ? '$gray2' : '$gray2',
                        borderColor: '$borderColorHover',
                      }}
                    >
                      <Paragraph size="$3" color={currentPage === totalPages ? '$gray8' : '$gray12'}>
                        Next
                      </Paragraph>
                    </Button>
                  </XStack>
                )}
              </XStack>
            </YStack>
          )}
        </YStack>
      </Card>

      {/* Sheet de filtros */}
      {showFilters && filters && (
        <Sheet
          open={filtersOpen}
          onOpenChange={setFiltersOpen}
          snapPoints={[50]}
          dismissOnSnapToBottom
          modal
        >
          <Sheet.Overlay />
          <Sheet.Handle />
          <Sheet.Frame padding="$4" gap="$4">
            <YStack gap="$4">
              <Paragraph size="$6" fontWeight="700">
                Filtros
              </Paragraph>
              <Separator />
              {filters}
            </YStack>
          </Sheet.Frame>
        </Sheet>
      )}
    </YStack>
  )
}
