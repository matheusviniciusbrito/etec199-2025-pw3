import faseDeGrupos from '../../public/data/faseDeGrupos.json';
import quartasFinal2025 from '../../public/data/quartasFinal2025.json';
import semifinais2025 from '../../public/data/semifinais2025.json'
import final from '../../public/data/final.json'
import styles from './page.module.css';
import { Table } from '../components/TablePrimeira';
import { CardJogos } from '../components/CardJogos'
import { Header } from '../components/header';
import { Footer } from '../components/footer';

export default function Home() {
  return (
    <div>
      <Header />
      <h1 className={styles.titulo}>Grupo A</h1>
      <Table grupo={faseDeGrupos.grupoA} />
      <h1 className={styles.titulo}>Grupo B</h1>
      <Table grupo={faseDeGrupos.grupoB} />
      <h1 className={styles.titulo}>Grupo C</h1>
      <Table grupo={faseDeGrupos.grupoC} />
      <h1 className={styles.titulo}>Grupo D</h1>
      <Table grupo={faseDeGrupos.grupoD} />
      <h1 className={styles.titulo}>Quartas</h1>
      <CardJogos jogos={quartasFinal2025}></CardJogos>
      <h1 className={styles.titulo}>Semifinais</h1>
      <CardJogos jogos={semifinais2025}></CardJogos>
      <h1 className={styles.titulo}>Final</h1>
      <CardJogos jogos={final}></CardJogos>

      <Footer />

      
    </div>
  );

}