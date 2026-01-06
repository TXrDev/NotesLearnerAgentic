# Notes Learner Agentic

A simple and interactive web application designed to help users learn and practice reading musical notes.

## Features

- **Interactive Practice**: Displays random musical notes on a staff for you to identify.
- **Virtual Keyboard**: Use the on-screen piano keyboard to select the corresponding note.
- **Score Tracking**: Keeps track of your correct (+1) and incorrect (-1) answers.
- **Visual Feedback**: Real-time rendering of musical notation using VexFlow.

## Tech Stack

- **Frontend**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Music Notation**: [VexFlow](https://github.com/0xfe/vexflow)
- **Testing**: [Vitest](https://vitest.dev/)

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm (usually comes with Node.js)

### Installation

1.  Clone the repository.
2.  Navigate to the project directory:
    ```bash
    cd NotesLearnerAgentic
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

To start the development server:

```bash
npm run dev
```

Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

### Running Tests

To run the test suite:

```bash
npm run test
```

## Project Structure

```
NotesLearnerAgentic/
├── src/
│   ├── components/     # React components (Keyboard, Staff)
│   ├── utils/          # Utility functions for note generation and logic
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Entry point
├── public/
└── ...config files
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
