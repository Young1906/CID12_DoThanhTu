class Clock
{
    container;
    
    btnStart;
    btnPause;
    btnStop;
    digit;

    seconds = 0;
    timer = null;

    constructor(){
        this.container = document.createElement("div")
        this.container.classList.add("clock")
        this.container.addEventListener("click", this.handleClick)

        // digit
        this.digit = document.createElement("span");
        this.digit.innerText = "00:00";

        // button
        this.btnStart = document.createElement("button");
        this.btnStart.innerText = "Start";
        this.btnStart.id = "clock__btnStart";
        this.btnStart.classList.add("btn_start");
        this.btnStart.classList.add("btn");
        this.btnStart.classList.add("btn-primary");


        this.btnStop = document.createElement("button");
        this.btnStop.innerText = "Stop";
        this.btnStop.id = "clock__btnStop";
        this.btnStop.classList.add("btn_stop");
        this.btnStop.classList.add("btn");
        this.btnStop.classList.add("btn-danger");
        

        this.btnPause = document.createElement("button");
        this.btnPause.innerText = "Pause";
        this.btnPause.classList.add("btn_pause");
        this.btnPause.classList.add("btn");
        this.btnPause.classList.add("btn-warning");
        this.btnPause.id = "clock__btnPause";

        // adding all elem to container
        this.container.appendChild(this.digit);
        this.container.appendChild(this.btnStart);
        this.container.appendChild(this.btnPause);
        this.container.appendChild(this.btnStop);

        console.log(this.formatSecond(250));
    }   

    handleClick = (event) => {
        // console.log(event.target);
        if (event.target.id == "clock__btnStart"){
            this.startClock()
        }

        if (event.target.id == "clock__btnPause"){
            this.pauseClock();
        }

        if (event.target.id == "clock__btnStop") {
            clearInterval(this.timer);
            this.btnStart.disabled = false;
            this.digit.innerText = "00:00";
            this.seconds = 0;
        }
    }

    startClock = () => {
        this.timer = setInterval(
            this.updateClock, 1000)
        
        this.btnStart.disabled = true;
    }

    pauseClock = () => {
        clearInterval(this.timer);
        this.btnStart.disabled = false;
    }

    updateClock = () => {
        this.seconds++;
        this.digit.innerText = this.formatSecond(this.seconds);
    }

    formatSecond(s){
        let m = Math.floor(s/60);
        let sec = s % 60;

        return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }
}

export {
    Clock
};