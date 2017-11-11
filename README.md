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

- Make a .txt properties file that describes the job. (Manual)
- Copy images from the card to the computer. (Automated)
- Manually Process with Photomatix, Lightroom, and/or Photoshop. (Manual)
- Combine "Lights On/Lights Off" image pairs into single images. (Semi-Automated)
- Assemble images to ship into the 'best' folder. (Manual)
- Finalize images with Photoshop and Lightroom. (Manual)
- Resize images into different pixel sizes. (Automated)
- Make a client-facing web site  (Automated)
- Make an invoice. (Automated)
- Upload to Amazon S3. (Semi-Automated)

Here are the **details** for each step:

**1. Make a .txt properties file (Manual)**

- Go to the /properties folder and clone an existing .txt file. 
-- Make the name of the file something relevant to the job, such as "123 Ceder Ave.txt"
-- Open the .txt file and modify the property values to descibe the current job, see example
-- Make sure the URL property is new and unique, and does not contain spaces:
```
!-- Basic/Common Properties --!
URL=6116_127th_Pl_SE_Bellevue
ROOT_PATH=C:/Users/steveh/Pictures/RealEstate
RESIZE_PATH=${ROOT_PATH}/${URL}/best
LUMINOSITY_PATH=${ROOT_PATH}/${URL}/luminosity-layers
FLASH_PATH=${ROOT_PATH}/${URL}/flash-layers

ADDRESS=6116 127th Pl SE, Bellevue, WA
AGENT=Mason Hwu
PHONE=206-335-1778
EMAIL=realestatebymason@gmail.com
JOBNAME=Photoshoot of ${ADDRESS}
SHOOTPRICE=300
DATE=Nov 9, 2017
```
- (Gory details, don't worry if this makes no sense: This .txt file is parsed by ANT, which in turn generates a Javascript properties file for the scripts to refer to.)

**2. Copy images from the card to the computer (Automated)**

- Open a Windows command line shell.
- cd to the nwhomephoto directory, for example, 
```
>cd C:\Adobe Scripts\nwhomephoto
```
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
**6. Batch Resize. (Automated)**
- Resizes the images into four sizes: 640px, 975px, 1024px, full-sized px
- Copy photos you plan to ship into the 'best' directory.
- Re-order them as you want them to be presented to the client.
- Re-named them so that the re-ordering gets "baked in".
- Run the following ant task:
```
ant -Dprops=properties/MYJOB.txt resize
```
**7. Web Site. (Automated)**
- Makes a web site suitable for posting online and for shipping to the client via URL.
- Assumes you have resized pics.
- Run the following Ant task:
```
ant -propsD=properties/MYJOB.txt web
```
**8. Preview and Ship (Semi-Automated)**
- Preview the web site and ship it, that is, upload it.
-- show: This task opens the website in a browser for previewing.
-- upload: This task sets up a 'drag-and-drop' upload to Amazon S3. It opens directory to be upload (or more exactly the 'build' directory) and the target cloud location (a Amazon S3 bucket).
```
ant -propsD=properties/MYJOB.txt show
ant -propsD=properties/MYJOB.txt upload
```

**TIPS and TRICKS**

You can string along many tasks, for example, you can run these tasks in sequence:
```
ant -propsD=properties/MYJOB.txt resize web invoice show upload
```

--------------------------
| To Install This Software |
 --------------------------

Required Resources:
-------------------
- Photoshop CS3 or higher (- upgrading to CS6 was painless). Comes with a JS scripting API that we will call into.
- Ant 
- Java SDK

**Download and Intall** 
- Download a zip file of nwhomephoto.zip from GitHub.
- Unzip in somewhere sensible -- somewhere where you want to process and build your shippable jobs. In some cases, you may be forced to unzip it in an Adobe "safe script area".

Config:
-------
Photoshop requires, at least sometimes, the javascript source files (the ones that call into Photoshop) to be located in a 'safe haven', for example, 

C/users/steveh/Documents/Adobe Scripts.  

Photoshop won't run scripts that are located outside this location -- I assume because these scripts can see and directly operate on the file system? Also: as of Nov 2017 this requirement seems to have been lifted, as I have ignored this path and successfully installed on other machines.

set ANT_HOME and ANT_HOME/bin on the PATH
set JAVA_HOME and JAVA_HOME/bin on PATH

(Running devEnv.cmd will do the above.)

