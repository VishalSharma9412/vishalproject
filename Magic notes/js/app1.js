 
console.log("Welcome to notes app. This is app.js");
showNotes(); // so that whenever we open the app / reload it, then all the old saved notes lso show up

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");    // selected the button
addBtn.addEventListener("click", function(e) {      // added event Listner to the button so that when we click it the content in the textarea gets pushed to the notes
  let addTxt = document.getElementById("addTxt");    // gets the element with id ="addtxt"
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");         // puts the value in the notes variable  from the textarea with id ="addTxt"
  if (notes == null) {    // if we dont have anything in notes
    notesObj = [];            // changed to notesOnj as to save in the array form and as array is a form of OBJECT datatype
  } else {
    notesObj = JSON.parse(notes);      // to change from string to array obj form to make in readable
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  } 
  notesObj.push(myObj);    //  now we have pushed title & textarea to the myObj object
  //notesObj.push(addTxt.value);         // to push the value of the addTxt to the notesObj
  localStorage.setItem("notes", JSON.stringify(notesObj));   // now updating the local storage with the new elements from the notesObj
  // we used stringyfy again to change the JS obj to string again so as to save in the local storage as in local storage onlt string dataType is saved.
  addTxt.value = "";        //  to blank the main textarea box again so as to enter new data                   
  //   console.log(notesObj);
  addTitle.value = "";
  showNotes();       // function to show notes in saved notes area by running the below defined function
});



// Function to show elements from localStorage
// The main work of function "showNotes()" is to read all the notes from the local storage and display in the saved notes column (in the div with id = "div")
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }


  // Dynamically creating the HTML for the boxes through JavaScript
  let html = "";
  notesObj.forEach(function(element, index) {                         // for each loop to add/remove boxes one by one
     //  html += `` --> means that hmtl plus(append) the data in the Small card 
     // creation of small notes boxs through JavaScript
    html += ` 
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title"> ${element.title}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;

                // onclick="deleteNote(this.id)" ---> once we click the delete button then the id = ${index} of that button box get pushed in the delete function and runs
  });

  // Situation ----> when there are no saved notes in the DOM
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }


  // For the removal of the deleted notes from the DOM
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));       // updating the notes in the local storage with the help of the notesObj after the notes are deleted 
  showNotes();                                                   // for showing the remaining notes again
}

// For the search option of the notes
let search = document.getElementById('searchTxt');      // for the selection of the search button
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();          // to put the search content in the inputVal
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');    // to select all the saved notes card 
    Array.from(noteCards).forEach(function(element){                    // as the for each loop works in the array only 
        let cardTxt = element.getElementsByTagName("p")[0].innerText;         // to search the content search with the content in the para tag of the saved notes card
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";                               // show the matched card
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})

 