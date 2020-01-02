FROM node:13.5.0-alpine

ENV APP_ROOT /app

RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT

RUN apk add --no-cache bash

RUN npm i -g @angular/cli

EXPOSE 4200
EXPOSE 9876

ADD init.sh /init.sh

RUN chmod 755 /init.sh

CMD ["sh", "/init.sh"]
