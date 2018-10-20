FROM python:3.6-alpine

WORKDIR /home/blackjeck

RUN pip install --upgrade pip
RUN pip install Flask==1.0

EXPOSE 5000
ENTRYPOINT ["python"]
CMD ["route.py"]