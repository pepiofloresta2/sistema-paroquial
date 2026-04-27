const Relatorio = {
                    <tr>
                        <td>${item.data || ""}</td>
                        <td>${item.categoria || ""}</td>
                        <td>${entrada}</td>
                        <td>${saida}</td>
                    </tr>
                `;
            });

            if (totalDizimo > 0) {
                linhas += `
                    <tr>
                        <td></td>
                        <td><strong>DÍZIMO TOTAL</strong></td>
                        <td><strong>R$ ${totalDizimo.toFixed(2)}</strong></td>
                        <td></td>
                    </tr>
                `;

                totalEntradas += totalDizimo;
            }

            let saldo = totalEntradas - totalSaidas;

            document.getElementById("res").innerHTML = `
                <div id="doc" class="relatorio">
                    <h3 style="text-align:center;">
                        COMUNIDADE SÃO PIO DE PIETRELCINA
                    </h3>

                    <h4 style="text-align:center;">
                        Relatório ${mes}/${ano}
                    </h4>

                    <table>
                        <tr>
                            <th>DATA</th>
                            <th>HISTÓRICO</th>
                            <th>ENTRADAS</th>
                            <th>SAÍDAS</th>
                        </tr>
                        ${linhas}
                    </table>

                    <br>

                    <table>
                        <tr>
                            <td><strong>TOTAL ENTRADAS</strong></td>
                            <td><strong>R$ ${totalEntradas.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td><strong>TOTAL SAÍDAS</strong></td>
                            <td><strong>R$ ${totalSaidas.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td><strong>SALDO FINAL</strong></td>
                            <td><strong>R$ ${saldo.toFixed(2)}</strong></td>
                        </tr>
                    </table>
                </div>
            `;

            window.__RELATORIO_PRONTO__ = true;
        });
    }

};