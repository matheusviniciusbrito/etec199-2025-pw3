// NENHUMA IMPORTAÇÃO DO EXPECT É NECESSÁRIA. Jest faz isso automaticamente.

const { inserirCategoria } = require('../DAO/categoria/inserir_categoria.js');
const { buscarCategorias, buscarCategoria } = require('../DAO/categoria/buscar_categoria..js');
const { atualizarCategoria } = require('../DAO/categoria/atualizar_categoria.js');
const { apagarCategoria } = require('../DAO/categoria/apagar_categoria.js');

describe('Testes da DAO Categoria', () => { // Removi 'function' para usar arrow function, mais comum em Jest
    const idTeste = 9999;
    const nomeTeste = 'Categoria Teste Hooks';
    const nomeAtualizado = 'Categoria Atualizada Hooks';

    beforeEach(async () => {
        await apagarCategoria(idTeste).catch(() => {});
        await inserirCategoria(idTeste, nomeTeste);
    });

    afterEach(async () => {
        await apagarCategoria(idTeste).catch(() => {});
    });

    it('Deve buscar todas as categorias e incluir a categoria de teste', async () => {
        const res = await buscarCategorias();
        expect(Array.isArray(res)).toBe(true); // Chai: .to.be.an('array')
        // Jest: Podemos verificar o conteúdo com .toContainEqual
        expect(res).toContainEqual({ id: idTeste, nome: nomeTeste }); 
    });

    it('Deve buscar uma categoria específica pelo id', async () => {
        const res = await buscarCategoria(idTeste);
        expect(res).toHaveLength(1); // Chai: .with.lengthOf(1)
        expect(res[0]).toMatchObject({ id: idTeste, nome: nomeTeste }); // Chai: .to.include({...})
    });

    it('Deve atualizar uma categoria', async () => {
        const res = await atualizarCategoria(idTeste, nomeAtualizado);
        expect(res.mensagem).toContain('Categoria atualizada com sucesso'); // Chai: .to.have.property('mensagem').that.includes(...)
        expect(res.result.affectedRows).toBeGreaterThan(0); // Chai: .that.is.greaterThan(0)

        const categoriaVerificada = await buscarCategoria(idTeste);
        expect(categoriaVerificada[0].nome).toBe(nomeAtualizado); // Chai: .to.equal(...)
    });

    it('Deve apagar uma categoria', async () => {
        const res = await apagarCategoria(idTeste);
        expect(res.mensagem).toContain('Categoria apagada com sucesso');
        expect(res.result.affectedRows).toBeGreaterThan(0);

        const categoriaVerificada = await buscarCategoria(idTeste);
        expect(categoriaVerificada).toHaveLength(0); // Chai: .that.is.empty
    });
    
    it('Deve inserir uma NOVA categoria com sucesso', async() => {
        const novoId = 10000;
        const novoNome = 'Uma Categoria Totalmente Nova';
        
        await apagarCategoria(novoId).catch(() => {});

        const res = await inserirCategoria(novoId, novoNome);
        expect(res.mensagem).toContain('Categoria inserida com sucesso');
        
        const categoriaVerificada = await buscarCategoria(novoId);
        expect(categoriaVerificada[0].nome).toBe(novoNome);

        await apagarCategoria(novoId);
    });
});