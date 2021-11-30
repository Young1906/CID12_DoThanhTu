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
        
        // main color
        let hexStr = `rgb(${r},${g},${b})`
        
        // slightly more transparent color
        let hexAlternate = `rgb(${r},${g},${b},0.8)`    
        return {main: hexStr, alternate: hexAlternate};
    }

    

    color = this.rand_color();
    html;
    answer;

    // store value if the puzzle have been clicked
    isClicked

    constructor(n) {
        let rootDiv = document.createElement("div");
        rootDiv.classList += "app"
        
        let answer = Math.floor(Math.random()*n);

        for (let i = 0; i < n; i++){
            let box;
            if (i == answer){
                box = new Box(this.color.alternate);
                
                // store answer to attribute anwser
                this.answer = box.html.id;
                // console.log(box.html.id);
            }
                
            else
                box = new Box(this.color.main);
            rootDiv.appendChild(box.html);
        }

        this.isClicked = false;

        rootDiv.addEventListener("click", this.handleClick);
        this.html = rootDiv;
    }

    handleClick = (event) => {
        if ( !this.isClicked ) {
            let d = document.createElement("div");
            let s = document.createElement("s");

            d.appendChild(s);

            if (event.target.id === this.answer){
                s.classList.add("correct");
                s.innerText = "CORRECT";
                event.target.appendChild(d);
            } else {
                s.classList.add("wrong");
                s.innerText = "WRONG";
                event.target.appendChild(d);
            }
            // after click, no more clicking bro
            this.isClicked = true;

            // emit event to parent and restart the same
            setTimeout(() => {
                console.log("[*] Sending event result ...")
                let EventResult = new CustomEvent("result", {bubbles:true, detail:{result:s.innerText}});
                this.html.dispatchEvent(EventResult);    
            }, 100);
            
        }
    }

    
}
export { Box, Puzzle };