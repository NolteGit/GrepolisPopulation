const populationData = [
    { level: 1, maxPopulation: 114 },
    { level: 2, maxPopulation: 121 },
    { level: 3, maxPopulation: 134 },
    { level: 4, maxPopulation: 152 },
    { level: 5, maxPopulation: 175 },
    { level: 6, maxPopulation: 206 },
    { level: 7, maxPopulation: 245 },
    { level: 8, maxPopulation: 291 },
    { level: 9, maxPopulation: 341 },
    { level: 10, maxPopulation: 399 },
    { level: 11, maxPopulation: 458 },
    { level: 12, maxPopulation: 520 },
    { level: 13, maxPopulation: 584 },
    { level: 14, maxPopulation: 651 },
    { level: 15, maxPopulation: 720 },
    { level: 16, maxPopulation: 790 },
    { level: 17, maxPopulation: 863 },
    { level: 18, maxPopulation: 938 },
    { level: 19, maxPopulation: 1015 },
    { level: 20, maxPopulation: 1094 },
    { level: 21, maxPopulation: 1174 },
    { level: 22, maxPopulation: 1257 },
    { level: 23, maxPopulation: 1341 },
    { level: 24, maxPopulation: 1426 },
    { level: 25, maxPopulation: 1514 },
    { level: 26, maxPopulation: 1602 },
    { level: 27, maxPopulation: 1693 },
    { level: 28, maxPopulation: 1785 },
    { level: 29, maxPopulation: 1878 },
    { level: 30, maxPopulation: 1973 },
    { level: 31, maxPopulation: 2070 },
    { level: 32, maxPopulation: 2168 },
    { level: 33, maxPopulation: 2267 },
    { level: 34, maxPopulation: 2368 },
    { level: 35, maxPopulation: 2470 },
    { level: 36, maxPopulation: 2573 },
    { level: 37, maxPopulation: 2678 },
    { level: 38, maxPopulation: 2784 },
    { level: 39, maxPopulation: 2891 },
    { level: 40, maxPopulation: 3000 },
    { level: 41, maxPopulation: 3109 },
    { level: 42, maxPopulation: 3220 },
    { level: 43, maxPopulation: 3332 },
    { level: 44, maxPopulation: 3446 },
    { level: 45, maxPopulation: 3560 }
];

const buildingPopulationData = {
    Senat: [1.0, 2.8, 5.2, 8.0, 11.2, 14.7, 18.5, 22.6, 27.0, 31.6, 36.5, 41.6, 46.9, 52.4, 58.1, 64.0, 70.1, 76.4, 82.8, 89.4, 96.2, 103.2, 110.3, 117.6, 125.0],
    Holzfaeller: [1.0, 2.4, 3.9, 5.7, 7.5, 9.4, 11.4, 13.5, 15.6, 17.8, 20.0, 22.3, 24.7, 27.1, 29.5, 32.0, 34.5, 37.1, 39.7, 42.3, 45.0, 47.6, 50.4, 53.1, 55.9],
    Steinbruch: [1.0, 2.4, 3.9, 5.7, 7.5, 9.4, 11.4, 13.5, 15.6, 17.8, 20.0, 22.3, 24.7, 27.1, 29.5, 32.0, 34.5, 37.1, 39.7, 42.3, 45.0, 47.6, 50.4, 53.1, 55.9],
    Silbermine: [1.0, 2.4, 3.9, 5.7, 7.5, 9.4, 11.4, 13.5, 15.6, 17.8, 20.0, 22.3, 24.7, 27.1, 29.5, 32.0, 34.5, 37.1, 39.7, 42.3, 45.0, 47.6, 50.4, 53.1, 55.9],
    Lager: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    Kaserne: [1.0, 2.5, 4.2, 6.1, 8.1, 10.3, 12.5, 14.9, 17.4, 20.0, 22.6, 25.3, 28.1, 30.9, 33.8, 36.8, 39.8, 42.8, 46.0, 49.1, 52.3, 55.6, 58.9, 62.3, 65.7, 69.1, 72.6, 76.1, 79.6, 83.2, 86.7, 90.3, 93.8, 97.4, 100.9],
    Hafen: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120],
    Akademie: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93, 96, 99, 102, 105, 108],
    Marktplatz: [2.0, 4.3, 6.7, 9.2, 11.7, 14.4, 17.0, 19.7, 22.4, 25.2, 28.0, 30.8, 33.6, 36.5, 39.3, 42.2, 45.1, 48.1, 51.0, 54.0, 56.9, 59.9, 62.9, 66.0, 69.0, 72.0, 75.1, 78.1, 81.2, 84.3],
    Tempel: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150],
    Hoehle: [3.0, 4.2, 5.2, 6.0, 6.7, 7.3, 7.9, 8.5, 9.0, 9.5],
    Stadtmauer: [2.0, 4.5, 7.2, 10.0, 12.9, 16.0, 19.1, 22.3, 25.6, 28.9, 32.3, 35.7, 39.2, 42.7, 46.3, 49.9, 53.5, 57.2, 60.9, 64.6, 68.4, 72.2, 76.0, 79.8],
    SpezialA: [60],
    SpezialB: [60]
};

const unitPopulationData = {
    Schwertkaempfer: 1,
    Schleuderer: 1,
    Bogenschuetze: 1,
    Hoplit: 1,
    Reiter: 3,
    Streitwagen: 4,
    Katapult: 15,
    Transportboot: 7,
    Bireme: 8,
    Feuerschiff: 10,
    Brander: 8,
    Schnellesschiff: 5,
    Trireme: 16,
    Kolonieschiff: 170,
    Minotaurus: 30,
    Mantikor: 45,
    Zyklop: 40,
    Hydra: 50,
    Harpie: 14,
    Medusa: 18,
    Zentaure: 12,
    Pegasus: 20,
    Zerberus: 30,
    Erinys: 55,
    Greif: 35,
    Eber: 20,
    Sirene: 16,
    Satyr: 16,
    Ladon: 85,
    Spartoi: 10,
    Gottgesandter: 3
};

export { populationData, buildingPopulationData, unitPopulationData };
