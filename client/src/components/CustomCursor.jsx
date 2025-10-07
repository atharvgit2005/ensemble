import { useEffect, useRef, useState } from 'react';

// Modes: 'default' | 'action' | 'discovery' | 'ensemble' | 'hidden'
export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);

  const [mode, setMode] = useState('default');
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(true);

  // Disable on touch devices to avoid conflicts
  const isTouchDevice = () => {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isTouchDevice()) {
      setVisible(false);
      return;
    }
    // Activate custom cursor globally
    document.body.classList.add('custom-cursor-active');

    const ring = ringRef.current;
    const dot = dotRef.current;
    const labelEl = labelRef.current;

    let mouseX = -100, mouseY = -100;
    let rafId;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(updatePosition);
    };

    const updatePosition = () => {
      rafId = null;
      if (ring) {
        ring.style.transform = `translate3d(${mouseX - ring.offsetWidth / 2}px, ${mouseY - ring.offsetHeight / 2}px, 0)`;
      }
      if (dot) {
        dot.style.transform = `translate3d(${mouseX - dot.offsetWidth / 2}px, ${mouseY - dot.offsetHeight / 2}px, 0)`;
      }
      if (labelEl) {
        const offset = 16;
        labelEl.style.transform = `translate3d(${mouseX + offset}px, ${mouseY + offset}px, 0)`;
      }
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    const updateModeFromTarget = (target) => {
      if (!target || !(target instanceof Element)) return;
      // Traverse up to find any ancestor with data-cursor
      let el = target;
      while (el && el !== document.body) {
        const dataMode = el.getAttribute('data-cursor');
        if (dataMode) {
          setMode(dataMode);
          const lbl = el.getAttribute('data-cursor-label');
          setLabel(lbl || '');
          // Ensure custom cursor visible for non-text interactive targets
          if (dataMode === 'discovery' || dataMode === 'action' || dataMode === 'ensemble' || dataMode === 'default') {
            setVisible(true);
          }
          return;
        }
        el = el.parentElement;
      }

      // Fallbacks: interactive elements -> action, inputs -> default/text
      if (target.closest('input, textarea, select, [contenteditable="true"]')) {
        setMode('default');
        setLabel('');
        // Hide custom visuals so native I-beam is clearly visible
        setVisible(false);
        return;
      }

      if (target.closest('button, a, [role="button"], .cursor-pointer')) {
        setMode('action');
        setLabel('');
        setVisible(true);
        return;
      }

      setMode('default');
      setLabel('');
      setVisible(true);
    };

    const handleOver = (e) => updateModeFromTarget(e.target);
    const handleDown = () => {
      // Slight shrink on press
      if (ringRef.current) ringRef.current.classList.add('cursor-press');
      if (dotRef.current) dotRef.current.classList.add('cursor-press');
    };
    const handleUp = () => {
      if (ringRef.current) ringRef.current.classList.remove('cursor-press');
      if (dotRef.current) dotRef.current.classList.remove('cursor-press');
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('mouseup', handleUp);

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('mouseup', handleUp);
      if (rafId) cancelAnimationFrame(rafId);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  // Hide entirely when not visible
  const hidden = !visible;

  return (
    <>
      {/* Ring for default/ensemble modes */}
      <div
        ref={ringRef}
        className={[
          'cursor-ring',
          hidden ? 'cursor-hidden' : '',
          mode === 'ensemble' ? 'cursor-ring-ensemble' : 'cursor-ring-default'
        ].join(' ')}
      />

      {/* Dot for action mode */}
      <div
        ref={dotRef}
        className={[
          'cursor-dot',
          hidden || (mode !== 'action' && mode !== 'default') ? 'cursor-hidden' : '',
          mode === 'action' ? 'cursor-dot-action' : 'cursor-dot-default'
        ].join(' ')}
      />

      {/* Floating label for discovery mode */}
      <div
        ref={labelRef}
        className={[
          'cursor-label',
          hidden || mode !== 'discovery' ? 'cursor-hidden' : ''
        ].join(' ')}
      >
        {label || 'Explore'}
      </div>
    </>
  );
}
