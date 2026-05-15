const RelatorioDizimistas = {

    gerar() {

        let mesInput =
            document.getElementById(
                "mesFiltro"
            ).value;

        if (!mesInput) {
            return alert(
                "Selecione o mês"
            );
        }

        let [ano, mes] =
            mesInput.split("-");

        let referencia =
            new Date(
                ano,
                mes - 1
            ).toLocaleDateString(
                "pt-BR",
                {
                    month: "long",
                    year: "numeric"
                }
            );

        API.enviar({
            acao: "buscar_relatorio",
            mes,
            ano
        }).then(res => {

            let linhas = "";
            let total = 0;

            (res.lista || [])
            .forEach(item => {

                if (
                    !item.categoria ||
                    item.categoria
                        .toLowerCase()
                        .trim() !== "dízimo"
                ) {
                    return;
                }

                let valor =
                    parseFloat(
                        item.valor || 0
                    );

                total += valor;

                linhas += `
                <tr>

                    <td style="border:1px solid #000;padding:6px;">
                        ${item.codigo || ""}
                    </td>

                    <td style="border:1px solid #000;padding:6px;">
                        ${item.nome || ""}
                    </td>

                    <td style="border:1px solid #000;padding:6px;">
                        ${item.data || ""}
                    </td>

                    <td style="border:1px solid #000;padding:6px;">
                        ${item.forma || ""}
                    </td>

                    <td style="
                        border:1px solid #000;
                        padding:6px;
                        text-align:right;
                    ">
                        R$ ${valor.toFixed(2)}
                    </td>

                </tr>
                `;
            });

            document.getElementById(
                "res"
            ).innerHTML =
                DizimistasTemplate.montar({

                    referencia,
                    linhas,
                    total
                });

            window.__RELATORIO_PRONTO__ =
                true;

        });

    }

};