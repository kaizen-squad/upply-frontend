import { describe, expect, it } from 'vitest';
import { commissionPlateform, formatAmount, formatFrenchDateIntl, getInitials } from '@/lib/utils';

describe('formatAmount', () => {
  it('formats thousands with French separators', () => {
    expect(formatAmount(1234567)).toBe('1.234.567');
  });

  it('preserves decimals and negative values', () => {
    expect(formatAmount(-1234.5)).toBe('-1.234,5');
  });
});

describe('formatFrenchDateIntl', () => {
  it('formats valid ISO calendar dates in French', () => {
    expect(formatFrenchDateIntl('2026-05-03')).toBe('03 mai 2026');
  });

  it('returns an empty string for an invalid date', () => {
    expect(formatFrenchDateIntl('not-a-date')).toBe('');
  });
});

describe('other pure utilities', () => {
  it('calculates the platform commission', () => {
    expect(commissionPlateform(1000)).toBe(100);
  });

  it('builds initials from a full name', () => {
    expect(getInitials('Ada Lovelace')).toBe('AL');
  });
});
