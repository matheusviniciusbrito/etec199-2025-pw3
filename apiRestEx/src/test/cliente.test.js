// NENHUMA IMPORTAÇÃO DO EXPECT É NECESSÁRIA. Jest faz isso automaticamente.

const { incluirCliente } = require('../DAO/cliente/inserir_cliente.js');
const { buscarClientes, buscarCliente } = require('../DAO/cliente/buscar_cliente.js');
const { atualizarCliente } = require('../DAO/cliente/atualizar_cliente.js');
const { apagarCliente } = require('../DAO/cliente/apagar_cliente.js');

describe('Testes da DAO Cliente', () => {
    const codigoTeste = 9999;
    const clienteTeste = {
        codigo: codigoTeste,
        nome: 'Cliente Teste Jest',
        telefone: '11999999999',
        limite: 1000.00,
        id_endereco: 1,
        id_status: 1
    };
    const clienteAtualizado = {
        nome: 'Cliente Atualizado Jest',
        telefone: '11888888888',
        limite: 2000.00,
        id_endereco: 2,
        id_status: 2
    };

    beforeEach(async () => {
        await apagarCliente(codigoTeste).catch(() => {});
        await incluirCliente([
            clienteTeste.codigo,
            clienteTeste.nome,
            clienteTeste.telefone,
            clienteTeste.limite,
            clienteTeste.id_endereco,
            clienteTeste.id_status
        ]);
    });

    afterEach(async () => {
        await apagarCliente(codigoTeste).catch(() => {});
    });

    it('Deve buscar todos os clientes e incluir o cliente de teste', async () => {
        const res = await buscarClientes();
        expect(Array.isArray(res)).toBe(true);
        expect(res).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ codigo: codigoTeste, nome: clienteTeste.nome })
            ])
        );
    });

    it('Deve buscar um cliente específico pelo código', async () => {
        const res = await buscarCliente(codigoTeste);
        expect(res).toHaveLength(1);
        expect(res[0]).toMatchObject({ codigo: codigoTeste, nome: clienteTeste.nome });
    });

    it('Deve atualizar um cliente', async () => {
        const res = await atualizarCliente(codigoTeste, clienteAtualizado);
        expect(res.mensagem).toContain('Cliente atualizado com sucesso');
        expect(res.result.affectedRows).toBeGreaterThan(0);

        const clienteVerificado = await buscarCliente(codigoTeste);
        expect(clienteVerificado[0]).toMatchObject({
            codigo: codigoTeste,
            nome: clienteAtualizado.nome,
            telefone: clienteAtualizado.telefone,
            limite: clienteAtualizado.limite,
            id_endereco: clienteAtualizado.id_endereco,
            id_status: clienteAtualizado.id_status
        });
    });

    it('Deve apagar um cliente', async () => {
        const res = await apagarCliente(codigoTeste);
        expect(res.affectedRows || res.result?.affectedRows).toBeGreaterThan(0);

        const clienteVerificado = await buscarCliente(codigoTeste);
        expect(clienteVerificado).toHaveLength(0);
    });

    it('Deve inserir um NOVO cliente com sucesso', async () => {
        const novoCodigo = 10000;
        const novoCliente = [
            novoCodigo,
            'Novo Cliente Jest',
            '11777777777',
            1500.00,
            3,
            3
        ];

        await apagarCliente(novoCodigo).catch(() => {});

        const res = await incluirCliente(novoCliente);
        expect(res.affectedRows || res.result?.affectedRows).toBeGreaterThan(0);

        const clienteVerificado = await buscarCliente(novoCodigo);
        expect(clienteVerificado[0].nome).toBe('Novo Cliente Jest');

        await apagarCliente(novoCodigo);
    });
});