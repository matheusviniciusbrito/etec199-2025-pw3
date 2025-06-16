const { conexao } = require('../conexao.js')

async function inserirEndereco(id, logradouro, cep, numero, bairro, cidade) {
    const sql = 'INSERT INTO tbl_endereco (id, logradouro, cep, numero, bairro, cidade) VALUES (?, ?, ?, ?, ?, ?)';
    const conn = await conexao();
    try {
        const [result] = await conn.query(sql, [id, logradouro, cep, numero, bairro, cidade]);
        await conn.end();
        return { mensagem: 'Endereço inserido com sucesso', result };
    } catch (err) {
        return { erro: err.message };
    }
}

module.exports = { inserirEndereco }