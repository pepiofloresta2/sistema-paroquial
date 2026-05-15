const UI = {

    listaDizimistasCache: [],
    indiceSelecionado: -1,

    /* ==============================
            LIMPAR TELA
    ============================== */
    limparTela() {

        let res = document.getElementById("res");
        if (res) res.innerHTML = "";

        let lista = document.getElementById("listaDizimistas");
        if (lista) lista.innerHTML = "";

        let listaCad =
            document.getElementById(
                "listaDizimistasCadastro"
            );

        if (listaCad) listaCad.innerHTML = "";
    },

    /* ==============================
            BOTÃO ATIVO
    ============================== */
    ativarBotao(el) {

        this.removerAtivo();

        el.classList.add(
            "bg-slate-900",
            "text-white"
        );
    },

    removerAtivo() {

        document
        .querySelectorAll(".btnRelatorio")
        .forEach(btn => {

            btn.classList.remove(
                "bg-slate-900",
                "text-white"
            );
        });
    },

    /* ==============================
            AUTOCOMPLETE
    ============================== */
    buscarPorNome() {

        let campo =
            document.getElementById(
                "buscaNome"
            );

        if (!campo) return;

        let termo =
            campo.value
            .toLowerCase()
            .trim();

        let sugestoes =
            document.getElementById(
                "sugestoes"
            );

        if (!termo) {

            sugestoes.innerHTML = "";
            sugestoes.classList.add(
                "hidden"
            );

            return;
        }

        let filtrados =
            this.listaDizimistasCache
            .filter(d =>
                d.nome
                .toLowerCase()
                .includes(termo)
            );

        let html = "";

        filtrados.forEach((d, i) => {

            html += `
            <div
                onclick="UI.selecionar(${i})"
                class="p-3 hover:bg-slate-100 cursor-pointer border-b"
            >
                ${d.nome}
            </div>
            `;
        });

        sugestoes.innerHTML = html;

        if (html) {
            sugestoes.classList.remove(
                "hidden"
            );
        } else {
            sugestoes.classList.add(
                "hidden"
            );
        }

        this.indiceSelecionado = -1;
    },

    selecionar(i) {

        let campo =
            document.getElementById(
                "buscaNome"
            ).value
            .toLowerCase()
            .trim();

        let filtrados =
            this.listaDizimistasCache
            .filter(d =>
                d.nome
                .toLowerCase()
                .includes(campo)
            );

        let d = filtrados[i];

        if (!d) return;

        document.getElementById(
            "codigo"
        ).value = d.codigo;

        document.getElementById(
            "buscaNome"
        ).value = d.nome;

        let box =
            document.getElementById(
                "sugestoes"
            );

        box.innerHTML = "";
        box.classList.add(
            "hidden"
        );

        this.indiceSelecionado = -1;
    },

    navegarSugestoes(e) {

        let itens =
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

        itens.forEach(el => {

            el.classList.remove(
                "bg-slate-200"
            );
        });

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
    },

    /* ==============================
            MÁSCARA TELEFONE
    ============================== */
    mascaraTelefone(input) {

        let valor = input.value;

        valor = valor.replace(
            /\D/g,
            ''
        );

        valor = valor.replace(
            /^(\d{2})(\d)/g,
            '($1) $2'
        );

        valor = valor.replace(
            /(\d{5})(\d)/,
            '$1-$2'
        );

        input.value = valor;
    },

    /* ==============================
            DASHBOARD
    ============================== */
    carregarDashboard() {

        API.enviar({
            acao: "listar_dizimistas"
        }).then(res => {

            let total =
                (res.lista || [])
                .length;

            let el =
                document.getElementById(
                    "kpiDizimistas"
                );

            if (el) {
                el.innerText =
                    total;
            }
        });

        let hoje = new Date();

        let mes =
            String(
                hoje.getMonth() + 1
            ).padStart(2, "0");

        let ano =
            hoje.getFullYear();

        API.enviar({
            acao:
                "buscar_relatorio",
            mes,
            ano
        }).then(res => {

            let entradas = 0;
            let saidas = 0;

            (
                res.lista || []
            ).forEach(item => {

                let valor =
                    parseFloat(
                        String(
                            item.valor || 0
                        )
                        .replace(
                            ",",
                            "."
                        )
                    );

                if (
                    String(
                        item.tipo
                    ).trim()
                    === "Entrada"
                ) {
                    entradas += valor;
                }

                if (
                    String(
                        item.tipo
                    ).trim()
                    === "Saída"
                ) {
                    saidas += valor;
                }
            });

            let saldo =
                entradas -
                saidas;

            let formatar =
                valor =>
                    valor
                    .toLocaleString(
                        "pt-BR",
                        {
                            style:
                                "currency",
                            currency:
                                "BRL"
                        }
                    );

            document
            .getElementById(
                "kpiEntradas"
            ).innerText =
                formatar(
                    entradas
                );

            document
            .getElementById(
                "kpiSaidas"
            ).innerText =
                formatar(
                    saidas
                );

            document
            .getElementById(
                "kpiSaldo"
            ).innerText =
                formatar(
                    saldo
                );

        }).catch(err => {

            console.error(
                "Erro dashboard:",
                err
            );
        });
    },

    /* ==============================
            PDF
    ============================== */
    imprimir() {

        let element =
            document.getElementById(
                "doc"
            );

        if (!element) {

            alert(
                "Gere um relatório primeiro"
            );

            return;
        }

        html2pdf()
        .set({

            margin: 5,

            filename:
                "relatorio.pdf",

            html2canvas: {
                scale: 2
            },

            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation:
                    "portrait"
            }

        })
        .from(element)
        .save();
    }
};


/* ==============================
        BOTÃO RELATÓRIO
============================== */
UI.botaoRelatorio =
function(botao) {

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
};


/* ==============================
        ALTERAR FORMULÁRIO
============================== */
UI.alterarFormularioFinanceiro =
function() {

    let categoria =
        document.getElementById(
            "categoria"
        ).value;

    let blocoDizimista =
        document.getElementById(
            "blocoDizimista"
        );

    let blocoSaida =
        document.getElementById(
            "blocoSaida"
        );

    let tipo =
        document.getElementById(
            "tipo"
        );

    if (
        categoria === "Dízimo"
    ) {

        blocoDizimista
        .classList.remove(
            "hidden"
        );

        blocoSaida
        .classList.add(
            "hidden"
        );

        tipo.value =
            "Entrada";
    }

    if (
        categoria ===
        "Coleta Missa"
    ) {

        blocoDizimista
        .classList.add(
            "hidden"
        );

        blocoSaida
        .classList.add(
            "hidden"
        );

        tipo.value =
            "Entrada";
    }

    if (
        categoria ===
        "Doação"
    ) {

        blocoDizimista
        .classList.add(
            "hidden"
        );

        blocoSaida
        .classList.add(
            "hidden"
        );

        tipo.value =
            "Entrada";
    }

    if (
        categoria ===
        "Saída"
    ) {

        blocoDizimista
        .classList.add(
            "hidden"
        );

        blocoSaida
        .classList.remove(
            "hidden"
        );

        tipo.value =
            "Saída";
    }
};


/* ==============================
            INICIALIZA
============================== */
window.addEventListener(
    "load",
    () => {

        UI.alterarFormularioFinanceiro();

        API.enviar({
            acao:
                "listar_dizimistas"
        }).then(res => {

            UI.listaDizimistasCache =
                res.lista || [];
        });

        UI.carregarDashboard();
    }
);