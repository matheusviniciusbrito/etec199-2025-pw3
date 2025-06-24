// NENHUMA IMPORTAÇÃO DO EXPECT É NECESSÁRIA. Jest faz isso automaticamente.

const { inserirItemPedido } = require('../DAO/itempedido/inserir_itempedido.js');
const { buscarItensPedido, buscarItemPedido } = require('../DAO/itempedido/buscar_itempedido.js');
const { atualizarItemPedido } = require('../DAO/itempedido/atualizar_itempedido.js');
const { apagarItemPedido } = require('../DAO/itempedido/apagar_itempedido.js');

describe('Testes da DAO ItemPedido', () => {
    const idTeste = 9999;
    const idPedidoTeste = 1;    // Certifique-se que existe um pedido com id 1
    const idProdutoTeste = 1;   // Certifique-se que existe um produto com id 1
    const qntTeste = 10;
    const qntAtualizada = 20;

    beforeEach(async () => {
        await apagarItemPedido(idTeste, idPedidoTeste, idProdutoTeste).catch(() => {});
        await inserirItemPedido(idTeste, idPedidoTeste, idProdutoTeste, qntTeste);
    });

    afterEach(async () => {
        await apagarItemPedido(idTeste, idPedidoTeste, idProdutoTeste).catch(() => {});
    });

    it('Deve buscar todos os itens de pedido e incluir o item de teste', async () => {
        const res = await buscarItensPedido();
        expect(Array.isArray(res)).toBe(true);
        expect(res).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: idTeste,
                    id_pedido: idPedidoTeste,
                    id_produto: idProdutoTeste,
                    qnt: qntTeste
                })
            ])
        );
    });

    it('Deve buscar um item de pedido específico pelo id', async () => {
        const res = await buscarItemPedido(idTeste);
        expect(res.length).toBeGreaterThan(0);
        expect(res[0]).toMatchObject({
            id: idTeste,
            id_pedido: idPedidoTeste,
            id_produto: idProdutoTeste,
            qnt: qntTeste
        });
    });

    it('Deve atualizar um item de pedido', async () => {
        const res = await atualizarItemPedido(idTeste, idPedidoTeste, idProdutoTeste, qntAtualizada);
        expect(res.mensagem).toContain('Item de pedido atualizado com sucesso');
        expect(res.result.affectedRows).toBeGreaterThan(0);

        const itemVerificado = await buscarItemPedido(idTeste);
        expect(itemVerificado[0]).toMatchObject({
            id: idTeste,
            id_pedido: idPedidoTeste,
            id_produto: idProdutoTeste,
            qnt: qntAtualizada
        });
    });

    it('Deve apagar um item de pedido', async () => {
        const res = await apagarItemPedido(idTeste, idPedidoTeste, idProdutoTeste);
        expect(res.mensagem).toContain('Item de pedido apagado com sucesso');
        expect(res.result.affectedRows).toBeGreaterThan(0);

        const itemVerificado = await buscarItemPedido(idTeste);
        expect(itemVerificado).toHaveLength(0);
    });

    it('Deve inserir um NOVO item de pedido com sucesso', async () => {
        const novoId = 10000;
        const novaQnt = 5;

        await apagarItemPedido(novoId, idPedidoTeste, idProdutoTeste).catch(() => {});

        const res = await inserirItemPedido(novoId, idPedidoTeste, idProdutoTeste, novaQnt);
        expect(res.mensagem).toContain('Item de pedido inserido com sucesso');

        const itemVerificado = await buscarItemPedido(novoId);
        expect(itemVerificado[0].qnt).toBe(novaQnt);

        await apagarItemPedido(novoId, idPedidoTeste, idProdutoTeste);
    });
});