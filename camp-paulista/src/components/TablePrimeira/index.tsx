import grupoAfase1 from '../../../public/data/grupoAfase1.json';

export function Table() {
    console.log(grupoAfase1);
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Classificação</th>
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
                    {grupoAfase1.map((time, index) => (
                        <tr key={index}>
                            <td>{time.classificacao}</td>
                            <td>{time.P}</td>
                            <td>{time.J}</td>
                            <td>{time.V}</td>
                            <td>{time.E}</td>
                            <td>{time.D}</td>
                            <td>{time.GP}</td>
                            <td>{time.GC}</td>
                            <td>{time.SG}</td>
                            <td>{time.porcentagem}</td>
                            <td>{time.ultimosJogos}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}