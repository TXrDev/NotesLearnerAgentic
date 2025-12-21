import { useEffect, useRef } from 'react';
import { Renderer, Stave, StaveNote, Voice, Formatter, Accidental as VexAccidental } from 'vexflow';
import { Note } from '../types';
import { getAccidentalFromKeySignature } from '../utils/keySignatureUtils';

interface StaffProps {
  note: Note;
}

export default function Staff({ note }: StaffProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = '';

    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    renderer.resize(320, 200);
    const context = renderer.getContext();

    // Create stave
    const stave = new Stave(10, 40, 300);
    if (note.clef === 'treble') {
      stave.addClef('treble');
    } else {
      stave.addClef('bass');
    }
    
    // Add key signature
    stave.addKeySignature(note.keySignature);
    stave.setContext(context).draw();

    // Map note name to VexFlow note string
    const noteNameToVexFlow = (name: string, octave: number = 4): string => {
      return `${name}/${octave}`;
    };

    // Determine octave based on clef
    const octave = note.clef === 'treble' ? 4 : 3;

    // Create note
    const staveNote = new StaveNote({
      clef: note.clef,
      keys: [noteNameToVexFlow(note.name, octave)],
      duration: 'q',
    });

    // Determine if we need to show an explicit accidental
    // Show accidental only if it differs from what the key signature expects
    const keySigAccidental = getAccidentalFromKeySignature(note.name, note.keySignature);
    
    // If accidental is 'natural', it means "follow key signature", so no explicit accidental needed
    // (the key signature already shows what it should be)
    // If accidental is sharp/flat and differs from key signature, show explicit accidental
    // If accidental is sharp/flat and matches key signature, no explicit accidental needed
    const needsExplicitAccidental = 
      note.accidental !== 'natural' && note.accidental !== keySigAccidental;

    if (needsExplicitAccidental) {
      // Show explicit sharp or flat when it differs from key signature
      if (note.accidental === 'sharp') {
        staveNote.addModifier(new VexAccidental('#' as any), 0);
      } else if (note.accidental === 'flat') {
        staveNote.addModifier(new VexAccidental('b' as any), 0);
      }
    }

    // Create voice and format
    const voice = new Voice({ num_beats: 1, beat_value: 4 });
    voice.addTickables([staveNote]);

    new Formatter().joinVoices([voice]).format([voice], 270);
    voice.draw(context, stave);
  }, [note]);

  return (
    <div className="flex justify-center items-center py-4">
      <div ref={containerRef} className="overflow-hidden" />
    </div>
  );
}
