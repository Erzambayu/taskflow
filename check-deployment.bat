@echo off
echo ========================================
echo   TaskFlow - Deployment Status Checker
echo ========================================
echo.

set /p repo_name="Masukkan nama repository (default: taskflow): "
if "%repo_name%"=="" set repo_name=taskflow

echo.
echo Repository: https://github.com/Erzambayu/%repo_name%
echo Actions: https://github.com/Erzambayu/%repo_name%/actions
echo Settings: https://github.com/Erzambayu/%repo_name%/settings/pages
echo.
echo ========================================
echo   URLs untuk Dicek:
echo ========================================
echo.
echo 1. GitHub Actions Status:
echo    https://github.com/Erzambayu/%repo_name%/actions
echo.
echo 2. GitHub Pages Settings:
echo    https://github.com/Erzambayu/%repo_name%/settings/pages
echo.
echo 3. Live Application (setelah deploy selesai):
echo    https://erzambayu.github.io/%repo_name%/
echo.
echo ========================================
echo   Troubleshooting:
echo ========================================
echo.
echo - Pastikan Source di Pages settings = "GitHub Actions"
echo - Cek Actions tab untuk melihat status deployment
echo - Deployment biasanya memakan waktu 2-5 menit
echo - Jika gagal, cek logs di Actions untuk error details
echo.
pause 