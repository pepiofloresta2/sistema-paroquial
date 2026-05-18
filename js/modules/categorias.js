const Categorias = {

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
        ).value;

    if (!nome) {
        return alert(
            "Informe o nome"
        );
    }

    API.enviar({
        acao: "salvar_categoria",
        tipo,
        nome
    })
    .then(() => {

        document
            .getElementById(
                "novaCategoriaNome"
            )
            .value = "";

        this.listar();

        Helpers.categoriasCache = null;
    });
},

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