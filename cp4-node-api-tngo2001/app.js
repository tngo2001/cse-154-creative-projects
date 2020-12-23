/**
 * Name: Thompson Ngo
 * Date: November 16, 2020
 * Section: CSE 154 AF
 *
 * This file receives a number in either degrees Fahrenheit or degrees Celsius from index.js and
 * sends back the number, but converted to the opposite unit. If the number sent was in degrees
 * Fahrenheit, a number in degrees Celsius will be sent back to index.js and vice versa.
 */
"use strict";

// Module-global constants
const express = require('express');
const app = express();

// other required modules
const multer = require("multer");

// for application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true})); // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
// for multipart/form-data (required with FormData)
app.use(multer().none()); // requires the "multer" module

/**
 * Receives a number in degrees Celsius from index.js, converts that number to degrees Fahrenheit,
 * and sends back the result.
 */
app.post('/toFahrenheit', function(req, res) {
  if (req.body.num) {
    let celsius = parseFloat(req.body.num);
    let fahrenheit = (celsius * (9 / 5)) + 32;
    fahrenheit = roundNum(fahrenheit);
    res.type('text').send("Result: " + fahrenheit.toString() + " degrees Fahrenheit");
  } else {
    res.type('text').status(400)
      .send("Error: Missing required parameter.");
  }
});

/**
 * Receives a number in degrees Fahrenheit from index.js, converts that number to degrees Celsius,
 * and sends back the result.
 */
app.post('/toCelsius', function(req, res) {
  if (req.body.num) {
    let fahrenheit = parseFloat(req.body.num);
    let celsius = (fahrenheit - 32) * (5 / 9);
    celsius = roundNum(celsius);
    res.json({"output": "Result: " + celsius.toString() + " degrees Celsius"});
  } else {
    res.status(400).json({"output": "Error: Missing required parameter."});
  }
});

/**
 * Takes a number in either degrees Celsius or degrees Fahrenheit and rounds it to two decimal
 * places if needed.
 * @param {Integer} num - a number in either degrees Celsius or degrees Fahrenheit.
 * @returns {Integer} the given number rounded to two decimal places.
 */
function roundNum(num) {
  return Math.round(num * 100) / 100;
}

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);