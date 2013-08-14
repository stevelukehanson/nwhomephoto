@echo off
setlocal enableDelayedExpansion
set "file_start=<HTML><HEAD></HEAD><BODY><h2 style='padding:15;'>_ADDRESS_</h2>"
set "image_start=<IMG width='800' style='padding:15;' src='"
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