const { conexao } = require('../conexao.js')

async function atualizarCategoria(id, nome) {
    const sql = 'UPDATE tbl_categoria SET nome = ? WHERE id = ?';
    const conn = await conexao();
    try {
        const [result] = await conn.query(sql, [nome, id]);
        await conn.end();
        return { mensagem: 'Categoria atualizada com sucesso', result };
    } catch (err) {
        return { erro: err.message };
    }
}

module.exports = { atualizarCategoria }