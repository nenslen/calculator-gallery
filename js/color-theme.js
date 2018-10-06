/**
 * Each calculator has a ColorTheme object to keep track of what color each group of elements on the
 * calculator should be. The text color for each group of elements is automatically chosen based on
 * the color of the element itself.
 * 
 * @param name: The name of the color theme. eg) 'Dark Red'
 * @param inputs: The color of the input elements. eg) 'red'
 * @param outputs: The color of the output elements. eg) 'blue'
 * @param backgroundColor: The color of the background element. eg) 'green'
 */
function ColorTheme(name, inputColor = 'default', outputColor = 'default', backgroundColor = 'default') {
	this.name = name;
	this.inputColor = inputColor;
	this.outputColor = outputColor;
	this.backgroundColor = backgroundColor;
}
