

const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllBtn = document.querySelector("#clear-all-btn");


let notes = JSON.parse(localStorage.getItem("quicknotes_data")) || [];


function saveNotes() {
  localStorage.setItem("quicknotes_data", JSON.stringify(notes));
}


function updateCount(count = notes.length) {
  if (count === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (count === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }
}


function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  handleSearch();
}
function render(filteredNotes = notes) {
     notesList.textContent = "";

  if (filteredNotes.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.className = "empty-message";

    if (notes.length === 0) {
      emptyLi.textContent = "No notes created yet. Add one above!";
    } else {
      emptyLi.textContent = "No notes match your search.";
    }

    notesList.appendChild(emptyLi);
    updateCount(filteredNotes.length);
    return;
  }

  filteredNotes.forEach((note) => {
    const li = document.createElement("li");
    li.className = `note-card category-${note.category.toLowerCase()}`;

    
    const headerDiv = document.createElement("div");
    headerDiv.className = "note-header-meta";

    const categoryBadge = document.createElement("span");
    categoryBadge.className = "category-badge";
    categoryBadge.textContent = note.category;
    headerDiv.appendChild(categoryBadge);

    
    const textP = document.createElement("p");
    textP.className = "note-text";
    textP.textContent = note.text;

    
    const footerDiv = document.createElement("div");
    footerDiv.className = "note-footer-meta";

    const dateSpan = document.createElement("span");
    dateSpan.className = "note-date";
    dateSpan.textContent = note.createdAt;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    footerDiv.appendChild(dateSpan);
    footerDiv.appendChild(deleteBtn);

    
    li.appendChild(headerDiv);
    li.appendChild(textP);
    li.appendChild(footerDiv);

    notesList.appendChild(li);
  });

  updateCount(filteredNotes.length);
}


noteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const rawText = noteInput.value;
  const trimmedText = rawText.trim();

  if (trimmedText === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (trimmedText.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const newNote = {
    id: Date.now(),
    text: trimmedText,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString()
  };

  notes.unshift(newNote);
  saveNotes();
  
  searchInput.value = "";
  render();

  noteInput.value = "";
  noteInput.focus();
});


function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();
  const matchedNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(query)
  );
  render(matchedNotes);
}

searchInput.addEventListener("input", handleSearch);


if (clearAllBtn) {
  clearAllBtn.addEventListener("click", () => {
    if (notes.length === 0) return;

    const confirmDelete = confirm("Delete all notes?");
    if (confirmDelete) {
      notes = [];
      saveNotes();
      render();
      errorMessage.textContent = "";
    }
  });
}


render();