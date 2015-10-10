#target photoshop

#include "build_props.jsx"
#include "SLH_functions.jsx"

addFlashLayer(flashpath, flashpath);
signalComplete("xxx-flyer-done-xxx.jpg");

function addFlashLayer(sourcePath, destinationPath)
{
    // get source folder and files
    var sourceFolder = new Folder(sourcePath);
	if (!sourceFolder.exists) 
    {
		alert('The source folder does not exist: ' + sourcePath, 'Script Stopped', true);
		return;
	}

    // make the destination folder
    outputFolder = new Folder(destinationPath + "/results");
    if(!outputFolder.exists) outputFolder.create();

    // Check to see if any of the images have the label color 'yellow'.  
    // If so, load the yellow thumbnails into the Flash layering machine.
/*    
    var sourceFiles = getFilesFunc(sourceFolder);
	if(sourceFiles.length > 0)
	for(i=0;i<sourceFiles.length;i+=1) 
    {
        // check each thumbnail to see if it is yellow or not
        var t = new Thumbnail (new File(sourceFiles[i]));      
        alert(t);
        var mdata = t.metadata;
        alert(mdata.label);
     }
*/
    // iterate through files two-by-two
    var sourceFiles = getFilesFunc(sourceFolder);
	if(sourceFiles.length > 0)
	for(i=0;i<sourceFiles.length;i+=2) 
    {
        // make a document with two layers from the pics, dark layer on botom, bright layer on top
        var darkImage = open(new File(sourceFiles[i]));
	    var brightImage = open(new File(sourceFiles[i+1]));
        brightImage.selection.selectAll();
        brightImage.selection.copy();
        brightImage.close(SaveOptions.DONOTSAVECHANGES);
        activeDocument = darkImage;
        darkImage.selection.selectAll();
        var newLayer = darkImage.paste(true);

   	// Lower opacity of top flash layer to 50% 
        newLayer.opacity = 50;
        var tifDoc = darkImage.duplicate();
        var jpgDoc = darkImage.duplicate();
        app.activeDocument = darkImage;
        darkImage.close(SaveOptions.DONOTSAVECHANGES);

        // save as jpg in the 'best' folder
        app.activeDocument = jpgDoc;
        jpgDoc.flatten();
        var saveDoc = new File(outputFolder + "/" + jpgDoc.name);
        var saveOptions = new JPEGSaveOptions(); 
        jpgDoc.saveAs(saveDoc, saveOptions, true, Extension.LOWERCASE);
        jpgDoc.close(SaveOptions.DONOTSAVECHANGES);
        //jpgDoc.close(SaveOptions.DONOTSAVECHANGES);

        // save as tiff in the 'results' folder      
        app.activeDocument = tifDoc;
//        app.activeDocument.activeChannels = [app.activeDocument.channels.getByName('Red')];  
        var saveDoc = new File(outputFolder + "/" + tifDoc.name);
        var saveOptions = new TiffSaveOptions(); 
        tifDoc.saveAs(saveDoc, saveOptions, true, Extension.LOWERCASE);
        tifDoc.close(SaveOptions.DONOTSAVECHANGES);

    }
    return;

}


// General function that pastes one doc into another as a layer.
function addLayer (pic, basepic)
{ 
	sourcefile.selection.selectAll(); 
	sourcefile.selection.copy();
	activeDocument=basepic; 
	basepic.selection.selectAll();
	pic.paste(true);
}