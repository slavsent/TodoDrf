FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

#RUN apt-get update \
#    && apt-get install -y postgresql postgresql-contrib libpq-dev python3-dev

RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2


COPY . .

COPY ./requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt --no-cache-dir


COPY wait-for-postgres.sh .
RUN chmod +x wait-for-postgres.sh

RUN pip install gunicorn
