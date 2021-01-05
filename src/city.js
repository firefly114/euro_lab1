const representativeValue = 1000;
const initialCoinsValue = 1000000;
export class City {
    constructor(
        x,
        y,
        coinTypes,
        countryName,
    ) {
        this.x = x;
        this.y = y;
        this.neighbors = [];
        this.countryName = countryName;
        this.coinTypes = coinTypes;

        this.coins = coinTypes.map((type) => ({ type, value: 0 }));;
        this.income = coinTypes.map((type) => ({ type, value: 0 }));;

        this.coins[this.coinTypes.indexOf(this.countryName)].value = initialCoinsValue;
    }
    
    isCompleted() {
        return this.coins.every((coin) => coin.value > 0);
    }

    clearIncome() {
        this.coinTypes.forEach((type, index) => {
            this.coins[index].value += this.income[index].value;
            this.income[index].value = 0;
        })
    }

    shareCoins() {
        this.coins.forEach((coin, index) => {
            const share = Math.floor(coin.value / representativeValue);
            this.neighbors.forEach((city) => {
                city.income[index].value += share;
                this.coins[index].value -= share;
            });
        });
    }
}

export default City;
