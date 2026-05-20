// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine des classes Tailwind CSS en résolvant les conflits
 * @param inputs - Classes CSS à fusionner
 * @returns Chaîne de classes optimisée
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


/**
 * Formate une date en une chaîne relative du type "Posté il y a 2 heures"
 * @param dateString - La date au format ISO ou reconnu par Date()
 * @returns Chaîne formattée (ex: "Posté à l'instant", "Posté il y a 3 jours")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString.substring(0,10));
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  // Futur (cas improbable pour created_at, mais par précaution)
  if (diffMs < 0) {
    const absDiff = Math.abs(diffMs);
    const absSecs = Math.floor(absDiff / 1000);
    const absMins = Math.floor(absSecs / 60);
    const absHours = Math.floor(absMins / 60);
    const absDays = Math.floor(absHours / 24);
    if (absDays > 0) return `Publié dans ${absDays} jour${absDays > 1 ? 's' : ''}`;
    if (absHours > 0) return `Publié dans ${absHours} heure${absHours > 1 ? 's' : ''}`;
    if (absMins > 0) return `Publié dans ${absMins} minute${absMins > 1 ? 's' : ''}`;
    return `Publié à l'instant`;
  }

  // Passé
  if (diffYears > 0) {
    return `Posté il y a ${diffYears} an${diffYears > 1 ? 's' : ''}`;
  }
  if (diffMonths > 0) {
    return `Posté il y a ${diffMonths} mois`; // mois déjà pluriel
  }
  if (diffWeeks > 0) {
    return `Posté il y a ${diffWeeks} semaine${diffWeeks > 1 ? 's' : ''}`;
  }
  if (diffDays > 0) {
    return `Posté il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  }
  if (diffHours > 0) {
    return `Posté il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
  }
  if (diffMins > 0) {
    return `Posté il y a ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
  }
  if (diffSecs > 0) {
    return `Posté il y a ${diffSecs} seconde${diffSecs > 1 ? 's' : ''}`;
  }
  return `Posté à l'instant`;
}

/**
 * Formate une date au format YYYY-MM-DD en "DD Mois YYYY" en français
 * @param dateStr - Date au format "YYYY-MM-DD" (ex: "2026-05-03")
 * @returns Chaîne formatée (ex: "03 Mai 2026") ou chaîne vide si invalide
 */
export function formatFrenchDateIntl(dateStr: string): string {
  if (!dateStr || !dateStr.substring(0,10).match(/^\d{4}-\d{2}-\d{2}$/)) return '';

  const [year, month, day] = dateStr.substring(0,10).split('-').map(Number);
  const date = new Date(year, month - 1, day);

  if (isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

const commission = 0.1;

export function commissionPlateform(budget: number): number {
  return budget * commission
}

export function getInitials (name: string): string {
  return name.split(' ').map(w => w[0]).join('').toUpperCase();
}

/**
 * Formate un montant entier ou décimal en chaîne avec séparateur de milliers.
 * @param amount - Montant numérique à formater (ex: 23000)
 * @returns Chaîne formatée avec points comme séparateur de milliers (ex: "23.000")
 */
export function formatAmount(amount: number): string {
  const isNegative = amount < 0;
  const absoluteValue = Math.abs(amount);
  const [integerPart, fractionPart] = absoluteValue.toString().split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const formattedNumber = fractionPart ? `${formattedInteger},${fractionPart}` : formattedInteger;

  return isNegative ? `-${formattedNumber}` : formattedNumber;
}

/**
 * Utility function to build FormData for file upload
 * @param data Object containing fields and files
 * @returns FormData ready to send
 */
export function buildFormData(data: Record<string, any>): FormData {
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      // For nested objects, send as JSON string
      formData.append(key, JSON.stringify(value));
    } else if (Array.isArray(value)) {
      // For arrays, send each item with same key
      value.forEach((item) => {
        formData.append(key, item);
      });
    } else {
      formData.append(key, String(value));
    }
  });
  
  return formData;
}

