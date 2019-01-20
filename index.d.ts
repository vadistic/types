export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type Readonly<T extends object> = { readonly [K in keyof T]: T[K] }
export type DeepReadonly<T extends object> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
}

export type NonUndefined<T> = T extends undefined ? never : T
export type NonUndefinedProps<T extends object> = {
  [K in keyof T]?: NonUndefined<T[K]>
}

// https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c
export type FilterFlags<T, Condition> = {
  [K in keyof T]: T[K] extends Condition ? K : never
}

export type FilterObjectKeys<T, Condition> = FilterFlags<T, Condition>[keyof T]

export type SubType<T, Condition> = Pick<T, FilterObjectKeys<T, Condition>>
