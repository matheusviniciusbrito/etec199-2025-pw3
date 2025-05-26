import styles from "./style.module.css";

interface Jogo {
  fase: string;
  data: string;
  hora: string;
  mandante: string;
  escudoMandante?: string; // URL do escudo
  visitante: string;
  escudoVisitante?: string; // URL do escudo
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
            <span>{jogo.mandante}</span>
            {jogo.escudoMandante ? (
              <img src={jogo.escudoMandante} alt={jogo.mandante} className={styles.escudo} />
            ) : (
              <div className={styles.icon}></div>
            )}
            <span className={styles.placar}>{jogo.placar}</span>
            {jogo.escudoVisitante ? (
              <img src={jogo.escudoVisitante} alt={jogo.visitante} className={styles.escudo} />
            ) : (
              <div className={styles.icon}></div>
            )}
            <span>{jogo.visitante}</span>
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