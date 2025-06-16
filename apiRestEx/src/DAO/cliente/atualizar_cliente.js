const { conexao } = require('../conexao.js')

async function atualizarCliente(codigo, dados) {
    const sql = `
        UPDATE tbl_cliente 
        SET nome = ?, telefone = ?, limite = ?, id_endereco = ?, id_status = ?
        WHERE codigo = ?
    `
    const conn = await conexao()
    try {
        const [result] = await conn.query(sql, [
            dados.nome,
            dados.telefone,
            dados.limite,
            dados.id_endereco,
            dados.id_status,
            codigo
        ])
        await conn.end()
        return { mensagem: "Cliente atualizado com sucesso", result }
    } catch (err) {
        return { erro: err.message }
    }
}

module.exports = { atualizarCliente }