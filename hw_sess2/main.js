import { Box, Puzzle } from "./modules/box.js"


const MountPoint = document.getElementById("container");

// Top panel
let puzzle = new Puzzle(12);

MountPoint.appendChild(puzzle.html);