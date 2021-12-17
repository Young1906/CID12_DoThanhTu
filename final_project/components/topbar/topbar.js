import { makeElem } from "../../utils/utils.js";
import { makeIcon } from "../../utils/utils.js";

class Topbar {
    $container;
    $searchbar__container;
    $searchbar__input;
    $searchbar__btn;

    constructor(){
        this.$container = makeElem("div", "app__topbar");
        this.$searchbar__container = makeElem("div", "searchbar__container");
        this.$searchbar__input = makeElem("input", "searchbar__input");
        this.$searchbar__btn = makeElem("button", "searchbar__btn");
        this.$searchbar__btn.innerText = "Search";
    }

    render(){
        this.$searchbar__container.appendChild(this.$searchbar__input);
        this.$searchbar__container.appendChild(this.$searchbar__btn);

        this.$container.appendChild(this.$searchbar__container);
        return this.$container;
    }
}

export { Topbar }