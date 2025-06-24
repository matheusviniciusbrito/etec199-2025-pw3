// NENHUMA IMPORTAÇÃO DO EXPECT É NECESSÁRIA. Jest faz isso automaticamente.

const { inserirPedido } = require('../DAO/pedido/inserir_pedido.js');
const { buscarPedidos, buscarPedido } = require('../DAO/pedido/buscar_pedido.js');
const { atualizarPedido } = require('../DAO/pedido/atualizar_pedido.js');
const { apagarPedido } = require('../DAO/pedido/apagar_pedido.js');

describe('Testes da DAO Pedido', () => {
    const numeroTeste = 9999;
    const dataElaboracaoTeste = '2024-01-01';
    const clienteIdTeste = 1; // Certifique-se que existe um cliente com id 1
    const dataElaboracaoAtualizada = '2025-01-01';
    const clienteIdAtualizado = 2; // Certifique-se que existe um cliente com id 2

    beforeEach(async () => {
        await apagarPedido(numeroTeste).catch(() => {});
        await inserirPedido(numeroTeste, dataElaboracaoTeste, clienteIdTeste);
    });

    afterEach(async () => {
        await apagarPedido(numeroTeste).catch(() => {});
    });

    function formatDate(date) {
        // Aceita Date, string ISO ou já no formato correto
        if (!date) return date;
        const d = new Date(date);
        if (isNaN(d)) return date;
        return d.toISOString().slice(0, 10);
    }

    it('Deve buscar todos os pedidos e incluir o pedido de teste', async () => {
        const res = await buscarPedidos();
        expect(Array.isArray(res)).toBe(true);
        expect(res).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    numero: numeroTeste,
                    data_elaboracao: expect.anything(),
                    cliente_id: clienteIdTeste
                })
            ])
        );
        // Verifica a data formatada
        const pedido = res.find(p => p.numero === numeroTeste);
        expect(formatDate(pedido.data_elaboracao)).toBe(dataElaboracaoTeste);
    });

    it('Deve buscar um pedido específico pelo número', async () => {
        const res = await buscarPedido(numeroTeste);
        expect(res).toHaveLength(1);
        expect(res[0]).toMatchObject({
            numero: numeroTeste,
            cliente_id: clienteIdTeste
        });
        expect(formatDate(res[0].data_elaboracao)).toBe(dataElaboracaoTeste);
    });

    it('Deve atualizar um pedido', async () => {
        const res = await atualizarPedido(numeroTeste, {
            data_elaboracao: dataElaboracaoAtualizada,
            cliente_id: clienteIdAtualizado
        });
        expect(res.mensagem).toContain('Pedido atualizado com sucesso');
        expect(res.result.affectedRows).toBeGreaterThan(0);

        const pedidoVerificado = await buscarPedido(numeroTeste);
        expect(pedidoVerificado[0]).toMatchObject({
            numero: numeroTeste,
            cliente_id: clienteIdAtualizado
        });
        expect(formatDate(pedidoVerificado[0].data_elaboracao)).toBe(dataElaboracaoAtualizada);
    });

    it('Deve apagar um pedido', async () => {
        const res = await apagarPedido(numeroTeste);
        expect(res.mensagem).toContain('Pedido apagado com sucesso');
        expect(res.result.affectedRows).toBeGreaterThan(0);

        const pedidoVerificado = await buscarPedido(numeroTeste);
        expect(pedidoVerificado).toHaveLength(0);
    });

    it('Deve inserir um NOVO pedido com sucesso', async () => {
        const novoNumero = 10000;
        const novaData = '2024-12-31';
        const novoClienteId = 1;

        await apagarPedido(novoNumero).catch(() => {});

        const res = await inserirPedido(novoNumero, novaData, novoClienteId);
        expect(res.mensagem).toContain('Pedido inserido com sucesso');

        const pedidoVerificado = await buscarPedido(novoNumero);
        expect(formatDate(pedidoVerificado[0].data_elaboracao)).toBe(novaData);

        await apagarPedido(novoNumero);
    });
});