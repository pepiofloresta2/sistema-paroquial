const Relatorio = {

    gerar() {

        let mesInput = document.getElementById("mesFiltro").value;

        if (!mesInput) {
            alert("Selecione o mês.");
            return;
        }

        let [ano, mes] = mesInput.split("-");

        API.enviar({
            acao: "buscar_relatorio",
            mes: mes,
            ano: ano
        })
        .then(res => {

            if (!res || !res.lista || res.lista.length === 0) {
                document.getElementById("res").innerHTML =
                    "<p>Sem lançamentos neste período.</p>";
                return;
            }

            let linhas = "";
            let totalEntradas = 0;
            let totalSaidas = 0;
            let totalDizimo = 0;

            res.lista.forEach(item => {

                let tipo = item.tipo || "";
                let categoria = item.categoria || "";
                let valor = parseFloat(item.valor || 0);

                // Dízimo entra somado, não individual
                if (categoria === "Dízimo") {
                    totalDizimo += valor;
                    return;
                }

                let entrada = "";
                let saida = "";

                if (tipo === "Entrada") {
                    entrada = "R$ " + valor.toFixed(2);
                    totalEntradas += valor;
                }

                if (tipo === "Saída") {
                    saida = "R$ " + valor.toFixed(2);
                    totalSaidas += valor;
                }

                linhas += `
                    <tr>
                        <td>${item.data || ""}</td>
                        <td>${categoria}</td>
                        <td>${entrada}</td>
                        <td>${saida}</td>
                    </tr>
                `;
            });

            // adiciona o total de dízimo consolidado
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

            let html = `
                <div id="doc" class="relatorio">

                    <h3 style="text-align:center;">
                        COMUNIDADE SÃO PADRE PIO DE PIETRELCINA
                    </h3>

                    <h4 style="text-align:center;">
                        Relatório Mensal - ${mes}/${ano}
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

            document.getElementById("res").innerHTML = html;
            window.__RELATORIO_PRONTO__ = true;

        });
    }

};