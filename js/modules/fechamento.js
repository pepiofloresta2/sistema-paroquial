const Fechamento = {

    fecharMes() {

        const mes =
            document
            .getElementById(
                "mesFiltro"
            ).value;

        if (!mes) {
            return alert(
                "Selecione o mês."
            );
        }

        // obrigar gerar relatório antes
        if (
            !window.__RELATORIO_PRONTO__
        ) {
            return alert(
                "Gere o relatório financeiro antes de fechar o mês."
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
                `Confirma fechar ${mesNum}/${ano}?`
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

            // trava novo fechamento
            window.__RELATORIO_PRONTO__ =
                false;
        });
    }

};