import grupoAfase1 from '../../public/data/grupoAfase1.json';
import grupoBfase1 from '../../public/data/grupoBfase1.json';
import grupoCfase1 from '../../public/data/grupoCfase1.json';
import grupoDfase1 from '../../public/data/grupoDfase1.json';
import { Table } from '../components/TablePrimeira';

export default function Home() {
  return (
    <div>
      <h1>Grupo A</h1>
      <Table grupo={grupoAfase1} />
      <h1>Grupo B</h1>
      <Table grupo={grupoBfase1} />
      <h1>Grupo C</h1>
      <Table grupo={grupoCfase1} />
      <h1>Grupo D</h1>
      <Table grupo={grupoDfase1} />
    </div>
    
  )

}