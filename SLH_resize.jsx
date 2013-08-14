//var scriptFile = new File("C:/dev/nwhomephoto_dev/ant_build/SLH_functions.jsx");
//$.evalFile(scriptFile, 30000);
//var scriptFile2 = new File("C:/dev/nwhomephoto_dev/ant_build/build_props.jsx");
//$.evalFile(scriptFile2, 30000);
//var scriptFile3 = new File("C:/dev/nwhomephoto_dev/ant_build/SLH_resize.jsx");
//$.evalFile(scriptFile3, 30000);

// enable double-clicking from Mac Finder or Windows Explorer
// this command only works in Photoshop CS2 and higher
#target photoshop

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
$.level = 0;

#include "build_props.jsx";
#include "SLH_functions.jsx";

// bring application forward for double-click events
//app.bringToFront();

batchResize2(resizepath, [200,300,400,500], resizepath);

//batchResize2(resizepath, sizesArray, destinationpath);

signalComplete("xxx-resize-done-xxx.jpg");