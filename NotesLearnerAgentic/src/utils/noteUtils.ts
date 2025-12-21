import { Note, NoteName, KeyboardKey, Accidental, Clef } from '../types';

/**
 * Maps a note name with accidental to the corresponding keyboard key
 */
export function noteToKeyboardKey(note: Note): KeyboardKey {
  const { name, accidental } = note;
  
  // Handle sharps
  if (accidental === 'sharp') {
    const sharpMap: Record<NoteName, KeyboardKey> = {
      'A': 'A#',
      'B': 'C',  // B# is enharmonic to C
      'C': 'C#',
      'D': 'D#',
      'E': 'F',  // E# is enharmonic to F
      'F': 'F#',
      'G': 'G#',
    };
    return sharpMap[name];
  }
  
  // Handle flats
  if (accidental === 'flat') {
    const flatMap: Record<NoteName, KeyboardKey> = {
      'A': 'G#',  // Ab is enharmonic to G#
      'B': 'A#',  // Bb is enharmonic to A#
      'C': 'B',   // Cb is enharmonic to B
      'D': 'C#',  // Db is enharmonic to C#
      'E': 'D#',  // Eb is enharmonic to D#
      'F': 'E',   // Fb is enharmonic to E
      'G': 'F#',  // Gb is enharmonic to F#
    };
    return flatMap[name];
  }
  
  // Natural notes
  const naturalMap: Record<NoteName, KeyboardKey> = {
    'A': 'A',
    'B': 'B',
    'C': 'C',
    'D': 'D',
    'E': 'E',
    'F': 'F',
    'G': 'G',
  };
  return naturalMap[name];
}

/**
 * Generates a random note
 */
export function generateRandomNote(): Note {
  const names: NoteName[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const clefs: Clef[] = ['treble', 'bass'];
  const accidentals: Accidental[] = ['natural', 'sharp', 'flat'];
  
  return {
    name: names[Math.floor(Math.random() * names.length)],
    clef: clefs[Math.floor(Math.random() * clefs.length)],
    accidental: accidentals[Math.floor(Math.random() * accidentals.length)],
  };
}

/**
 * Creates a specific note (useful for testing)
 */
export function createNote(name: NoteName, clef: Clef = 'treble', accidental: Accidental = 'natural'): Note {
  return { name, clef, accidental };
}
