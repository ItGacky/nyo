@echo off
set OUTNAKED=bld\main.js
set OUTWRAPPED=bld\main-wrapped.js
set RELEASED=assets\main.js

copy /B tools\header.js + %OUTNAKED% + tools\footer.js %OUTWRAPPED% > NUL || exit /B 1

rem Google Closure Compiler
java -jar tools/compiler.jar --js %OUTWRAPPED% --js_output_file %RELEASED% || exit /B 1

rem YUI Compressor
rem java -jar tools/yuicompressor-2.4.8.jar %OUTWRAPPED% -o %RELEASED% || exit /B 1
