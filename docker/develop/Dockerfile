FROM tomcat

MAINTAINER Alexey Ukhov <auk@startext.ru>

ADD apps/rest/build/libs/ShooterStatistic-rest-*.war ${CATALINA_HOME}/webapps/ShooterStatistic-rest.war
#ADD apps/frontend/buildGradle/libs/ConfigService.war ${CATALINA_HOME}/webapps/ConfigService.war

#RUN rm -f ${CATALINA_HOME}/webapps/ROOT/index.jsp
#ADD docker/develop/tomcat/webapps/ROOT/index.jsp ${CATALINA_HOME}/webapps/ROOT/index.jsp
