# QuickNotes App

QuickNotes is a lightweight, responsive web application designed for capturing, organizing, and managing daily notes, ideas, and reminders effortlessly across different categories.

## Features
- **Category Tagging**: Organize notes into Personal, Work, or Study categories, each visually identified with distinct colored card borders.
- **Real-Time Input Validation**: Enforces note length constraints (1–200 characters) with dynamic inline error messaging.
- **Search & Filter**: Instant case-insensitive text search across all saved notes.
- **Data Persistence**: Uses browser `localStorage` to automatically save and load notes across page refreshes.
- **Responsive Design**: Built with CSS Flexbox and media queries for a seamless user experience on both mobile devices and desktop screens.
- **Bulk Note Clearance (Bonus)**: Includes a "Clear all" button with user confirmation dialog to erase all saved notes at once.

## How to Run Locally
1. Clone this repository or download the source files:
   ```bash
   git clone [https://github.com/your-username/quicknotes-app.git](https://github.com/your-username/quicknotes-app.git)
2. Navigate into the project folder:

 Bash
  cd quicknotes-app
3. Open index.html directly in any standard web browser (or serve using a tool like VS Code Live Server).

What I Learned
-***DOM Manipulation without innerHTML***: Rebuilding elements programmatically using document.createElement() and assigning values with .textContent ensures security against XSS vulnerabilities while dynamically displaying user inputs.

-***State Management & LocalStorage Persistence***: Structuring app state using an array of JavaScript objects and keeping it synchronized with localStorage via JSON.stringify and JSON.parse.

-***Responsive Flexbox Layouts***: Implementing clean component layouts that smoothly convert from inline flex containers on desktop to full-width stacked components on mobile devices using CSS media queries.