const { conexao } = require('../conexao.js')

async function buscarCategorias() {
    const sql = 'SELECT * FROM tbl_categoria';
    const conn = await conexao();
    try {
        const [rows] = await conn.query(sql);
        await conn.end();
        return rows;
    } catch (err) {
        return err.message;
    }
}

async function buscarCategoria(id) {
    const sql = 'SELECT * FROM tbl_categoria WHERE id = ?';
    const conn = await conexao();
    try {
        const [rows] = await conn.query(sql, [id]);
        await conn.end();
        return rows;
    } catch (err) {
        return err.message;
    }
}

module.exports = { buscarCategorias, buscarCategoria }