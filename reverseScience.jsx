// Reverse Science Module //

// This script will take an image, like a scatter plot or graph, scan it, and generate a cloud of distributed data points.
// Use these data points as sample data - grids to import and use in sample studies.
// More generally, it is a "reverse science" device, to create backwards lines of support: 
// start with a hypothesis and generate supporting data for it!  

#target photoshop
app.bringToFront();
var strtRulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;

// Scan a grid of points across the image
var grid = "";
for(x=0;x<app.activeDocument.width;x+=200)
{for(y=0;y<app.activeDocument.width;y+=200)
	{
		var theSampler = app.activeDocument.colorSamplers.add([x,y]);	
		alert(x + ', ' + y + ', ' + Math.floor(theSampler.color.rgb.red));
		app.activeDocument.colorSamplers.remove([x,y]);
		//grid += x + ',' + y + ',' + Math.floor(theSampler.color.rgb.red) + '\n';	
}}
//alert(grid);
	