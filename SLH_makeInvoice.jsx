﻿// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// Set the properties
#include "build_props.jsx"
#include "SLH_functions.jsx"

// in case we double clicked the file
//app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

// Set the ruler units to pixels 
// TODO: reset this at the end to the default. ?
var strtRulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;

// Open the invoice template
// Old Hard Coded Version
// var docRef = open(new File("C:\\Adobe CS6\\nwhomephoto\\template\\invoice.psd"));
// New relative path version, relative to the JSX file.
var parentFolder = File($.fileName).parent;  // The parent folder for this very JSX file.
var docRef = open(new File(parentFolder + "/template/invoice.psd"));  // open the invoice.psd file. 

// Company
// addLineText(docRef, 50, 130, "company", '8494C3', "Hanson Photo Group", 28, false, false, Justification.LEFT);
// Name
addLineText(docRef, 14, 263, "name", '000000', "Stephen Hanson", 12, false, false, Justification.LEFT);

// Date
addLineText(docRef, 1835, 205, "date", '000000', date, 12, false, false, Justification.LEFT);
// Invoice Number
invoicenumber = new Date(date);
invoicenumber = invoicenumber.getFullYear() + '' + (invoicenumber.getMonth()+1) + '' + invoicenumber.getDate(); 
addLineText(docRef, 1835, 263, "invoicenumber", '000000', invoicenumber, 12, false, false, Justification.LEFT);
// jobname
addLineText(docRef, 14, 1140, "jobname", '000000', jobname, 12, false, false, Justification.LEFT);
// address
// addLineText(docRef, 4, 1208, "address", '000000', address, 12, false, false, Justification.LEFT);
// price
addLineText(docRef, 1900, 1140, "price", '000000', "$"+shoot_price, 12, false, false, Justification.LEFT);
// contact
addLineText(docRef, 14, 711, "contact", '000000', agent, 12, false, false, Justification.LEFT);
// phone
addLineText(docRef, 14, 774, "phone", '000000', phone, 12, false, false, Justification.LEFT);
// email
addLineText(docRef, 14, 837, "email", '000000', email, 12, false, false, Justification.LEFT);
// photos link 
addLineText(docRef, 16, 1950, "url", '000000', "photos at:", 12, false, false, Justification.LEFT);
addLineText(docRef, 16, 2018, "url", '000000', "https://s3.amazonaws.com/aws-website-hansonphotogroup-2pp1h/RealEstate/" + url + "/index.html", 8, false, false, Justification.LEFT);
// paypall
addLineText(docRef, 16, 2210, "paypal", '000000', "Please mail check, or send payment via PayPal to:", 12, false, false, Justification.LEFT);
addLineText(docRef, 16, 2280, "paypalemail", '000000', "stevelukehanson@gmail.com", 12, false, false, Justification.LEFT);
// taxrate
//addLineText(docRef, 2034, 2128, "taxrate", '000000', "9.5%", 12, false, false, Justification.LEFT);
// tax
//addLineText(docRef, 2034, 2196, "tax", '000000', "$"+(shoot_price*.095), 12, false, false, Justification.LEFT);
// total
//addLineText(docRef, 2034, 2328, "total", '000000', "$"+((shoot_price*1)+(shoot_price*.095)), 12, false, false, Justification.LEFT);
addLineText(docRef, 1900, 2328, "total", '000000', "$"+shoot_price, 12, false, false, Justification.LEFT);

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

// PDF
activeDocument.flatten();
saveFile = new File(buildpath + "/" + url + "/invoice.pdf");
//alert(buildpath);
saveOptions = new PDFSaveOptions();  
      //saveOptions.jpegQuality = 3;  
      saveOptions.layers = false; 
      saveOptions.encoding = PDFEncoding.JPEGLOW;  
      saveOptions.preserveEditing = false;
activeDocument.saveAs(saveFile, saveOptions, true, Extension.LOWERCASE);

activeDocument.close(SaveOptions.DONOTSAVECHANGES);
//docRef.close(SaveOptions.DONOTSAVECHANGES);

signalComplete("xxx-invoice-done-xxx.jpg");
