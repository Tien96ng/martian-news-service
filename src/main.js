import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import NasaService from "./js/nasa-service.js";

const pictureOfTheDay = async () => {
  const response = await NasaService.aPod();
  if(!response.error) {
    $("#apod").append(`<h1>${response.title}</h1>`);
    $("#apod").append(`<p class="date">Taken on: ${response.date}</p>`);
    $("#apod").append(`<img src=${response.url} alt=${response.title}>`);
    $("#apod").append(`<p>${response.explanation}</p>`);
  } else {
    $("#apod").append(`<h1 class="error">${response}</h1>`);
  }
};

const marsNewsEndPoint = async () => {
  const response = await NasaService.getMarsWeather();
  const solKeys = response["sol_keys"];
  for(const [key, value] of Object.entries(response)) {
    if(solKeys.includes(key)) {
      let month =(new Date(Date.parse(value["First_UTC"]))).toString().slice(4, 7);
      let day = (new Date(Date.parse(value["First_UTC"]))).toString().slice(8, 10);
      let highTemp = (((value["PRE"]["mx"]) / 20) * -1).toFixed(2);
      let lowTemp = (((value["PRE"]["mn"]) / 6) * -1).toFixed(2);


      $(".row").append(`
        <div class=col-sm>
          Sol ${key} <br>
          ${month}. ${day}
          <hr>
          High: ${highTemp}&#8457; <br>
          Low: ${lowTemp}&#8457; <br>
        </div>
      `);
    }
  }
};

const marsRoverPictures = async (date) => {
  const response = await NasaService.getMarsRoverPictures(date);
  if(response["photos"].length === 0) {
    $("#rover-results").append("<h3 class='error'>No Mars Rover photos for this date.</h3>");
  } else {
    response["photos"].forEach(pic => {
      $("#rover-results").append(`<img src=${pic.img_src} alt=${pic.id + " " + pic.sol}>`);
    });
  }
};

$(document).ready(() => {
  pictureOfTheDay();
  marsNewsEndPoint();
  $("#rover-date").submit(event => {
    event.preventDefault();
    const date = $("#date").val();
    marsRoverPictures(date);
  });
});
