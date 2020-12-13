const MIN_COORDINATE = 1;
const MAX_COORDINATE = 10;
const NAME_MAX_LENGTH = 25;

class Country {
    constructor(name, coordinates) {
        if (!this.areCoordinatesValid(coordinates)) {
            throw new Error('Coordinates are invalid');
        }
        if (name.length > NAME_MAX_LENGTH) {
            throw new Error(`Name must be less than ${NAME_MAX_LENGTH} characters`);
        }
        this.cities = [];
        this.name = name;
        this.coordinates = coordinates;
    }

    areCoordinatesValid({ xl, yl, xh, yh }) {
        const isCorrectLowHighRange = (low, high) => {
            return low <= high;
        };

        const isIntegerInBounds = (coordinate) => {
            if (!Number.isInteger(coordinate)) return false;
            return ((coordinate >= MIN_COORDINATE) && (coordinate <= MAX_COORDINATE));
        };

        return [isIntegerInBounds(xl),
            isIntegerInBounds(yl),
            isIntegerInBounds(xh),
            isIntegerInBounds(yh),
            isCorrectLowHighRange(xl, xh),
            isCorrectLowHighRange(yl, yh)]
            .every((result) => result === true);
    }

    addCity(city) {
        this.cities.push(city);
    }

    isCompleted() {
        return this.cities.every((city) => city.isCompleted());
    }
}

export default Country;
