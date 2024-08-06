import { populationData, buildingPopulationData } from './data.js';

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
    const unitPopulation = parseInt(document.getElementById('unit_population').value);
    const buildingPopulation = calculateBuildingPopulation();

    const maxPopulation = getMaxPopulation(farmLevel, therme, plow, landerweiterung, pygmalion);
    const currentPopulation = maxPopulation - (unitPopulation + buildingPopulation);

    document.getElementById('current_population').innerText = currentPopulation;
    document.getElementById('max_population').innerText = maxPopulation;
    document.getElementById('unit_population_result').innerText = unitPopulation;
    document.getElementById('building_population_result').innerText = buildingPopulation;
}

function calculateBuildingPopulation() {
    const buildings = [
        'senat', 'holzfaeller', 'steinbruch', 'silbermine', 'kaserne', 'hafen', 
        'akademie', 'marktplatz', 'tempel', 'hoehle', 'stadtmauer', 'speziala', 'spezialb'
    ];
    
    let totalPopulation = 0;

    buildings.forEach(building => {
        console.log(`Processing building: ${building}`);
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

// Attach functions to window object
window.updateFarmLevel = updateFarmLevel;
window.calculatePopulation = calculatePopulation;

// Initialize population calculation
calculatePopulation();
