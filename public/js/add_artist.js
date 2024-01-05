
// Get the objects we need to modify
let addArtistForm = document.getElementById('add-artist-form-ajax');

var field = document.querySelector('[name="username"]');


// Modify the objects we need
addArtistForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputArtistName = document.getElementById("input-artistName");
    let inputGenre = document.getElementById("input-genre");
    let inputLocation = document.getElementById("input-location");
    let inputImageURL = document.getElementById("input-imageURL");
    let inputPassword = document.getElementById("input-password");

    // Get the values from the form fields
    let artistNameValue = inputArtistName.value;
    let genreValue = inputGenre.value;
    let locationValue = inputLocation.value;
    let imageURLValue = inputImageURL.value;
    let passwordValue = inputPassword.value;

    // Put our data we want to send in a javascript object
    let data = {
        artistName: artistNameValue,
        genre: genreValue,
        location: locationValue,
        imageURL: imageURLValue, 
        password: passwordValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", '/add-artist-ajax', true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputArtistName = '';
            inputGenre = '';
            inputLocation = '';
            inputImageURL ='';
            inputPassword = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from entity. 
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("artist-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let artistNameCell = document.createElement("TD");
    let genreCell = document.createElement("TD");
    let locationCell = document.createElement("TD");
    let imageURLCell = document.createElement("TD");
    let passwordCell = document.createElement("TD");
    let img = document.createElement("img");

    let deleteCell = document.createElement("TD");
    // Fill the cells with correct data
    idCell.innerText = newRow.artistID;
    artistNameCell.innerText = newRow.artistName;
    genreCell.innerText = newRow.genre;
    locationCell.innerText = newRow.location;
    img.src = newRow.imageURL;
    img.alt = newRow.artistName;
    imageURLCell.appendChild(img);
    passwordCell.innerText = newRow.password;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteArtist(newRow.artistID);
    };
    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(artistNameCell);
    row.appendChild(genreCell);
    row.appendChild(locationCell);
    row.appendChild(imageURLCell);
    row.appendChild(passwordCell);
     row.appendChild(deleteCell);
    
    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.artistID);
    
    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.artistName;
    option.value = newRow.artistID;
    selectMenu.add(option);

}