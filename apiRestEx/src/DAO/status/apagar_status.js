const { conexao } = require('../conexao.js')

async function apagarStatus(id) {
    const sql = 'DELETE FROM tbl_status WHERE id = ?';
    const conn = await conexao();
    try {
        const [result] = await conn.query(sql, [id]);
        await conn.end();
        return { mensagem: 'Status apagado com sucesso', result };
    } catch (err) {
        return { erro: err.message };
    }
}

module.exports = { apagarStatus }