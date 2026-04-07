'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1C1A17',
      color: '#D6B37A',
      fontFamily: "'Cinzel', serif",
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.8 }}>
        This sacred location is yet to be discovered.
      </p>
      <Link 
        href="/map" 
        style={{
          border: '1px solid #D6B37A',
          padding: '10px 24px',
          borderRadius: '4px',
          textDecoration: 'none',
          color: '#D6B37A',
          fontSize: '0.9rem',
          letterSpacing: '0.1em'
        }}
      >
        RETURN TO ATLAS
      </Link>
    </div>
  );
}
