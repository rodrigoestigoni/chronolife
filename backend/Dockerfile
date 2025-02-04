FROM python:3.11-alpine

# Instalar dependências do sistema
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev

WORKDIR /app

COPY app/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY app /app

EXPOSE 8000
COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

CMD ["/wait-for-db.sh", "python", "manage.py", "runserver", "0.0.0.0:8000"]
