FROM node:7.10.1-alpine
MAINTAINER Chuka Ofili <chuka.ofili@deliveryscience.co>

WORKDIR /www

ADD application/package.json application/yarn.lock /www/
RUN yarn install \
	&& yarn cache clean;

ADD application /www

CMD ["yarn", "start"]
