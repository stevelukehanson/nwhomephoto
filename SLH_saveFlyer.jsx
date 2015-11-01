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
var strtRulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;

var tifDoc = activeDocument.duplicate("masterFlyer_" + url + ".tif");
var jpgDoc = activeDocument.duplicate("emailableFlyer" + ".jpg");
var pdfDoc = activeDocument.duplicate("printableFlyer" + ".pdf");
var tifFolder = new Folder(buildpath + "/" + url);
var jpgFolder = new Folder(buildpath + "/" + url);
var pdfFolder = new Folder(buildpath + "/" + url);
tifFolder.create();
jpgFolder.create();

// TIFF
app.activeDocument = tifDoc;
var saveDoc = new File(tifFolder + "/" + tifDoc.name);
var saveOptions = new TiffSaveOptions(); 
tifDoc.saveAs(saveDoc, saveOptions, true, Extension.LOWERCASE);
tifDoc.close(SaveOptions.DONOTSAVECHANGES);

// Save the doc in the build folder.
// JPEG
app.activeDocument = jpgDoc;
jpgDoc.flatten();
jpgDoc.resizeImage(UnitValue(700,"px"),null,null,ResampleMethod.BICUBICSHARPER);
var saveDoc = new File(jpgFolder + "/" + jpgDoc.name);
var saveOptions = new JPEGSaveOptions(); 
jpgDoc.saveAs(saveDoc, saveOptions, true, Extension.LOWERCASE);
jpgDoc.close(SaveOptions.DONOTSAVECHANGES);

// PDF
app.activeDocument = pdfDoc;
pdfDoc.flatten();
var saveDoc = new File(pdfFolder + "/" + pdfDoc.name);
var saveOptions = new PDFSaveOptions(); 
      saveOptions.encoding = PDFEncoding.JPEGMED;  
pdfDoc.saveAs(saveDoc, saveOptions, true, Extension.LOWERCASE);
pdfDoc.close(SaveOptions.DONOTSAVECHANGES);

signalComplete("xxx-flyer-save-done-xxx.jpg");