/**
 * A base calculator object
 *
 * @param title (string): The title displayed at the top of the calculator. eg) 'Distance Calculator'
 * @param name (string): The name used for binding a calculator to its controller. eg) 'distance'
 * @param description (string[]): The calculator's description displayed at the top of the calculator
 * @param decimalPlaces (int): How many digits to display after the decimal. eg) 3
 * @param inputs (Input[]): The calculator's inputs
 * @param outputs (Output[]): The calculator's outputs
 * @param color (ColorTheme): The calculator's color theme. eg) new ColorTheme('red')
 * @param errors (string[]): The calculator's errors (if any) currently happening. eg) ['X cannot be negative', 'X cannot be greater than 50']
 */
function Calculator(
	title = '',
	name = '',
	description = [],
	inputs = [],
	outputs = [],
	calculate = function() { return undefined; },
	colorTheme = new ColorTheme('default'),
	decimalPlaces = 'Auto',
	errors = []
) {
	this.title = title;
	this.name = name;
	this.description = description;
	this.inputs = inputs;
	this.outputs = outputs;
	this.calculate = calculate;
	this.colorTheme = colorTheme;
	this.decimalPlaces = decimalPlaces;
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
		for (let key in this.inputOutputs) {
			this.inputOutputs[key].value = this.inputOutputs[key].defaultValue;
		}

		this.errors = [];
	}

	/**
	 * Truncates the outputs of type 'number' so they only contain a certain number of digits after
	 * the decimal
	 */
	this.truncateOutputs = function() {
		if(this.decimalPlaces === 'Auto') { return; }

		for (let key in this.outputs) {
			if(this.outputs[key].type === 'number') {
				this.outputs[key].value = parseFloat(this.outputs[key].value.toFixed(this.decimalPlaces));
			}
		}
	}
}

/**
 * Represents a calculator input. The default value is set to the initial value given.
 * 
 * @param name (string): The name of the input, which is shown to the user. eg) 'Point 1'
 * @param value (mixed): The initial value of the input. eg) 5
 * @param hint (string): The placeholder text used for the input. eg) 'eg) 1,2,3'
 */
function Input(name, value, hint) {
	this.name = name;
	this.value = value;
	this.defaultValue = value;
	this.hint = hint;
}

/**
 * Represents a calculator output. The default value is set to the initial value given.
 * 
 * @param name (string): The name of the output, which is shown to the user. eg) 'Total'
 * @param value (mixed): The initial value of the output. eg) 0
 * @param type (string): The type of the output. eg) 'number'
 */
function Output(name, value, type) {
	this.name = name;
	this.value = value;
	this.defaultValue = value;
	this.type = type;
}
