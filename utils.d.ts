// TypeScript Version: 3.0
import { DeepReadonly, NonUndefinedProps } from 'types-util'

declare module 'grommet/utils' {
  // colors.js
  export const normalizeColor: (
    color: string,
    theme: object,
    required?: boolean,
  ) => string

  // object.js
  export type DeepFreeze = <T extends object>(obj: T) => DeepReadonly<T>

  // overload because generic variadic solution has messy result and all/most mergings are binary
  export interface DeepMerge {
    <T extends object, S extends object>(target: T, source: S): T & S
    <T extends object, S extends object[]>(target: T, ...sources: S): T &
      S[number]
  }

  export const isObject: (item: any) => boolean
  export const deepFreeze: DeepFreeze
  export const deepMerge: DeepMerge
  export const removeUndefined: <T extends object>(
    obj: T,
  ) => NonUndefinedProps<T>
}
