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
  modalbg.classList.add("open-modal");
  const closeModalButton = document.getElementsByClassName("close")[0];

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

const checkboxesNodeList = document.querySelectorAll(
  ".formData:nth-child(8)>input"
);
const checkboxesArray = Array.from(checkboxesNodeList);

const locationErrorElement = document.querySelector(".error-msg");

const submitButton = document.querySelector(".btn-submit");

const validFormMessageElement = document.querySelector(".valid-form-message");

const validFormCloseModalButton = document.querySelector(
  ".close-modal-button.button"
);

const contentElement = document.querySelector(".content");

let inputsArray = [
  firstNameInput,
  lastNameInput,
  emailInput,
  dateOfBirthInput,
  quantityInput,
  checkboxesArray[0],
  checkboxesArray[1],
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
  knowMore: false,
};

validFormCloseModalButton.addEventListener("click", closeModal);

for (input of inputsArray) {
  input.addEventListener("change", handleInputs);
  input.addEventListener("blur", handleInputs);
}

function handleInputs() {
  console.log(this);
  const nameAttributeOfInput = this.getAttribute("name");
  let paragraphElement = this.parentElement.querySelector(
    ".paragraph-error-msg"
  );

  console.log(paragraphElement);

  switch (nameAttributeOfInput) {
    case "first": {
      console.log("first name");
      verifyName(this, nameAttributeOfInput, paragraphElement);
      console.log(formDataValidation);
      break;
    }

    case "last": {
      console.log("last name");
      verifyName(this, nameAttributeOfInput, paragraphElement);
      console.log(formDataValidation);

      break;
    }
    case "email": {
      console.log("email");
      verifyEmail(this, paragraphElement);
      console.log(formDataValidation);

      break;
    }

    case "birthdate": {
      console.log("birthdate");
      verifyDateOfBirth(this, paragraphElement);
      console.log(formDataValidation);
      break;
    }

    case "quantity": {
      console.log("quantity");
      verifyQuantity(this, paragraphElement);
      console.log(formDataValidation);
      break;
    }

    // case "location": {
    //   console.log(this);
    //   verifyLocation(this);
    //   console.log("click");
    //   break;
    // }

    case "checkbox": {
      console.log("Checkbox");
      verifyTermsOfServiceCheckbox(this);
      break;
    }
  }
}

function verifyName(inputElement, nameAttributeOfInput, paragraphElement) {
  let valueOfInput = inputElement.value;
  let inputIsFilled = valueOfInput !== "";
  let inputIsOverTwoCharactersLong = valueOfInput.length >= 2;

  console.log({ nameAttributeOfInput });

  if (inputIsFilled && inputIsOverTwoCharactersLong) {
    changeInputStyle(inputElement, "invalid-input", "valid-input");
    nameAttributeOfInput === "first"
      ? (formDataValidation.first = true) & (valueOfFirstName = valueOfInput)
      : (formDataValidation.last = true) & (valueOfLastName = valueOfInput);
    paragraphElement.textContent = "";
  } else {
    changeInputStyle(inputElement, "valid-input", "invalid-input");
    nameAttributeOfInput === "first"
      ? (formDataValidation.first = false)
      : (formDataValidation.last = false);

    paragraphElement.textContent = `Veuillez rentrer un ${
      nameAttributeOfInput === "first" ? "prénom" : "nom"
    } avec au moins 2 caractères`;
  }
}

function verifyEmail(inputElement, paragraphElement) {
  let valueOfInput = inputElement.value;
  let inputIsFilled = valueOfInput !== "";

  if (inputIsFilled && emailRegex.test(valueOfInput)) {
    valueOfEmail = valueOfInput;
    formDataValidation.email = true;
    changeInputStyle(inputElement, "invalid-input", "valid-input");
    paragraphElement.textContent = "";
  } else {
    changeInputStyle(inputElement, "valid-input", "invalid-input");
    formDataValidation.email = false;
    paragraphElement.textContent = "Veuillez rentrer un email valide";
  }
}

function verifyDateOfBirth(inputElement, paragraphElement) {
  let valueOfInput = inputElement.valueAsDate;
  let inputIsFilled = valueOfInput !== null;

  if (inputIsFilled) {
    difference = new Date().getTime() - valueOfInput.getTime();

    ageOfUserInYears = difference / (1000 * 60 * 60 * 24 * 365.25);

    if (ageOfUserInYears < 0) {
      changeInputStyle(inputElement, "valid-input", "invalid-input");

      paragraphElement.textContent =
        "Veuillez saisir une date valide inférieure à la date actuelle";

      return;
    }

    isUserOverEighteen = ageOfUserInYears > 18;
    console.log("The user is", Math.trunc(ageOfUserInYears), "years old");
    console.log(isUserOverEighteen ? "User is an adult" : "User is underage");

    if (!isUserOverEighteen) {
      changeInputStyle(inputElement, "valid-input", "invalid-input");

      paragraphElement.textContent =
        "L'évènement requiert à ce que les personnes inscrites soient majeures";

      return;
    }
    valueOfDateOfBirth = valueOfInput;

    formDataValidation.dateOfBirth = isUserOverEighteen;
    changeInputStyle(inputElement, "invalid-input", "valid-input");
    paragraphElement.textContent = "";
  } else {
    changeInputStyle(inputElement, "valid-input", "invalid-input");
    formDataValidation.dateOfBirth = isUserOverEighteen;
    paragraphElement.textContent = "Veuillez saisir une date valide";
  }
}

function verifyQuantity(inputElement, paragraphElement) {
  let valueOfInput = inputElement.valueAsNumber;

  if (valueOfInput >= 0 && valueOfInput < 100) {
    valueOfQuantity = valueOfInput;
    formDataValidation.quantity = true;
    changeInputStyle(inputElement, "invalid-input", "valid-input");
    inputElement.setCustomValidity("");
    paragraphElement.textContent = "";
  } else {
    changeInputStyle(inputElement, "valid-input", "invalid-input");
    formDataValidation.quantity = false;
    paragraphElement.textContent = "Veuillez renter une valeur entre 0 et 99";
  }
}

function verifyTermsOfServiceCheckbox(inputElement) {
  let isInputChecked = inputElement.checked;
  let checkboxToAcceptToS = inputElement.classList.contains(
    "terms-of-service-checkbox"
  );
  if (checkboxToAcceptToS && !isInputChecked) {
    submitButton.disabled = true;
  } else if (checkboxToAcceptToS && isInputChecked) {
    submitButton.disabled = false;
  } else if (!checkboxToAcceptToS && !isInputChecked) {
    formDataValidation.knowMore = false;
  } else {
    formDataValidation.knowMore = true;
  }
}

function changeInputStyle(element, classToBeRemoved, classToBeAdded) {
  element.classList.remove(classToBeRemoved);
  element.classList.add(classToBeAdded);
}

class UserInfos {
  constructor(
    firstName,
    lastName,
    email,
    dateOfBirth,
    quantity,
    location,
    knowMore
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.quantity = quantity;
    this.location = location;
    this.knowMore = knowMore;
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
    if (prop === "knowMore") {
      continue;
    } else {
      result.push(formDataValidation[prop]);
    }
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
      valueOfLocation,
      formDataValidation.knowMore
    );

    console.log(userInfos);
    //callAPI(userInfos);

    this.classList.add("hide");
    validFormMessageElement.classList.remove("hide");
    contentElement.classList.add("show-center-flex");
    validFormMessageElement.textContent = "Merci pour votre inscription";
    validFormCloseModalButton.classList.remove("hide");
    return;
  } else {
    contentElement.classList.add("shake-animation");
    setTimeout(() => {
      contentElement.classList.remove("shake-animation");
      console.log("removing the animation");
    }, 650);

    //Ajouter une animation
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
