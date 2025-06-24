// NENHUMA IMPORTAÇÃO DO EXPECT É NECESSÁRIA. Jest faz isso automaticamente.

const { inserirEndereco } = require('../DAO/endereco/inserir_endereco.js');
const { buscarEnderecos, buscarEndereco } = require('../DAO/endereco/buscar_endereco.js');
const { atualizarEndereco } = require('../DAO/endereco/atualizar_endereco.js');
const { apagarEndereco } = require('../DAO/endereco/apagar_endereco.js');

describe('Testes da DAO Endereco', () => {
    const idTeste = 9999;
    const enderecoTeste = {
        id: idTeste,
        logradouro: 'Rua Teste Jest',
        cep: '12345678',
        numero: '123',
        bairro: 'Bairro Teste',
        cidade: 'Cidade Teste'
    };
    const enderecoAtualizado = {
        logradouro: 'Rua Atualizada Jest',
        cep: '87654321',
        numero: '321',
        bairro: 'Bairro Atualizado',
        cidade: 'Cidade Atualizada'
    };

    beforeEach(async () => {
        await apagarEndereco(idTeste).catch(() => {});
        await inserirEndereco(
            enderecoTeste.id,
            enderecoTeste.logradouro,
            enderecoTeste.cep,
            enderecoTeste.numero,
            enderecoTeste.bairro,
            enderecoTeste.cidade
        );
    });

    afterEach(async () => {
        await apagarEndereco(idTeste).catch(() => {});
    });

    it('Deve buscar todos os endereços e incluir o endereço de teste', async () => {
        const res = await buscarEnderecos();
        expect(Array.isArray(res)).toBe(true);
        expect(res).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: idTeste, logradouro: enderecoTeste.logradouro })
            ])
        );
    });

    it('Deve buscar um endereço específico pelo id', async () => {
        const res = await buscarEndereco(idTeste);
        expect(res).toHaveLength(1);
        expect(res[0]).toMatchObject({ id: idTeste, logradouro: enderecoTeste.logradouro });
    });

    it('Deve atualizar um endereço', async () => {
        const res = await atualizarEndereco(idTeste, enderecoAtualizado);
        expect(res.mensagem).toContain('Endereço atualizado com sucesso');
        expect(res.result.affectedRows).toBeGreaterThan(0);

        const enderecoVerificado = await buscarEndereco(idTeste);
        expect(enderecoVerificado[0]).toMatchObject({
            id: idTeste,
            logradouro: enderecoAtualizado.logradouro,
            cep: enderecoAtualizado.cep,
            numero: 321, // Corrigido para número
            bairro: enderecoAtualizado.bairro,
            cidade: enderecoAtualizado.cidade
        });
    });

    it('Deve apagar um endereço', async () => {
        const res = await apagarEndereco(idTeste);
        expect(res.mensagem).toContain('Endereço apagado com sucesso');
        expect(res.result.affectedRows).toBeGreaterThan(0);

        const enderecoVerificado = await buscarEndereco(idTeste);
        expect(enderecoVerificado).toHaveLength(0);
    });

    it('Deve inserir um NOVO endereço com sucesso', async () => {
        const novoId = 10000;
        const novoEndereco = {
            logradouro: 'Rua Nova Jest',
            cep: '00000000',
            numero: '999',
            bairro: 'Bairro Novo',
            cidade: 'Cidade Nova'
        };

        await apagarEndereco(novoId).catch(() => {});

        const res = await inserirEndereco(
            novoId,
            novoEndereco.logradouro,
            novoEndereco.cep,
            novoEndereco.numero,
            novoEndereco.bairro,
            novoEndereco.cidade
        );
        expect(res.mensagem).toContain('Endereço inserido com sucesso');

        const enderecoVerificado = await buscarEndereco(novoId);
        expect(enderecoVerificado[0].logradouro).toBe(novoEndereco.logradouro);

        await apagarEndereco(novoId);
    });
});