import faseDeGrupos from '../../public/data/faseDeGrupos.json';
import { Table } from '../components/TablePrimeira';

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
    </div>
    
  )

}