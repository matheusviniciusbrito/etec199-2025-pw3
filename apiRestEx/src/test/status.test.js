// NENHUMA IMPORTAÇÃO DO EXPECT É NECESSÁRIA. Jest faz isso automaticamente.

const { inserirStatus } = require('../DAO/status/inserir_status.js');
const { buscarStatus, buscarStatusPorId } = require('../DAO/status/buscar_status.js');
const { atualizarStatus } = require('../DAO/status/atualizar_status.js');
const { apagarStatus } = require('../DAO/status/apagar_status.js');

describe('Testes da DAO Status', () => {
    const idTeste = 9999;
    const nomeTeste = 'Status Teste Jest';
    const nomeAtualizado = 'Status Atualizado Jest';

    beforeEach(async () => {
        await apagarStatus(idTeste).catch(() => {});
        await inserirStatus(idTeste, nomeTeste);
    });

    afterEach(async () => {
        await apagarStatus(idTeste).catch(() => {});
    });

    it('Deve buscar todos os status e incluir o status de teste', async () => {
        const res = await buscarStatus();
        expect(Array.isArray(res)).toBe(true);
        expect(res).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: idTeste,
                    nome: nomeTeste
                })
            ])
        );
    });

    it('Deve buscar um status específico pelo id', async () => {
        const res = await buscarStatusPorId(idTeste);
        expect(res).toHaveLength(1);
        expect(res[0]).toMatchObject({
            id: idTeste,
            nome: nomeTeste
        });
    });

    it('Deve atualizar um status', async () => {
        const res = await atualizarStatus(idTeste, nomeAtualizado);
        expect(res.mensagem).toContain('Status atualizado com sucesso');
        expect(res.result.affectedRows).toBeGreaterThan(0);

        const statusVerificado = await buscarStatusPorId(idTeste);
        expect(statusVerificado[0]).toMatchObject({
            id: idTeste,
            nome: nomeAtualizado
        });
    });

    it('Deve apagar um status', async () => {
        const res = await apagarStatus(idTeste);
        expect(res.mensagem).toContain('Status apagado com sucesso');
        expect(res.result.affectedRows).toBeGreaterThan(0);

        const statusVerificado = await buscarStatusPorId(idTeste);
        expect(statusVerificado).toHaveLength(0);
    });

    it('Deve inserir um NOVO status com sucesso', async () => {
        const novoId = 10000;
        const novoNome = 'Novo Status Jest';

        await apagarStatus(novoId).catch(() => {});

        const res = await inserirStatus(novoId, novoNome);
        expect(res.mensagem).toContain('Status inserido com sucesso');

        const statusVerificado = await buscarStatusPorId(novoId);
        expect(statusVerificado[0].nome).toBe(novoNome);

        await apagarStatus(novoId);
    });
});