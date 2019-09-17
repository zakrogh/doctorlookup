import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const callApi = async function(){
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=wa-seattle&skip=0&limit=10&user_key=${process.env.API_KEY}`;
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
  }, function(error) {
    console.log("error");
  });
  return apiData;
}

$(document).ready(async function(){
  let data = await callApi();
  console.log(data);
});
