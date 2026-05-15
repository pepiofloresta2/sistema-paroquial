const Autocomplete = {

    listaDizimistasCache: [],
    listaFiltrada: [],
    indiceSelecionado: -1,

    buscarPorNome() {

        const campo =
            document.getElementById("buscaNome");

        const sugestoes =
            document.getElementById("sugestoes");

        if (!campo || !sugestoes) return;

        const termo =
            campo.value.toLowerCase().trim();

        if (!termo) {
            sugestoes.innerHTML = "";
            sugestoes.classList.add("hidden");
            return;
        }

        API.enviar({
            acao: "listar_dizimistas"
        }).then(res => {

            this.listaDizimistasCache =
                res.lista || [];

            this.listaFiltrada =
                this.listaDizimistasCache.filter(d =>
                    d.nome
                     .toLowerCase()
                     .includes(termo)
                );

            let html = "";

            this.listaFiltrada.forEach((d, i) => {

                html += `
                    <div
                        onclick="Autocomplete.selecionar(${i})"
                        class="p-3 hover:bg-slate-100 cursor-pointer border-b"
                    >
                        ${d.nome}
                    </div>
                `;
            });

            sugestoes.innerHTML = html;

            if (html) {
                sugestoes.classList.remove("hidden");
            } else {
                sugestoes.classList.add("hidden");
            }

            this.indiceSelecionado = -1;
        });
    },

    selecionar(i) {

        const d =
            this.listaFiltrada[i];

        if (!d) return;

        const codigo =
            document.getElementById("codigo");

        const busca =
            document.getElementById("buscaNome");

        if (codigo)
            codigo.value = d.codigo;

        if (busca)
            busca.value = d.nome;

        const box =
            document.getElementById("sugestoes");

        if (box) {
            box.innerHTML = "";
            box.classList.add("hidden");
        }

        this.indiceSelecionado = -1;
    },

    navegarSugestoes(e) {

        const itens =
            document.querySelectorAll(
                "#sugestoes div"
            );

        if (!itens.length) return;

        if (e.key === "ArrowDown") {

            this.indiceSelecionado++;

            if (
                this.indiceSelecionado >=
                itens.length
            ) {
                this.indiceSelecionado = 0;
            }
        }

        if (e.key === "ArrowUp") {

            this.indiceSelecionado--;

            if (
                this.indiceSelecionado < 0
            ) {
                this.indiceSelecionado =
                    itens.length - 1;
            }
        }

        if (e.key === "Enter") {

            e.preventDefault();

            if (
                this.indiceSelecionado >= 0
            ) {
                itens[
                    this.indiceSelecionado
                ].click();
            }
        }

        itens.forEach(el =>
            el.classList.remove(
                "bg-slate-200"
            )
        );

        if (
            itens[
                this.indiceSelecionado
            ]
        ) {
            itens[
                this.indiceSelecionado
            ].classList.add(
                "bg-slate-200"
            );
        }
    }

};