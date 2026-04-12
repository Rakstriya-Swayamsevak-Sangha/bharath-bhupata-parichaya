'use client';

import { motion, AnimatePresence } from 'framer-motion';

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * iOS INSTALL GUIDANCE — Subtle, non-intrusive overlay
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Shown ONLY on iOS Safari when install prompt is not available natively.
 * Positioned at the bottom, auto-dismisses, never blocks interaction.
 * Matches the parchment/ancient manuscript aesthetic.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

interface IOSGuidanceProps {
  visible: boolean;
  onDismiss: () => void;
}

export function IOSInstallGuidance({ visible, onDismiss }: IOSGuidanceProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            width: 'auto',
            maxWidth: 'min(90vw, 380px)',
            background: 'rgba(28, 26, 23, 0.96)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(198, 168, 90, 0.25)',
            borderRadius: '16px',
            padding: '16px 20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(198, 168, 90, 0.1)',
            pointerEvents: 'auto',
          }}
          onClick={onDismiss}
          role="alert"
          aria-live="polite"
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            {/* Share icon */}
            <div style={{
              flexShrink: 0,
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(198, 168, 90, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D6B96B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '11px',
                fontWeight: 600,
                color: '#D6B96B',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                marginBottom: '4px',
              }}>
                Add to Home Screen
              </div>
              <div style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: '12px',
                color: 'rgba(240, 230, 211, 0.6)',
                lineHeight: 1.4,
              }}>
                Tap{' '}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle' }}>
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                {' '}then &quot;Add to Home Screen&quot; for offline access
              </div>
            </div>

            {/* Dismiss X */}
            <div style={{
              flexShrink: 0,
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              opacity: 0.4,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D6B96B" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
