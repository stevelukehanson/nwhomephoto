forfiles /P C:\Users\steve\Documents\testtest /S /C "cmd /c echo @file @relpath @path"
forfiles /P C:\Users\steve\Documents\testtest /S /C "cmd /c C:\Users\steve\Downloads\curl_730_0_ssl/curl.exe -u stevelukehanson@nwhomephoto.com:ar!st0tle --ftp-ssl -verbose -k --ftp-create-dirs --upload-file C:\dell.sdr ftp://ftp.nwhomephoto.com:21/virtualMediaGalleries/testtest2/@file"
REM forfiles /P C:\Users\steve\Documents\testtest /S /C "C:\Users\steve\Downloads\curl_730_0_ssl/curl.exe -u stevelukehanson@nwhomephoto.com:ar!st0tle --ftp-ssl -verbose -k --ftp-create-dirs --upload-file @path ftp://ftp.nwhomephoto.com:21/virtualMediaGalleries/testtest/@file"

