import { Note, NoteName, KeyboardKey, Accidental, Clef, KeySignature } from '../types';
import { getAccidentalFromKeySignature } from './keySignatureUtils';

/**
 * Gets the effective accidental for a note, considering the key signature
 * Recognition logic:
 * - If accidental is 'sharp' or 'flat', use that explicit accidental (overrides key signature)
 * - If accidental is 'natural', follow the key signature (use key signature's accidental for recognition)
 * 
 * Example: In key of G (F#), a note with name='F' and accidental='natural' 
 * should be recognized as F# (because the key signature says F is sharp)
 */
function getEffectiveAccidental(note: Note): Accidental {
  const { accidental, name, keySignature } = note;
  
  // If there's an explicit sharp or flat, use it (overrides key signature)
  if (accidental === 'sharp' || accidental === 'flat') {
    return accidental;
  }
  
  // If accidental is 'natural', it means "follow the key signature"
  // So we use whatever the key signature says for this note
  return getAccidentalFromKeySignature(name, keySignature);
}

/**
 * Maps a note name with accidental (respecting key signature) to the corresponding keyboard key
 */
export function noteToKeyboardKey(note: Note): KeyboardKey {
  const { name } = note;
  const effectiveAccidental = getEffectiveAccidental(note);
  
  // Handle sharps
  if (effectiveAccidental === 'sharp') {
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
  if (effectiveAccidental === 'flat') {
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
  const keySignatures: KeySignature[] = ['C', 'G', 'F', 'D', 'Bb', 'A', 'Eb'];
  
  return {
    name: names[Math.floor(Math.random() * names.length)],
    clef: clefs[Math.floor(Math.random() * clefs.length)],
    accidental: accidentals[Math.floor(Math.random() * accidentals.length)],
    keySignature: keySignatures[Math.floor(Math.random() * keySignatures.length)],
  };
}

/**
 * Creates a specific note (useful for testing)
 */
export function createNote(
  name: NoteName,
  clef: Clef = 'treble',
  accidental: Accidental = 'natural',
  keySignature: KeySignature = 'C'
): Note {
  return { name, clef, accidental, keySignature };
}
