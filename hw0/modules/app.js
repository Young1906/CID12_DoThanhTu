class App {
  __name__;
  div; 
  table_div;
  prime_div;

  constructor( name ){
	this.div = document.createElement("div");
	this.__name__ == name;
	console.log(`${name} is running...`)
	
	let form_div = document.createElement("div");
	// Form part
	form_div.classList.add("form-div");
	
	let form = document.createElement("form");
	let nrow = new cInput("Rows ", "form-group");
	let ncol = new cInput("Columns ", "form-group");

	let btn = document.createElement("button");
	btn.classList.add("btn");
	btn.classList.add("btn-primary");
	btn.type = "button";
	btn.innerText = "Create table"

	btn.onclick = () => {
	  this.handleBtnClick(nrow.value(), ncol.value())
	}

	let btn_primes = document.createElement("button")
	btn_primes.classList.add("btn");
	btn_primes.classList.add("btn-primary");
	btn_primes.type = "button";
	btn_primes.innerText = "Create Prime Numbers";

	btn_primes.onclick = () => {
		this.handleBtnClick_prime(nrow.value(), ncol.value());
	}

	form.appendChild(nrow.html());
	form.appendChild(ncol.html());
	form.appendChild(btn);
	form.appendChild(btn_primes);

	form_div.appendChild(form);

	// Div to hold the table
	let table_div = document.createElement("div");
	table_div.id = uuidv4();
	table_div.classList.add("table-div")

	this.table_div = table_div;

	// div to hold primes
	let primes_div = document.createElement("div");
	primes_div.id = uuidv4();
	this.prime_div = primes_div;


	this.div.appendChild(form_div);
	this.div.appendChild(table_div);
	this.div.append(primes_div);
  }

  handleBtnClick = (m, n) => {
	let tb = this.createTable(m, n);
	
	if (this.table_div.hasChildNodes())
	  this.table_div.removeChild(this.table_div.childNodes[0]);
 
	this.table_div.appendChild(tb);

  }

  handleBtnClick_prime = (m, n) => {
	  let primes = this.getPrimeNumbers(m ,n);

	  if (this.prime_div.hasChildNodes())
	  	this.prime_div.removeChild(this.prime_div.childNodes[0])

	let div =document.createElement("div")
	let ul = document.createElement("ul");
	
	for (let prime of primes)
		{
			let li = document.createElement("li");
			li.innerText=prime;
			ul.appendChild(li)
		}
	div.appendChild(ul)
	this.prime_div.append(div)

  }

  createTable(m, n) {
	let tb = document.createElement("table");
	for (let i = 0; i < m ; i ++ ) {
	  let tr = document.createElement("tr");
	  for (let j = 0; j < n; j++ ) {
		let td =  document.createElement("td");
		td.setAttribute("contenteditable", "true");
		td.setAttribute("style",`width:${100/n}%`)
		tr.appendChild(td);
	  }
	  tb.appendChild(tr);
	}

	return tb;
  }

  getPrimeNumbers(m, n) {
	  let rs = []

	  m = m * 1.0
	  n = n * 1.0

	  const _start 	= ( m < n )	? m : n;
	  const _end 	= ( m < n ) ? n : m;

	  console.log(_start, _end)
	  
	  for (let i = _start; i <= _end; i++) {
		if(this.isPrime(i))
			rs.push(i)
	  }

	  return rs;
  }

  isPrime(n) {
	  for (let i = 2; i <= n/2; i++){
		  if ((n % i )==0){
			return false;
		  }
	  }
	  return true;
  }
}



class cInput {
  div;
  id;

  constructor(label, _class){
	// uuid for input elem;
	const id = uuidv4();
	this.id = id;

	// Div holding all html of this components
	this.div = document.createElement("div");
	this.div.classList.add(_class);
	
	let lab = document.createElement("label");
	lab.textContent = label;
	lab.setAttribute("for",id);
	
	let inp = document.createElement("input")
	inp.type = "text";
	inp.classList.add("form-control")
	inp.id = id;

	this.div.appendChild(lab);
	this.div.appendChild(inp);
  }

  value = () => {
	return document.getElementById(this.id).value;
  }

  html = () => {
	return this.div;
  };

}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
	(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}



export {
  App
};
