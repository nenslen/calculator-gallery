/**
 * A base calculator object
 *
 * @param title: The title displayed at the top of the calculator. eg) 'Distance Calculator'
 * @param name: The name used for binding a calculator to its controller. eg) 'distance'
 * @param description: An array of strings used to describe the calculator
 * @param inputs: An array of Input objects representing the inputs to the calculator
 * @param outputs: An array of Output objects representing the outputs to the calculator
 * @param color: The color scheme for the calculator. eg) 'red'
 * @param errors: An array of strings representing the errors (if any) currently happening for the
 * 	calcuator. eg) ['X cannot be negative', 'X cannot be greater than 50']
 */
function Calculator(
	title = '',
	name = '',
	description = '',
	inputs = [],
	outputs = [],
	colorTheme = new ColorTheme('default'),
	errors = []
) {
	this.title = title;
	this.name = name;
	this.description = description;
	this.inputs = inputs;
	this.outputs = outputs;
	this.colorTheme = colorTheme; 
	this.errors = errors;

	/**
	 * Resets all inputs and outputs to their default values.
	 */
	this.reset = function() {
		for (let key in this.inputs) {
			this.inputs[key].value = this.inputs[key].defaultValue;
		}
		for (let key in this.outputs) {
			this.outputs[key].value = this.outputs[key].defaultValue;
		}

		this.errors = [];
	}
}

/**
 * Used for holding calculator inputs. The default value is set to the initial value given.
 * 
 * @param name: The name of the input, which is shown to the user eg) 'Point 1'
 * @param value: The initial value of the input. eg) 5
 */
function Input(name, value) {
	this.name = name;
	this.value = value;
	this.defaultValue = value;
}

/**
 * Used for holding calculator outputs. The default value is set to the initial value given.
 * 
 * @param name: The name of the output, which is shown to the user. eg) 'Total'
 * @param value: The initial value of the output. eg) 0
 */
function Output(name, value) {
	this.name = name;
	this.value = value;
	this.defaultValue = value;
}
