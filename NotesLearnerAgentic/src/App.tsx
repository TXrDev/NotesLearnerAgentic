import { useState } from 'react';
import Staff from './components/Staff';
import Keyboard from './components/Keyboard';
import { Note, KeyboardKey } from './types';
import { generateRandomNote, noteToKeyboardKey } from './utils/noteUtils';

function App() {
  const [score, setScore] = useState(0);
  const [currentNote, setCurrentNote] = useState<Note>(() => generateRandomNote());

  const handleKeyPress = (pressedKey: KeyboardKey) => {
    const expectedKey = noteToKeyboardKey(currentNote);
    const isCorrect = pressedKey === expectedKey;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      setScore((prev) => prev - 1);
    }

    // Generate new note after answer
    setCurrentNote(generateRandomNote());
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 flex flex-col items-center space-y-6">
        {/* Score */}
        <div className="text-4xl font-bold text-gray-800" data-testid="score">
          {score}
        </div>

        {/* Staff */}
        <div className="w-full flex-1 flex items-center justify-center">
          <Staff note={currentNote} />
        </div>

        {/* Keyboard */}
        <Keyboard onKeyPress={handleKeyPress} />
      </div>
    </div>
  );
}

export default App;
