const { conexao } = require('../conexao.js')

async function inserirStatus(id, nome) {
    const sql = 'INSERT INTO tbl_status (id, nome) VALUES (?, ?)';
    const conn = await conexao();
    try {
        const [result] = await conn.query(sql, [id, nome]);
        await conn.end();
        return { mensagem: 'Status inserido com sucesso', result };
    } catch (err) {
        return { erro: err.message };
    }
}

module.exports = { inserirStatus }