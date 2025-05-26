import styles from "./style.module.css";

export function Header() {
    return (
      <header className={styles.header}>
        <h1>Tabelas do Paulistão</h1>
        <nav>
          <ul>
            <li>
              <a href="">Fase de grupos</a>
              <a href="">Quartas de Final</a>
              <a href="">Semifinal</a>
              <a href="">Final</a>
            </li>
          </ul>
        </nav>
      </header>
    );
}