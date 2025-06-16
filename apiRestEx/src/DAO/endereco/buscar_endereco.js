const { conexao } = require('../conexao.js')

async function buscarEnderecos() {
    const sql = 'SELECT * FROM tbl_endereco';
    const conn = await conexao();
    try {
        const [rows] = await conn.query(sql);
        await conn.end();
        return rows;
    } catch (err) {
        return err.message;
    }
}

async function buscarEndereco(id) {
    const sql = 'SELECT * FROM tbl_endereco WHERE id = ?';
    const conn = await conexao();
    try {
        const [rows] = await conn.query(sql, [id]);
        await conn.end();
        return rows;
    } catch (err) {
        return err.message;
    }
}

module.exports = { buscarEnderecos, buscarEndereco }