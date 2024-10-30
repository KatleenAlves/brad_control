# Etapa 1: Construir o frontend
FROM node:14 AS frontend_build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Etapa 2: Configurar o backend
FROM python:3.9 AS backend
WORKDIR /app/backend
COPY backend/requirements.txt ./
RUN pip install -r requirements.txt
COPY backend/ .

# Copiar o build do frontend para a pasta static do backend
COPY --from=frontend_build /app/frontend/build /app/backend/static

# Expor a porta do backend
EXPOSE 5000

# Definir variável de ambiente para o Flask rodar externamente
ENV FLASK_RUN_HOST=0.0.0.0

# Comando para iniciar o backend
CMD ["python", "app.py"]
