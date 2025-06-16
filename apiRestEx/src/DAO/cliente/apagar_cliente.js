const {conexao} = require('../conexao.js')

async function apagarCliente(codigo){
    const sql = `DELETE FROM tbl_cliente WHERE codigo = ?`
    
    const conn = await conexao()
    
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql, [codigo]);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}


module.exports = {apagarCliente}