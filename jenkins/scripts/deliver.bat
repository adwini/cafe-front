@echo off
echo Delivering application...
REM Example: Copy build files to a deployment directory
xcopy /s /e /y dist\* \\path\to\deploy