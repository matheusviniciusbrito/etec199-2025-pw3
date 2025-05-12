import styles from "./style.module.css";

interface Jogo {
  fase: string;
  data: string;
  hora: string;
  mandante: string;
  visitante: string;
  placar: string;
  estadio: string;
  classificado: string | null;
}

interface CardJogosProps {
  jogos: Jogo[];
}

export function CardJogos({ jogos }: CardJogosProps) {
  return (
    <div className={styles.cardsContainer}>
      {jogos.map((jogo, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.header}>
            <span className={styles.fase}>{jogo.fase}</span>
            <span className={styles.dataHora}>
              {jogo.data} • {jogo.hora}
            </span>
          </div>
          <div className={styles.teams}>
            <div className={styles.team}>
              <div className={styles.icon}></div>
              <span>{jogo.mandante}</span>
            </div>
            <span className={styles.placar}>{jogo.placar}</span>
            <div className={styles.team}>
              <div className={styles.icon}></div>
              <span>{jogo.visitante}</span>
            </div>
          </div>
          <div className={styles.footer}>
            <span>{jogo.estadio}</span>
            {jogo.classificado && (
              <span className={styles.classificado}>
                Classificado: {jogo.classificado}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}