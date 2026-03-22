export type DateInput = string | number | Date | null | undefined

function toDate(value: DateInput): Date | null {
    if (value === null || value === undefined || value === '') {
        return null
    }

    const date = value instanceof Date ? value : new Date(value)

    return Number.isNaN(date.getTime()) ? null : date
}

export function formatDate(
    value: DateInput,
    locale = 'en-GB',
): string {
    const date = toDate(value)

    if (!date) {
        return '—'
    }

    return new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date)
}

export function formatShortDate(
    value: DateInput,
    locale = 'en-GB',
): string {
    const date = toDate(value)

    if (!date) {
        return '—'
    }

    return new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: '2-digit',
    }).format(date)
}

export function formatDateTime(
    value: DateInput,
    locale = 'en-GB',
): string {
    const date = toDate(value)

    if (!date) {
        return '—'
    }

    return new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date)
}

export function formatTime(
    value: DateInput,
    locale = 'en-GB',
): string {
    const date = toDate(value)

    if (!date) {
        return '—'
    }

    return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
    }).format(date)
}