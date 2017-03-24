FROM node:6.10.0-alpine
MAINTAINER Chuka Ofili <chuka.ofili@deliveryscience.co>

RUN apk add -U tzdata \
	&& cp /usr/share/zoneinfo/Africa/Lagos /etc/localtime \
	&& echo "Africa/Lagos" > /etc/timezone \
	&& apk del tzdata \
	&& mkdir -p /www
 
WORKDIR /www

ADD application/package.json /www/package.json
RUN npm install -quiet \
	&& npm cache clear; 

ADD application /www

CMD ["npm", "start"]
