from flask import Flask, jsonify, request, send_from_directory
import os
from flask_cors import CORS

app = Flask(__name__, static_folder="../frontend/build")
CORS(app)

# Lista de pães - Definida no nível global para acesso em ambas as funções
paes = [
    {"nome": "Claire", "quantidade_necessaria": 15},
    {"nome": "Couronne", "quantidade_necessaria": 10},
    {"nome": "Tessinois", "quantidade_necessaria": 8},
    {"nome": "Baguete", "quantidade_necessaria": 20},
    {"nome": "Couronne Sils", "quantidade_necessaria": 4},
    {"nome": "Tess Sils", "quantidade_necessaria": 4},
    {"nome": "Gottardo", "quantidade_necessaria": 6},
    {"nome": "Croix", "quantidade_necessaria": 4},
    {"nome": "Pagnol Claire", "quantidade_necessaria": 6},
    {"nome": "Pagnol Rustique", "quantidade_necessaria": 4},
    {"nome": "Tresse", "quantidade_necessaria": 2}
]

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

@app.route('/paes', methods=['GET'])
def listar_paes():
    return jsonify(paes)

@app.route('/calcular', methods=['POST'])
def calcular_assar():
    dados = request.json
    nome = dados["nome"]
    quantidade_vitrine = dados["quantidade"]
    
    # Usando a lista global `paes`
    pao = next((p for p in paes if p["nome"] == nome), None)
    if pao:
        quantidade_necessaria = pao["quantidade_necessaria"]
        a_assar = max(quantidade_necessaria - quantidade_vitrine, 0)
        return jsonify({"nome": nome, "a_assar": a_assar})
    return jsonify({"error": "Pão não encontrado"}), 404

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
