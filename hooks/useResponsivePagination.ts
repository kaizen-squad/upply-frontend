'use client';

import { useState } from 'react';
import { useMediaQuery } from '@reactuses/core';

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
