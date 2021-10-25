const App = class {
    #ballance = 0;

    constructor(name, age) {
        this.age = age
        this.name = name
        this.#ballance;
    }

    increase_balance = (amt) => {
        this.#ballance += amt;
    }
}

export { App };