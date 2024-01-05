
function deleteTrack(trackID) {
    console.log("track is deleting???")
    // Put our data we want to send in a javascript object
    let data = {
        id: trackID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-track-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(trackID);
            
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(trackID){

    let table = document.getElementById("track-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == trackID) {
            table.deleteRow(i);
            deleteDropDownMenu(trackID);
            break;
       }
    }
}

function deleteDropDownMenu(trackID){
  console.log("deleting from drop down menu for tracks")
  let selectMenu = document.getElementById("mySelectTrackUpdateTrack");
  for (let i = 0; i < selectMenu.length; i++){
    if (Number(selectMenu.options[i].value) === Number(trackID)){
      selectMenu[i].remove();
      break;
    } 

  }
}