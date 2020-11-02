FROM ubuntu:bionic

ENV TERM=linux

ENV DEBIAN_FRONTEND=noninteractive

ENV HOME=/usr/local/src

RUN apt-get update

RUN apt-get -y --no-install-recommends install gnupg curl ca-certificates

RUN echo "deb https://deb.nodesource.com/node_15.x bionic main" \
    > /etc/apt/sources.list.d/nodesource.list

RUN curl -sS https://deb.nodesource.com/gpgkey/nodesource.gpg.key | \
    apt-key add -

RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" \
    > /etc/apt/sources.list.d/yarn.list

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | \
    apt-key add -

RUN apt-get update

RUN apt-get -y --no-install-recommends install nodejs yarn

RUN apt-get -y --purge remove cmdtest

RUN apt-get -y --purge autoremove

RUN apt-get clean

RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

WORKDIR /usr/local/src

CMD [ "bash"]
