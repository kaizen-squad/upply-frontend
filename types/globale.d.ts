// src/types/react-ratings-star.d.ts
declare module 'react-ratings-star' {
  import { ComponentType } from 'react';

  interface RatingProps {
    value?: number;
    onRatingChange?: (value: number) => void;
    size?: number;
    fullColor?: string;
    emptyColor?: string;
    isSelectable?: boolean;
    // Ajoute d’autres props selon la doc
  }

  const Rating: ComponentType<RatingProps>;
  export default Rating;
}