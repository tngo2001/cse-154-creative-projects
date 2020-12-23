/**
 * Name: Thompson Ngo
 * Date: November 16, 2020
 * Section: CSE 154 AF
 *
 * This file controls the behavior of the index.html page. It sends a number in either degrees
 * Fahrenheit or degrees Celsius to app.js, which then gets converted to the opposite unit, sent
 * back, and displayed on the page.
 */
"use strict";

(function() {

  // Calls on init() function once the page DOM loads
  window.addEventListener("load", init);

  /**
   * Calls on the convertTo() function and clears the text.
   */
  function init() {
    id("my-btn").addEventListener("click", function() {
      if (id("text").textContent !== "") {
        while (id("text").firstChild) {
          id("text").removeChild(id("text").firstChild);
        }
      }
      convertTo();
    });
  }

  /**
   * Calls on the toCelsius() function if the user selects "Convert to: Celsius", calls on the
   * toFahrenheit() function if the user selects "Convert to: Fahrenheit", and displays an error
   * message if the user selects or types nothing.
   */
  function convertTo() {
    let userInput = id("user-input").value;
    let userSelection = id("units").value;
    if (userInput === "" || userSelection === "default") {
      let errorMsg = gen("p");
      errorMsg.textContent = "Error: Please make sure you type in a value and select an option.";
      id("text").appendChild(errorMsg);

    // Inspiration from: https://www.w3schools.com/jsref/prop_checkbox_checked.asp
    } else if (userSelection === "degreesF") {
      id("celsius").checked = true;
      toFahrenheit();
    } else {
      id("fahrenheit").checked = true;
      toCelsius();
    }
  }

  /**
   * Sends a number in degrees Celsius to app.js, which then gets converted to degrees Fahrenheit
   * and passed into the displayResult() function.
   */
  function toFahrenheit() {
    let params = new FormData(id("input-form"));
    fetch('/toFahrenheit', {method: "POST", body: params})
      .then(checkStatus)
      .then(resp => resp.text())
      .then(displayResult)
      .catch(handleRequestError);
  }

  /**
   * Sends a number in degrees Fahrenheit to app.js, which then gets converted to degrees Celsius
   * and passed into the displayResult() function.
   */
  function toCelsius() {
    let params = new FormData(id("input-form"));
    fetch('/toCelsius', {method: "POST", body: params})
      .then(checkStatus)
      .then(resp => resp.json())
      .then(displayResult)
      .catch(handleRequestError);
  }

  /**
   * Displays the converted number sent from app.js under the "Convert" button.
   * @param {object} result - the JSON object that contains the converted number.
   */
  function displayResult(result) {
    let newP = gen("p");
    if (id("units").value === "degreesC") {
      newP.textContent = result.output;
    } else {
      newP.textContent = result;
    }
    id("text").appendChild(newP);
  }

  /**
   * Handles the request error by displaying an error message in place of the converted number.
   * Appends a new p tag containing the error message into the div tag with the "text" id.
   */
  function handleRequestError() {
    let errorMsg = gen("p");
    errorMsg.textContent = "Error: There was an error requesting data from the API.";
    id("text").appendChild(errorMsg);
  }

  /** ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Throws an error if the fetch response status is not ok before processing the data. Otherwise,
   * returns the response passed in if the response was a success.
   * @param {object} res - a response that will either be a success or an error when passed in.
   * @throws Will throw an Error if the fetch response status is not ok before processing the
   * data.
   * @returns {object} res - the response passed in if the response was a success.
   */
  async function checkStatus(res) {
    if (!res.ok) {
      return new Error(await res.text());
    }
    return res;
  }

})();