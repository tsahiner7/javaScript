const calculateFederalTax = (grossSalary) => {
    let tax = 0;
    if (grossSalary <= 9875) {
        tax = grossSalary * 0.10;
    } else if (grossSalary <= 40125) {
        tax = 987.5 + (grossSalary - 9875) * 0.12;
    } else if (grossSalary <= 85525) {
        tax = 4617.5 + (grossSalary - 40125) * 0.22;
    } else if (grossSalary <= 163300) {
        tax = 14605.5 + (grossSalary - 85525) * 0.24;
    } else if (grossSalary <= 207350) {
        tax = 33271.5 + (grossSalary - 163300) * 0.32;
    } else if (grossSalary <= 518400) {
        tax = 47367.5 + (grossSalary - 207350) * 0.35;
    } else {
        tax = 156235 + (grossSalary - 518400) * 0.37;
    }
    return tax;
}

const calculateStateTax = (grossSalary) => {
    let tax = 0;
    if (grossSalary <= 11970) {
        tax = grossSalary * 0.0354;
    } else if (grossSalary <= 23930) {
        tax = 424.5 + (grossSalary - 11970) * 0.0465;
    } else {
        tax = 1012.5 + (grossSalary - 23930) * 0.0627;
    }
    return tax;
}

const calculateMediCareTax = (grossSalary) => {
    let medicareTax = grossSalary * 0.0145;
    if (grossSalary > 200000) {
        medicareTax += (grossSalary - 200000) * 0.009;
    }
    return medicareTax;
}

const calculateSocialSecurityTax = (grossSalary) => {
    //compare 137k and grossSalary, pick the smallest one with Math.min()
    let socialSecurityTax = Math.min(137000, grossSalary) * 0.062;
    return socialSecurityTax;
}

const handleSubmit = (event) => {
    //Don't reload the page
    event.preventDefault();

    //used parseFloat to transform string to number
    let grossSalary = parseFloat(document.getElementById('grossSalary').value);
    
    let federalTax = calculateFederalTax(grossSalary);
    let stateTax = calculateStateTax(grossSalary);
    let mediCareTax = calculateMediCareTax(grossSalary);
    let socialSecurityTax = calculateSocialSecurityTax(grossSalary);
    let totalTax = (federalTax + stateTax + 
                    mediCareTax + socialSecurityTax);
    let netPay = grossSalary - totalTax;

// DOM manipulation to display results
let results = document.getElementById("results");
results.style.display = "flex";

// Create a new h4 element for the heading
let h4 = document.createElement("h4");
h4.textContent = "Results: "; 

// Concatenate the h4 element with the tax information
let content = h4.outerHTML +
              "Federal Tax: $" + federalTax.toFixed(2) + "<br>" +
              "State Tax: $" + stateTax.toFixed(2) + "<br>" +
              "Medicare Tax: $" + mediCareTax.toFixed(2) + "<br>" +
              "SSN Tax: $" + socialSecurityTax.toFixed(2) + "<br>" +
              "Total Tax: $" + totalTax.toFixed(2) + "<br>" +
              "Net Pay: $" + netPay.toFixed(2);

// Set the content to the results element
results.innerHTML = content;

}

// Event listener for form submission
document.getElementById('salaryForm').addEventListener('submit', handleSubmit);
