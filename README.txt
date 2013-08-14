To Install This Software


Required Resources:
-------------------
Photoshop CS3
PTLens
Noise Ninja
The Photoshop Actions that execute PTLens and Noise Ninja
The JavaScript scripts that loop through the RAW files, to make to PSDs, which then loop through these to make JPEGs
Ant 
Java SDK
Porta
web site template HTML files
The Ant build file that instantiates the web site template and uploads the files to a server.
For the Ant FTP task: commons-net.jar (http://jakarta.apache.org/commons/net/index.html) and jakarta-oro-2.0.8.jar (http://jakarta.apache.org/oro/)

Config:
-------
set ANT_HOME and ANT_HOME/bin on the PATH
set JAVA_HOME and JAVA_HOME/bin on PATH

(Running devEnv.cmd will do the above.)

How to process images and make a public web site:

(1) To process images and make a local web site:

Edit the build_props.properties file
The first and second lines of the .properties file is "parsed" by the javascript files to find their paths.
The second line and after are properties for the Ant build.

    - Manually adjust RAW images
    - SLH_workflow1_processOnly.jsx 
    - Manually adjust PSD images
    - SLH_workflow1_resizeOnly.jsx
    - ant build
    - SLH_makeInvoice.jsx
    - SLH_makeFlyer.jsx
    - Manually adjust flyer TIFF
    - SLH_copyFlyer.jsx

(2) To upload the website:

    - ant ftp-upload


