const category = document.getElementById('categories');
const idInput = document.getElementById('num');
const submitBtn = document.getElementById('submitBtn');
const outputContainer = document.getElementById('outputContainer');
const errorMsg = document.getElementById('errorMsg');

function renderSpecies(species) {
    outputContainer.innerHTML = `
        <p><strong>Name:</strong> ${species.name} </p>
        <p><strong>Language:</strong> ${species.language}</p>
    `;
}

function renderVehicle(vehicle) {
    outputContainer.innerHTML = `
        <p><strong>Model:</strong> ${vehicle.model} </p>
        <p><strong>Manufacturer:</strong> ${vehicle.manufacturer}</p>
    `;
}

function renderStarship(starship) {
    outputContainer.innerHTML = `
        <p><strong>Model:</strong> ${starship.model} </p>
        <p><strong>Class:</strong> ${starship.starship_class}</p>
    `;
}

function checkNumber(num) {
    if (num <= 0 || num > 10) {
        errorMsg.textContent = 'Please enter a number from 1 to 10';
        outputContainer.textContent = ''; 
        return false;
    } else {
        errorMsg.textContent = '';
        return true;
    }
}

function fetchData(category, id) {
    fetch(`https://swapi.py4e.com/api/${category}/${id}/`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Invalid ID or data not found');
            }
            return response.json();
        })
        .then((data) => {
            if (category === "species") {
                renderSpecies(data);
            } else if (category === "vehicles") {
                renderVehicle(data);
            } else if (category === "starships") {
                renderStarship(data);
            }
        })
        .catch((err) => {
            errorMsg.textContent = 'Oops, no luck! ' + err.message;
            outputContainer.innerHTML = '';
        });
}

submitBtn.addEventListener('click', () => {
    outputContainer.textContent = 'Loading...';
    const id = idInput.value;
    if (!checkNumber(id)) return;

    const selectedCategory = category.value;
    fetchData(selectedCategory, id);
});