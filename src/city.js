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

        const defaultCoins = coinTypes.map((type) => ({ type, value: 0 }));
        this.defaultCoins = defaultCoins
        this.coins = defaultCoins;
        this.income = defaultCoins;
        
        this.coins[this.coins.findIndex((coin) => coin.type === countryName)].value = 1000000;
    }

    isCompleted() {
        return this.coins.every((coin) => coin.value > 0);
    }

    clearIncome() {
        this.coins.map((coin, index) => {
            return {
                ...coin,
                value: this.income[index].value
            };
        })
        this.income = this.defaultCoins;
    }

    shareCoins() {
        this.coins.forEach((coin, index) => {
            const share = Math.floor(coin.value / 1000);
            this.neighbors.forEach((city) => {
                city.income[index].value += share;
                this.coins[index].value -= share;
            });
        });
    }
}

export default City;
