import { KeySignature, NoteName } from '../types';

/**
 * Returns which notes are sharp in a given key signature
 */
export function getSharpNotes(keySignature: KeySignature): NoteName[] {
  const sharpKeys: Record<KeySignature, NoteName[]> = {
    'C': [],           // No sharps
    'G': ['F'],        // F#
    'D': ['F', 'C'],   // F#, C#
    'A': ['F', 'C', 'G'], // F#, C#, G#
    'F': [],           // No sharps (uses flats)
    'Bb': [],          // No sharps (uses flats)
    'Eb': [],          // No sharps (uses flats)
  };
  return sharpKeys[keySignature] || [];
}

/**
 * Returns which notes are flat in a given key signature
 */
export function getFlatNotes(keySignature: KeySignature): NoteName[] {
  const flatKeys: Record<KeySignature, NoteName[]> = {
    'C': [],           // No flats
    'G': [],           // No flats (uses sharps)
    'D': [],           // No flats (uses sharps)
    'A': [],           // No flats (uses sharps)
    'F': ['B'],        // Bb
    'Bb': ['B', 'E'],  // Bb, Eb
    'Eb': ['B', 'E', 'A'], // Bb, Eb, Ab
  };
  return flatKeys[keySignature] || [];
}

/**
 * Gets the VexFlow key signature string
 */
export function getVexFlowKeySignature(keySignature: KeySignature): string {
  // VexFlow uses the key name directly
  return keySignature;
}

/**
 * Determines if a note should be sharp or flat based on the key signature
 * Returns 'sharp', 'flat', or 'natural'
 */
export function getAccidentalFromKeySignature(
  noteName: NoteName,
  keySignature: KeySignature
): 'sharp' | 'flat' | 'natural' {
  const sharpNotes = getSharpNotes(keySignature);
  const flatNotes = getFlatNotes(keySignature);

  if (sharpNotes.includes(noteName)) {
    return 'sharp';
  }
  if (flatNotes.includes(noteName)) {
    return 'flat';
  }
  return 'natural';
}
