import { Clock } from "./clock.js"

class App {
    container;
    clockContainer;
    btnContainer;
    btnAdd;
    btnStartAll;
    btnPauseAll;

    allClocks = [];

    constructor(){
        this.container = document.createElement("div");
        this.container.classList.add("appContainer")

        // app button
        this.btnContainer = document.createElement("div");
        
        this.btnAdd = document.createElement("button");
        this.btnAdd.innerText = "Add Clock";
        this.btnAdd.id = "app__btnAdd";
        this.btnAdd.classList.add("btn");
        this.btnAdd.classList.add("btn-primary");

        // Start All btn
        this.btnStartAll = document.createElement("button");
        this.btnStartAll.innerText = "Start All";
        this.btnStartAll.id = "app_btnStart";
        this.btnStartAll.classList.add("btn");
        this.btnStartAll.classList.add("btn-primary");

        // Pause All btn
        this.btnPauseAll = document.createElement("button");
        this.btnPauseAll.innerText = "Pause All";
        this.btnPauseAll.id = "app_btnPause";
        this.btnPauseAll.classList.add("btn");
        this.btnPauseAll.classList.add("btn-primary");

        this.btnContainer.appendChild(this.btnAdd);
        this.btnContainer.appendChild(this.btnStartAll);
        this.btnContainer.appendChild(this.btnPauseAll);
        this.btnContainer.classList.add("btn_container")
        this.btnContainer.addEventListener("click", this.handleClick);

        this.clockContainer = document.createElement("div");
        
        // adding to conatainer
        this.container.append(this.btnContainer);
        this.container.appendChild(this.clockContainer);
    }

    handleClick = (e) => {
        if (e.target.id === "app__btnAdd"){
            let clock = new Clock();
            this.allClocks.push(clock);
            this.clockContainer.appendChild(clock.container);
        }

        if (e.target.id === "app_btnStart"){
            
            for (let clock of this.allClocks)
                clock.startClock();
        }

        if (e.target.id === "app_btnPause"){
            console.log("this");
            
            for (let clock of this.allClocks){
                clock.pauseClock();
            }
                
        }
    }
}

export {
    App
}
