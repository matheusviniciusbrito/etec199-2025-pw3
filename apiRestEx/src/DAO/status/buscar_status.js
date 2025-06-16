const { conexao } = require('../conexao.js')

async function buscarStatus() {
    const sql = 'SELECT * FROM tbl_status';
    const conn = await conexao();
    try {
        const [rows] = await conn.query(sql);
        await conn.end();
        return rows;
    } catch (err) {
        return err.message;
    }
}

async function buscarStatusPorId(id) {
    const sql = 'SELECT * FROM tbl_status WHERE id = ?';
    const conn = await conexao();
    try {
        const [rows] = await conn.query(sql, [id]);
        await conn.end();
        return rows;
    } catch (err) {
        return err.message;
    }
}

module.exports = { buscarStatus, buscarStatusPorId }