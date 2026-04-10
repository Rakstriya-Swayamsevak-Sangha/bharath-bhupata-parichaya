'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div style={{
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0A0908',
      color: '#D6B37A',
      fontFamily: "'Cinzel', serif",
      textAlign: 'center',
      padding: '40px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Border Frame */}
      <div style={{
        position: 'absolute',
        inset: '20px',
        border: '1px solid rgba(214, 179, 122, 0.15)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Hero 404 Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ zIndex: 2 }}
      >
        <div style={{
          fontSize: 'clamp(5rem, 15vw, 8rem)',
          fontWeight: '500',
          letterSpacing: '0.15em',
          lineHeight: '1',
          marginBottom: '10px',
          opacity: 0.9,
          textShadow: '0 0 40px rgba(214, 179, 122, 0.1)'
        }}>
          404
        </div>
        
        {/* Sanskrit subtitle for depth */}
        <div style={{
          fontFamily: "'Noto Serif Devanagari', serif",
          fontSize: '1.4rem',
          color: '#8B7355',
          marginBottom: '30px',
          letterSpacing: '0.05em'
        }}>
          मार्गः न लब्धः
        </div>

        <div style={{
          height: '1px',
          width: '60px',
          backgroundColor: '#D6B37A',
          margin: '0 auto 40px',
          opacity: 0.4
        }} />

        <p style={{
          fontSize: 'clamp(0.9rem, 1rem + 0.2vw, 1.1rem)',
          marginBottom: '50px',
          maxWidth: '450px',
          margin: '0 auto 50px',
          lineHeight: '1.8',
          opacity: 0.7,
          fontStyle: 'italic',
          color: '#F0E6D3'
        }}>
          This fragment of the sacred atlas remains undocumented in our current scrolls.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            href="/bharatvarsha" 
            style={{
              display: 'inline-block',
              border: '1px solid #D6B37A',
              padding: '14px 40px',
              borderRadius: '2px',
              textDecoration: 'none',
              color: '#D6B37A',
              fontSize: '0.85rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              backgroundColor: 'rgba(214, 179, 122, 0.03)',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 20px rgba(214, 179, 122, 0.05)'
            }}
          >
            Return to Bharatvarsha
          </Link>
        </motion.div>
      </motion.div>

      {/* Ambient Light */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(214, 179, 122, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
    </div>
  );
}
