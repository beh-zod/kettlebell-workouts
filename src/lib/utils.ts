import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Weight conversion utilities
export function kgToLbs(kg: number): number {
  return Math.round(kg * 2.20462)
}

export function lbsToKg(lbs: number): number {
  return Math.round(lbs / 2.20462 * 10) / 10
}

export function formatWeight(weightInKg: number, unit: 'kg' | 'lbs'): string {
  if (unit === 'lbs') {
    return `${kgToLbs(weightInKg)} lbs`
  }
  return `${weightInKg} kg`
}

// Common kettlebell weights
export const KETTLEBELL_WEIGHTS_KG = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48]
export const KETTLEBELL_WEIGHTS_LBS = [9, 18, 26, 35, 44, 53, 62, 70, 79, 88, 97, 106]

export function getKettlebellWeights(unit: 'kg' | 'lbs'): number[] {
  return unit === 'kg' ? KETTLEBELL_WEIGHTS_KG : KETTLEBELL_WEIGHTS_LBS
}

// Time formatting
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

// Date formatting
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

