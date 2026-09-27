import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PaginationControls from '@/components/shared/PaginationControls';

describe('PaginationControls', () => {
  it('disables previous on the first page and advances on next', () => {
    const onPageChange = vi.fn();
    render(<PaginationControls page={1} pageCount={3} onPageChange={onPageChange} label="Pagination des missions" />);

    expect(screen.getByRole('button', { name: 'Précédent' }).hasAttribute('disabled')).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Suivant' }));

    expect(onPageChange).toHaveBeenCalledWith(2);
    expect(screen.getByText('Page 1 sur 3')).toBeTruthy();
  });

  it('does not render controls when all items fit on one page', () => {
    const { container } = render(<PaginationControls page={1} pageCount={1} onPageChange={vi.fn()} label="Pagination" />);

    expect(container.firstChild).toBeNull();
  });
});
