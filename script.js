// Select required DOM elements using querySelector
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// Array to store note objects in memory
let notes = [];

// Helper function to update the note count display
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

// Function to rebuild and render the notes list from the array
function render() {
  // Clear the existing list contents
  notesList.textContent = "";

  notes.forEach((note) => {
    // Create note card container
    const li = document.createElement("li");
    li.className = `note-card category-${note.category.toLowerCase()}`;

    // Category badge
    const headerDiv = document.createElement("div");
    headerDiv.className = "note-header-meta";

    const categoryBadge = document.createElement("span");
    categoryBadge.className = "category-badge";
    categoryBadge.textContent = note.category;
    headerDiv.appendChild(categoryBadge);

    // Note text
    const textP = document.createElement("p");
    textP.className = "note-text";
    textP.textContent = note.text; // Pure textContent prevents XSS

    // Footer containing date and Delete button
    const footerDiv = document.createElement("div");
    footerDiv.className = "note-footer-meta";

    const dateSpan = document.createElement("span");
    dateSpan.className = "note-date";
    dateSpan.textContent = note.createdAt;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    footerDiv.appendChild(dateSpan);
    footerDiv.appendChild(deleteBtn);

    // Assemble the complete note card
    li.appendChild(headerDiv);
    li.appendChild(textP);
    li.appendChild(footerDiv);

    notesList.appendChild(li);
  });

  updateCount();
}

// Handle form submission to add a new note
noteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const textValue = noteInput.value.trim();

  // Basic check to ensure input is not empty
  if (!textValue) return;

  // Create the note object with all required properties
  const newNote = {
    id: Date.now(),
    text: textValue,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString()
  };

  // Add the note object to the array (newest first)
  notes.unshift(newNote);

  // Re-render the UI
  render();

  // Clear the input field and reset focus
  noteInput.value = "";
  noteInput.focus();
});

// Initial render on page load
render();