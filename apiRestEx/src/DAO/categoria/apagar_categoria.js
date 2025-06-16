const { conexao } = require('../conexao.js')

async function apagarCategoria(id) {
    const sql = 'DELETE FROM tbl_categoria WHERE id = ?';
    const conn = await conexao();
    try {
        const [result] = await conn.query(sql, [id]);
        await conn.end();
        return { mensagem: 'Categoria apagada com sucesso', result };
    } catch (err) {
        return { erro: err.message };
    }
}

module.exports = { apagarCategoria }