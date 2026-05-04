const RelatorioDizimistas = {

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
            mes,
            ano
        }).then(res => {

            let lista = res.lista || [];
            let linhas = "";
            let totalDizimo = 0;

            lista.forEach(item => {

                if (item.categoria !== "Dízimo") return;

                let valor = parseFloat(item.valor || 0);
                totalDizimo += valor;

                linhas += `
                    <tr>
                        <td style="border:1px solid #000; padding:6px;">${item.codigo || ""}</td>
                        <td style="border:1px solid #000; padding:6px;">${item.nome || ""}</td>
                        <td style="border:1px solid #000; padding:6px; text-align:center;">${item.data || ""}</td>
                        <td style="border:1px solid #000; padding:6px; text-align:center;">${item.forma || ""}</td>
                        <td style="border:1px solid #000; padding:6px; text-align:right;">R$ ${valor.toFixed(2)}</td>
                    </tr>
                `;
            });

            if (!linhas) {
                document.getElementById("res").innerHTML =
                    "<p>Sem dízimos neste período.</p>";
                return;
            }

            document.getElementById("res").innerHTML = `
                <div id="doc">

                    <h3 style="text-align:center;">RELATÓRIO DE DIZIMISTAS</h3>
                    <h4 style="text-align:center;">${mes}/${ano}</h4>

                    <div id="area-impressao">
                        <table style="width:100%; border-collapse:collapse; font-size:12px;">

                            <thead>
                                <tr style="background:#eee;">
                                    <th style="border:1px solid #000; padding:6px; text-align:left;">CÓDIGO</th>
                                    <th style="border:1px solid #000; padding:6px; text-align:left;">NOME</th>
                                    <th style="border:1px solid #000; padding:6px; text-align:center;">DATA</th>
                                    <th style="border:1px solid #000; padding:6px; text-align:center;">FORMA</th>
                                    <th style="border:1px solid #000; padding:6px; text-align:right;">VALOR</th>
                                </tr>
                            </thead>

                            <tbody>
                                ${linhas}
                            </tbody>

                        </table>
                    </div>

                    <br>

                    <h3 style="text-align:right;">
                        TOTAL: R$ ${totalDizimo.toFixed(2)}
                    </h3>

                </div>
            `;

            window.__RELATORIO_PRONTO__ = true;
        });
    }

};