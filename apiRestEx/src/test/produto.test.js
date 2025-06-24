// NENHUMA IMPORTAÇÃO DO EXPECT É NECESSÁRIA. Jest faz isso automaticamente.

const { inserirProduto } = require('../DAO/produto/inserir_produto.js');
const { buscarProdutos, buscarProduto } = require('../DAO/produto/buscar_produto.js');
const { atualizarProduto } = require('../DAO/produto/atualizar_produto.js');
const { apagarProduto } = require('../DAO/produto/apagar_produto.js');

describe('Testes da DAO Produto', () => {
    const codigoTeste = 9999;
    const produtoTeste = {
        codigo: codigoTeste,
        nome: 'Produto Teste Jest',
        id_categoria: 1, // Certifique-se que existe a categoria 1
        preco: 10.50
    };
    const produtoAtualizado = {
        nome: 'Produto Atualizado Jest',
        id_categoria: 2, // Certifique-se que existe a categoria 2
        preco: 20.99
    };

    beforeEach(async () => {
        await apagarProduto(codigoTeste).catch(() => {});
        await inserirProduto(
            produtoTeste.codigo,
            produtoTeste.nome,
            produtoTeste.id_categoria,
            produtoTeste.preco
        );
    });

    afterEach(async () => {
        await apagarProduto(codigoTeste).catch(() => {});
    });

    it('Deve buscar todos os produtos e incluir o produto de teste', async () => {
        const res = await buscarProdutos();
        expect(Array.isArray(res)).toBe(true);
        expect(res).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    codigo: codigoTeste,
                    nome: produtoTeste.nome,
                    id_categoria: produtoTeste.id_categoria,
                    preco: produtoTeste.preco
                })
            ])
        );
    });

    it('Deve buscar um produto específico pelo código', async () => {
        const res = await buscarProduto(codigoTeste);
        expect(res).toHaveLength(1);
        expect(res[0]).toMatchObject({
            codigo: codigoTeste,
            nome: produtoTeste.nome,
            id_categoria: produtoTeste.id_categoria,
            preco: produtoTeste.preco
        });
    });

    it('Deve atualizar um produto', async () => {
        const res = await atualizarProduto(codigoTeste, produtoAtualizado);
        expect(res.mensagem).toContain('Produto atualizado com sucesso');
        expect(res.result.affectedRows).toBeGreaterThan(0);

        const produtoVerificado = await buscarProduto(codigoTeste);
        expect(produtoVerificado[0]).toMatchObject({
            codigo: codigoTeste,
            nome: produtoAtualizado.nome,
            id_categoria: produtoAtualizado.id_categoria,
            preco: produtoAtualizado.preco
        });
    });

    it('Deve apagar um produto', async () => {
        const res = await apagarProduto(codigoTeste);
        expect(res.mensagem).toContain('Produto apagado com sucesso');
        expect(res.result.affectedRows).toBeGreaterThan(0);

        const produtoVerificado = await buscarProduto(codigoTeste);
        expect(produtoVerificado).toHaveLength(0);
    });

    it('Deve inserir um NOVO produto com sucesso', async () => {
        const novoCodigo = 10000;
        const novoProduto = {
            nome: 'Novo Produto Jest',
            id_categoria: 1,
            preco: 99.99
        };

        await apagarProduto(novoCodigo).catch(() => {});

        const res = await inserirProduto(
            novoCodigo,
            novoProduto.nome,
            novoProduto.id_categoria,
            novoProduto.preco
        );
        expect(res.mensagem).toContain('Produto inserido com sucesso');

        const produtoVerificado = await buscarProduto(novoCodigo);
        expect(produtoVerificado[0].nome).toBe(novoProduto.nome);

        await apagarProduto(novoCodigo);
    });
});