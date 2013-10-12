
#target photoshop
app.bringToFront();
var strtRulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;


var myDoc = app.activeDocument; 

if(myDoc.mode != DocumentMode.GRAYSCALE && myDoc.mode != DocumentMode.BITMAP){ 

var docWidth = myDoc.width; 
var docHeight = myDoc.height; 
var xPos = 0; 
var yPos = 0; 

app.activeDocument.colorSamplers.removeAll(); 
var pixelLoc = [UnitValue(0) , UnitValue(0)]; 
var myColorSampler = app.activeDocument.colorSamplers.add(pixelLoc); 

for(xPos = 0; xPos <= docWidth; xPos++) 
{ 
var myColor = myColorSampler.color; 
var hsb_H = myColor.hsb.hue; 
var hsb_S = myColor.hsb.saturation; 
var hsb_B = myColor.hsb.brightness; 
$.writeln (hsb_H + "/" + hsb_S + "/" + hsb_B) 
if( hsb_H != 0 || hsb_S != 0){ 
alert("Bild ist farbig!"); 
break;} 

if(xPos == docWidth) 
{ 
xPos = 0; 
yPos++; 
if(yPos == docHeight){ 
alert("Bild ist ein Graustufenbild."); 
break; 
} 
pixelLoc[1] = yPos; 
} 
else 
{ 
myColorSampler.move(pixelLoc); 
pixelLoc[0] = xPos; 
} 
} 
}