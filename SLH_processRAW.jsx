// enable double-clicking from Mac Finder or Windows Explorer
// this command only works in Photoshop CS2 and higher
#target photoshop

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;

#include "build_props.jsx"
#include "SLH_functions.jsx"

// bring application forward for double-click events
//app.bringToFront();

RAWtoPSD(rawpath);

signalComplete();