// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// Set the properties
#include "build_props.jsx"
#include "SLH_functions.jsx"

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

// Set the ruler units to pixels 
// TODO: reset this at the end to the default.
var strtRulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;

//  Create doc 2125 x 2750 pixels.
//  2125 x 2750 pixels = 8.5 x 11 inch doc at 250 pixels per inch
var docRef = app.documents.add(750, 800, 300, "My New Document");

//  Red Band on Top
fillArea(docRef, 0, 800, 0, 110, 182, 32, 37);

// General function that paints a rectangular area with a specified color.
function fillArea(targetDoc, x1, x2, y1, y2, r, g, b)
{
	targetDoc.selection.select(new Array (new Array(x1,y1),new Array(x2,y1), new Array(x2,y2), new Array(x1,y2)), SelectionType.REPLACE, 0, false);
	var selRef = app.activeDocument.selection;
	var fillColor = new SolidColor();
	fillColor.rgb.red  = r;
	fillColor.rgb.green = g;
	fillColor.rgb.blue = b;
	selRef.fill( fillColor, ColorBlendMode.NORMAL, 100, false );
}

// Big Photo 
addPhoto(srcpath, "1.jpg", docRef, 15, 135, 785, 615);
// Small Photos
addPhoto(srcpath, photo2, docRef, 1075, 2050, 435, 1085);
addPhoto(srcpath, photo3, docRef, 65, 705, 1125, 1555);
addPhoto(srcpath, photo4, docRef, 735, 1375, 1125, 1555);

// General function that pastes one doc into another as a layer.
function addPhoto (sourcefolder, sourcefile, pastedoc, x1, x2, y1, y2)
{ 
	var folder = new Folder(sourcefolder);
	var picArray = folder.getFiles();
	// Check if file exists; if not use a default image, the logo.
	try 
	{
		sourcefile = open(new File(sourcefolder + "/" + sourcefile));
	}
    catch (e) 
	{
		sourcefile = open(new File(picArray[sourcefile]));
	}
	sourcefile.selection.selectAll(); 
	sourcefile.selection.copy();
	activeDocument=pastedoc; 
	pastedoc.selection.select(new Array (new Array(x1,y1),new Array(x2,y1), new Array(x2,y2), new Array(x1,y2)), SelectionType.REPLACE, 0, false);
	pastedoc.paste(true);
	sourcefile.close();
}

// Headline #1
addLineText(docRef, 1065, 175, "headline1", 'ffffff', headline1, 24, true, true, Justification.CENTER);
// Headline #2
addLineText(docRef, 1065, 275, "headline2", 'ffffff', headline2, 24, false, true, Justification.CENTER);
// Headline #3
addLineText(docRef, 75, 1635, "headline3", '000000', headline3, 18, false, true, Justification.LEFT);
// Address
addLineText(docRef, 1370, 1625, "address", '000000', address, 10, true, false, Justification.LEFT);
// price
addLineText(docRef, 1384, 2025, "price", '000000', house_price, 18, false, false, Justification.LEFT);
// contact
addLineText(docRef, 75, 2650, "contact", 'ffffff', contact, 12, false, false, Justification.LEFT);
// website
addLineText(docRef, 1390, 2650, "website", 'ffffff', website, 12, false, false, Justification.LEFT);
// Presented By
addLineText(docRef, 75, 2595, "presentedby", '000000', presentedby, 12, false, false, Justification.LEFT);

function addLineText(targetDoc, x1, y1, layername, hexColor, text, fontsize, fauxbold, fauxitalic, justification)
{
	var textColor = new SolidColor;
    textColor.rgb.hexValue = hexColor;	
	var newTextLayer = targetDoc.artLayers.add();
	newTextLayer.name = layername;
	newTextLayer.kind = LayerKind.TEXT;
	newTextLayer.textItem.contents = text;
	newTextLayer.textItem.position = Array(x1, y1);
	newTextLayer.textItem.size = fontsize;
	newTextLayer.textItem.justification = Justification.LEFT;
	newTextLayer.textItem.fauxBold = fauxbold;
	newTextLayer.textItem.fauxItalic = fauxitalic;
	newTextLayer.textItem.justification = justification;
	newTextLayer.textItem.color = textColor;
}

// maintext
var textColor = new SolidColor;
//textColor.rgb.red = 0;
//textColor.rgb.green = 0;
//textColor.rgb.blue = 0;
var newTextLayer = docRef.artLayers.add();
newTextLayer.kind = LayerKind.TEXT;
newTextLayer.name = "maintext";
newTextLayer.textItem.contents = "maintext";
newTextLayer.textItem.kind=TextType.PARAGRAPHTEXT;
newTextLayer.textItem.position = Array(75, 1705);
// width and height values below are rendered at x3 value. 150 pixels here become 450 pixels plus in the flyer  Why?
// Because they are in 'points'.
newTextLayer.textItem.width = 350;
newTextLayer.textItem.height = 225;
newTextLayer.textItem.size = 11;
newTextLayer.textItem.hyphenation = false;
//newTextLayer.textItem.color = textColor;
//newTextLayer.textItem.justification = Justification.LEFT;

// boxtext
var textColor = new SolidColor;
//textColor.rgb.red = 0;
//textColor.rgb.green = 0;
//textColor.rgb.blue = 0;
var newTextLayer = docRef.artLayers.add();
newTextLayer.name = "boxtext";
newTextLayer.kind = LayerKind.TEXT;
newTextLayer.textItem.kind=TextType.PARAGRAPHTEXT;
newTextLayer.textItem.position = Array(1385, 1705);
// width and height values below are rendered at x3 value. 150 pixels here become 450 pixels plus in the flyer  Why?
newTextLayer.textItem.width = 150;
newTextLayer.textItem.height = 75;
newTextLayer.textItem.size = 12;
//newTextLayer.textItem.color = textColor;
//newTextLayer.textItem.justification = Justification.LEFT;
newTextLayer.textItem.contents = "boxtext";// boxtext boxtext boxtext boxtextboxtext boxtext boxtext boxtext boxtextboxtext boxtext boxtext boxtext boxtextboxtext boxtext boxtext boxtext boxtext";

//addAreaText(docRef, myFile);

function addAreaText(targetDoc, sourceFile)
{
	//maybe try this style:	
	var sourceDoc = sourceFile;
	app.activeDocument = sourceDoc;
	activeDocument.activeLayer = activeDocument.artLayers.getByName('name of the textlayer');
	activeDocument.activeLayer.duplicate(targetDoc); 
}

//saveTIFF();
//saveJPEG();
//savePDF();

signalComplete();

// TIFF
//saveFile = new File("C:/Documents and Settings/steveh/My Documents/My Pictures/REAL ESTATE/flyers/" +url + ".tif");
//saveOptions = new TiffSaveOptions(); 
//activeDocument.saveAs(saveFile, saveOptions, true,Extension.LOWERCASE);
