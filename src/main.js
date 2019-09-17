import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const callApi = async function(queryInput, nameInput){
  let query = queryInput;
  let name = nameInput;
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=wa-seattle&skip=0&limit=10&user_key=${process.env.API_KEY}&query=${query}&name=${name}`;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.send();

  });
  let apiData = promise.then(async function(response) {
    let content = JSON.parse(response);
    return content;
  }, async function(error) {
    return error;
  });
  return apiData;
}
const displayData = function(data){
  $(".output").text("");
  if(data.data.length === 0)
    $(".output").text("No results found.");
  for(let i = 0; i < data.data.length; i++){
    $(".output").append(data.data[i].profile.first_name + " " + data.data[i].profile.last_name + "<br>");
    $(".output").append(data.data[i].practices[0].visit_address.street + ", " + data.data[i].practices[0].visit_address.city + ", " + data.data[i].practices[0].visit_address.state + " " + data.data[i].practices[0].visit_address.zip + "<br>");
    $(".output").append("Phone number: " + data.data[i].practices[0].phones[0].number + "<br>");
    let newPatients = data.data[i].practices[0].accepts_new_patients ? 'Yes' : 'No';
    $(".output").append("Accepting new patients: " + newPatients);
    $(".output").append("<br><hr>");
  }
}
const displayError = function(data){
  $(".output").text(data);
}
//I think I might not be using promises correctly, because I need
// async in my function declarations and await in my function calls
// otherwise my functions return promise objects who's properties
// cannot be referenced
$(document).ready(function(){
  $(".mainform").submit(async function(event){
    event.preventDefault();
    let query = $("#medicalissue").val();
    let name = $("#doctorname").val();
    let data = await callApi(query,name);
    if(data.data)
      displayData(data);
    else
      displayError(data);
  });
});
