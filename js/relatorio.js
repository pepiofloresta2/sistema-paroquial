// js/relatorio.js
const Relatorio = {

    gerar() {

        let mesInput = document.getElementById("mesFiltro").value;

        if (!mesInput) {
            alert("Selecione o mês");
            return;
        }

        let [ano, mes] = mesInput.split("-");
        let ultimoDia = new Date(ano, mes, 0).toLocaleDateString("pt-BR");

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

            // 🔹 LINHAS NORMAIS
            res.lista.forEach(item => {

                let valor = parseFloat(item.valor || 0);

                // Dízimo consolidado
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
                        <td style="border:1px solid #000; padding:4px;">${item.data || ""}</td>
                        <td style="border:1px solid #000; padding:4px;">${item.categoria || ""}</td>
                        <td style="border:1px solid #000; padding:4px; text-align:center;">${item.codigo || ""}</td>
                        <td style="border:1px solid #000; padding:4px; text-align:right;">${entrada}</td>
                        <td style="border:1px solid #000; padding:4px; text-align:right; color:red;">${saida}</td>
                    </tr>
                `;
            });

            // 🔹 DÍZIMO NO FINAL DO MÊS
            if (totalDizimo > 0) {
                linhas += `
                    <tr>
                        <td style="border:1px solid #000; padding:4px;">${ultimoDia}</td>
                        <td style="border:1px solid #000; padding:4px;"><strong>DÍZIMO (CONSOLIDADO)</strong></td>
                        <td style="border:1px solid #000;"></td>
                        <td style="border:1px solid #000; text-align:right;"><strong>R$ ${totalDizimo.toFixed(2)}</strong></td>
                        <td style="border:1px solid #000;"></td>
                    </tr>
                `;
                totalEntradas += totalDizimo;
            }

            // 🔹 LINHAS EM BRANCO (livro caixa)
            let linhasExtras = Math.max(0, 20 - res.lista.length);

            for (let i = 0; i < linhasExtras; i++) {
                linhas += `
                    <tr>
                        <td style="border:1px solid #000;">&nbsp;</td>
                        <td style="border:1px solid #000;"></td>
                        <td style="border:1px solid #000;"></td>
                        <td style="border:1px solid #000;"></td>
                        <td style="border:1px solid #000;"></td>
                    </tr>
                `;
            }

            let saldo = totalEntradas - totalSaidas;

            let html = `
            <div id="doc" style="
                background:#fff;
                padding:10mm;
                font-family:Arial;
                width:190mm;
                margin:auto;
                border:1px solid #000;
            ">

                <!-- CABEÇALHO -->
                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    border:1px solid #000;
                    padding:10px;
                ">

                    <img src="assets/logo.png" style="height:60px;">

                    <div style="text-align:center;">
                        <h2 style="margin:0;">COM. SÃO PIO DE PIETRELCINA</h2>
                        <h4 style="margin:0;">MOVIMENTO DO CAIXA</h4>
                    </div>

                    <div style="display:flex; align-items:center; gap:10px;">
                        <div style="text-align:left; border:1px solid #000; padding:5px;">
                            <div><strong>MÊS:</strong> ${mes}/${ano}</div>
                            <div><strong>Nº:</strong> ______</div>
                        </div>

                        <img src="assets/diocese.png" style="height:60px;">
                    </div>

                </div>

                <!-- TABELA -->
                <div id="area-impressao">
                    <table style="width:100%; border-collapse:collapse; margin-top:10px; font-size:12px;">

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
                </div>

                <!-- RODAPÉ -->
                <table style="width:100%; border-collapse:collapse; margin-top:10px;">

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