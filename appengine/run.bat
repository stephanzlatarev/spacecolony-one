xcopy /S /E /Y ..\nodejs\app\public src\main\webapp\assets\
xcopy /S /E /Y ..\nodejs\app\content src\main\webapp\assets\content\
mvn clean -Dhttps.proxyHost=proxy -Dhttps.proxyPort=8080 appengine:devserver
