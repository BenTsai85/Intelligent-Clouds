# Create Spark cluster on YARN
# scala-2.11.11.rpm # spark-2.1.1-bin-hadoop2.7.tgz # apache-hive-2.1.1-bin.tar.gz # tag kiwenlau-hadoop-spark-hive

FROM sfedyakov/hadoop-271-cluster

USER root

# scale
RUN curl -s https://downloads.lightbend.com/scala/2.12.2/scala-2.12.2.tgz | tar -xz -C /usr/share/ \
    && cd /usr/share && ln -s ./scala-2.12.2/ scala

# spark
RUN curl -s https://d3kbcqa49mib13.cloudfront.net/spark-2.1.1-bin-hadoop2.7.tgz | tar -xz -C /usr/local/ \
    && cd /usr/local && ln -s ./spark-2.1.1-bin-hadoop2.7/ spark

# install hive
RUN curl -s http://apache.stu.edu.tw/hive/hive-2.1.1/apache-hive-2.1.1-bin.tar.gz | tar -xz -C /usr/local \
    && cd /usr/local && ln -s ./apache-hive-2.1.1-bin/ hive

ENV SPARK_HOME=/usr/local/spark \
    SCALA_HOME=/usr/share/scala \
    HIVE_HOME=/usr/local/hive \
    PATH=$PATH:$SPARK_HOME/bin/:$HIVE_HOME/bin

RUN cd $SPARK_HOME/conf && cp spark-env.sh.template spark-env.sh

# COPY hive-site.xml.patch $HIVE_HOME/conf
RUN cd $HIVE_HOME/conf && \
    cp hive-default.xml.template hive-site.xml && \
    cp hive-log4j2.properties.template hive-log4j2.properties

# Derby for Hive metastore backend
RUN $HIVE_HOME/bin/schematool -initSchema -dbType derby

RUN yum install -y epel-release && yum install -y python-pip && pip install --upgrade pip && pip install requests