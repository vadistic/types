export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type Readonly<T extends object> = { readonly [K in keyof T]: T[K] }
export type DeepReadonly<T extends object> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
}

export type NonUndefined<T> = T extends undefined ? never : T
export type NonUndefinedProps<T extends object> = {
  [K in keyof T]?: NonUndefined<T[K]>
}
