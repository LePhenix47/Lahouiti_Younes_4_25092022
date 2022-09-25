// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

const icon = document.querySelector(".icon");

icon.addEventListener("click", editNav);

function editNav(e) {
  e.preventDefault();
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// Giving the event to each button
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//Part 1 Fixing the modal
function launchModal() {
  modalbg.classList.replace("hide", "show-center-flex");
  const closeModalButton = document.querySelector(".close");

  closeModalButton.addEventListener("click", closeModal);
}

function closeModal() {
  modalbg.classList.add("close-modal");

  setTimeout(() => {
    modalbg.classList.replace("show-center-flex", "hide");
    modalbg.classList.remove("close-modal");
  }, 800);
}

//Part 2 handling the form
const form = document.querySelector(".form");

const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const dateOfBirthInput = document.getElementById("birthdate");
const quantityInput = document.getElementById("quantity");

let inputsArray = [
  firstNameInput,
  lastNameInput,
  emailInput,
  dateOfBirthInput,
  quantityInput,
];

let radioButtonsNodeList = document.querySelectorAll(
  ".formData:nth-child(7)>input"
);
let radioButtonsArray = Array.from(radioButtonsNodeList);

for (radioButton of radioButtonsArray) {
  radioButton.addEventListener("input", handleInputs);
}

//Stocking the values inputted by the user inside variables to verify them
let valueOfFirstName = "";
let valueOfLastName = "";
let valueOfEmail = "";
let valueOfDateOfBirth = new Date(0);
let valueOfQuantity = 0;
let valueOfLocation = "";

let atLeastOneRadioButtonIsChecked = 0;

//Using global values to avoid local scope related issues
let difference = 0;
let ageOfUserInYears = 0;
let isUserOverEighteen = false;

let emailRegex =
  /^([a-z A-Z 0-9\.-]+)@([a-z A-Z 0-9]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

const formDataValidation = {
  first: false,
  last: false,
  email: false,
  dateOfBirth: false,
  quantity: false,
  location: false,
};

for (input of inputsArray) {
  input.addEventListener("change", handleInputs);
  input.addEventListener("blur", handleInputs);
}

function handleInputs() {
  console.log(this);
  const nameAttributeOfInput = this.getAttribute("name");

  switch (nameAttributeOfInput) {
    case "first": {
      console.log("first name");
      verifyName(this, nameAttributeOfInput);
      console.log(formDataValidation);
      break;
    }

    case "last": {
      console.log("last name");
      verifyName(this, nameAttributeOfInput);
      console.log(formDataValidation);

      break;
    }
    case "email": {
      console.log("email");
      verifyEmail(this);
      console.log(formDataValidation);

      break;
    }

    case "birthdate": {
      console.log("birthdate");
      verifyDateOfBirth(this);
      console.log(formDataValidation);
      break;
    }

    case "quantity": {
      console.log("quantity");
      verifyQuantity(this);
      console.log(formDataValidation);
      break;
    }

    case "location": {
      console.log(this);
      verifyLocation(this);
      console.log("click");
      break;
    }
  }
}

function verifyName(inputElement, nameAttributeOfInput) {
  let valueOfInput = inputElement.value;
  let inputIsFilled = valueOfInput !== "";
  let inputIsOverTwoCharactersLong = valueOfInput.length >= 2;

  console.log({ nameAttributeOfInput });

  if (inputIsFilled && inputIsOverTwoCharactersLong) {
    changeInputStyle(inputElement, "invalid-input", "valid-input");
    nameAttributeOfInput === "first"
      ? (formDataValidation.first = true) & (valueOfFirstName = valueOfInput)
      : (formDataValidation.last = true) & (valueOfLastName = valueOfInput);
    inputElement.setCustomValidity("");
  } else {
    changeInputStyle(inputElement, "valid-input", "invalid-input");
    nameAttributeOfInput === "first"
      ? (formDataValidation.first = false)
      : (formDataValidation.last = false);
    inputElement.setCustomValidity(
      `Veuillez rentrer un ${
        nameAttributeOfInput === "first" ? "prénom" : "nom"
      } avec au moins 2 caractères`
    );
  }
}

function verifyEmail(inputElement) {
  let valueOfInput = inputElement.value;
  let inputIsFilled = valueOfInput !== "";

  if (inputIsFilled && emailRegex.test(valueOfInput)) {
    valueOfEmail = valueOfInput;
    formDataValidation.email = true;
    changeInputStyle(inputElement, "invalid-input", "valid-input");
    inputElement.setCustomValidity("");
  } else {
    changeInputStyle(inputElement, "valid-input", "invalid-input");
    formDataValidation.email = false;
    inputElement.setCustomValidity("Veuillez rentrer un email");
  }
}

function verifyDateOfBirth(inputElement) {
  let valueOfInput = inputElement.valueAsDate;
  let inputIsFilled = valueOfInput !== null;

  if (inputIsFilled) {
    difference = new Date().getTime() - valueOfInput.getTime();

    ageOfUserInYears = difference / (1000 * 60 * 60 * 24 * 365.25);

    if (ageOfUserInYears < 0) {
      changeInputStyle(inputElement, "valid-input", "invalid-input");
      inputElement.setCustomValidity(
        "Veuillez saisir une date valide inférieure à la date actuelle"
      );
      return;
    }

    isUserOverEighteen = ageOfUserInYears > 18;
    console.log("The user is", ageOfUserInYears, "years old");
    console.log(isUserOverEighteen ? "User is an adult" : "User is underage");

    if (!isUserOverEighteen) {
      changeInputStyle(inputElement, "valid-input", "invalid-input");
      inputElement.setCustomValidity(
        "L'évènement requiert à ce que les personnes inscrites soient majeures"
      );
      return;
    }
    valueOfDateOfBirth = valueOfInput;

    formDataValidation.dateOfBirth = isUserOverEighteen;
    changeInputStyle(inputElement, "invalid-input", "valid-input");
    inputElement.setCustomValidity("");
  } else {
    changeInputStyle(inputElement, "valid-input", "invalid-input");
    formDataValidation.dateOfBirth = isUserOverEighteen;
    inputElement.setCustomValidity("Veuillez saisir une date valide");
  }
}

function verifyQuantity(inputElement) {
  let valueOfInput = inputElement.valueAsNumber;

  if (valueOfInput >= 0 && valueOfInput < 100) {
    valueOfQuantity = valueOfInput;
    formDataValidation.quantity = true;
    changeInputStyle(inputElement, "invalid-input", "valid-input");
    inputElement.setCustomValidity("");
  } else {
    changeInputStyle(inputElement, "valid-input", "invalid-input");
    formDataValidation.quantity = false;
    inputElement.setCustomValidity("Veuillez renter une valeur entre 0 et 99");
  }
}

const locationErrorElement = document.querySelector(".error-msg");
function verifyLocation(inputElement) {
  let valueOfInput = inputElement.value;

  console.log({ atLeastOneRadioButtonIsChecked });

  console.log(valueOfInput);
}

function changeInputStyle(element, classToBeRemoved, classToBeAdded) {
  element.classList?.remove(classToBeRemoved);
  element.classList.add(classToBeAdded);
}

class UserInfos {
  constructor(firstName, lastName, email, dateOfBirth, quantity, location) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.quantity = quantity;
    this.location = location;
  }
}

form.addEventListener("submit", validate);
function validate(e) {
  e.preventDefault();

  let result = [];

  atLeastOneRadioButtonIsChecked = 0;
  for (radioButton of radioButtonsArray) {
    if (radioButton.checked) {
      atLeastOneRadioButtonIsChecked++;
      valueOfLocation = radioButton.value;
    }
  }

  console.log({ atLeastOneRadioButtonIsChecked });

  if (atLeastOneRadioButtonIsChecked) {
    formDataValidation.location = true;
    changeInputStyle(locationErrorElement, "show", "hide");
    locationErrorElement.parentElement.classList.remove("error-form-data-bg");
    locationErrorElement.textContent = "";
  } else {
    formDataValidation.location = false;
    changeInputStyle(locationErrorElement, "hide", "show");
    locationErrorElement.parentElement.classList.add("error-form-data-bg");
    locationErrorElement.textContent = "Veuillez choisir une option";
  }

  for (const prop in formDataValidation) {
    result.push(formDataValidation[prop]);
  }

  let invalidInputsArray = result.filter((inputBool) => {
    return inputBool === false;
  });

  let numberOfInvalidInputs = invalidInputsArray.length;
  console.log("Result ↓");
  console.table(result);

  console.log("Invalid inputs array ↓");
  console.table(invalidInputsArray);

  if (!numberOfInvalidInputs) {
    let userInfos = new UserInfos(
      valueOfFirstName,
      valueOfLastName,
      valueOfEmail,
      valueOfDateOfBirth,
      valueOfQuantity,
      valueOfLocation
    );

    console.log(userInfos);
    //callAPI(userInfos);
    alert("Merci d'avoir rempli le formulaire!");
    return;
  } else {
    alert("Attention, le formulaire est invalide!");
  }
}

/* 

async function callAPI(data){
  try{
    let response = await fetch([URL API], {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if(response.ok){
      window.location.href = [...]
    }
  }catch(apiError){
    console.error(apiError);
  }
}

*/
