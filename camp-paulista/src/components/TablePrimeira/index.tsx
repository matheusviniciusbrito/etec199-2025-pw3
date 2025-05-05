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
              <td>{time.time}</td>
              <td>{time.P}</td>
              <td>{time.J}</td>
              <td>{time.V}</td>
              <td>{time.E}</td>
              <td>{time.D}</td>
              <td>{time.GP}</td>
              <td>{time.GC}</td>
              <td>{time.SG}</td>
              <td>{time.porcentagem}</td>
              <td>{time.ultimosJogos.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}