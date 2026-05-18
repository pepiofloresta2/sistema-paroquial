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
            Dashboard
            .totalEntradas || 0;

        const saidas =
            Dashboard
            .totalSaidas || 0;

        const saldo =
            entradas - saidas;

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