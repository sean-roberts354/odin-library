let books = {};

books['THE_BRIEF_AND_WONDROUS_LIFE_OF_OSCAR_WAO'] = new Book('The Brief and Wondrous Life of Oscar Wao', 'Junot Diaz', [], false);
books['DUNE'] = new Book('Dune', 'Frank Herbert', ['SciFi'], true);


function Book(title, author, tags, isRead) {
      this.title = title,
      this.author = author,
      this.tags = tags,
      this.isRead = isRead
}

function toggleReadStatus(book) {
      books[book].isRead = books[book].isRead !== true;
}

function toggleVisibilityModal() {
      document.querySelector(".modal-container").classList.toggle("hidden");
}

// Takes book title and create string which follows const naming convention which will later be used as object name of book to be stored in books array/object
function generateObjName(input) {
      let output = input.toUpperCase();
      output = output.replace(/\s/g, "_")

      return output;
}

// Converts tag input on form from string to array of words by first replacing any commas and trailing spaces with whitespace which is then used as the separator for string.split()
function convertTags(input) {
      let output = input.replace(/(,\s*)|(,)/g, " ")
      output = output.split(" ");

      return output;
}

function addNewBook(title, author, tags, isRead) {

      let newBook = generateObjName(title);
      books[newBook] = new Book(title, author, tags, isRead);

      let tr = document.createElement("tr");

      tr.appendChild(createBasicTdNode(books[newBook].title, "title"));
      tr.appendChild(createBasicTdNode(books[newBook].author, "author"));
      tr.appendChild(createTagsTdNode(books[newBook].tags));
      tr.appendChild(createStatusTdNode(books[newBook].isRead));

}

function createBasicTdNode(text, className) {
      let td = document.createElement("td");
      td.classList.add(className);
      td.textContent = text;

      return td;
}

function createTagsTdNode(tags) {
      let td = document.createElement("td");
      td.classList.add("tags");

      tags.forEach((tagName) => {
            let p = document.createElement("p");
            p.textContent = tagName;
            td.appendChild(p);
      })

      return td;
}

function createStatusTdNode(isRead) {
      let td = document.createElement("td");
      td.classList.add("status");

      let input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.setAttribute("name", "status");
      input.setAttribute("id", "status");

      if (isRead) {
            input.setAttribute("checked", "checked");
      }

      input.addEventListener('change', (e) => {
            // Finish
            console.log("changed");
      })

      td.appendChild(input);

      return td;
}



let deleteBookButtons = document.querySelectorAll("#deleteBook");

deleteBookButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
            console.log(e.target.parentNode.parentNode.cells[0].textContent);
      })
})

document.querySelector("#createNewBook").addEventListener('click', toggleVisibilityModal);


document.querySelector("#addNewBook").addEventListener('click', () => {
      let title = document.querySelector("#title").value;
      let author = document.querySelector("#author").value;
      let tags = convertTags(document.querySelector("#tags").value);
      let isRead = ((document.querySelector("input[name='status']:checked").value) === 'true');

      addNewBook(title, author, tags, isRead);
      toggleVisibilityModal();
})




/* 
      1. When pressing new book button, display form to enter book info
      2. After form is completed and submitted, create new book object and store info of book
      3. Hide new book form
      4. Create new <tr> node with a data-index attribute and populate each cell with info from book object
            -Title
            -Author
            -Tags
                  -Tags will be initially a string of comma-separated words that will need to be broken up into individual items and stored into an array
                  -Tags are represented as nested <p> elements on table
            -Status
                  -Form takes input as radio button but table will have it as check box. Will be stored as boolean isRead in object
            -Remove
                  -Remove button will have event listener which sends data-index attribute value of <tr> to function that will remove the node from the table, delete the book from the books array, and update the data-index attribute of all nodes
*/