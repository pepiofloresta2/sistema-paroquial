// js/relatorio-dizimistas.js

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
                        <td>${item.codigo || ""}</td>
                        <td>${item.nome || ""}</td>
                        <td>${item.data || ""}</td>
                        <td>${item.forma || ""}</td>
                        <td>R$ ${valor.toFixed(2)}</td>
                    </tr>
                `;
            });

            if (!linhas) {
                document.getElementById("res").innerHTML =
                    "<p>Sem dízimos neste período.</p>";
                return;
            }

            document.getElementById("res").innerHTML = `
                <div id="doc" class="relatorio">

                    <h3 style="text-align:center;">
                        RELATÓRIO DE DIZIMISTAS
                    </h3>

                    <h4 style="text-align:center;">
                        ${mes}/${ano}
                    </h4>

                    <table>
                        <tr>
                            <th>CÓDIGO</th>
                            <th>NOME</th>
                            <th>DATA</th>
                            <th>FORMA</th>
                            <th>VALOR</th>
                        </tr>

                        ${linhas}
                    </table>

                    <br>

                    <h3>
                        TOTAL DE DÍZIMO: R$ ${totalDizimo.toFixed(2)}
                    </h3>

                </div>
            `;

            window.__RELATORIO_PRONTO__ = true;
        });
    }

};