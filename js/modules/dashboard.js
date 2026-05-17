const Dashboard = {

    carregarDashboard() {

        // TOTAL DIZIMISTAS
        API.enviar({
            acao: "listar_dizimistas"
        }).then(res => {

            const total =
                (res.lista || []).length;

            const el =
                document.getElementById(
                    "kpiDizimistas"
                );

            if (el) {
                el.innerText = total;
            }
        });

        // MÊS ATUAL
        const hoje = new Date();

        const mes =
            String(
                hoje.getMonth() + 1
            ).padStart(2, "0");

        const ano =
            hoje.getFullYear();

        API.enviar({
            acao: "buscar_relatorio",
            mes,
            ano
        }).then(res => {

            let entradas = 0;
            let saidas = 0;

            (res.lista || [])
            .forEach(item => {

                let valor =
                    String(
                        item.valor || 0
                    )
                    .replace(/\./g, "")
                    .replace(",", ".");

                valor =
                    parseFloat(valor) || 0;

                let tipo =
                    String(
                        item.tipo || ""
                    ).trim();

                if (
                    tipo === "Entrada"
                ) {
                    entradas += valor;
                }

                if (
                    tipo === "Saída"
                ) {
                    saidas += valor;
                }
            });

            const saldo =
                entradas - saidas;

            const fmt = v =>
                v.toLocaleString(
                    "pt-BR",
                    {
                        style:
                            "currency",
                        currency:
                            "BRL"
                    }
                );

            const kEntradas =
                document.getElementById(
                    "kpiEntradas"
                );

            const kSaidas =
                document.getElementById(
                    "kpiSaidas"
                );

            const kSaldo =
                document.getElementById(
                    "kpiSaldo"
                );

            if (kEntradas)
                kEntradas.innerText =
                    fmt(entradas);

            if (kSaidas)
                kSaidas.innerText =
                    fmt(saidas);

            if (kSaldo)
                kSaldo.innerText =
                    fmt(saldo);

        }).catch(err => {

            console.error(
                "Erro dashboard:",
                err
            );
        });
    }

};