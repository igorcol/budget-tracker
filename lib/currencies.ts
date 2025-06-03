
export const Currencies = [ // Locale must be Intl.NumberFormat
    { value: "USD", label: "$ US Dollar", locale: "en-US" },
    { value: "EUR", label: "€ Euro", locale: "de-DE" },
    { value: "JPY", label: "¥ Yen", locale: "ja-JP" },
    { value: "BRL", label: "R$ Real", locale: "pt-BR" },
];

export type Currency =  (typeof Currencies)[0];