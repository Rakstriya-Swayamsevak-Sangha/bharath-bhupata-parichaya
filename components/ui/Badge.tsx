import React from 'react';
import { Category } from '@/types/location';
import { CATEGORY_CONFIG } from '@/utils/constants';

interface BadgeProps {
  category: Category;
  className?: string;
}

export function Badge({ category, className = '' }: BadgeProps) {
  const config = CATEGORY_CONFIG[category];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs
        border transition-all duration-200
        ${className}
      `}
      style={{
        backgroundColor: `${config.color}15`,
        borderColor: `${config.color}40`,
        color: config.color,
        fontFamily: "'Cinzel', serif",
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        fontSize: '10px',
        fontWeight: 600,
      }}
    >
      <span>{config.label}</span>
    </span>
  );
}
