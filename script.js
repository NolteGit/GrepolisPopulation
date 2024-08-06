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
    const kojen = document.getElementById('kojen').checked;
    const unitPopulation = calculateUnitPopulation();
    const buildingPopulation = calculateBuildingPopulation();
    const transportCapacity = calculateTransportCapacity(kojen);

    const maxPopulation = getMaxPopulation(farmLevel, therme, plow, landerweiterung, pygmalion);
    const currentPopulation = maxPopulation - (unitPopulation + buildingPopulation);

    const currentPopulationElement = document.getElementById('current_population');
    currentPopulationElement.innerText = currentPopulation;
    currentPopulationElement.classList.toggle('negative', currentPopulation < 0);

    document.getElementById('max_population').innerText = maxPopulation;
    document.getElementById('unit_population_result').innerText = unitPopulation;
    document.getElementById('building_population_result').innerText = buildingPopulation;

    // Calculate current transport load
    const currentTransportLoad = calculateCurrentTransportLoad();
    // Update transport capacity display
    document.getElementById('transport_capacity').innerText = `${currentTransportLoad}/${transportCapacity}`;
}

function calculateCurrentTransportLoad() {
    const unitInputs = document.querySelectorAll('.unit-consumers input');
    let totalLoad = 0;

    unitInputs.forEach(input => {
        const unitType = input.id;
        const unitCount = parseInt(input.value) || 0;
        const unitPop = unitPopulationData[unitType] || 0;
        
        // Add all specified unit types to this check
        const excludedUnits = [
            'transportboot', 'schnelles_transportboot', 'feuerschiff', 'bireme', 'trireme', 
            'brander', 'kolonieschiff', 'mantikor', 'hydra', 'harpie', 'pegasus', 
            'greif', 'sirene', 'ladon'
        ];
        
        if (!excludedUnits.includes(unitType)) {
            totalLoad += unitCount * unitPop;
        }
    });

    // console.log(`Total Transport Load: ${totalLoad}`); // Debugging statement
    return totalLoad;
}

function calculateUnitPopulation() {
    const unitInputs = document.querySelectorAll('.unit-consumers input');
    let totalPopulation = 0;

    unitInputs.forEach(input => {
        const unitType = input.id;
        const unitCount = parseInt(input.value) || 0;
        const unitPop = unitPopulationData[unitType] || 0;
        // console.log(`Unit Type: ${unitType}, Count: ${unitCount}, Population per Unit: ${unitPop}`); // Debugging statement
        totalPopulation += unitCount * unitPop;
    });

    // console.log(`Total Unit Population: ${totalPopulation}`); // Debugging statement
    return totalPopulation;
}

function calculateBuildingPopulation() {
    const buildings = [
        'senat', 'holzfaeller', 'steinbruch', 'silbermine', 'lager', 'kaserne', 'hafen', 
        'akademie', 'marktplatz', 'tempel', 'hoehle', 'stadtmauer'
    ];
    
    let totalPopulation = 0;

    buildings.forEach(building => {
        const element = document.getElementById(`${building}_level`);
        if (element) {
            const level = parseInt(element.value) || 0;
            const buildingName = building.charAt(0).toUpperCase() + building.slice(1);
            const populationPerLevel = buildingPopulationData[buildingName] || [];
            const population = populationPerLevel[level - 1] || 0;
            
            // console.log(`Building: ${buildingName}, Level: ${level}, Population per Level: ${population}`);
            
            if (level > 0) {
                totalPopulation += population;
            }
        } else {
            console.warn(`Element with id "${building}_level" not found.`);
        }
    });

    // Handle special buildings with fixed population values
    const spezialAElement = document.getElementById('speziala_level');
    if (spezialAElement && parseInt(spezialAElement.value) > 0) {
        totalPopulation += 60;
        // console.log('Special Building A, Population: 60');
    }

    const spezialBElement = document.getElementById('spezialb_level');
    if (spezialBElement && parseInt(spezialBElement.value) > 0) {
        totalPopulation += 60;
        // console.log('Special Building B, Population: 60');
    }

    // console.log(`Total Building Population: ${totalPopulation}`);
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
    return Math.round(maxPopulation);
}

function calculateTransportCapacity(kojen) {
    let kojenAddition = 0;
    if (kojen) {
        kojenAddition = 6;
    }
    const transportBootCount = parseInt(document.getElementById('transportboot').value) || 0;
    const schnellesTransportBootCount = parseInt(document.getElementById('schnelles_transportboot').value) || 0;
    const transportCapacity = (transportBootCount * (26 + kojenAddition)) + (schnellesTransportBootCount * (10 + kojenAddition));
    
    // console.log(`Transport Boats: ${transportBootCount}, Fast Transport Boats: ${schnellesTransportBootCount}, Transport Capacity: ${transportCapacity}`);
    return transportCapacity;
}

// Attach functions to window object
window.updateFarmLevel = updateFarmLevel;
window.calculatePopulation = calculatePopulation;
window.resetInputs = resetInputs;

// Function to reset inputs
function resetInputs() {
    document.getElementById('farm_level').value = 45;
    document.getElementById('therme').checked = false;
    document.getElementById('plow').checked = false;
    document.getElementById('pygmalion').checked = false;
    document.getElementById('landerweiterung').value = 0;
    document.getElementById('kojen').checked = false; // Reset the kojen checkbox
    // Reset the consumers as well
    document.querySelectorAll('.building-consumers input, .unit-consumers input').forEach(input => input.value = 0);
    calculatePopulation();
}

// Initialize population calculation
document.addEventListener('DOMContentLoaded', () => {
    calculatePopulation();
    document.getElementById('farm_level').value = 45;
    document.getElementById('therme').checked = false;
    document.getElementById('plow').checked = false;
    document.getElementById('pygmalion').checked = false;
    document.getElementById('landerweiterung').value = 0;
    document.getElementById('kojen').checked = false;
});

// Load HTML for building and unit consumers
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
});
