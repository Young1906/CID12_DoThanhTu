import {
    Register
} from "./components/register.js"


let root = document.createElement("div");
root.classList.add("root");

let register = new Register();
// uname.setError("Error")
root.appendChild(register.render());

document.body.appendChild(root);