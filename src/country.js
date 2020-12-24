import City from './city';
import { forEachCoords } from './helpers';

class Country {
    constructor(name, SWcity, NEcity) {
        this.cities = [];
        this.name = name;
        this.xl = SWcity.xl
        this.yl = SWcity.yl
        this.xh = NEcity.xh
        this.yh = NEcity.yh
    } 
    addCities(types) {
        forEachCoords(
            this.xl,
            this.yl,
            this.xh,
            this.yh,
            (x, y) => this.cities.push(new City(x, y, types, this.name)));
    }

    isCompleted() {
        return this.cities.every((city) => city.isCompleted());
    }
}

export default Country;
