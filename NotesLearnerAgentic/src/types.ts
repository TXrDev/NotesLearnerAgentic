export type NoteName = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export type Clef = 'treble' | 'bass';
export type Accidental = 'natural' | 'sharp' | 'flat';

export interface Note {
  name: NoteName;
  clef: Clef;
  accidental: Accidental;
}

export type KeyboardKey = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';
