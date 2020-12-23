/**
 * Name: Thompson Ngo
 * Date: November 3, 2020
 * Section: CSE 154 AF
 *
 * This file controls the behavior of the index.html page. It fetches a random joke from The ICNDb
 * API and displays it on the page once the button is clicked.
 */
"use strict";

(function() {

  // Module-global constants
  const BASE_URL = "https://api.icndb.com";
  const RAND = "/jokes/random";
  const LIMIT = "?exclude=[explicit]";

  // Calls on init() function once the page DOM loads
  window.addEventListener("load", init);

  /**
   * Calls on the fetchJoke() function once the button with the "my-btn" id is clicked.
   */
  function init() {
    id("my-btn").addEventListener("click", fetchJoke);
  }

  /**
   * Makes modifications to the index.html page by displaying either a joke or an error message,
   * depending on whether or not the response passed into the checkStatus() function was successful
   * or not.
   */
  function fetchJoke() {
    let url = BASE_URL + RAND + LIMIT;
    if (id("text").textContent !== "") {
      while (id("text").firstChild) {
        id("text").removeChild(id("text").firstChild);
      }
    }
    fetch(url)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(displayJoke)
      .catch(handleRequestError);
  }

  /**
   * Displays the joke retrieved from The ICNDb API by appending a new p tag into the div tag with
   * the "text" id.
   * Inspiration from:
   * https://stackoverflow.com/questions/25443682/js-how-right-replace-quot-on-quotes
   * @param {object} jokeMsg - the JSON object that contains the joke which will be displayed.
   */
  function displayJoke(jokeMsg) {
    let newP = gen("p");
    newP.textContent = jokeMsg.value.joke.replace(/&quot;/g, '"');
    id("text").appendChild(newP);
  }

  /**
   * Handles the request error by displaying an error message in place of a joke. Appends a new p
   * tag containing the error message into the div tag with the "text" id.
   */
  function handleRequestError() {
    let errorMsg = gen("p");
    errorMsg.classList.add("error");
    errorMsg.textContent = "There was an error requesting data from The ICNDb";
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