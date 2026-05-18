const Categorias = {

abrirModal() {

    const tipoAtual =
        document.getElementById(
            "tipo"
        ).value;

    document
        .getElementById(
            "novaCategoriaTipo"
        )
        .value = tipoAtual;

    document
        .getElementById(
            "modalCategorias"
        )
        .classList.remove(
            "hidden"
        );

    this.listar();
}

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
        acao: "listar_categorias"
    })
    .then(res => {

        let html = "";

        (res.lista || []).forEach(cat => {

            html += `
            <div class="
                flex
                justify-between
                border-b
                py-3
            ">

                <div>
                    ${cat.tipo} —
                    ${cat.nome}
                </div>

                <button
                    onclick="
                        Categorias.excluir(
                            '${cat.nome}'
                        )
                    "
                    class="text-red-600"
                >
                    Excluir
                </button>

            </div>
            `;
        });

        document
            .getElementById(
                "listaCategorias"
            )
            .innerHTML = html;
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
    })
    .then(res => {

        if (
            res.status !== "ok"
        ) {
            return alert(
                res.mensagem ||
                "Erro ao salvar"
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
}

excluir(nome) {

    if (
        !confirm(
            "Excluir categoria?"
        )
    ) return;

    API.enviar({
        acao: "excluir_categoria",
        nome
    })
    .then(() => {

        this.listar();

        Helpers.categoriasCache = null;
    });
}

};