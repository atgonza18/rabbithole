import { useCallback, useRef } from 'react';

export function useSoundEffects() {
  const audioContext = useRef<AudioContext | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    const ctx = initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, [initAudioContext]);

  const playCorrect = useCallback(() => {
    const ctx = initAudioContext();
    // Happy ascending notes
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      setTimeout(() => {
        playTone(freq, 0.15, 'sine');
      }, i * 80);
    });
  }, [initAudioContext, playTone]);

  const playWrong = useCallback(() => {
    const ctx = initAudioContext();
    // Descending sad notes
    [400, 350].forEach((freq, i) => {
      setTimeout(() => {
        playTone(freq, 0.2, 'triangle');
      }, i * 100);
    });
  }, [initAudioContext, playTone]);

  const playClick = useCallback(() => {
    const ctx = initAudioContext();
    // Cool futuristic click with two tones
    playTone(800, 0.04, 'sine');
    setTimeout(() => {
      playTone(1200, 0.03, 'sine');
    }, 30);
  }, [initAudioContext, playTone]);

  const playCelebration = useCallback(() => {
    const ctx = initAudioContext();
    // Victory fanfare
    const melody = [523.25, 659.25, 783.99, 1046.50];
    melody.forEach((freq, i) => {
      setTimeout(() => {
        playTone(freq, 0.2, 'sine');
      }, i * 120);
    });
    // Add some sparkle
    setTimeout(() => {
      [1046.50, 1318.51].forEach((freq, i) => {
        setTimeout(() => {
          playTone(freq, 0.15, 'sine');
        }, i * 80);
      });
    }, 480);
  }, [initAudioContext, playTone]);

  const playPageTurn = useCallback(() => {
    playTone(800, 0.08, 'sine');
  }, [playTone]);

  const playSelect = useCallback(() => {
    playTone(700, 0.06, 'square');
  }, [playTone]);

  return {
    playCorrect,
    playWrong,
    playClick,
    playCelebration,
    playPageTurn,
    playSelect,
  };
}
