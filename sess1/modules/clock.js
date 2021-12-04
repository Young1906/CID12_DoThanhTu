class Clock
{
    container;
    id;
    btnStart;
    btnPause;
    btnStop;
    btnDelete;
    digit;

    seconds = 0; //milsec
    timer = null;

    constructor(){
        this.container = document.createElement("div")
        this.id = uuidv4();
        this.container.id = this.id;

        this.container.classList.add("clock")
        this.container.addEventListener("click", this.handleClick)

        // digit
        this.digit = document.createElement("span");
        this.digit.classList.add("clock_digit")
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

        // delete clock
        this.btnDelete = document.createElement("button");
        this.btnDelete.innerText = "Delete"
        this.btnDelete.id = "clock_btnDelete";
        this.btnDelete.classList.add("btn");

        // adding all elem to container
        this.container.appendChild(this.digit);
        this.container.appendChild(this.btnStart);
        this.container.appendChild(this.btnPause);
        this.container.appendChild(this.btnStop);
        this.container.appendChild(this.btnDelete);

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
            this.stopClock();
        }

        if (event.target.id == "clock_btnDelete") {
            const eventDelete = new CustomEvent("delete", {detail: this.id, bubbles:true});
            this.container.dispatchEvent(eventDelete);
        }
    }

    startClock = () => {

        if (this.timer == null){
            this.timer = setInterval(this.updateClock, 1000)
            this.btnStart.disabled = true;
        }
            
    }

    pauseClock = () => {
        clearInterval(this.timer);
        this.btnStart.disabled = false;
    }

    stopClock = () => {
        clearInterval(this.timer);
        this.btnStart.disabled = false;
        this.digit.innerText = "00:00";
        this.seconds = 0;
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

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }