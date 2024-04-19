// Function to handle form submission
function validateForm() {
    var quantityValid = validateQuantity();
    var profitValid = validateProfit();
    return quantityValid && profitValid;
}

// Function to validate quantity
function validateQuantity() {
    var quantity = document.getElementById('quantity').value;
    var quantityError = document.getElementById('quantityError');

    if (isNaN(quantity) || quantity < 1 || quantity % 1 !== 0) {
        quantityError.innerText = 'Quantity must be a positive integer.';
        return false;
    } else {
        quantityError.innerText = '';
        return true;
    }
}

// Function to validate profit
function validateProfit() {
    var profit = document.getElementById('profit').value;
    var profitError = document.getElementById('profitError');

    if (!/^\d+(\.\d{1,2})?$/.test(profit)) {
        profitError.innerText = 'Profit must be a positive number with up to two decimal places.';
        return false;
    } else {
        profitError.innerText = '';
        return true;
    }
}

var subCategoryValues = {
    'Accessories': 0,
    'Appliances': 1,
    'Art': 2,
    'Binders': 3,
    'Bookcases': 4,
    'Chairs': 5,
    'Copiers': 6,
    'Envelopes': 7,
    'Fasteners': 8,
    'Furnishings': 9,
    'Labels': 10,
    'Machines': 11,
    'Paper': 12,
    'Phones': 13,
    'Storage': 14,
    'Supplies': 15,
    'Tables': 16
};


// Function to dynamically update sub-categories based on selected category
function updateSubCategories() {
    var categorySelect = document.getElementById("category");
    var subCategorySelect = document.getElementById("sub_category");
    var furnitureSubCategories = ['Art','Chairs', 'Furnishings', 'Storage', 'Tables'];
    var officeSuppliesSubCategories = ['Bookcases','Binders', 'Copiers', 'Envelopes', 'Labels', 'Paper', 'Supplies'];
    var technologySubCategories = ['Accessories','Appliances', 'Fasteners', 'Machines', 'Phones'];

    // Clear existing options
    subCategorySelect.innerHTML = "";

    // Determine selected category
    var selectedCategory = categorySelect.value;

        // Add options based on selected category
        var subCategories = [];
        if (selectedCategory === '0') { // Furniture
            subCategories = furnitureSubCategories;
        } else if (selectedCategory === '1') { // Office Supplies
            subCategories = officeSuppliesSubCategories;
        } else if (selectedCategory === '2') { // Technology
            subCategories = technologySubCategories;
        }
    
        // Add options to sub-category select with assigned values
        subCategories.forEach(function(subCategory) {
            var option = document.createElement("option");
            option.text = subCategory;
            option.value = subCategoryValues[subCategory]; // Assign value from subCategoryValues object
            subCategorySelect.add(option);
        });
}

// Add event listener to update button text from session storage
document.addEventListener('DOMContentLoaded', function () {
    var prediction = sessionStorage.getItem('prediction');
    if (prediction) {
        var calculateButton = document.getElementById('calculateButton');
        calculateButton.innerText = 'Estimated Sales: ' + prediction;
    } else {
        var calculateButton = document.getElementById('calculateButton');
        calculateButton.innerText = 'Calculate Sales';
    }
});

// Function to update prediction on button click
function updatePrediction() {
    var prediction = sessionStorage.getItem('prediction');
    if (prediction) {
        var calculateButton = document.getElementById('calculateButton');
        calculateButton.innerText = 'Estimated Sales: ' + prediction;
        // Clear prediction from session storage
        sessionStorage.removeItem('prediction');
    }
}



// Add event listeners
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('category').addEventListener('change', updateSubCategories);
    document.getElementById('calculateButton').addEventListener('click', updatePrediction);
});
