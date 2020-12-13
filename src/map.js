import City from './city';

class GridDictionary {
    constructor() {
      this.map = new Map();
    }

    key(coords) {
        return `${coords.x}-${coords.y}`;
    }

    set(coords, value) {
        const key = this.key(coords);
        this.map.set(key, value);
    }

    get(coords) {
        const key = this.key(coords);
        return this.map.get(key);
    }
}

export class MapGrid {
    constructor(countries) {
        this.countries = countries;
        this.minX = 0;
        this.minY = 0;
        this.maxX = 0;
        this.maxY = 0;
        this.countriesGrid = new GridDictionary();

        countries.forEach((country) => {
            this.minX = Math.min(this.minX, country.coordinates.xl);
            this.minY = Math.min(this.minY, country.coordinates.yl);
            this.maxX = Math.max(this.maxX, country.coordinates.xh);
            this.maxY = Math.max(this.maxY, country.coordinates.yh);
        });

        this.addCitiesToCountries();
        this.addNeighborsToCities();
    }

    isCompleted() {
        return this.countries.every((country) => country.isCompleted());
    }

    /**
     * Create and set cities to countries
     */
    addCitiesToCountries() {
        const coinTypes = this.countries.map((country) => country.name);
        this.countries.forEach((country, countryIndex) => {
            for (let x = country.coordinates.xl; x <= country.coordinates.xh; x += 1) {
                for (let y = country.coordinates.yl; y <= country.coordinates.yh; y += 1) {
                    const city = new City(coinTypes, country.name);
                    this.countriesGrid.set({ x, y }, city);
                    this.countries[countryIndex].addCity(city);
                }
            }
        });
    }

    /**
     * Fill neighbors array in cities
     */
    addNeighborsToCities() {
        for (let x = this.minX; x <= this.maxX; x += 1) {
            for (let y = this.minY; y <= this.maxY; y += 1) {
                const city = this.countriesGrid.get({ x, y });
                if (!city) {
                    continue;
                }

                const neighbors = [];

                const addNeighbor = (x, y) => {
                    const neighborCity = this.countriesGrid.get({ x, y });
                    if (neighborCity) {
                        neighbors.push(neighborCity);
                    }
                };

                if (x < this.maxX) {
                    addNeighbor(x + 1, y); // right neighbor
                }
                if (x > this.minY) {
                    addNeighbor(x - 1, y); // left neighbor
                }
                if (y < this.maxY) {
                    addNeighbor(x, y + 1); // up neighbor
                }
                if (y > this.minY) {
                    addNeighbor(x, y - 1); // down neighbor
                }

                if (this.countries.length > 1 && !neighbors.length) {
                    throw new Error(`City in ${city.countryName} has no neighbors`);
                }

                city.neighbors = neighbors;
            }
        }
    }

    startDiffusionEmulation() {
        this.countriesGrid = new GridDictionary();
        const result = new Map();
        let currentDay = 0;

        do {
            this.countries.forEach((country) => {
                country.cities.forEach((city) => {
                    city.transportCoinsToNeighbors();
                });

                if (country.isCompleted()) {
                    if (!result.has(country.name)) {
                        result.set(country.name, currentDay);
                    }
                }
            });

            this.countries.forEach((country) => {
                country.cities.forEach((city) => {
                    city.updateCoins();
                });
            });
            currentDay += 1;
        } while (!this.isCompleted());

        // check if result have all countries
        this.countries.forEach((country) => {
            if (!result.has(country.name)) {
                result.set(country.name, currentDay);
            }
        });

        return result;
    }

    diffusionResult(diffusionResult) {
        const results = [];
        for (const [countryName, days] of diffusionResult.entries()) {
            results.push(`${countryName} ${days}`);
        }
        return results.join('\n');
    }
}

export default MapGrid;
