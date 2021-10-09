const inputBillEl = document.getElementById("table-bill");
const inputPersonEl = document.getElementById("table-person");
const tipCustom = document.getElementById("tip-custom");
const buttonEl = document.getElementById("button-el");
const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("tip-total");
const calcError = document.querySelectorAll(".calc-error");
const customCalcError = document.querySelector(".calc-error-custom");

let tipChecked1 = document.getElementById("tip-radio-1").checked;
let tipChecked2 = document.getElementById("tip-radio-2").checked;
let tipChecked3 = document.getElementById("tip-radio-3").checked;
let tipChecked4 = document.getElementById("tip-radio-4").checked;
let tipChecked5 = document.getElementById("tip-radio-5").checked;

const tipValue1 = document.getElementById("tip-radio-1").value;
const tipValue2 = document.getElementById("tip-radio-2").value;
const tipValue3 = document.getElementById("tip-radio-3").value;
const tipValue4 = document.getElementById("tip-radio-4").value;
const tipValue5 = document.getElementById("tip-radio-5").value;

const tipRadios = document.querySelectorAll("input[type=radio][name=tipRadio]");

let customTipPercent = "";
let tipPercent = "";
let customTipEquation = (inputBillEl.value * tipPercent) / inputPersonEl.value;
let tipEquation = (inputBillEl.value * tipPercent) / inputPersonEl.value;
let equation = inputBillEl.value / inputPersonEl.value + tipEquation;
let tip = "0.00";
let total = "0.00";

buttonEl.classList.toggle("disabled");
tipAmount.innerText = "$" + "0.00";
totalAmount.innerText = "$" + "0.00";

// Update as user types in inputBillEl input field
inputBillEl.addEventListener("input", function () {
  if (isNaN(inputBillEl.value)) {
    calcError[0].classList.remove("remove");
    calcTip();
  } else {
    calcError[0].classList.add("remove");
    calcTip();
  }
});

// Update as user types in inputPersonEl input field
inputPersonEl.addEventListener("input", function () {
  if (isNaN(inputPersonEl.value)) {
    calcError[1].classList.remove("remove");
    calcTip();
  } else {
    calcError[1].classList.add("remove");
    calcTip();
  }
});

// update as user makes tip selection
tipRadios.forEach(function (tipRadio) {
  tipRadio.addEventListener("change", function () {
    tipCustom.value = "";
    customTipPercent = "";
    customCalcError.classList.add("remove");
    tipPercent = tipRadio.value;
    calcTip();
  });
});

// Update as user makes custom tip selection
tipCustom.addEventListener("input", function () {
  if (isNaN(tipCustom.value)) {
    customCalcError.classList.remove("remove");
    calcTip();
  } else if (tipCustom.value !== "") {
    customTipPercent = tipCustom.value * 0.01;
    customCalcError.classList.add("remove");
    calcTip();
  } else if (isNaN(tipCustom.value) !== true) {
    customCalcError.classList.add("remove");
  }
});

// Calculate tip
function calcTip() {
  buttonEl.classList.remove("disabled");
  customTipEquation =
    (inputBillEl.value * customTipPercent) / inputPersonEl.value;
  tipEquation = (inputBillEl.value * tipPercent) / inputPersonEl.value;
  equation = inputBillEl.value / inputPersonEl.value + tipEquation;

  if (tipCustom.value !== "") {
    tip = customTipEquation.toFixed(2);
    equation = inputBillEl.value / inputPersonEl.value + customTipEquation;
    total = equation.toFixed(2);
    document.getElementById("tip-radio-1").checked = false;
    document.getElementById("tip-radio-2").checked = false;
    document.getElementById("tip-radio-3").checked = false;
    document.getElementById("tip-radio-4").checked = false;
    document.getElementById("tip-radio-5").checked = false;
  } else if (tipCustom.value === "") {
    tip = tipEquation.toFixed(2);
    total = equation.toFixed(2);
  }

  renderEl();
}

// Render tip and total
function renderEl() {
  if (inputBillEl.value !== "" && inputPersonEl.value !== "") {
    tipAmount.innerText = "$" + tip;
    totalAmount.innerText = "$" + total;
  } else {
    tipAmount.innerText = "$0.00";
    totalAmount.innerText = "$0.00";
  }
}

// Reset Button
buttonEl.addEventListener("click", function () {
  tipCustom.value = "";
  inputBillEl.value = "";
  inputPersonEl.value = "";
  customTipPercent = "";
  tipPercent = "";
  document.getElementById("tip-radio-1").checked = false;
  document.getElementById("tip-radio-2").checked = false;
  document.getElementById("tip-radio-3").checked = false;
  document.getElementById("tip-radio-4").checked = false;
  document.getElementById("tip-radio-5").checked = false;
  buttonEl.classList.add("disabled");
  calcError[0].classList.add("remove");
  calcError[1].classList.add("remove");
  customCalcError.classList.add("remove");
  tip = "0.00";
  total = "0.00";
  renderEl();
});

// END OF MY CODE
//
//
//

// function calcSplitTip(bill, numberOfPeople, tipPercentage) {
//   let tipPerPerson = (bill * tipPercentage) / numberOfPeople;
//   let totalPerPerson = bill / numberOfPeople + tipPerPerson;

//   console.log(
//     "Tip per person = " +
//       "$" +
//       tipPerPerson.toFixed(2) +
//       " | " +
//       "Total per person = " +
//       "$" +
//       totalPerPerson.toFixed(2)
//   );
// }

// calcSplitTip(100, 2, 0.15);
