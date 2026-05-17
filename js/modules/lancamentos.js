const Lancamentos = {

    adicionar() {

        const categoria =
            document.getElementById(
                "categoria"
            ).value;

        const tipo =
            document.getElementById(
                "tipo"
            ).value;

        const dados = {

            acao:
                "salvar_lancamento",

            data:
                document.getElementById(
                    "data"
                ).value,

            tipo,

            categoria,

            forma:
                document.getElementById(
                    "forma"
                ).value,

            valor:
                document
                    .getElementById(
                        "valor"
                    )
                    .value
                    .replace(/\./g, "")
                    .replace(",", "."),

            // DÍZIMO
            codigo:
                document
                    .getElementById(
                        "codigo"
                    )?.value || "",

            nome:
                document
                    .getElementById(
                        "buscaNome"
                    )?.value || "",

            // SAÍDA
            nota:
                document
                    .getElementById(
                        "numeroDocumento"
                    )?.value || "",

            fornecedor:
                document
                    .getElementById(
                        "fornecedor"
                    )?.value || "",

            descricao:
                document
                    .getElementById(
                        "descricao"
                    )?.value || ""
        };

        /* =====================
           VALIDAÇÕES
        ===================== */

        if (!dados.data) {
            return alert(
                "Informe a data"
            );
        }

        if (!dados.valor) {
            return alert(
                "Informe o valor"
            );
        }

        // DÍZIMO
        if (
            categoria === "Dízimo"
        ) {
            if (!dados.codigo) {
                return alert(
                    "Selecione o dizimista"
                );
            }
        }

        // SAÍDAS
        if (tipo === "Saída") {

            if (!dados.fornecedor) {
                return alert(
                    "Informe o fornecedor"
                );
            }

            if (!dados.descricao) {
                return alert(
                    "Informe a descrição"
                );
            }
        }

        /* =====================
           SALVAR
        ===================== */

        API.enviar(dados)
            .then(res => {

                if (
                    res.status === "ok"
                ) {

                    alert(
                        "Lançamento salvo"
                    );

                    this.limparFormulario();

                    Dashboard
                        .carregarDashboard();

                } else {

                    alert(
                        "Erro ao salvar"
                    );
                }
            })
            .catch(err => {

                console.error(err);

                alert(
                    "Erro ao salvar"
                );
            });
    },


    limparFormulario() {

        const campos = [

            "valor",
            "codigo",
            "buscaNome",
            "numeroDocumento",
            "fornecedor",
            "descricao"

        ];

        campos.forEach(id => {

            const el =
                document.getElementById(
                    id
                );

            if (el)
                el.value = "";
        });

        const sugestoes =
            document.getElementById(
                "sugestoes"
            );

        if (sugestoes) {

            sugestoes.innerHTML =
                "";

            sugestoes
                .classList.add(
                    "hidden"
                );
        }

        // limpa autocomplete
        if (
            typeof Autocomplete
            !== "undefined"
        ) {

            Autocomplete
                .listaDizimistasCache = [];

            Autocomplete
                .listaFiltrada = [];

            Autocomplete
                .indiceSelecionado = -1;
        }

        document.getElementById(
            "tipo"
        ).value = "Entrada";

        Helpers.carregarCategorias();

        Helpers.alterarFormularioFinanceiro();
    }

};