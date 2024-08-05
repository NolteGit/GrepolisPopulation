function updateFarmLevel(change) {
    const farmLevelInput = document.getElementById('farm_level');
    let farmLevel = parseInt(farmLevelInput.value);
    farmLevel = Math.max(1, farmLevel + change);
    farmLevelInput.value = farmLevel;
    calculatePopulation();
}

function calculatePopulation() {
    const farmLevel = parseInt(document.getElementById('farm_level').value);
    const therme = document.getElementById('therme').checked;
    const plow = document.getElementById('plow').checked;
    const unitPopulation = parseInt(document.getElementById('unit_population').value);
    const buildingPopulation = parseInt(document.getElementById('building_population').value);

    let maxPopulation = farmLevel * 100;
    if (therme) {
        maxPopulation *= 1.10;
    }
    if (plow) {
        maxPopulation += 200;
    }
    maxPopulation = Math.min(maxPopulation, 4116);

    const currentPopulation = maxPopulation - (unitPopulation + buildingPopulation);

    document.getElementById('current_population').innerText = currentPopulation;
    document.getElementById('max_population').innerText = maxPopulation;
    document.getElementById('unit_population_result').innerText = unitPopulation;
    document.getElementById('building_population_result').innerText = buildingPopulation;
}

// Initialize population calculation
calculatePopulation();

