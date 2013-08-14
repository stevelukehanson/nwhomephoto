@echo off
setlocal enabledelayedexpansion
set /a count=0
for /f "tokens=*" %%a in ('dir C:\Users\steve\Desktop\7015_11thAveNW /b /od *.cr2') do (
 echo ren %%a !count!.cr2
 set /a count+=1
)