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
   CACHE DE CATEGORIAS
========================= */
categoriasCache: null,


/* =========================
   CARREGAR CATEGORIAS
========================= */
carregarCategorias() {

    const tipo =
        document.getElementById(
            "tipo"
        ).value;

    const select =
        document.getElementById(
            "categoria"
        );

    // mostra carregando
    select.innerHTML = `
        <option>
            Carregando categorias...
        </option>
    `;

    // se já carregou antes,
    // usa cache
    if (this.categoriasCache) {

        this.preencherCategorias(
            tipo,
            select
        );

        return;
    }

    // busca só 1 vez
    API.enviar({
        acao: "listar_categorias"
    }).then(res => {

        this.categoriasCache =
            res.lista || [];

        this.preencherCategorias(
            tipo,
            select
        );

    }).catch(err => {

        console.error(
            "Erro ao carregar categorias:",
            err
        );

        select.innerHTML = `
            <option>
                Erro ao carregar
            </option>
        `;
    });
},


/* =========================
   PREENCHER SELECT
========================= */
preencherCategorias(
    tipo,
    select
) {

    select.innerHTML = `
        <option value="">
            Selecione...
        </option>
    `;

    this.categoriasCache
    .forEach(cat => {

        if (
            String(cat.tipo)
            .toLowerCase() !==
            String(tipo)
            .toLowerCase()
        ) return;

        select.innerHTML += `
            <option value="${cat.nome}">
                ${cat.nome}
            </option>
        `;
    });
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
        categoria === "Dízimo" ||
        categoria === "Dízimo PIX"
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

};