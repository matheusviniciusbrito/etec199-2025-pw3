const { conexao } = require('../conexao.js')

async function inserirProduto(codigo, nome, id_categoria, preco) {
    const sql = 'INSERT INTO tbl_produtos (codigo, nome, id_categoria, preco) VALUES (?, ?, ?, ?)';
    const conn = await conexao();
    try {
        const [result] = await conn.query(sql, [codigo, nome, id_categoria, preco]);
        await conn.end();
        return { mensagem: 'Produto inserido com sucesso', result };
    } catch (err) {
        return { erro: err.message };
    }
}

module.exports = { inserirProduto }