"use strict";

// loader-code: wait until gmailjs has finished loading, before triggering actual extensiode-code.
const loaderId = setInterval(() => {
  if (!window._gmailjs) {
    return;
  }

  clearInterval(loaderId);
  getTitle();
  startExtension(window._gmailjs);
}, 100);

function startExtension(gmail) {
  console.log("Extension loading...");
  window.gmail = gmail;

  gmail.observe.on("load", () => {
    const userEmail = gmail.get.user_email();
    console.log("Hello, " + userEmail + ". This is your extension talking!");

    gmail.observe.on("view_email", (domEmail) => {
      console.log("Looking at email:", domEmail);
      const emailData = gmail.new.get.email_data(domEmail);
      getTitle();
      console.log("Email data:", emailData);
    });

    gmail.observe.on("compose", (compose) => {
      console.log("New compose window is opened!", compose);
    });
  });
}

function getTitle() {
  console.log("Title: " + window.document.title);
}
