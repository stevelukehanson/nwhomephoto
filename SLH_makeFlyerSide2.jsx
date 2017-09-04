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
var docRef = app.documents.add(2125, 2750, 250, "My New Document");

//  Red Band on Top
fillArea(docRef, 0, 2125, 0, 105, 182, 32, 37);
// Red Band on Bottom
fillArea(docRef, 0, 2125, 2645, 2750, 182, 32, 37);

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

// Photos
// Parameters are as follows: addphoto(path, pic integer, targetdoc, x1, x2, y1, y2)
addPhoto(resizepath + "/JPEG_975", photo1, docRef, 100, 160, 1040, 775);
addPhoto(resizepath + "/JPEG_975", photo2, docRef, 1080, 160, 2015, 770);
addPhoto(resizepath + "/JPEG_975", photo3, docRef, 100, 820, 1045, 1465);
addPhoto(resizepath + "/JPEG_975", photo4, docRef, 1080, 820, 2015, 1465);
//    var folder = new Folder(resizepath + "/JPEG_975");
//    var picArray = getFilesFunc(folder);
//    var p5 = open(new File( picArray[photo5-1] ));
//    p5 = p5.resizeImage(UnitValue(1200,"px"),null,null,ResampleMethod.BICUBIC);
//    addPhoto(resizepath + "/JPEG_full", p5, docRef, 100, 1515, 2015, 2580);
addPhoto(resizepath + "/JPEG_full", photo5, docRef, 100, 1515, 2015, 2580);

// Logo
//addLogo("C:/dev/nwhomephoto_dev/ant_build/resources", "logo.psd", docRef, 1350, 2045, 2090, 2595);

// General function that pastes one doc into another as a layer.
function addPhoto (sourcefolder, pic, pastedoc, x1, y1, x2, y2)
{
    var folder = new Folder(sourcefolder);
    var picArray = getFilesFunc(folder);
    //var picArray = folder.getFiles();
    //for(i=0;i<=picArray.length;i++) {
        //alert(picArray[i].name);
        //}
    var sourcefile = open(new File( picArray[pic-1] ));
	sourcefile.selection.selectAll(); 
	sourcefile.selection.copy();
	activeDocument=pastedoc; 
	pastedoc.selection.select(new Array (new Array(x1,y1),new Array(x2,y1), new Array(x2,y2), new Array(x1,y2)), SelectionType.REPLACE, 0, false);
	pastedoc.paste(true);
	sourcefile.close();
}


// General function that pastes one doc into another as a layer.
function addLogo (sourcefolder, pic, pastedoc, x1, x2, y1, y2)
{ 
    var folder = new Folder(sourcefolder);
	var picArray = folder.getFiles();
    var sourcefile = open(new File( sourcefolder + '/' + pic ));
	sourcefile.selection.selectAll(); 
	sourcefile.selection.copy();
	activeDocument=pastedoc; 
	pastedoc.selection.select(new Array (new Array(x1,y1),new Array(x2,y1), new Array(x2,y2), new Array(x1,y2)), SelectionType.REPLACE, 0, false);
	pastedoc.paste(true);
	sourcefile.close();
}

// Headline #1
//addLineText(docRef, 1065, 175, "headline1", 'ffffff', headline1, 24, true, true, Justification.CENTER);
// Headline #2
//addLineText(docRef, 1065, 275, "headline2", 'ffffff', headline2, 24, false, true, Justification.CENTER);
// Headline #3
//addLineText(docRef, 75, 1635, "headline3", '000000', headline3, 18, false, true, Justification.LEFT);
// Address
//addLineText(docRef, 1370, 1625, "address", '000000', address, 10, true, false, Justification.LEFT);
// price
//addLineText(docRef, 1384, 2025, "price", '000000', house_price, 18, false, false, Justification.LEFT);
// contact
addLineText(docRef, 75, 2730, "contact", 'ffffff', contact, 12, false, false, Justification.LEFT);
// website
addLineText(docRef, 1390, 2730, "website", 'ffffff', website, 12, false, false, Justification.LEFT);
// Presented By
//addLineText(docRef, 75, 2595, "presentedby", '000000', presentedby, 12, false, false, Justification.LEFT);

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

signalComplete("xxx-flyer-done-xxx.jpg");