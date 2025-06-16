const { conexao } = require('../conexao.js')

async function atualizarProduto(codigo, dados) {
    const sql = 'UPDATE tbl_produtos SET nome = ?, id_categoria = ?, preco = ? WHERE codigo = ?';
    const conn = await conexao();
    try {
        const [result] = await conn.query(sql, [dados.nome, dados.id_categoria, dados.preco, codigo]);
        await conn.end();
        return { mensagem: 'Produto atualizado com sucesso', result };
    } catch (err) {
        return { erro: err.message };
    }
}

module.exports = { atualizarProduto }