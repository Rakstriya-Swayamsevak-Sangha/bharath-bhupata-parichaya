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
        inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
        border transition-all duration-200
        ${className}
      `}
      style={{
        backgroundColor: `${config.color}20`,
        borderColor: config.color,
        color: config.color,
      }}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}
