FROM node:8.4.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

EXPOSE 9000

COPY ./entrypoint.sh /
CMD ["/entrypoint.sh"]