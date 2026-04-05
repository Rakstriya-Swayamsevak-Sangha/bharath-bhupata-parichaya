'use client';

import React from 'react';

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
}

export function CloseButton({ onClick, className = '' }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-8 h-8 flex items-center justify-center
        rounded-sm transition-all duration-200
        text-textSecondary hover:text-primary
        hover:bg-background
        focus:outline-none
        border border-transparent hover:border-border
        ${className}
      `}
      aria-label="Close"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
}
