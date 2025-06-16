const { conexao } = require('../conexao.js')

async function atualizarItemPedido(id, id_pedido, id_produto, qnt) {
    const sql = 'UPDATE tbl_itempedido SET qnt = ? WHERE id = ? AND id_pedido = ? AND id_produto = ?';
    const conn = await conexao();
    try {
        const [result] = await conn.query(sql, [qnt, id, id_pedido, id_produto]);
        await conn.end();
        return { mensagem: 'Item de pedido atualizado com sucesso', result };
    } catch (err) {
        return { erro: err.message };
    }
}

module.exports = { atualizarItemPedido }