import faseDeGrupos from '../../public/data/faseDeGrupos.json';
import quartasFinal from '../../public/data/quartasFinal2025.json';
import semifinais from '../../public/data/semifinais2025.json';
import final from '../../public/data/final.json';
import { Table } from '../components/TablePrimeira';
import { CardJogos } from '../components/CardJogos';

export default function Home() {
  return (
    <div>
      <h1>Grupo A</h1>
      <Table grupo={faseDeGrupos.grupoA} />
      <h1>Grupo B</h1>
      <Table grupo={faseDeGrupos.grupoB} />
      <h1>Grupo C</h1>
      <Table grupo={faseDeGrupos.grupoC} />
      <h1>Grupo D</h1>
      <Table grupo={faseDeGrupos.grupoD} />

      <h1>Quartas de Final</h1>
      <CardJogos jogos={quartasFinal} />

      <h1>Semifinais</h1>
      <CardJogos jogos={semifinais} />

      <h1>Final</h1>
      <CardJogos jogos={final} />
    </div>
  );
}