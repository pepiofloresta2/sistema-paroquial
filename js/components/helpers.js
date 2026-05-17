const Helpers = {

    /* =========================
       LIMPAR ÁREAS
    ========================= */
    limparTela() {

        const res =
            document.getElementById(
                "res"
            );

        if (res)
            res.innerHTML = "";

        const listaCad =
            document.getElementById(
                "listaDizimistasCadastro"
            );

        if (listaCad)
            listaCad.innerHTML = "";
    },



    /* =========================
       MÁSCARA TELEFONE
    ========================= */
    mascaraTelefone(input) {

        let valor =
            input.value.replace(
                /\D/g,
                ""
            );

        valor = valor.replace(
            /^(\d{2})(\d)/,
            "($1) $2"
        );

        valor = valor.replace(
            /(\d{5})(\d)/,
            "$1-$2"
        );

        input.value = valor;
    },



    /* =========================
       BOTÃO RELATÓRIO
    ========================= */
    botaoRelatorio(botao) {

        document
            .querySelectorAll(
                ".btnRelatorio"
            )
            .forEach(btn => {

                btn.classList.remove(
                    "bg-slate-900",
                    "text-white"
                );
            });

        botao.classList.add(
            "bg-slate-900",
            "text-white"
        );
    },



    /* =========================
       CARREGAR CATEGORIAS
    ========================= */
    carregarCategorias() {

        const tipo =
            document.getElementById(
                "tipo"
            ).value;

        const categoria =
            document.getElementById(
                "categoria"
            );

        if (!categoria) return;

        let opcoes = [];

        if (tipo === "Entrada") {

            opcoes = [
                "Dízimo",
                "Coleta Missa",
                "Doação"
            ];

        } else {

            opcoes = [
                "Aluguel",
                "Compras",
                "Energia",
                "Água"
            ];
        }

        categoria.innerHTML =
            opcoes.map(item =>
                `<option>${item}</option>`
            ).join("");

        Helpers
            .alterarFormularioFinanceiro();
    },



    /* =========================
       FORMULÁRIO FINANCEIRO
    ========================= */
    alterarFormularioFinanceiro() {

    const tipo =
        document.getElementById(
            "tipo"
        )?.value;

    const categoria =
        document.getElementById(
            "categoria"
        )?.value;

    const blocoDizimista =
        document.getElementById(
            "blocoDizimista"
        );

    const blocoSaida =
        document.getElementById(
            "blocoSaida"
        );

    // SE FOR SAÍDA:
    // sempre mostra bloco de saída
    if (tipo === "Saída") {

        blocoDizimista
            ?.classList.add(
                "hidden"
            );

        blocoSaida
            ?.classList.remove(
                "hidden"
            );

        return;
    }

    // SE FOR ENTRADA + DÍZIMO
    if (
        categoria === "Dízimo"
    ) {

        blocoDizimista
            ?.classList.remove(
                "hidden"
            );

        blocoSaida
            ?.classList.add(
                "hidden"
            );

        return;
    }

    // ENTRADA NORMAL
    blocoDizimista
        ?.classList.add(
            "hidden"
        );

    blocoSaida
        ?.classList.add(
            "hidden"
        );
}