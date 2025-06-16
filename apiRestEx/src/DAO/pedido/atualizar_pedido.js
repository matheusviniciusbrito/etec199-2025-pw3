const { conexao } = require('../conexao.js')

async function atualizarPedido(numero, dados) {
    const sql = 'UPDATE tbl_pedido SET data_elaboracao = ?, cliente_id = ? WHERE numero = ?';
    const conn = await conexao();
    try {
        const [result] = await conn.query(sql, [dados.data_elaboracao, dados.cliente_id, numero]);
        await conn.end();
        return { mensagem: 'Pedido atualizado com sucesso', result };
    } catch (err) {
        return { erro: err.message };
    }
}

module.exports = { atualizarPedido }