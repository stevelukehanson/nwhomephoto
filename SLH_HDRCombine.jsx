// enable double-clicking from Mac Finder or Windows Explorer
// this command only works in Photoshop CS2 and higher
#target photoshop
#include "SLH_functions.jsx"
hdrCombine()

//////////////////////////////////////////////////////////
//  hdrCombine() - combines three images in one.  //
/////////////////////////////////////////////////////////
function hdrCombine(){
    var myFolder = new Folder("C:\\Documents and Settings\\steveh\\My Documents\\My Pictures\\Real Estate\\").selectDlg("Select an Image Folder");
	var outputFolder = new Folder(myFolder + "\\Output");
	if(!outputFolder.exists) outputFolder.create();

	//var myFiles = myFolder.getFiles("*.psd");
	var myFiles = getFiles(myFolder);
	
	// loop through the files in groups of 3
	if(myFiles.length > 0)
		for(i=0;i<myFiles.length;i+=3) {

			// open the currentDoc, and the two following
			var darkImage = open(myFiles[i]);
			var normalImage = open(myFiles[i+1]);
			var brightImage = open(myFiles[i+2]);
			
			// call Action "Layers and Masks"  
			//The parameters are the name of the action, and then  
			//the action set they belong to  
			app.doAction('Layers and Masks','MyActions');

//normalImage = app.activeDocument;
//var darkLayer = normalImage.artLayers.add();
//darkLayer = darkImage.activeLayer;
//var brightLayer = normalImage.artLayers.add();
//brightLayer = brightImage.activeLayer;
//alert(normalImage.layers.length);

            // reset opacity for the top two layers (bright and dark layers) to 50%
			normalImage.artLayers[0].opacity = 50;
			normalImage.artLayers[1].opacity = 50;
			//normalImage.flatten();
			//normalImage.activeLayer.autoLevels();
			//normalImage.activeLayer.autoContrast();
			app.doAction('NoiseNinja', 'MyActions');

			// save the artifact PSD (or a save step to the Action)
			normalImage.saveAs(new File(outputFolder + "/" + normalImage.name + ".psd"));
			
			// close the three original JPGs unchanged.
			app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
			app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
			app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
			
		}
	else alert("No files in the folder.");
}
