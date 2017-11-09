 --------------------------------
| Photoshop Automation Workflows |
 --------------------------------

This software automates a number of Photoshop tasks: 

- Copying images files from the camera card to the computer (in a nice, organized way).
- Luminosity layers, which pastes a tungsten-illuminated image over a base sunlight-illuminated image.
- Batch Resizing of images
- Creating client-facing web pages
- Flash layers, which pastes a flash-illuminated image over a base non-flash image.
- HDR, which composites multiple images into one single, tonally hybrid image. (This is pretty old, and has been replaced with manual steps inside Photomatix).

The software is run from the command line, via Ant tasks.  The following example will process a batch of "luminosity layer" files, using the properties as found in "AngelineOct2015.txt":

```
    C:\Users\steve\Documents\Adobe Scripts\nwhomephoto>ant -props=properties\AngelineOct2015.txt luminosity
```
More details below on these Ant tasks...

 -------------------------------------------
| The Big Workflow: From Camera to Web Site |
 -------------------------------------------

From a **bird's eye view**, the whole workflow looks like this:

1. Make a .txt properties file that describes the job. (Manual)
1. Copy images from the card to the computer. (Automated)
1. Manual Processes with Photomatix, Lightroom, and/or Photoshop. (Manual)
1. Combine "Lights On/Lights Off" images into Luminosity Layers. (Semi-Automated)
1. Assemble images to ship into the 'best' folder. (Manual)
1. Finalize images with Photoshop and Lightroom. (Manual)
1. Resize images into different pixel sizes. (Automated)
1. Make a client-facing web site  (Automated)
1. Make an invoice. (Automated)
1. Upload to Amazon S3. (Semi-Automated)

Here are the **details** for each step:

**1. Make a .txt properties file (Manual)**

- Go to the /properties folder and clone an existing .txt file. 
- Make sure the URL property is new and unique.
- (Gory details, don't worry if this makes no sense: This .txt file is parsed by ANT, which in turn generates a Javascript properties file for the scripts to refer to.)

**2. Copy images from the card to the computer (Automated)**

- Run the following Ant command:
```
ant -Dprops=properties/MYJOB.txt copy-from-camera
```
- This will create a whole bunch of folders, and copy your images, into the location C:\Users\Pictures\RealEstate\MYJOB

**3. Manual Processes with Photomatix, Lightroom, and/or Photoshop. (Manual)**
- You have the images on your computer now. Do stuff to them. Like: process with Photomatix, Lightroom presets, paint out the garbage in in the front lawn, whatever.

**4. Combine "Lights On/Lights Off" images into Luminosity Layers. (Semi-Automated)**
- Copy pairs of Lights On/Lights Off photos into the 'luminosity-layers' directory.
- Re-order them so they go in alternating order, for each pair, Lights Off first, Lights On second.
- Re-named them so that the re-ordering gets "baked in".
- Run the following ant task:
```
ant -Dprops=properties/MYJOB.txt luminosity
```

... to be continued...


1 OLD Version of the Doc

Run Ant tasks to create processed image artifacts, in photomatix, ptlens etc.  Also package all of the artifacts as websites for upload.
    
    A typical workflow:

    i. Set the environment:
    
      ant -propertyfile=archive/somejob.properties copy-from-camera

    ii. Process the images into "luminosity layers":

      ant -propertyfile=archive/somejob.properties luminosity

    iii. Manually adjust images for color, exposure, if necessary.

    iv. Package as a website:

      ant -propertyfile=archive/somejob.properties resize web invoice show

3. Also make a flyer.  See the fields available in the .properties file.

   The following generates a flyer from the fields you specify.

      ant -propertyfile=archive/somejob.properties make-flyer

   Then manually edit the flyer.

   Finally save the flyer in different forms, file types, particularly print quality JPEG and PDF          		

      ant -propertyfile=archive/somejob.properties save-flyer

4. Upload to a web site.

   These ant targets are broken since the time Yahoo stopped supporting FTP sans SSL (sometimes called "FTPS").

   Currently using Filezilla to manually manage online content, hoping that they will expose a high-level api for FTP over SSL.

 --------------------------
| To Install This Software |
 --------------------------

Required Resources:
-------------------
Photoshop CS3 or higher (- upgrading to CS6 was painless). Comes with a JS scripting API that we will call into.
Ant 
Java SDK

Config:
-------
Photoshop requires the javascript source files (the ones that call into Photoshop) to be located in a 'safe haven', for example, 

C/users/steveh/Documents/Adobe Scripts.  

Photoshop won't run scripts that are located outside this location -- I assume because these scripts can see and directly operate on the file system?

set ANT_HOME and ANT_HOME/bin on the PATH
set JAVA_HOME and JAVA_HOME/bin on PATH

(Running devEnv.cmd will do the above.)

