import $ from "jquery";
import "slick-carousel";
import "./sass/style.scss";

// slider section
$(".slider").slick({
  autoplay: true
});

// progress bar section
$(document).ready(function() {
  const $slider = $(".slider");
  const $progressBar = $(".progress");
  const $progressBarLabel = $(".slider__label");

  $slider.on("beforeChange", function(event, slick, currentSlide, nextSlide) {
    const calc = (nextSlide / (slick.slideCount - 1)) * 100;

    $progressBar
      .css("background-size", calc + "% 100%")
      .attr("aria-valuenow", calc);

    $progressBarLabel.text(calc + "% completed");
  });

  $slider.slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 400
  });
});

// email section

const form = document.querySelector(".emailForm");
const input = document.querySelector(".input");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");
const text = document.querySelector(".textarea");
const url = "http://localhost:3000/users";

form.addEventListener("submit", handleEmailFormSubmit);
modal.addEventListener("click", handleModalClick);

function handleEmailFormSubmit(evt) {
  evt.preventDefault();
  const email = input.value.trim();
  if (email === "") return alert("Enter the email, please");

  const emailToAdd = {
    email
  };
  form.reset();

  fetch(url, {
    method: "POST",
    body: JSON.stringify(emailToAdd),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error("Error while fetching " + response.statusText);
    })
    .then(mail => {
      if (mail.status !== 201) {
        backdrop.classList.add("is-visible");
        text.value = "Input error!";
      } else {
        backdrop.classList.add("is-visible");
        text.value = `${mail} successfully registered`;
      }
    })
    .catch(error => {
      backdrop.classList.add("is-visible");
      text.value = error;
    });
}

function handleModalClick({ target }) {
  if (target.nodeName === "BUTTON") {
    backdrop.classList.remove("is-visible");
  }
}

window.onclick = function(event) {
  if (event.target !== modal) {
    backdrop.classList.remove("is-visible");
  }
};
