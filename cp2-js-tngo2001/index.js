/**
 * Name: Thompson Ngo
 * Date: October 19, 2020
 * Section: CSE 154 AF
 *
 * This file controls the behavior of the index.html page. It takes in the user's question as a
 * parameter and returns an answer.
 */
"use strict";

(function() {
  const OPTIONS = ["As I see it, yes.", "Ask again later.", "Better not tell you now.",
  "Cannot predict now.", "Concentrate and ask again.", "Don’t count on it.", "It is certain.",
  "It is decidedly so.", "Most likely.", "My reply is no.", "My sources say no.",
  "Outlook not so good.", "Outlook good.", "Reply hazy, try again.", "Signs point to yes.",
  "Very doubtful.", "Without a doubt.", "Yes.", "Yes – definitely.", "You may rely on it."];

  window.addEventListener("load", init);

  /**
   * This function makes the question box empty when it is clicked and it displays text in the
   * speech box once the button is clicked. Once the button is clicked, either the error message
   * or one of the strings in the OPTIONS array will be displayed, depending on if the user's input
   * had a question mark or not. On the latter condition, the image at the bottom will shake.
   */
  function init() {
    const BOX = id("question");

    // Inspiration From: https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event
    BOX.addEventListener('click', function() {
      BOX.value = "";
    });
    id("my-btn").addEventListener('click', function() {
      const RAND = Math.floor(Math.random() * OPTIONS.length);
      if (BOX.value.includes("?")) {
        const MESSAGE_ONE = OPTIONS[RAND];
        getAnswer(MESSAGE_ONE);
        BOX.value = "";

        // Inspiration From: https://teamtreehouse.com/community/shake-effect-with-javascript-only
        const SHAKE = document.getElementsByTagName("img")[0];
        SHAKE.classList.toggle("ball", true);
        SHAKE.addEventListener('animationend', function() {
          SHAKE.classList.toggle("ball", false);
        });
      } else {
        const MESSAGE_TWO = "ERROR: This question is missing a '?'.";
        getAnswer(MESSAGE_TWO);
        BOX.value = "";
      }
    });
  }

  /**
   * This function replaces the original message in the speech box with the error message or one of
   * the strings in the OPTIONS array.
   * Inspiration From: https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild
   * @param {string} answer - Either the error message or one of the strings in the OPTIONS array.
   */
  function getAnswer(answer) {
    const BEFORE = id("speech");
    let parent = BEFORE.parentNode;
    let after = document.createElement("p");
    after.id = "speech";
    const TEXT = document.createTextNode(answer);
    after.appendChild(TEXT);
    parent.replaceChild(after, BEFORE);
  }

  /** ------------------------------ Helper Function ------------------------------ */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

})();