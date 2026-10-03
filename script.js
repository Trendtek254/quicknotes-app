
    // Select DOM elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// State: Array to hold note objects
let notes = [];

// Helper to update the note count display
function updateCount() {
  const count = notes.length;
  if (count === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (count === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }
}

// Function to delete a note by ID
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  render();
}

// Function to rebuild and render the notes list from the array
function render() {
  // Clear the current list content
  notesList.textContent = "";

  notes.forEach((note) => {
    // Note card item
    const li = document.createElement("li");
    li.className = `note-card category-${note.category.toLowerCase()}`;

    // Header metadata: Category badge
    const headerDiv = document.createElement("div");
    headerDiv.className = "note-header-meta";

    const categoryBadge = document.createElement("span");
    categoryBadge.className = "category-badge";
    categoryBadge.textContent = note.category;
    headerDiv.appendChild(categoryBadge);

    // Body text
    const textP = document.createElement("p");
    textP.className = "note-text";
    textP.textContent = note.text; // Text content safely escapes user input

    // Footer metadata: Timestamp and working Delete button
    const footerDiv = document.createElement("div");
    footerDiv.className = "note-footer-meta";

    const dateSpan = document.createElement("span");
    dateSpan.className = "note-date";
    dateSpan.textContent = note.createdAt;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    
    // Attach click handler to remove this specific note
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    footerDiv.appendChild(dateSpan);
    footerDiv.appendChild(deleteBtn);

    // Assemble card
    li.appendChild(headerDiv);
    li.appendChild(textP);
    li.appendChild(footerDiv);

    notesList.appendChild(li);
  });

  // Always update the counter after rendering
  updateCount();
}

// Form submission handler with input validation
noteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const rawText = noteInput.value;
  const trimmedText = rawText.trim();

  // 1. Validation Check: Empty or only whitespace
  if (trimmedText === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  // 2. Validation Check: Over 200 characters
  if (trimmedText.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  // Clear validation error when a valid note is added
  errorMessage.textContent = "";

  // Create new note object
  const newNote = {
    id: Date.now(),
    text: trimmedText,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString()
  };

  // Add to array and re-render
  notes.unshift(newNote);
  render();

  // Reset form input
  noteInput.value = "";
  noteInput.focus();
});

// Initial render call
render();