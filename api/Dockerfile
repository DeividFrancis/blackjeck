# Usar uma imagem base do Python
FROM python:3.6-slim

# Definir o diretório de trabalho
WORKDIR /api

# Copiar o arquivo requirements.txt para o container
COPY requirements.txt /api
# RUN cat requirements.txt

# Atualizar o pip e instalar as dependências
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copiar o código da aplicação para o container
COPY . /api/

# Expor a porta 5000 (padrão do Flask)
EXPOSE 5000

# Definir o comando para iniciar a aplicação Flask
CMD ["python", "route.py"]
