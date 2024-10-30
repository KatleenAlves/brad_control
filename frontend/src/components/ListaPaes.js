import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListaPaes() {
    const [paes, setPaes] = useState([]);

    useEffect(() => {
        // Faz a requisição para o backend
        axios.get('http://127.0.0.1:5000/paes')
            .then(response => setPaes(response.data))
            .catch(error => console.error("Erro ao buscar pães:", error));
    }, []);

    return (
        <div>
            <h2>Lista de Pães</h2>
            <ul>
                {paes.map((pao, index) => (
                    <li key={index}>
                        {pao.nome} - Quantidade Necessária: {pao.quantidade_necessaria}
                        {pao.nome} - quantidade_necessaria: {pao.quantidade_necessaria}
                    </li>
                    
                ))}
            </ul>
        </div>
    );
}

export default ListaPaes;
