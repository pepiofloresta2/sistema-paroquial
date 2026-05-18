const Fechamento = {

    fecharMes() {

        const mes =
            document
            .getElementById(
                "mesFiltro"
            )
            .value;

        if (!mes) {
            return alert(
                "Selecione o mês"
            );
        }

        const [ano, mesNum] =
            mes.split("-");

        const entradas =
            Relatorio
            .totalEntradas || 0;

        const saidas =
            Relatorio
            .totalSaidas || 0;

        const saldo =
            Relatorio
            .totalSaldo || 0;

        if (
            !confirm(
                `Fechar ${mesNum}/${ano}?`
            )
        ) return;

        API.enviar({

            acao:
                "fechar_mes",

            referencia:
                `${mesNum}/${ano}`,

            entradas,
            saidas,
            saldo

        })
        .then(res => {

            if (
                res.status !== "ok"
            ) {
                return alert(
                    res.mensagem
                );
            }

            alert(
                "Mês fechado com sucesso."
            );

            PDF.imprimir();
        });
    }

};