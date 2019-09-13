import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function(){
  // let promise = new Promise(function(resolve, reject) {
  //   let request = new XMLHttpRequest();
  //   let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=wa-seattle&skip=0&limit=10&user_key=${process.env.API_KEY}`;
  //   request.onload = function() {
  //     if (this.status === 200) {
  //       resolve(request.response);
  //     } else {
  //       reject(Error(request.statusText));
  //     }
  //   }
  //   request.open("GET", url, true);
  //   request.send();
  // });
  // promise.then(function(response) {
  //   let body = JSON.parse(response);
  //   console.log(body);
  // }, function(error) {
  //   console.log("error");
  // });
});
