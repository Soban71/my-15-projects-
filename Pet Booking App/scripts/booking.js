let costPerDay = 35; 
let selectedDays = []; 
let totalCost = 0; 
const calculatedCostElement = document.getElementById("calculated-cost");
const dayButtons = document.querySelectorAll(".day-selector li");
const fullDayButton = document.getElementById("full");
const halfDayButton = document.getElementById("half");
const clearButton = document.getElementById("clear-button");


dayButtons.forEach(dayButton => {
    dayButton.addEventListener("click", () => {
      const day = dayButton.id;
  
      dayButton.classList.toggle("clicked");
  
      if (dayButton.classList.contains("clicked")) {
        dayButton.style.backgroundColor = "#E5AF42";
        selectedDays.push(day);
      } else {
        dayButton.style.backgroundColor = "transparent"; 
        const index = selectedDays.indexOf(day);
        if (index !== -1) {
          selectedDays.splice(index, 1);
        }
      }
  
      recalculateTotalCost();
    });
  });
  
  clearButton.addEventListener("click", () => {
    selectedDays.forEach(day => {
      const dayButton = document.getElementById(day);
      dayButton.classList.remove("clicked");
      dayButton.style.backgroundColor = "transparent";
      const fullDayButton = document.getElementById("full");
const halfDayButton = document.getElementById("half");
fullDayButton.classList.remove("clicked");
fullDayButton.style.backgroundColor = "transparent";
halfDayButton.classList.remove("clicked");
halfDayButton.style.backgroundColor = "transparent";

    });
  
    selectedDays = [];
    totalCost = 0;
    recalculateTotalCost();
  });

halfDayButton.addEventListener("click", () => {
    costPerDay = 20;
    halfDayButton.classList.toggle("clicked");
    halfDayButton.style.backgroundColor = halfDayButton.classList.contains("clicked") ? "#E5AF42" : "transparent";
  
    fullDayButton.classList.remove("clicked");
    fullDayButton.style.backgroundColor = "transparent";
  
    recalculateTotalCost();
  });
  
  fullDayButton.addEventListener("click", () => {
    costPerDay = 35;
    fullDayButton.classList.toggle("clicked");
    fullDayButton.style.backgroundColor = fullDayButton.classList.contains("clicked") ? "#E5AF42" : "transparent";
  
    halfDayButton.classList.remove("clicked");
    halfDayButton.style.backgroundColor = "transparent";
  
    recalculateTotalCost();
  });
  

  

function recalculateTotalCost() {
    totalCost = costPerDay * selectedDays.length;
    calculatedCostElement.innerHTML = totalCost;
  }
  
  