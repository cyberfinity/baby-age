import { DobForm } from "./dob-form";
import { AgeDisplay } from "./age-display";

function init() {
  try {
    const ageDisplay = new AgeDisplay(document.getElementById("age-display"));
    const dobForm = new DobForm(
      document.getElementById("dob-form"),
      ageDisplay.renderAge
    );
  }
  catch (err) {
    console.error("Init failed: ", err);
  }
}

if (document.readyState !== "loading") {
  init();
}
else {
  window.addEventListener("DOMContentLoaded", init);
}
