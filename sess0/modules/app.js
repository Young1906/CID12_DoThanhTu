class App {

    arr = [];
    mointPoint = "";

    constructor(mountPoint) {
        console.log(`App initializing ...`);
        this.mountPoint = mountPoint;
    }

    run = () => {
        this.arr.push(1);
        
        // standard function example
        console.log(fSum(1,2));

        // annonymous function example
        console.log(fSub(1,2));

        // ES6 arrow function
        console.log(fMul(19,21));

        // ES6 shorthand arrow function
        console.log(fDiv(19,21));
    }
}

// Function 
function fSum(a,b){
    return a + b;
}

// Annonymous function
const fSub = function(a,b){
    return a > b ? a - b : b - a;
}

// ES6 arrow function
const fMul = (a, b) => {
    return a * b;
}

// ES6 shorthand arrow function
const fDiv = (a, b) => a / b;

export { App }