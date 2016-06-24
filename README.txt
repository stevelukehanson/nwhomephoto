 ---------------------------
| Image Compositor Workflow |
 ---------------------------

This software composites images in a number of ways:

- HDR, which composites multiple images into one single, tonally hybrid image.
- Flash layers, which pastes a flash-illuminated image over a base non-flash image.
- Luminosity layers, which pastes a tungsten-illuminated image over a base sunlight-illuminated image.

It also provides utility functions (such as batch resizing), necessary when herding lots of images around into some finished group.

It also packages the images into a Download site -- a client-facing page -- this tedious task has been automated.

The software is run from the command line, via Ant tasks.  The following example will process a batch of "flash layer" files:

    C:\Users\steve\Documents\Adobe Scripts\nwhomephoto>ant -propertyfile=properties\AngelineOct2015.txt flash

It will run the flash action using the properties as found in "AngelineOct2015.txt"

 -------------------------------------------
| Process Images and Make a Public Web Site |
 -------------------------------------------

1. Create a .properties file
(This .properties file is parsed by ANT, which in turn generates a Javascript properties file for the scripts to refer to.)

2. Run Ant tasks to create processed image artifacts, in photomatix, ptlens etc.  Also package all of the artifacts as websites for upload.
    
    A typical workflow:

    i. Set the environment:
    
      ant -propertyfile=archive/somejob.properties copy-from-camera

    ii. Process the images:

      ant -propertyfile=archive/somejob.properties photomatix-12 ptlens

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
Photoshop CS3 (- upgrading to CS6 was painless). Comes with a JS scripting API that we will call into.
PTLens (optional) - for correcting lens distortions such as "pillow shaped" windows.
Photomatix - we call into the "API" to build composite images from multiple exposures.
The JavaScript scripts that loop through the CR2 files, to make TIFFs, which then loop through these to make JPEGs
Ant 
Java SDK
web site template HTML files
The Ant build file that runs the show, utility functions, image compositing, instantiates the web site template and uploads the files to a server, etc.
[currently broken] For the Ant FTP task: commons-net.jar (http://jakarta.apache.org/commons/net/index.html) and jakarta-oro-2.0.8.jar (http://jakarta.apache.org/oro/)
(todo: broken since yahoo went to FTP over SSL - the world could use a high-level API for this.)

Config:
-------
Photoshop requires the javascript source files (the ones that call into Photoshop) to be located in a 'safe haven', for example, 

C/users/steveh/Documents/Adobe Scripts.  

Photoshop won't run scripts that are located outside this location -- I assume because these scripts can see and directly operate on the file system?

set ANT_HOME and ANT_HOME/bin on the PATH
set JAVA_HOME and JAVA_HOME/bin on PATH

(Running devEnv.cmd will do the above.)

