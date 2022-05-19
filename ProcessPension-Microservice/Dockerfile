FROM openjdk:8
EXPOSE 8100
ADD "target/process-pension-service.jar" "process-pension-service.jar"
ENTRYPOINT [ "java", "-jar", "/process-pension-service.jar" ]