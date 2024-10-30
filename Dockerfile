# Etapa 1: Construir o frontend
FROM node:14 AS frontend_build
WORKDIR /app/frontend
# Copia os arquivos de configuração do npm para instalar as dependências
COPY frontend/package*.json ./
# Instala as dependências do frontend
RUN npm install
# Copia o conteúdo do frontend após instalar as dependencias  
COPY frontend/ .
# Faz o build do frontend  
RUN npm run build  

# Etapa 2: Configurar o backend
FROM python:3.9 AS backend
WORKDIR /app/backend
# Copia o arquivo requirements.txt do backend
COPY backend/requirements.txt ./ 
# Instala as dependências do backend 
RUN pip install -r requirements.txt 
# Copia o conteúdo do backend
COPY backend/ .  

# Copiar o build do frontend para o backend
COPY --from=frontend_build /app/frontend/build /app/backend/static

# Expor a porta do backend
EXPOSE 5000

# Comando para iniciar o backend
CMD ["python", "app.py"]
