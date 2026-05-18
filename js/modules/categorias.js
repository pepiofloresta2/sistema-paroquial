const Categorias = {

    abrirModal() {

        const tipoAtual =
            document.getElementById(
                "tipo"
            ).value;

        document
            .getElementById(
                "novaCategoriaTipo"
            ).value = tipoAtual;

        document
            .getElementById(
                "modalCategorias"
            )
            .classList.remove(
                "hidden"
            );

        this.listar();
    },

    fecharModal() {

        document
            .getElementById(
                "modalCategorias"
            )
            .classList.add(
                "hidden"
            );
    },

    listar() {

        API.enviar({
            acao:
                "listar_categorias"
        })
        .then(res => {

            const lista =
                document.getElementById(
                    "listaCategorias"
                );

            lista.innerHTML = "";

            (res.lista || [])
            .forEach(cat => {

                lista.innerHTML += `
                    <div class="flex justify-between border-b py-3">
                        <span>
                            ${cat.tipo}
                            —
                            ${cat.nome}
                        </span>

                        <button
                            onclick="
                            Categorias.excluir(
                                '${cat.nome}'
                            )
                            "
                            class="
                                text-red-500
                            "
                        >
                            Excluir
                        </button>
                    </div>
                `;
            });

        });
    },

    salvar() {

        const tipo =
            document.getElementById(
                "novaCategoriaTipo"
            ).value;

        const nome =
            document.getElementById(
                "novaCategoriaNome"
            ).value.trim();

        if (!nome) {
            return alert(
                "Informe o nome"
            );
        }

        API.enviar({

            acao:
                "salvar_categoria",

            tipo,
            nome

        }).then(res => {

            if (
                res.status !== "ok"
            ) {
                return alert(
                    res.mensagem
                );
            }

            document
                .getElementById(
                    "novaCategoriaNome"
                )
                .value = "";

            Helpers
                .categoriasCache = null;

            this.listar();

            Helpers
                .carregarCategorias();
        });
    },

    excluir(nome) {

        if (
            !confirm(
                "Excluir categoria?"
            )
        ) return;

        API.enviar({

            acao:
                "excluir_categoria",

            nome

        }).then(res => {

            if (
                res.status === "ok"
            ) {

                Helpers
                    .categoriasCache = null;

                this.listar();

                Helpers
                    .carregarCategorias();
            }
        });
    }

};