class Box {
    #html

    constructor() {
        let rootDiv = document.createElement("div");
        rootDiv.classList.add("box");
        
        this.#html = rootDiv;
    }

    html = () => {
        return this.#html;
    }

}


export {Box};