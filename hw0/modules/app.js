class App {
  __name__;
  div; 
  table_div;

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

    form.appendChild(nrow.html());
    form.appendChild(ncol.html());
    form.appendChild(btn);

    form_div.appendChild(form);

    // Div to hold the table
    let table_div = document.createElement("div");
    table_div.id = uuidv4();
    table_div.classList.add("table-div")

    this.table_div = table_div;



    this.div.appendChild(form_div);
    this.div.appendChild(table_div);
  }

  handleBtnClick = (m, n) => {

    console.log("This")
    let tb = this.createTable(m, n);
    
    if (this.table_div.hasChildNodes())
      this.table_div.removeChild(this.table_div.childNodes[0]);
 
    this.table_div.appendChild(tb);

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
