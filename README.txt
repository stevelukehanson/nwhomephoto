To Install This Software


Required Resources:
-------------------
Photoshop CS3 (and upgrading to CS6 was painless)
PTLens (optional)
Photomatix 
The JavaScript scripts that loop through the CR2 files, to make TIFFs, which then loop through these to make JPEGs
Ant 
Java SDK (necessary?)
web site template HTML files
The Ant build file that instantiates the web site template and uploads the files to a server.
For the Ant FTP task: commons-net.jar (http://jakarta.apache.org/commons/net/index.html) and jakarta-oro-2.0.8.jar (http://jakarta.apache.org/oro/)
(todo: broken since yahoo went to FTP over SSL - the world could use a high-level API for this.)

Config:
-------
set ANT_HOME and ANT_HOME/bin on the PATH
set JAVA_HOME and JAVA_HOME/bin on PATH

(Running devEnv.cmd will do the above.)

How to process images and make a public web site:

1. Create a .properties file
(This .properties file is parsed by ANT, which in turn generates a Javascript properties file for the scripts to refer to.)

2. Run Ant tasks to create processed image artifacts, in photomatix, ptlens etc.  Also package all of the artifacts as websites for upload.
    
    A typical workflow:

    Set the environment:
    
      ant -propertyfile=archive/somejob.properties copy-from-camera

    Process the images:

      ant -propertyfile=archive/somejob.properties photomatix-12 ptlens

    Manually adjust images for color, exposure, if necessary.

    Package as a website:

      ant -propertyfile=archive/somejob.properties resize web invoice show

3. Also make a flyer.  See the fields available in the .properties file.

   The following generates a flyer from the fields you specify.

      ant -propertyfile=archive/somejob.properties make-flyer

   Then manually edit the flyer.

   Finally save the flyer in different forms, file types, particularly print quality JPEG and PDF          		

      ant -propertyfile=archive/somejob.properties save-flyer
