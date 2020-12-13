import MapGrid from './map';
import Country from './country';
import FileRead from './read-file';

const calculateCase = (inputStrings) => {
    try {
        const countries = [];
        inputStrings.forEach((string) => {
          const [name, ...coordinates] = string.split(' ');
          const [xl, yl, xh, yh] = coordinates.map((coordinate) => parseInt(coordinate));
          countries.push(new Country(name, { xl, yl, xh, yh }));
        });
        const MG = new MapGrid(countries);
        const result = MG.startDiffusionEmulation();
        console.log(MG.diffusionResult(result));
    } catch (error) {
        console.error(error.toString());
    }
};

(() => {
    const r = new FileRead();
    const countryStrings = r.parseInput('input');
    countryStrings.forEach((countries, index) => {
        console.log(` Case № ${index + 1}`, countries);
        calculateCase(countries);
    });
})();
