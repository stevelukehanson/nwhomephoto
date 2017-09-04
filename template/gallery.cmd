@echo off
setlocal enableDelayedExpansion
set "file_start=<HTML><HEAD></HEAD><BODY><h3 style='padding:5;'>_ADDRESS_</h3>"
set "image_start=<IMG width='600' style='padding:10;' src='"
set "image_end='/>"
set "file_end=</BODY></HTML>"
set "file_name=gallery.html"

>"%file_name%" (
  echo !file_start!
  setlocal disableDelayedExpansion
  for %%I in (webgallery\*.jpg) do (
    set "image=%%~I"
    setlocal enableDelayedExpansion
    echo !image_start!!image!!image_end!
    endlocal
  )
  endlocal
  echo !file_end!
)