'use strict';

export type SafeUnknown = unknown;

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export function safeGet<T>(value: SafeUnknown, fallback: T): T {
  if (value === null || value === undefined) {
    return fallback;
  }
  if (typeof value !== typeof fallback) {
    return fallback;
  }
  return value as T;
}

export function safeGetPath<T>(obj: SafeUnknown, path: string, fallback: T): T {
  if (obj === null || obj === undefined) {
    return fallback;
  }
  if (typeof obj !== 'object') {
    return fallback;
  }
  
  const keys = path.split('.');
  let current: SafeUnknown = obj;
  
  for (const key of keys) {
    if (current === null || current === undefined) {
      return fallback;
    }
    if (typeof current !== 'object') {
      return fallback;
    }
    current = (current as Record<string, unknown>)[key];
  }
  
  if (current === null || current === undefined) {
    return fallback;
  }
  
  if (typeof fallback !== typeof current) {
    return fallback;
  }
  
  return current as T;
}

export function safeGetString(value: SafeUnknown, fallback = ''): string {
  if (typeof value === 'string') {
    return value;
  }
  if (value === null || value === undefined) {
    return fallback;
  }
  return String(value);
}

export function safeGetNumber(value: SafeUnknown, fallback = 0): number {
  if (typeof value === 'number' && !isNaN(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (!isNaN(parsed)) {
      return parsed;
    }
  }
  return fallback;
}

export function safeGetBoolean(value: SafeUnknown, fallback = false): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'string') {
    const lower = value.toLowerCase();
    if (lower === 'true' || lower === '1' || lower === 'yes') {
      return true;
    }
    if (lower === 'false' || lower === '0' || lower === 'no') {
      return false;
    }
  }
  return fallback;
}

export function safeGetArray<T>(value: SafeUnknown, fallback: T[] = []): T[] {
  if (Array.isArray(value)) {
    return value as T[];
  }
  return fallback;
}

export function safeGetObject<T extends Record<string, unknown>>(value: SafeUnknown, fallback: T | null = null): T | null {
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    return value as T;
  }
  return fallback;
}

export function safeGetNested<T>(obj: SafeUnknown, path: string, fallback: T): T {
  const keys = path.split('.');
  let current: SafeUnknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined) {
      return fallback;
    }
    if (typeof current !== 'object') {
      return fallback;
    }
    current = (current as Record<string, unknown>)[key];
  }

  if (current === null || current === undefined) {
    return fallback;
  }

  if (typeof fallback !== typeof current) {
    return fallback;
  }

  return current as T;
}

export function validateRequired(value: SafeUnknown): boolean {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === 'string' && value.trim() === '') {
    return false;
  }
  if (Array.isArray(value) && value.length === 0) {
    return false;
  }
  return true;
}

export function validateString(value: SafeUnknown): value is string {
  return typeof value === 'string';
}

export function validateNumber(value: SafeUnknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function validateArray(value: SafeUnknown): value is unknown[] {
  return Array.isArray(value);
}

export function validateObject(value: SafeUnknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export interface SafeObjectSchema {
  [key: string]: {
    type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'any';
    required?: boolean;
    default?: unknown;
    schema?: SafeObjectSchema;
  };
}

export function safeValidateObject(data: SafeUnknown, schema: SafeObjectSchema): ValidationResult<Record<string, unknown>> {
  if (!validateObject(data)) {
    return { success: false, error: 'Invalid object' };
  }

  const result: Record<string, unknown> = {};
  const errors: string[] = [];

  for (const [key, rules] of Object.entries(schema)) {
    const value = data[key];

    if (rules.required && !validateRequired(value)) {
      errors.push(`Missing required field: ${key}`);
      result[key] = rules.default;
      continue;
    }

    if (value === null || value === undefined) {
      if (rules.default !== undefined) {
        result[key] = rules.default;
      }
      continue;
    }

    let isValid = false;

    switch (rules.type) {
      case 'string':
        isValid = validateString(value);
        break;
      case 'number':
        isValid = validateNumber(value);
        break;
      case 'boolean':
        isValid = typeof value === 'boolean';
        break;
      case 'array':
        isValid = validateArray(value);
        break;
      case 'object':
        isValid = validateObject(value);
        if (isValid && rules.schema) {
          const nestedResult = safeValidateObject(value, rules.schema);
          if (!nestedResult.success) {
            errors.push(...nestedResult.error?.split(',').map(e => `${key}.${e}`) || []);
          }
          result[key] = nestedResult.data || value;
          isValid = nestedResult.success;
        }
        break;
      case 'any':
      default:
        isValid = true;
        break;
    }

    result[key] = isValid ? value : (rules.default ?? null);
  }

  if (errors.length > 0) {
    return { success: false, data: result, error: errors.join(', ') };
  }

  return { success: true, data: result };
}

export function safeArrayMap<T, U>(
  arr: SafeUnknown,
  mapper: (item: T, index: number) => U,
  fallback: U[] = []
): U[] {
  if (!Array.isArray(arr)) {
    return fallback;
  }
  return arr.map((item, index) => {
    try {
      return mapper(item as T, index);
    } catch {
      return fallback[0] as U;
    }
  });
}

export function safeArrayFilter<T>(
  arr: SafeUnknown,
  predicate: (item: T, index: number) => boolean,
  fallback: T[] = []
): T[] {
  if (!Array.isArray(arr)) {
    return fallback;
  }
  return arr.filter((item, index) => {
    try {
      return predicate(item as T, index);
    } catch {
      return false;
    }
  });
}

export function safeTry<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

export async function safeTryAsync<T>(
  fn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}