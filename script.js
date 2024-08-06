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
        'Senat', 'Holzfaeller', 'Steinbruch', 'Silbermine', 'Kaserne', 'Hafen', 
        'Akademie', 'Marktplatz', 'Tempel', 'Hoehle', 'Stadtmauer', 'SpezialA', 'SpezialB'
    ];
    
    let totalPopulation = 0;

    buildings.forEach(building => {
        const level = parseInt(document.getElementById(`${building.toLowerCase()}_level`).value) || 0;
        if (buildingPopulationData[building] && level > 0) {
            totalPopulation += buildingPopulationData[building][level - 1] || 0;
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
