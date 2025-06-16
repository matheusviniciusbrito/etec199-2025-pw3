const { conexao } = require('../conexao.js')

async function apagarItemPedido(id, id_pedido, id_produto) {
    const sql = 'DELETE FROM tbl_itempedido WHERE id = ? AND id_pedido = ? AND id_produto = ?';
    const conn = await conexao();
    try {
        const [result] = await conn.query(sql, [id, id_pedido, id_produto]);
        await conn.end();
        return { mensagem: 'Item de pedido apagado com sucesso', result };
    } catch (err) {
        return { erro: err.message };
    }
}

module.exports = { apagarItemPedido }