let audioBuffer: AudioBuffer | null = null;
let audioContext: AudioContext | null = null;
let preloadPromise: Promise<void> | null = null;
let startOffset = 0;

function detectStartOffset(buffer: AudioBuffer): number {
  const data = buffer.getChannelData(0);
  const threshold = 0.005;
  for (let i = 0; i < data.length; i++) {
    if (Math.abs(data[i]) > threshold) {
      return Math.max(0, (i - 64) / buffer.sampleRate);
    }
  }
  return 0;
}

async function ensureLoaded() {
  if (audioBuffer) return;
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  const response = await fetch("/icon-hover.mp3");
  const arrayBuffer = await response.arrayBuffer();
  audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  startOffset = detectStartOffset(audioBuffer);
}

export function preloadClickSound() {
  if (typeof window === "undefined") return;
  if (!preloadPromise) preloadPromise = ensureLoaded().catch(() => {});
}

export async function playClickSound() {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (!audioBuffer) {
      await ensureLoaded();
    }
    if (!audioBuffer) return;

    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.18;

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.playbackRate.value = 0.72;
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    source.start(0, startOffset);
  } catch (e) {
    // Silently fail if audio cannot be played
  }
}
