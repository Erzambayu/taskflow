@echo off
echo ========================================
echo   TaskFlow - Push to GitHub Script
echo ========================================
echo.

echo Pastikan Anda sudah membuat repository di GitHub dengan nama 'taskflow'
echo.

set /p repo_name="Masukkan nama repository (default: taskflow): "
if "%repo_name%"=="" set repo_name=taskflow

echo.
echo Menambahkan remote origin...
"C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/Erzambayu/%repo_name%.git

echo.
echo Pushing ke GitHub...
"C:\Program Files\Git\bin\git.exe" push -u origin main

echo.
echo ========================================
echo   Push selesai!
echo ========================================
echo.
echo Repository URL: https://github.com/Erzambayu/%repo_name%
echo GitHub Pages akan tersedia di: https://erzambayu.github.io/%repo_name%
echo.
echo Jangan lupa aktifkan GitHub Pages di Settings > Pages > Source: GitHub Actions
echo.
pause 