// TypeScript Version: 3.0
import { DeepReadonly, NonUndefinedProps } from 'types-util'

declare module 'grommet/utils' {
  // colors.js
  function normalizeColor(
    color: string,
    theme: object,
    required?: boolean,
  ): string

  // object.js
  type DeepFreeze = <T extends object>(obj: T) => DeepReadonly<T>

  // overload because generic variadic solution has messy result and all/most mergings are binary
  interface DeepMerge {
    <T extends object, S extends object>(target: T, source: S): T & S
    <T extends object, S extends object[]>(target: T, ...sources: S): T &
      S[number]
  }

  function isObject(item: any): boolean
  const deepFreeze: DeepFreeze
  const deepMerge: DeepMerge
  function removeUndefined<T extends object>(obj: T): NonUndefinedProps<T>
}
