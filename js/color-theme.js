/**
 * Each calculator has a ColorTheme object to keep track of what color each group of elements on the
 * calculator should be. The text color for each group of elements is automatically chosen based on
 * the color of the element itself.
 * 
 * @param name (string): The unique name of the color theme, used for accessing it eg) 'darkRed'
 * @param inputs (string): The color of the input elements. eg) 'red'
 * @param outputs (string): The color of the output elements. eg) 'blue'
 * @param backgroundColor (string): The color of the background element. eg) 'green'
 */
function ColorTheme(id, name, inputColor = 'default', outputColor = 'default', backgroundColor = 'default') {
	this.id = id;
	this.name = name;
	this.inputColor = inputColor;
	this.outputColor = outputColor;
	this.backgroundColor = backgroundColor;
}
