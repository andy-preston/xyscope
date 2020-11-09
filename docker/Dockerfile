FROM ubuntu:bionic

ENV TERM=linux

ENV DEBIAN_FRONTEND=noninteractive

ENV HOME=/usr/local/src

RUN apt-get update && \
    apt-get -y --no-install-recommends install gnupg curl ca-certificates && \
    echo "deb https://deb.nodesource.com/node_15.x bionic main" \
        > /etc/apt/sources.list.d/nodesource.list && \
    curl -sS https://deb.nodesource.com/gpgkey/nodesource.gpg.key | \
        apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" \
        > /etc/apt/sources.list.d/yarn.list && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | \
        apt-key add - && \
    apt-get update && \
    apt-get -y --no-install-recommends install nodejs yarn && \
    apt-get -y --purge remove cmdtest && \
    apt-get -y --purge autoremove && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/* && \
    echo "#!/bin/bash" > /usr/local/bin/contstart && \
    echo "yarn install" >> /usr/local/bin/contstart && \
    echo "exec bash" >> /usr/local/bin/contstart

WORKDIR /usr/local/src

CMD [ "bash", "/usr/local/bin/contstart"]
