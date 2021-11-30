import { App } from "./modules/MyClass.js";

let person = new App("App1", 29);
person.increase_balance(100);
console.log(person);


const rot13 = (str) => {
    s ="";

    for (let c of str) {
        let i_c = c.charCodeAt();
        let i_a = (i_c < 97) ? 65 : 97;
        s+= String.fromCharCode(i_a + (i_c - i_a + 13)%26)

    }
    return s;
}


const piglatin = (str) => {
    
    const vowel = "aeoui".split("");
    console.log(vowel);
    if (vowel.indexOf(str[0]) != -1)
        return `${word}way`

    let i = 0;
    for (let c of str) {
        if (vowel.indexOf(c.toLowerCase()) != -1)
            break;

        i++;
    }
    
    let consolnants = str.slice(0, i);
    return `${str.slice(i, str.lenght)}${consolnants}ay`;


}

const Pandovan = (m, n) => {
    let [p0,p1,p2] = [1,1,1];

    let p3, pm1;
    let pos = [];

    do {
        p3 = p0 + p1;
        p0 = p1;
        p1 = p2;
        p2 = p3;

        pos.push(p3);

    } while (p3 <= n);

    let [i, j, k] = [1,1,1];
    let l;
    let neg = [];

    do {
        l = k - j;
        neg.push(l);
        k = j;
        j = i;
        i = l;
        

        console.log(l);
    
    } while ( l >= m) ;
    

    return neg;
}


console.log(Pandovan(-500, 10));
