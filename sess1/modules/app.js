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
        this.btnPauseAll.innerText = "Stop All";
        this.btnPauseAll.id = "app_btnPause";
        this.btnPauseAll.classList.add("btn");
        this.btnPauseAll.classList.add("btn-primary");

        this.btnContainer.appendChild(this.btnAdd);
        this.btnContainer.appendChild(this.btnStartAll);
        this.btnContainer.appendChild(this.btnPauseAll);
        this.btnContainer.classList.add("btn_container")
        this.btnContainer.addEventListener("click", this.handleClick);

        // Clock container
        this.clockContainer = document.createElement("div");

        // Catch delete event
        this.clockContainer.addEventListener("delete", (e) => {
            let to_delete_idx;
            let i = 0;
            
            for (let clock of this.allClocks) {
                if (clock.id === e.detail)
                    to_delete_idx = i;
                i++;
            }

            this.allClocks.splice(to_delete_idx, 1);
            this.clockContainer.removeChild(this.clockContainer.childNodes[to_delete_idx])
        })
        
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
            
            for (let clock of this.allClocks){
                clock.stopClock();
            }
                
        }
    }
}

export {
    App
}
