'use client';

import { useState } from 'react';
import { useMediaQuery } from '@reactuses/core';

/**
 * Computes responsive pagination boundaries for a list.
 *
 * Uses five items per page on narrow screens and ten on wider screens. If the list
 * shrinks, the returned page is clamped to its new last page.
 *
 * @param itemCount - Number of items in the full collection.
 * @returns Current page, page count, slice boundaries, and a page setter.
 */
export function useResponsivePagination(itemCount: number) {
  const isMobile = useMediaQuery('(max-width: 639px)');
  const pageSize = isMobile ? 5 : 10;
  const [requestedPage, setPage] = useState(1);
  const pageCount = Math.ceil(itemCount / pageSize);
  const page = Math.min(requestedPage, Math.max(pageCount, 1));
  const startIndex = (page - 1) * pageSize;

  return {
    page,
    pageCount,
    startIndex,
    endIndex: Math.min(startIndex + pageSize, itemCount),
    setPage,
  };
}
