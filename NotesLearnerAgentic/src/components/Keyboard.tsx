import { KeyboardKey } from '../types';

interface KeyboardProps {
  onKeyPress: (key: KeyboardKey) => void;
}

const WHITE_KEYS: KeyboardKey[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const BLACK_KEYS: (KeyboardKey | null)[] = ['C#', 'D#', null, 'F#', 'G#', 'A#', null];

export default function Keyboard({ onKeyPress }: KeyboardProps) {
  const handleKeyClick = (key: KeyboardKey) => {
    onKeyPress(key);
  };

  return (
    <div className="flex justify-center items-end pb-4">
      <div className="relative" style={{ width: '280px', height: '120px' }}>
        {/* White keys */}
        <div className="flex">
          {WHITE_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyClick(key)}
              className="bg-white border border-gray-300 rounded-b-md shadow-sm active:bg-gray-200 hover:bg-gray-50 transition-colors"
              style={{
                width: '40px',
                height: '120px',
                zIndex: 1,
                position: 'relative',
              }}
              data-testid={`key-${key}`}
            >
              <span className="text-xs text-gray-600 mt-auto pb-2 block">
                {key}
              </span>
            </button>
          ))}
        </div>

        {/* Black keys */}
        <div className="absolute top-0 left-0 flex">
          {BLACK_KEYS.map((key, index) => {
            if (!key) return <div key={`spacer-${index}`} style={{ width: '40px' }} />;
            
            return (
              <button
                key={key}
                onClick={() => handleKeyClick(key)}
                className="bg-gray-800 text-white rounded-b-md active:bg-gray-900 hover:bg-gray-700 transition-colors"
                style={{
                  width: '28px',
                  height: '75px',
                  marginLeft: index === 0 ? '26px' : index === 3 ? '14px' : '12px',
                  zIndex: 2,
                  position: 'relative',
                }}
                data-testid={`key-${key}`}
              >
                <span className="text-xs mt-auto pb-1 block">
                  {key.replace('#', '♯')}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
