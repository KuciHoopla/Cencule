import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  constructor() {}

  weatherData: any;

  ngOnInit() {
    this.weatherData = {
      current: {
        condition: {}
      }
    };
    this.getWeather();
  }

  getWeather() {
    fetch(
      'https://weatherapi-com.p.rapidapi.com/forecast.json?days=3&q=Kosice%252C%20SK',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
          'x-rapidapi-key':
            '989806a265msh14bef2e64d0f1e9p18a636jsne79d8efd34ae',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.weatherData = data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
