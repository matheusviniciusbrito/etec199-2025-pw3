const { conexao } = require('../conexao.js')

async function atualizarEndereco(id, dados) {
    const sql = 'UPDATE tbl_endereco SET logradouro = ?, cep = ?, numero = ?, bairro = ?, cidade = ? WHERE id = ?';
    const conn = await conexao();
    try {
        const [result] = await conn.query(sql, [dados.logradouro, dados.cep, dados.numero, dados.bairro, dados.cidade, id]);
        await conn.end();
        return { mensagem: 'Endereço atualizado com sucesso', result };
    } catch (err) {
        return { erro: err.message };
    }
}

module.exports = { atualizarEndereco }