import { Box, Puzzle } from "./modules/box.js"
import { TopPanel } from "./modules/topPanel.js"
// random number of box
const randInt = (low, high) => {
    return low + Math.floor(Math.random() * (high - low));
}

const MountPoint = document.getElementById("container");

let top_panel = new TopPanel();
MountPoint.appendChild(top_panel.html);
top_panel.Tick();
// First run
let puzzle = new Puzzle(randInt(5, 15));
MountPoint.appendChild(puzzle.html);

// top_panel.Tick();
// Catch result
MountPoint.addEventListener("result", (e)=>{
    // Clear
    MountPoint.removeChild(puzzle.html);

    // reset timer, -game;
    if (e.detail.result == "CORRECT") {
        top_panel.Correct();
        // top_panel.CatchPuzzleEvent();
    }
        

    if (e.detail.result == "WRONG") {
        top_panel.Wrong();
        // top_panel.CatchPuzzleEvent();
        
    }
        

    puzzle = new Puzzle(randInt(5, 15));
    MountPoint.append(puzzle.html);
})

// catch end signal
MountPoint.addEventListener("stop", (e)=>{
    console.log("This");
    alert(`GAMEOVER, correct: ${e.detail.correct}, wrong: ${e.detail.wrong}`);
})