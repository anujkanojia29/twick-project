import { useState, useEffect } from 'react';
import { LivePlayerProvider } from '@twick/live-player';
import { TimelineProvider, INITIAL_TIMELINE_DATA } from '@twick/timeline';
import TwickStudio from '@twick/studio';
import "@twick/studio/dist/studio.css";

// Minimum screen width for desktop (in pixels)
const MIN_DESKTOP_WIDTH = 1024;
const MIN_DESKTOP_HEIGHT = 600;

function App() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenSize({ width, height });
      setIsDesktop(width >= MIN_DESKTOP_WIDTH && height >= MIN_DESKTOP_HEIGHT);
    };

    // Check on mount
    checkScreenSize();

    // Add resize listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!isDesktop) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '500px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '3rem 2rem',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💻</div>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
            Desktop Required
          </h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem', opacity: '0.9' }}>
            TwickStudio is designed for laptop and desktop devices to provide you with the best video editing experience.
          </p>
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '10px',
            padding: '1rem',
            marginTop: '1.5rem'
          }}>
            <p style={{ fontSize: '0.9rem', margin: '0', opacity: '0.8' }}>
              Minimum required: {MIN_DESKTOP_WIDTH}px × {MIN_DESKTOP_HEIGHT}px
            </p>
            <p style={{ fontSize: '0.9rem', margin: '0.5rem 0 0', opacity: '0.8' }}>
              Your screen: {screenSize.width}px × {screenSize.height}px
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LivePlayerProvider>
      <TimelineProvider
        initialData={INITIAL_TIMELINE_DATA}
        contextId={"studio-demo"}
      >
        <TwickStudio studioConfig={{
          videoProps: {
            width: 720,
            height: 1280,
          }}
          }/>
      </TimelineProvider>
    </LivePlayerProvider>
  );
}

export default App
