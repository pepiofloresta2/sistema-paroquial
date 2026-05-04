const Relatorio = {

    gerar() {

        let mesInput = document.getElementById("mesFiltro").value;

        if (!mesInput) {
            alert("Selecione o mês");
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

                let valor = parseFloat(item.valor || 0);

                // Dízimo separado
                if (item.categoria === "Dízimo") {
                    totalDizimo += valor;
                    return;
                }

                let entrada = "";
                let saida = "";

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
                        <td>${item.codigo || ""}</td>
                        <td class="text-right">${entrada}</td>
                        <td class="text-right text-red-600">${saida}</td>
                    </tr>
                `;
            });

            // Dízimo consolidado
            if (totalDizimo > 0) {
                linhas = `
                    <tr>
                        <td></td>
                        <td><strong>DÍZIMO (TOTAL)</strong></td>
                        <td></td>
                        <td class="text-right"><strong>R$ ${totalDizimo.toFixed(2)}</strong></td>
                        <td></td>
                    </tr>
                ` + linhas;

                totalEntradas += totalDizimo;
            }

            let saldo = totalEntradas - totalSaidas;

            let html = `
            <div id="doc" style="background:#fff; padding:20px; font-family:Arial;">

                <div style="text-align:center; margin-bottom:20px;">
                    <h2 style="margin:0;">COM. SÃO PADRE PIO DE PIETRELCINA</h2>
                    <h3 style="margin:0;">MOVIMENTO DO CAIXA</h3>
                    <p>Mês: ${mes}/${ano}</p>
                </div>

                <table style="width:100%; border-collapse:collapse; font-size:14px;">
                    <thead>
                        <tr style="background:#eee;">
                            <th style="border:1px solid #000; padding:6px;">DATA</th>
                            <th style="border:1px solid #000; padding:6px;">HISTÓRICO</th>
                            <th style="border:1px solid #000; padding:6px;">DOC. Nº</th>
                            <th style="border:1px solid #000; padding:6px;">ENTRADAS</th>
                            <th style="border:1px solid #000; padding:6px;">SAÍDAS</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${linhas}
                    </tbody>
                </table>

                <br>

                <table style="width:100%; border-collapse:collapse;">
                    <tr>
                        <td style="border:1px solid #000; padding:8px;"><strong>SUBTOTAL</strong></td>
                        <td style="border:1px solid #000; padding:8px; text-align:right;">
                            R$ ${totalEntradas.toFixed(2)}
                        </td>
                        <td style="border:1px solid #000; padding:8px; text-align:right; color:red;">
                            R$ ${totalSaidas.toFixed(2)}
                        </td>
                    </tr>

                    <tr>
                        <td style="border:1px solid #000; padding:8px;"><strong>SALDO MÊS</strong></td>
                        <td colspan="2" style="border:1px solid #000; padding:8px; text-align:right;">
                            <strong>R$ ${saldo.toFixed(2)}</strong>
                        </td>
                    </tr>
                </table>

            </div>
            `;

            document.getElementById("res").innerHTML = html;
            window.__RELATORIO_PRONTO__ = true;

        });
    }

};