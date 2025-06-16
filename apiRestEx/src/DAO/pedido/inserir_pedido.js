const { conexao } = require('../conexao.js')

async function inserirPedido(numero, data_elaboracao, cliente_id) {
    const sql = 'INSERT INTO tbl_pedido (numero, data_elaboracao, cliente_id) VALUES (?, ?, ?)';
    const conn = await conexao();
    try {
        const [result] = await conn.query(sql, [numero, data_elaboracao, cliente_id]);
        await conn.end();
        return { mensagem: 'Pedido inserido com sucesso', result };
    } catch (err) {
        return { erro: err.message };
    }
}

module.exports = { inserirPedido }