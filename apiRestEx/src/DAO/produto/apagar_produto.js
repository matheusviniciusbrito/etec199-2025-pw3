const { conexao } = require('../conexao.js')

async function apagarProduto(codigo) {
    const sql = 'DELETE FROM tbl_produtos WHERE codigo = ?';
    const conn = await conexao();
    try {
        const [result] = await conn.query(sql, [codigo]);
        await conn.end();
        return { mensagem: 'Produto apagado com sucesso', result };
    } catch (err) {
        return { erro: err.message };
    }
}

module.exports = { apagarProduto }