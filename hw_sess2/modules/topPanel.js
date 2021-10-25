class TopPanel {
    html;
    
    correct = 0;
    wrong = 0;
    
    t0 = document.createElement("p");
    s1 = document.createElement("p");
    s2 = document.createElement("p");

    timer = 1000;

    N_GAME = 10;

    Pause = false;
    
    constructor(){

        this.html = document.createElement("div");
        this.html.classList.add("top_panel");

        // init timer
        this.t0.innerText = `TIMER: ${this.timer} ms`
        
        this.html.appendChild(this.t0);
        this.html.appendChild(this.s1);
        this.html.appendChild(this.s2);
        
    }

    Correct = () => {
        this.correct++;
        this.s1.innerText = `CORRECT: ${this.correct}`;
    }

    Wrong = () => {
        this.wrong++;
        this.s2.innerText = `WRONG: ${this.wrong}`;
    }

    Tick = () => {
        let interval = setInterval(()=>{
            if (!this.Pause) {
                if (this.timer > 0){
                    this.timer -= 100;
                    this.t0.innerText = `TIMER: ${this.timer} ms`;
                } else {
                    this.timer = 1000;
                    
                    let er = new CustomEvent("result", {bubbles:true, detail:{result:"miss"}});
                    this.html.dispatchEvent(er);    
    
                    this.N_GAME--;
                    console.log(this.N_GAME);
                    // if (this,this.N_GAME === 0)
                }
    
                if (this.N_GAME < 0){
                    clearInterval(interval);
                    console.log("[*] Dispatching STOP event ... ");
                    let endEvent = new CustomEvent("stop", {bubbles:true, detail:{correct: this.correct, wrong:this.wrong}});
                    this.html.dispatchEvent(endEvent);
                }
            } else {

            }
            
            
                
        }, 100);

        // send end game event
        
        
    }

    CatchPuzzleEvent = () => {
        this.Pause = true;
        this.N_GAME--;
        this.timer = 1000;
        setTimeout(() => {
            this.Pause = false;    
        }, 100);
        
    }



}

export {TopPanel}