const { conexao } = require('../conexao.js')

async function buscarItensPedido() {
    const sql = 'SELECT * FROM tbl_itempedido';
    const conn = await conexao();
    try {
        const [rows] = await conn.query(sql);
        await conn.end();
        return rows;
    } catch (err) {
        return err.message;
    }
}

async function buscarItemPedido(id) {
    const sql = 'SELECT * FROM tbl_itempedido WHERE id = ?';
    const conn = await conexao();
    try {
        const [rows] = await conn.query(sql, [id]);
        await conn.end();
        return rows;
    } catch (err) {
        return err.message;
    }
}

module.exports = { buscarItensPedido, buscarItemPedido }