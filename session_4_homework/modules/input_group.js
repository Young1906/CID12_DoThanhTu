class InputGroup {
    $container;
    $label;
    $input;
    $errMsg;

    constructor(label, type, name){
        this.$container = document.createElement("div");
        this.$container.classList.add("input-group");

        this.$label = document.createElement("label");
        this.$label.innerText = label;
        if (type == "textarea"){
            // let div = document.createElement("div");
            // div.classList.add("textarea_container");

            this.$input = document.createElement("textarea");
            this.$input.name = name;
            this.$input.rows = 3;

            // div.appendChild(text_area);
            // this.$input = div;
        } else {
            this.$input = document.createElement("input");
            this.$input.type = type;
            this.$input.name = name;
        }

        this.$input.classList.add("input-group__input");

        this.$errMsg = document.createElement("div");
        this.$errMsg.classList.add("input-group__errmsg")
        this.$errMsg.innerText = "";
    };

    render(){
        this.$label.appendChild(this.$input);
        this.$container.appendChild(this.$label);
        this.$container.appendChild(this.$errMsg);

        return this.$container;
    };

    setErrMsg(msg){
        if (msg)
            this.$errMsg.innerText = msg;
        else 
            this.$errMsg.innerText = "";
    };

    getInputValue(){
        return this.$input.value;
    }

    setInputValue(value){
        this.$input.value = value
    }
}

export {
    InputGroup
}