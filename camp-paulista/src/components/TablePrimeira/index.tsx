import styles from "./style.module.css"

interface Time {
  classificacao: number;
  time: string;
  P: number;
  J: number;
  V: number;
  E: number;
  D: number;
  GP: number;
  GC: number;
  SG: number;
  porcentagem: string;
  ultimosJogos: string[];
}

interface TableProps {
  grupo: Time[];
}

export function Table({ grupo }: TableProps) {
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Classificação</th>
            <th>
              Time
            </th>
            <th>P</th>
            <th>J</th>
            <th>V</th>
            <th>E</th>
            <th>D</th>
            <th>GP</th>
            <th>GC</th>
            <th>SG</th>
            <th>%</th>
            <th>ÚLT. JOGOS</th>
          </tr>
        </thead>
        <tbody>
        {grupo.map((time, index) => (
          <tr key={index}>
            <td>{time.classificacao}</td>
            <td className={styles.nomeTime}>{time.time}</td> {/* <== adicionei a classe */}
            <td>{time.P}</td>
            <td className={styles.nomeTime}>{time.J}</td>
            <td>{time.V}</td>
            <td className={styles.nomeTime}>{time.E}</td>
            <td>{time.D}</td>
            <td className={styles.nomeTime}>{time.GP}</td>
            <td>{time.GC}</td>
            <td className={styles.nomeTime}>{time.SG}</td>
            <td>{time.porcentagem}</td>
            <td className={styles.nomeTime}>{time.ultimosJogos.join(", ")}</td>
          </tr>
        ))}
      </tbody>

      </table>
    </div>
  );
}