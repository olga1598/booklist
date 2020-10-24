console.log("inside app.js");

class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    showMessage(msg, className){
        // Grab parent element
        const parentEl = document.querySelector(".container");

        //Grab sibling element above which to display
        const form = document.querySelector(".book-form");

        // Create new elenemt to hold the message
        const div = document.createElement("div");

        // Add class
        div.className = `alert ${className}`;

        // Add content
        div.textContent = msg;
        // Add text - another approach
        // div.appendChild(document.createTextNode(message));

        // Append new element
        parentEl.insertBefore(div, form);

        // Set timeout for 3 sec
        setTimeout(function(){
            div.remove();
        }, 3000)
    }

    addBook(title, author, isbn){
        const list = document.querySelector("#book-list");

        // Create tr - new row element
        const row = document.createElement("tr");

        // Add content to new row
        row.innerHTML = `
            <td>${title}</td>
            <td>${author}</td>
            <td>${isbn}</td> 
            <td><a class="delete" href="#">X</a></td>   
        `
        // Append new row to the table to display
        list.appendChild(row);
    }

    clearFields(){
        // Grab the form fields to bed cleared
        const title = document.querySelector("#title"),
              author = document.querySelector("#author"),
              isbn = document.querySelector("#isbn");

        // Clear the fields
        title.value = "";
        author.value = "";
        isbn.value = "";   
    }

    deleteBook(target){
        if (target.className === "delete"){
            target.parentElement.parentElement.remove();
        }
    }
}

// Add book
document.querySelector(".book-form").addEventListener("submit", function(e){
    // Grab the form fields
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    // Instantiate book (создать экземпляр)
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate the form
    if( title === "" || author === "" || isbn === ""){
        ui.showMessage("Please fill up all the fields", "error");
    } else {
        // Add book to list below form
        ui.addBook(title, author, isbn);

        // Show success message
        ui.showMessage("The book added successfully", "success");

        // Clear the form fields
        ui.clearFields();
    }

    e.preventDefault();
})

// Delete book from the book list
document.querySelector("#book-list").addEventListener("click", function(e){
    // Instantiate UI
    const ui = new UI();

    ui.deleteBook(e.target);

    e.preventDefault();

})
