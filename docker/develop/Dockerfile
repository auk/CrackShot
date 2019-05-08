FROM tomcat:9-jre11

MAINTAINER Alexey Ukhov <auk@startext.ru>

ADD apps/frontend/buildGradle/libs/CrackShot*.war ${CATALINA_HOME}/webapps/CrackShot.war
ADD apps/rest/build/libs/ShooterStatistic-rest-*.war ${CATALINA_HOME}/webapps/CrackShot-rest.war

RUN rm -f ${CATALINA_HOME}/webapps/ROOT/index.jsp
ADD docker/develop/ROOT/index.jsp ${CATALINA_HOME}/webapps/ROOT/index.jsp
