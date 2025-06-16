const { conexao } = require('../conexao.js')

async function inserirItemPedido(id, id_pedido, id_produto, qnt) {
    const sql = 'INSERT INTO tbl_itempedido (id, id_pedido, id_produto, qnt) VALUES (?, ?, ?, ?)';
    const conn = await conexao();
    try {
        const [result] = await conn.query(sql, [id, id_pedido, id_produto, qnt]);
        await conn.end();
        return { mensagem: 'Item de pedido inserido com sucesso', result };
    } catch (err) {
        return { erro: err.message };
    }
}

module.exports = { inserirItemPedido }