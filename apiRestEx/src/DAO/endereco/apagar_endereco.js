const { conexao } = require('../conexao.js')

async function apagarEndereco(id) {
    const sql = 'DELETE FROM tbl_endereco WHERE id = ?';
    const conn = await conexao();
    try {
        const [result] = await conn.query(sql, [id]);
        await conn.end();
        return { mensagem: 'Endereço apagado com sucesso', result };
    } catch (err) {
        return { erro: err.message };
    }
}

module.exports = { apagarEndereco }