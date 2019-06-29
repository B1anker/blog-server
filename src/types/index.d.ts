import { Request } from '@nestjs/common';

export type RequestWithCookie = Request & {
  cookies: {
    ['jwt']: string
  }
}

// 比较T和U，取出不同部分
export type Diff<T, U> = T extends U ? never : T

// 比较T和U，取出相同部分
export type Filter<T, U> = T extends U ? T : never

// 将传入的属性变为可选项
export type Partial<T> = { [P in keyof T]?: T[P] }

// 将传入的属性变为必选项
export type Required<T> = { [P in keyof T]-?: T[P] }

// 去掉readonly
export type MutableRequired<T> = { -readonly [P in keyof T]: T[P] }

// 添加readonly
export type Readonly<T> = { readonly [P in keyof T]: T[P] }

// 添加readonly和?
export type ReadonlyPartial<T> = { readonly [P in keyof T]+?: T[P] }

// 将K中给所有的属性的值转化成T类型
export type Record<K extends keyof any, T> = { [P in K]: T }

// 如果 T 是 U 的子类型的话，那么就会返回 X，否则返回 Y  / 从 T 中排除 U
// type T = Exclude<1 | 2, 1 | 3> // -> 2
export type Exclude<T, U> = T extends U ? never : T

// 如果 T 是 U 的子类型的话，那么就会返回 X，否则返回 Y  / 从 T 中提取 U
// type T = Extract<1 | 2, 1 | 3> // -> 1
export type Extract<T, U> = T extends U ? T : never

// 从 T 中取出 一系列 K 的属性
export type Pick<T, K extends keyof T> = { [P in K]: T[P] }

// 从 T 中排除一系列 K 的属性
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
