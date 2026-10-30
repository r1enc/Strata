import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility for conditionally joining Tailwind CSS class names.
 * Merges Tailwind classes intelligently, resolving conflicts in favour of the last value.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
