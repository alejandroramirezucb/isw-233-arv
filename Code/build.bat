@echo off
REM Script para compilar el proyecto Rust
cd /d "C:\Users\USUARIO\Documents\5_SEMESTRE\Aplicaciones Web I\isw-233-arv\Code"

REM Intentar ejecutar cargo build
"C:\Users\USUARIO\.cargo\bin\cargo.exe" build

REM Mostrar el resultado
if errorlevel 1 (
    echo Error: La compilacion fallo
    pause
) else (
    echo Compilacion exitosa
    pause
)

