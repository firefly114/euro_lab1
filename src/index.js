import { initGrid, diffusion, getFinalOutput } from './map';
import { areCoordinatesValid } from './helpers'
import Country from './country';
import readInputFile from './read-file';

const calculateCase = (inputStrings) => {
    try {
        const countries = [];

        inputStrings.forEach((string) => {
          const [name, ...coordinates] = string.split(' ');
          const [xl, yl, xh, yh] = coordinates.map((coordinate) => parseInt(coordinate));
          if (areCoordinatesValid(xl, yl, xh, yh)) {
            countries.push(new Country(name, { xl, yl }, { xh, yh }));
          } else {
            console.log("Error, coordinaties are invalid");
          }
        });
        const coinTypes = countries.map((country) => country.name);
        countries.forEach((country) => country.addCities(coinTypes));

        const citiesGrid = initGrid(countries);

        const result = diffusion(countries, citiesGrid);
        console.log(getFinalOutput(result));
    } catch (error) {
        console.error(error.toString());
    }
};

const countryStrings = readInputFile('input');
countryStrings.forEach((countries, index) => {
    console.log(` Case № ${index + 1}`, countries);
    calculateCase(countries);
});
