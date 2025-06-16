const { conexao } = require('../conexao.js')

async function atualizarStatus(id, nome) {
    const sql = 'UPDATE tbl_status SET nome = ? WHERE id = ?';
    const conn = await conexao();
    try {
        const [result] = await conn.query(sql, [nome, id]);
        await conn.end();
        return { mensagem: 'Status atualizado com sucesso', result };
    } catch (err) {
        return { erro: err.message };
    }
}

module.exports = { atualizarStatus }