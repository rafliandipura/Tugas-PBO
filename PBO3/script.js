document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let editMode = false; 
    let currentEditId = null; 

    const initUI = () => {
        app.innerHTML = `
            <div class="d-flex justify-content-between">
                <h2 class="text-center">Library Management</h2>
                <div>
                    <button id="themeToggle" class="btn btn-dark">Dark Mode</button>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookModal">Add Book</button>
                </div>
            </div>

            <div class="my-3">
                <input type="text" id="searchInput" class="form-control" placeholder="Search books...">
            </div>

            <div class="row" id="bookList"></div>

            <!-- Modal for Add/Edit Book -->
            <div class="modal fade" id="bookModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalLabel">Add Book</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="bookForm">
                                <div class="mb-3">
                                    <label for="bookTitle" class="form-label">Book Title</label>
                                    <input type="text" class="form-control" id="bookTitle" required>
                                </div>
                                <div class="mb-3">
                                    <label for="bookAuthor" class="form-label">Author</label>
                                    <input type="text" class="form-control" id="bookAuthor" required>
                                </div>
                                <div class="mb-3">
                                    <label for="bookCover" class="form-label">Book Cover (URL)</label>
                                    <input type="text" class="form-control" id="bookCover" placeholder="Paste image URL here">
                                    <img id="previewImage" src="" alt="Preview" class="mt-3 img-fluid d-none" style="max-height: 200px;">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="saveBookBtn">Save Book</button>
                        </div>
                    </div>
                </div>
            </div>
        `;


        document.getElementById("saveBookBtn").addEventListener("click", saveOrUpdateBook);
        document.getElementById("searchInput").addEventListener("keyup", searchBooks);
        document.getElementById("bookCover").addEventListener("input", previewCover);
        document.getElementById("themeToggle").addEventListener("click", toggleTheme);

 
        displayBooks();
    };


    const displayBooks = (filteredBooks = books) => {
        const bookList = document.getElementById("bookList");
        bookList.innerHTML = ""; // Clear the list
        filteredBooks.forEach(book => {
            const card = document.createElement("div");
            card.classList.add("col-md-4", "mb-4");
            card.innerHTML = `
                <div class="card h-100">
                    <img src="${book.cover || 'default-cover.jpg'}" class="card-img-top" alt="Book Cover">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Author: ${book.author}</p>
                        <button class="btn btn-warning btn-sm me-2" onclick="editBook(${book.id})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteBook(${book.id})">Delete</button>
                    </div>
                </div>
            `;
            bookList.appendChild(card);
        });
    };


    const saveOrUpdateBook = () => {
        const title = document.getElementById("bookTitle").value;
        const author = document.getElementById("bookAuthor").value;
        const cover = document.getElementById("bookCover").value;

        if (!title || !author) {
            Toastify({ text: "Please fill out all fields!", backgroundColor: "red" }).showToast();
            return;
        }

        if (editMode) {

            const bookIndex = books.findIndex(book => book.id === currentEditId);
            books[bookIndex] = { id: currentEditId, title, author, cover: cover || null };
            Toastify({ text: "Book Updated Successfully!", backgroundColor: "blue" }).showToast();
            editMode = false; 
        } else {
            const newBook = {
                id: Date.now(),
                title,
                author,
                cover: cover || null
            };
            books.push(newBook);
            Toastify({ text: "Book Added Successfully!", backgroundColor: "green" }).showToast();
        }

        localStorage.setItem("books", JSON.stringify(books));
        displayBooks();
        clearForm();


        const modal = bootstrap.Modal.getInstance(document.getElementById("bookModal"));
        modal.hide();
    };

  
    const clearForm = () => {
        document.getElementById("bookForm").reset();
        document.getElementById("previewImage").classList.add("d-none");
        document.getElementById("saveBookBtn").textContent = "Save Book"; 
    };


    const searchBooks = () => {
        const query = document.getElementById("searchInput").value.toLowerCase();
        const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query));
        displayBooks(filteredBooks);
    };

    
    const previewCover = () => {
        const coverUrl = document.getElementById("bookCover").value;
        const previewImage = document.getElementById("previewImage");
        if (coverUrl) {
            previewImage.src = coverUrl;
            previewImage.classList.remove("d-none");
        } else {
            previewImage.classList.add("d-none");
        }
    };

  
    const toggleTheme = () => {
        document.body.classList.toggle("dark-mode");
        const themeBtn = document.getElementById("themeToggle");
        themeBtn.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
    };

    window.deleteBook = (id) => {
        const confirmed = confirm("Are you sure you want to delete this book?");
        if (confirmed) {
            books = books.filter(book => book.id !== id);
            localStorage.setItem("books", JSON.stringify(books));
            displayBooks();
            Toastify({ text: "Book Deleted Successfully!", backgroundColor: "red" }).showToast();
        }
    };

    window.editBook = (id) => {
        editMode = true;
        currentEditId = id;
        const book = books.find(book => book.id === id);
        document.getElementById("bookTitle").value = book.title;
        document.getElementById("bookAuthor").value = book.author;
        document.getElementById("bookCover").value = book.cover || "";
        document.getElementById("previewImage").src = book.cover || "";
        document.getElementById("previewImage").classList.remove("d-none");
        document.getElementById("saveBookBtn").textContent = "Update Book";


        const modal = new bootstrap.Modal(document.getElementById("bookModal"));
        modal.show();
    };


    initUI();
});
