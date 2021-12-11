class InputGroup{
    $container;
    $input;
    $label;
    $msg;

    constructor(type, label, name) {
        this.$container = document.createElement("div");
        this.$container.classList.add("input-group");

        this.$input = document.createElement("input");
        this.$input.type = type;
        this.$input.name = name;

        this.$label = document.createElement("label");
        this.$label.innerText = label;

        this.$msg =document.createElement("div");
        this.$msg.classList.add("error-msg");
    }

    get_input_value = () => {
        // return (this.$input.name, this.$input.value);
        return this.$input.value;
    }

    set_input_value = (val) => {
        this.$input.value = val;
    }

    setError=(msg)=>{
        if (msg) {
            this.$msg.innerText = msg;
            this.$container.classList.add("has-error");
        } else {
            this.$msg.innerText = "";
            this.$container.classList.remove("has-error");
        }
    }

    render = () => {
        this.$label.append(this.$input);
        this.$container.append(this.$label);
        this.$container.append(this.$msg);

        return this.$container;
    }
}

export { InputGroup };