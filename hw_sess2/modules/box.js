import {uuidv4} from "./uuid.js"
class Box {
    html;
    // color = this.rand_color();
    
    constructor(color){
        let rDiv = document.createElement("div");
        rDiv.classList.add("box");
        // rDiv.addEventListener("click", this.handleClick);
        rDiv.id = uuidv4();
        rDiv.style.backgroundColor = color;
        this.html = rDiv;
        
    }

    // // method
    // handleClick = (event, data) => {
    //     console.log(this.rand_color());
    // }

    
}


class Puzzle {
    // randomize color
    rand_int = (low, high) => {
        return Math.floor(Math.random() * (high - low))+low;
    }

    rand_color = () => {
        /*
            Return 2 color, that is slightly different from each other
        */
        let [r,g,b] = [this.rand_int(0, 255), this.rand_int(0, 255), this.rand_int(0, 255)];
        let hexStr = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
        let hexAlternate = `#${(Math.floor(.5*r)).toString(16)}${g.toString(16)}${b.toString(16)}`
        // console.log(hexStr, hexAlternate);
        return {main: hexStr, alternate: hexAlternate};
    }

    

    color = this.rand_color();
    html;
    answer;
    constructor(n) {
        let rootDiv = document.createElement("div");
        rootDiv.classList += "app"
        
        let answer = Math.floor(Math.random()*n);

        for (let i = 0; i < n; i++){
            let box;
            if (i == answer){
                box = new Box(this.color.alternate);
                
                // store answer to attribute anwser
                this.answer = box.id;
            }
                
            else
                box = new Box(this.color.main);
            rootDiv.appendChild(box.html);
        }

        rootDiv.addEventListener("click", this.handleClick);
        this.html = rootDiv;
    }

    handleClick = (event) => {
        console.log(event.target.id);
        console.log(this.answer);
        if (event.target.id === this.answer)
            console.log(true);
    }

    
}
export { Box, Puzzle };