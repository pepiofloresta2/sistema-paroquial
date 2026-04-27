console.log("RELATORIO CARREGADO");
const Relatorio = {

    gerar() {

        let mesInput = document.getElementById("mesFiltro").value;

        if (!mesInput) {
            alert("Selecione o mês");
            return;
        }

        let partes = mesInput.split("-");
        let ano = partes[0];
        let mes = partes[1];

        API.enviar({
            acao: "buscar_relatorio",
            mes: mes,
            ano: ano
        })
        .then(res => {

            console.log("RELATORIO:", res);

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

                let valor = parseFloat(item.valor || 0);
                let entrada = "";
                let saida = "";

                // Dízimo consolidado
                if (item.categoria === "Dízimo") {
                    totalDizimo += valor;
                    return;
                }

                if (item.tipo === "Entrada") {
                    entrada = "R$ " + valor.toFixed(2);
                    totalEntradas += valor;
                }

                if (item.tipo === "Saída") {
                    saida = "R$ " + valor.toFixed(2);
                    totalSaidas += valor;
                }

                linhas += `
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
                        COMUNIDADE SÃO PADRE PIO DE PIETRELCINA
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