import { Currencies } from "./currencies"

export function DateToUtc(date: Date) {
    return new Date(
        Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMilliseconds()
        )
    )
}

export function GetFormatterForCurrency(currency: string) {
    const locale = Currencies.find(c => c.value === currency)?.locale;

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency
    });
}