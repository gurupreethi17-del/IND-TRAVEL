@echo off
title IND TRAVEL — One India. One Trusted Travel Ecosystem
echo ====================================================================
echo   IND TRAVEL — Smart India Hackathon Web Application Prototype
echo   "One India. One Trusted Travel Ecosystem."
echo ====================================================================
echo.
echo Starting IND Travel local server...
py server.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Python was not detected or encountered an issue.
    echo Opening index.html directly in your default browser...
    start index.html
)
pause

