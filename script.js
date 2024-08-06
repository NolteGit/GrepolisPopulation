import { populationData, buildingPopulationData, unitPopulationData } from './data.js';

function updateFarmLevel(change) {
    const farmLevelInput = document.getElementById('farm_level');
    let farmLevel = parseInt(farmLevelInput.value);
    farmLevel = Math.min(Math.max(1, farmLevel + change), 45); // Ensure the farm level stays within 1 to 45
    farmLevelInput.value = farmLevel;
    calculatePopulation();
}

function calculatePopulation() {
    const farmLevel = parseInt(document.getElementById('farm_level').value);
    const therme = document.getElementById('therme').checked;
    const plow = document.getElementById('plow').checked;
    const landerweiterung = parseInt(document.getElementById('landerweiterung').value);
    const pygmalion = document.getElementById('pygmalion').checked;
    const unitPopulation = calculateUnitPopulation();
    const buildingPopulation = calculateBuildingPopulation();

    const maxPopulation = getMaxPopulation(farmLevel, therme, plow, landerweiterung, pygmalion);
    const currentPopulation = maxPopulation - (unitPopulation + buildingPopulation);

    document.getElementById('current_population').innerText = currentPopulation;
    document.getElementById('max_population').innerText = maxPopulation;
    document.getElementById('unit_population_result').innerText = unitPopulation;
    document.getElementById('building_population_result').innerText = buildingPopulation;

    // Update the color of the current population based on its value
    const currentPopulationElement = document.getElementById('current_population');
    if (currentPopulation < 0) {
        currentPopulationElement.classList.add('negative');
    } else {
        currentPopulationElement.classList.remove('negative');
    }
}

function calculateUnitPopulation() {
    const unitSelects = document.querySelectorAll('.unit-select');
    let totalPopulation = 0;

    unitSelects.forEach(select => {
        const unitType = select.getAttribute('data-unit');
        const unitCount = parseInt(select.value) || 0;
        totalPopulation += unitCount * (unitPopulationData[unitType] || 0);
    });

    return totalPopulation;
}

function calculateBuildingPopulation() {
    const buildings = [
        'senat', 'holzfaeller', 'steinbruch', 'silbermine', 'kaserne', 'hafen', 
        'akademie', 'marktplatz', 'tempel', 'hoehle', 'stadtmauer', 'speziala', 'spezialb'
    ];
    
    let totalPopulation = 0;

    buildings.forEach(building => {
        const element = document.getElementById(`${building}_level`);
        if (element) {
            const level = parseInt(element.value) || 0;
            if (buildingPopulationData[building.charAt(0).toUpperCase() + building.slice(1)] && level > 0) {
                totalPopulation += buildingPopulationData[building.charAt(0).toUpperCase() + building.slice(1)][level - 1] || 0;
            }
        } else {
            console.warn(`Element with id "${building}_level" not found.`);
        }
    });

    return totalPopulation;
}

function getMaxPopulation(level, therme, plow, landerweiterung, pygmalion) {
    let maxPopulation = populationData.find(data => data.level === level).maxPopulation;
    if (therme) {
        maxPopulation = Math.floor(maxPopulation * 1.10);
    }
    if (plow) {
        maxPopulation += 200;
    }
    if (landerweiterung) {
        maxPopulation += landerweiterung * 50;
    }
    if (pygmalion) {
        maxPopulation += level * 5; // Pygmalion adds a boost equal to the farm level multiplied by 5
    }
    return Math.min(maxPopulation, 4116);
}

// async function loadHTML(url, containerId) {
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const html = await response.text();
//         document.getElementById(containerId).innerHTML = html;
//         calculatePopulation();  // Recalculate population after loading content
//     } catch (error) {
//         console.error('Error loading HTML:', error);
//     }
// }

async function loadHTML(url, containerId) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            document.getElementById(containerId).innerHTML = html;
            calculatePopulation();  // Recalculate population after loading content
        } catch (error) {
            console.error('Error loading HTML:', error);
        }
    }
    
    document.addEventListener('DOMContentLoaded', (event) => {
        loadHTML('buildingConsumers.html', 'building-consumers-container');
        loadHTML('unitConsumers.html', 'unit-consumers-container');
        document.getElementById('farm_level').value = 45;  // Set default farm level to 45
    });

document.addEventListener('DOMContentLoaded', (event) => {
    loadHTML('buildingConsumers.html', 'building-consumers-container');
    loadHTML('unitConsumers.html', 'unit-consumers-container');
    document.getElementById('farm_level').value = 45;  // Set default farm level to 45
});

function resetInputs() {
    document.getElementById('farm_level').value = 45;
    document.getElementById('therme').checked = false;
    document.getElementById('plow').checked = false;
    document.getElementById('pygmalion').checked = false;
    document.getElementById('landerweiterung').value = 0;
    // Reset the consumers as well
    document.querySelectorAll('.building-consumers input').forEach(input => input.value = 0);
    document.querySelectorAll('.unit-consumers input').forEach(input => input.value = 0);
    calculatePopulation();
}


// Attach functions to window object
window.updateFarmLevel = updateFarmLevel;
window.calculatePopulation = calculatePopulation;
window.resetInputs = resetInputs;

// Initialize population calculation
calculatePopulation();
