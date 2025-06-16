const express = require('express')
const env = require('dotenv')

const {buscarClientes, buscarCliente} = require('./src/DAO/cliente/buscar_cliente.js')
const {apagarCliente} = require('./src/DAO/cliente/apagar_cliente.js')
const {incluirCliente} = require('./src/DAO/cliente/inserir_cliente.js')
const {atualizarCliente} = require('./src/DAO/cliente/atualizar_cliente.js')
const {conexao, closeConexao, testarConexao} = require('./src/DAO/conexao.js')
const {buscarCategorias, buscarCategoria} = require('./src/DAO/categoria/buscar_categoria..js')
const {inserirCategoria} = require('./src/DAO/categoria/inserir_categoria.js')
const {atualizarCategoria} = require('./src/DAO/categoria/atualizar_categoria.js')
const {apagarCategoria} = require('./src/DAO/categoria/apagar_categoria.js')
const {buscarPedidos, buscarPedido} = require('./src/DAO/pedido/buscar_pedido.js')
const {inserirPedido} = require('./src/DAO/pedido/inserir_pedido.js')
const {atualizarPedido} = require('./src/DAO/pedido/atualizar_pedido.js')
const {apagarPedido} = require('./src/DAO/pedido/apagar_pedido.js')
const {buscarProdutos, buscarProduto} = require('./src/DAO/produto/buscar_produto.js')
const {inserirProduto} = require('./src/DAO/produto/inserir_produto.js')
const {atualizarProduto} = require('./src/DAO/produto/atualizar_produto.js')
const {apagarProduto} = require('./src/DAO/produto/apagar_produto.js')
const {buscarStatus, buscarStatusPorId} = require('./src/DAO/status/buscar_status.js')
const {inserirStatus} = require('./src/DAO/status/inserir_status.js')
const {atualizarStatus} = require('./src/DAO/status/atualizar_status.js')
const {apagarStatus} = require('./src/DAO/status/apagar_status.js')
const {buscarEnderecos, buscarEndereco} = require('./src/DAO/endereco/buscar_endereco.js')
const {inserirEndereco} = require('./src/DAO/endereco/inserir_endereco.js')
const {atualizarEndereco} = require('./src/DAO/endereco/atualizar_endereco.js')
const {apagarEndereco} = require('./src/DAO/endereco/apagar_endereco.js')
const {buscarItensPedido, buscarItemPedido} = require('./src/DAO/itempedido/buscar_itempedido.js')
const {inserirItemPedido} = require('./src/DAO/itempedido/inserir_itempedido.js')
const {atualizarItemPedido} = require('./src/DAO/itempedido/atualizar_itempedido.js')
const {apagarItemPedido} = require('./src/DAO/itempedido/apagar_itempedido.js')

const app = express()
env.config()

app.use(
    express.urlencoded({
        extended: true
    })
  )
  
  app.use(express.json())
  


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/firma/1.0.0/clientes', async (req, res) =>{
    let clientes = await buscarClientes()
    res.json(clientes)
})

app.get('/firma/1.0.0/cliente/:codigo', async (req, res) =>{
    let codigo = parseInt( req.params.codigo)
    let cliente = await buscarCliente(codigo)
    res.json(cliente)
})

app.post('/firma/1.0.0/cliente', async (req, res) =>{
    let {codigo, nome, limite, telefone, id_endereco, id_status} = req.body
    const infos = [codigo, nome, telefone, limite, id_endereco, id_status]
    let result = await incluirCliente(infos)
    res.json(result)
})

app.delete('/firma/1.0.0/cliente/:codigo', async (req, res) =>{
    let codigo = parseInt(req.params.codigo)
    let cliente = await apagarCliente(codigo)
    res.json(cliente)
})

app.put('/firma/1.0.0/cliente/:codigo', async (req, res) => {
    let codigo = parseInt(req.params.codigo)
    let { nome, telefone, limite, id_endereco, id_status } = req.body
    let result = await atualizarCliente(codigo, { nome, telefone, limite, id_endereco, id_status })
    res.json(result)
})

//categoriaaa

app.get('/firma/1.0.0/categorias', async (req, res) => {
    let categorias = await buscarCategorias()
    res.json(categorias)
})

app.get('/firma/1.0.0/categoria/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let categoria = await buscarCategoria(id)
    res.json(categoria)
})

app.post('/firma/1.0.0/categoria', async (req, res) => {
    let { id, nome } = req.body
    let result = await inserirCategoria(id, nome)
    res.json(result)
})

app.put('/firma/1.0.0/categoria/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let { nome } = req.body
    let result = await atualizarCategoria(id, nome)
    res.json(result)
})

app.delete('/firma/1.0.0/categoria/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let result = await apagarCategoria(id)
    res.json(result)
})

// Rotas de pedido
app.get('/firma/1.0.0/pedidos', async (req, res) => {
    let pedidos = await buscarPedidos()
    res.json(pedidos)
})

app.get('/firma/1.0.0/pedido/:numero', async (req, res) => {
    let numero = parseInt(req.params.numero)
    let pedido = await buscarPedido(numero)
    res.json(pedido)
})

app.post('/firma/1.0.0/pedido', async (req, res) => {
    let { numero, data_elaboracao, cliente_id } = req.body
    let result = await inserirPedido(numero, data_elaboracao, cliente_id)
    res.json(result)
})

app.put('/firma/1.0.0/pedido/:numero', async (req, res) => {
    let numero = parseInt(req.params.numero)
    let { data_elaboracao, cliente_id } = req.body
    let result = await atualizarPedido(numero, { data_elaboracao, cliente_id })
    res.json(result)
})

app.delete('/firma/1.0.0/pedido/:numero', async (req, res) => {
    let numero = parseInt(req.params.numero)
    let result = await apagarPedido(numero)
    res.json(result)
})

// Rotas de produto
app.get('/firma/1.0.0/produtos', async (req, res) => {
    let produtos = await buscarProdutos()
    res.json(produtos)
})

app.get('/firma/1.0.0/produto/:codigo', async (req, res) => {
    let codigo = parseInt(req.params.codigo)
    let produto = await buscarProduto(codigo)
    res.json(produto)
})

app.post('/firma/1.0.0/produto', async (req, res) => {
    let { codigo, nome, id_categoria, preco } = req.body
    let result = await inserirProduto(codigo, nome, id_categoria, preco)
    res.json(result)
})

app.put('/firma/1.0.0/produto/:codigo', async (req, res) => {
    let codigo = parseInt(req.params.codigo)
    let { nome, id_categoria, preco } = req.body
    let result = await atualizarProduto(codigo, { nome, id_categoria, preco })
    res.json(result)
})

app.delete('/firma/1.0.0/produto/:codigo', async (req, res) => {
    let codigo = parseInt(req.params.codigo)
    let result = await apagarProduto(codigo)
    res.json(result)
})

// Rotas de status
app.get('/firma/1.0.0/status', async (req, res) => {
    let status = await buscarStatus()
    res.json(status)
})

app.get('/firma/1.0.0/status/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let status = await buscarStatusPorId(id)
    res.json(status)
})

app.post('/firma/1.0.0/status', async (req, res) => {
    let { id, nome } = req.body
    let result = await inserirStatus(id, nome)
    res.json(result)
})

app.put('/firma/1.0.0/status/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let { nome } = req.body
    let result = await atualizarStatus(id, nome)
    res.json(result)
})

app.delete('/firma/1.0.0/status/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let result = await apagarStatus(id)
    res.json(result)
})

// Rotas de endereco
app.get('/firma/1.0.0/enderecos', async (req, res) => {
    let enderecos = await buscarEnderecos()
    res.json(enderecos)
})

app.get('/firma/1.0.0/endereco/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let endereco = await buscarEndereco(id)
    res.json(endereco)
})

app.post('/firma/1.0.0/endereco', async (req, res) => {
    let { id, logradouro, cep, numero, bairro, cidade } = req.body
    let result = await inserirEndereco(id, logradouro, cep, numero, bairro, cidade)
    res.json(result)
})

app.put('/firma/1.0.0/endereco/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let { logradouro, cep, numero, bairro, cidade } = req.body
    let result = await atualizarEndereco(id, { logradouro, cep, numero, bairro, cidade })
    res.json(result)
})

app.delete('/firma/1.0.0/endereco/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let result = await apagarEndereco(id)
    res.json(result)
})

// Rotas de itempedido
app.get('/firma/1.0.0/itenspedido', async (req, res) => {
    let itens = await buscarItensPedido()
    res.json(itens)
})

app.get('/firma/1.0.0/itempedido/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let item = await buscarItemPedido(id)
    res.json(item)
})

app.post('/firma/1.0.0/itempedido', async (req, res) => {
    let { id, id_pedido, id_produto, qnt } = req.body
    let result = await inserirItemPedido(id, id_pedido, id_produto, qnt)
    res.json(result)
})

app.put('/firma/1.0.0/itempedido/:id/:id_pedido/:id_produto', async (req, res) => {
    let id = parseInt(req.params.id)
    let id_pedido = parseInt(req.params.id_pedido)
    let id_produto = parseInt(req.params.id_produto)
    let { qnt } = req.body
    let result = await atualizarItemPedido(id, id_pedido, id_produto, qnt)
    res.json(result)
})

app.delete('/firma/1.0.0/itempedido/:id/:id_pedido/:id_produto', async (req, res) => {
    let id = parseInt(req.params.id)
    let id_pedido = parseInt(req.params.id_pedido)
    let id_produto = parseInt(req.params.id_produto)
    let result = await apagarItemPedido(id, id_pedido, id_produto)
    res.json(result)
})

app.listen(process.env.PORTA, () => {
    console.log(`Operando na porta ${process.env.PORTA}`), 
    testarConexao(conexao())
})