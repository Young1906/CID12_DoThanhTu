class Form {
    $container;
    $input_container;
    $btn_submit;
    inputs = []; // hold all input components
    form_data;


    constructor(form_label, data) {
        // data : array<struct<label, id>>
        this.$container = document.createElement("div");
        this.$container.classList.add("form");

        // div hold label
        let label_div = document.createElement("div");
        label_div.classList.add("form__label");

        let label_spn = document.createElement("span");
        label_spn.classList.add("form__labelSpan");
        label_spn.innerText = form_label;

        label_div.appendChild(label_spn);
        this.$container.appendChild(label_div);

        // input_container;
        this.$input_container = document.createElement("div");
        this.$input_container.classList.add("form__inputContainer");


        for (let entry of data){
            let input = new Input(entry.label, entry.id);
            
            // save object into form attribute
            this.inputs.push(input);

            // render:
            this.$input_container.appendChild(input.render());
        }

        this.$container.appendChild(this.$input_container)

        // button
        let btn_div = document.createElement("div");
        btn_div.classList.add("form__btnDiv")

        this.$btn_submit = document.createElement("button");
        this.$btn_submit.innerText = "Submit";
        this.$btn_submit.classList = "form__submitBtn";

        btn_div.appendChild(this.$btn_submit)
        this.$container.appendChild(btn_div);



    }

    render = () => {
        return this.$container
    }
}

class Input {
    $container;
    $label;
    $txtbox;
    
    value;
    
    constructor (label, id) {
        this.$container = document.createElement("div");
        this.$container.classList.add("input");

        // Input label
        this.$label = document.createElement("label");
        this.$label.classList.add("input__label");
        this.$label.for = id;
        this.$label.innerText = label;

        // Input textbox
        this.$txtbox = document.createElement("input");
        this.$txtbox.id = id;
        this.$txtbox.classList.add("input__txtbox")
    }

    render = () => {
        this.$container.appendChild(this.$label);
        this.$container.appendChild(this.$txtbox);

        return this.$container;
    }

    get_val = () => {
        return [this.$txtbox.id, this.$txtbox.value]
    }


}





export { Form }