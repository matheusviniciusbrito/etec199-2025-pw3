const { conexao } = require('../conexao.js')

async function inserirCategoria(id, nome) {
    const sql = 'INSERT INTO tbl_categoria (id, nome) VALUES (?, ?)';
    const conn = await conexao();
    try {
        const [result] = await conn.query(sql, [id, nome]);
        await conn.end();
        return { mensagem: 'Categoria inserida com sucesso', result };
    } catch (err) {
        return { erro: err.message };
    }
}

module.exports = { inserirCategoria }