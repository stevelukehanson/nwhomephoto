# Photoshop Automation Workflows 

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

# The Big Workflow: From Camera to Web Site 

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
- Make the name of the file something relevant to the job, such as "123 Ceder Ave.txt"
- Open the .txt file and modify the property values to descibe the current job, see example
- Make sure the URL property is new and unique, and does not contain spaces:
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
  - show: This task opens the website in a browser for previewing.
  - upload: This task sets up a 'drag-and-drop' upload to Amazon S3. It opens directory to be upload (or more exactly the 'build' directory) and the target cloud location (a Amazon S3 bucket).
```
ant -propsD=properties/MYJOB.txt show
ant -propsD=properties/MYJOB.txt upload
```

**TIPS and TRICKS**

You can string along many tasks, for example, you can run these tasks in sequence:
```
ant -propsD=properties/MYJOB.txt resize web invoice show upload
```

# To Install This Software 

Required Resources:
-------------------
- Photoshop CS3 or higher (- upgrading to CS6, and later, was painless). Comes with a JS scripting API that we will call into.
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

## Install Bugs

You may run into some absoulate paths/hard coded paths when installing on a new machine. I have endeavored to root these out, but there maybe some lingering still.

# Properties File Reference

The properties defined here control most of the behavior of the system. Some properties (portra, raw_path, flickr) are probably deprecated at this point, just from disuse. Have included them for historical reasons, and for possible re-hab.

Some import points:

- URL - Crops up everywhere.
- PHOTO1...PHOTO5 - These are full paths or integers, which grab the flyer images.
- LOGO - Has been deprecated, now controlled in script by a relative path. But one may want to switch it back the absolute path, or build in an 'if present use the abs path property' overriding behavior for the logo, to make flyers for different clients.

Sample Properties File

```
!-- Basic/Common Properties --!
!-- URL is the basic namespacing property. --!
URL=temp  
ROOT_PATH=C:/Users/steve/Pictures/RealEstate
RAW_PATH=${ROOT_PATH}/${URL}
RESIZE_PATH=${ROOT_PATH}/${URL}/best
LUMINOSITY_PATH=${ROOT_PATH}/${URL}/luminosity-layers
FLASH_PATH=${ROOT_PATH}/${URL}/flash-layers

!-- Job Properties --!
!-- These conrol the webpage and the invoice.--!
ADDRESS=2241 13th Ave W, Seattle, WA
AGENT=Mary Orvis / Jane Orvis
PHONE=(206) 619-2000 / (206) 679-5901
EMAIL=maryorvis@gmail.com / janeorvis@gmail.com
FLICKR= 
JOBNAME=Photoshoot of ${ADDRESS}
SHOOTPRICE=200
PORTA_EXE=C:/Program Files (x86)/Porta/porta.exe

!-- Flyer Properties --!
HEADLINE1=Capitol Hill Location
HEADLINE2=Fully Remodeled and Restored Farm House
HEADLINE3=
!-- Photos can be entered either by file name, or by a simple integer indicating the position in the folder.  First position is 1. --!
PHOTO1=1
PHOTO2=4
PHOTO3=9
PHOTO4=7
PHOTO5=2
LOGO=C:/Adobe CS6/nwhomephoto/resources
MAINTEXT=MLS #968448
BOXTEXT=3 bedrooms / 2.5 baths / 2,820 sq ft / 4,200 sq ft lot / 2016 taxes are $7,470 / Stevens Elementary assignment
HOUSEPRICE=Offered at $1,150,000
CONTACT=Contact: Mary Orvis (206) 619-2000 or Jane Orvis (206) 679-5901
WEBSITE=www.OrvisAndOrvisRealEstate.com
PRESENTEDBY=Presented by Orvis and Orvis Real Estate, LLC
LOGO=C:/Users/steve/Documents/Adobe Scripts/nwhomephoto/resources

!-- Photographer Properties --!
!-- todo: In development, these properties can be used to completely generalize the invoice. --!
!-- todo: Notice that you can reuse 'ADDRESS' anywhere to the left of the '=' sign, as it will suffer string substitution by the Ant property ADDRESS defined above. --!
PHOTOGRAPHER_NAME=Stephen Hanson
PHOTOGRAPHER_ADDR_1=917 Broadway E
PHOTOGRAPHER_ADDR_2=Seattle, WA 98102
PHOTOGRAPHER_PH=(206)898-0444
PHOTOGRAPHER_E=stevelukehanson@gmail.com
```


