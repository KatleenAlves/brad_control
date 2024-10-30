# Etapa 1: Construir o frontend
FROM node:14 AS frontend_build
WORKDIR /app/frontend
COPY frontend/package*.json ./  
# Copia package.json e package-lock.json para instalar dependências
RUN npm install
COPY frontend/ .  
# Copia todo o conteúdo do frontend após instalar as dependências
RUN npm run build

# Etapa 2: Configurar o backend
FROM python:3.9 AS backend
WORKDIR /app/backend
COPY backend/requirements.txt ./  
# Copia o arquivo requirements.txt para instalar dependências
RUN pip install -r requirements.txt
COPY backend/ .  
# Copia o conteúdo do backend

# Copiar o build do frontend para o backend
COPY --from=frontend_build /app/frontend/build /app/backend/static

# Expor a porta do backend
EXPOSE 5000

# Comando para iniciar o backend
CMD ["python", "app.py"]
