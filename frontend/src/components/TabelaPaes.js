import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TabelaPaes.css';

function TabelaPaes() {
    const [paes, setPaes] = useState([]);
    const [quantidades, setQuantidades] = useState({});
    const [resultado, setResultado] = useState({});

    const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';

useEffect(() => {
    axios.get(`${apiUrl}/paes`)
        .then(response => setPaes(response.data))
        .catch(error => console.error("Erro ao buscar pães:", error));
}, []);

const handleVitrineChange = (nome, quantidade) => {
    setQuantidades(prev => ({ ...prev, [nome]: quantidade }));

    axios.post(`${apiUrl}/calcular`, {
        nome: nome,
        quantidade: quantidade,
    }).then(response => {
        const novoResultado = { ...resultado };
        novoResultado[response.data.nome] = response.data.a_assar;
        setResultado(novoResultado);
    }).catch(error => console.error("Erro ao calcular a assar:", error));
};


    return (
        <div className="table-wrapper">
            <h2 className="table-title">LISTE PAIN</h2>
            <table>
                <thead>
                    <tr>
                        <th>PAINS</th>
                        <th>QTD</th>
                        <th>RAYON</th>
                        <th>CUIRE</th>
                    </tr>
                </thead>
                <tbody>
                    {paes.map((pao, index) => (
                        <tr key={index}>
                            <td data-label="PAINS">{pao.nome}</td>
                            <td data-label="QTD">{pao.quantidade_necessaria}</td>
                            <td data-label="RAYON">
                                <input
                                    type="number"
                                    value={quantidades[pao.nome] || ''}
                                    onChange={e => handleVitrineChange(pao.nome, parseInt(e.target.value) || 0)}
                                />
                            </td>
                            <td data-label="CUIRE">{resultado[pao.nome] !== undefined ? resultado[pao.nome] : ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <footer>Développée par KM Web Solutions</footer>
        </div>
    );
}

export default TabelaPaes;
