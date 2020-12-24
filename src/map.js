import { getBoundsCoords, isGridCompleted } from './helpers';

function addNeighborsToCities(countries, grid) {
    const { minX, minY, maxX, maxY } = getBoundsCoords(countries)
    grid.forEach((city) => {
        const { x, y } = city;
        const neighbors = [];
        const addNeighbor = (x, y) => {
            const neighborCity = grid.get(`${x},${y}`);
            if (neighborCity) {
                neighbors.push(neighborCity);
            }
        };

        if (x < maxX) {
            addNeighbor(x + 1, y);
        }
        if (x > minY) {
            addNeighbor(x - 1, y);
        }
        if (y < maxY) {
            addNeighbor(x, y + 1);
        }
        if (y > minY) {
            addNeighbor(x, y - 1);
        }

        if (countries.length > 1 && !neighbors.length) {
            throw new Error(`City in ${city.countryName} has no neighbors`);
        }
        city.neighbors = neighbors;
    });
}

function addCitiesToGrid(countries) {
    const grid = new Map();
    countries.forEach((country) => {
        country.cities.forEach((city) => grid.set(`${city.x},${city.y}`, city));
    });
    return grid;
}

export function initGrid(countries) {
    const grid = addCitiesToGrid(countries);
    addNeighborsToCities(countries, grid);
    return grid;
}

export function diffusion(countries, grid) {
    const result = new Map();
    let day = 0;
    for(; !isGridCompleted(countries); day += 1) {
        grid.forEach((city) => {
            city.shareCoins();
            city.clearIncome(); 
        });
        countries.forEach((country) => {
            if (country.isCompleted()) {
                if (!result.has(country.name)) {
                    result.set(country.name, day);
                }
            }
        });
    }

    countries.forEach((country) => {
        if (!result.has(country.name)) {
            result.set(country.name, day);
        }
    });

    return result;
}


export function getFinalOutput(resultData) {
    const strings = [];
    const countries = resultData.entries();
    for (const [countryName, days] of countries) {
        strings.push(`${countryName} ${days}`);
    }
    return strings.join('\n');
}
