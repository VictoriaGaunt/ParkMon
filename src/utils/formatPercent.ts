export type PercentInput = number | string | null | undefined

function toNumber(value: PercentInput): number | null {
    if (value === null || value === undefined || value === '') {
        return null
    }

    const num = typeof value === 'number' ? value : Number(value)

    return Number.isFinite(num) ? num : null
}

/**
 * По умолчанию ожидает значение уже в процентах:
 * 42 -> "42%"
 * 42.5 -> "42.5%"
 */
export function formatPercent(
    value: PercentInput,
    maximumFractionDigits = 0,
    locale = 'en-GB',
): string {
    const num = toNumber(value)

    if (num === null) {
        return '—'
    }

    return new Intl.NumberFormat(locale, {
        style: 'percent',
        maximumFractionDigits,
    }).format(num / 100)
}

/**
 * Для случаев, когда значение приходит как доля:
 * 0.42 -> "42%"
 * 0.425 -> "42.5%"
 */
export function formatRatioAsPercent(
    value: PercentInput,
    maximumFractionDigits = 0,
    locale = 'en-GB',
): string {
    const num = toNumber(value)

    if (num === null) {
        return '—'
    }

    return new Intl.NumberFormat(locale, {
        style: 'percent',
        maximumFractionDigits,
    }).format(num)
}