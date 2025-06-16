const { conexao } = require('../conexao.js')

async function apagarPedido(numero) {
    const sql = 'DELETE FROM tbl_pedido WHERE numero = ?';
    const conn = await conexao();
    try {
        const [result] = await conn.query(sql, [numero]);
        await conn.end();
        return { mensagem: 'Pedido apagado com sucesso', result };
    } catch (err) {
        return { erro: err.message };
    }
}

module.exports = { apagarPedido }