export type NumberInput = number | string | null | undefined

function toNumber(value: NumberInput): number | null {
    if (value === null || value === undefined || value === '') {
        return null
    }

    const num = typeof value === 'number' ? value : Number(value)

    return Number.isFinite(num) ? num : null
}

export function formatNumber(
    value: NumberInput,
    locale = 'en-GB',
    maximumFractionDigits = 0,
): string {
    const num = toNumber(value)

    if (num === null) {
        return '—'
    }

    return new Intl.NumberFormat(locale, {
        maximumFractionDigits,
        minimumFractionDigits: 0,
    }).format(num)
}

export function formatDecimal(
    value: NumberInput,
    locale = 'en-GB',
    fractionDigits = 2,
): string {
    const num = toNumber(value)

    if (num === null) {
        return '—'
    }

    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
    }).format(num)
}

export function formatCompactNumber(
    value: NumberInput,
    locale = 'en-GB',
): string {
    const num = toNumber(value)

    if (num === null) {
        return '—'
    }

    return new Intl.NumberFormat(locale, {
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(num)
}

export function formatCurrency(
    value: NumberInput,
    currency = 'USD',
    locale = 'en-GB',
): string {
    const num = toNumber(value)

    if (num === null) {
        return '—'
    }

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(num)
}