const UI = {

    sugestoes: [],
    indiceSelecionado: -1,

    buscarPorNome() {

        let termo = document.getElementById("buscaNome").value.toLowerCase();

        if (termo.length < 2) {
            document.getElementById("sugestoes").innerHTML = "";
            this.sugestoes = [];
            this.indiceSelecionado = -1;
            return;
        }

        API.enviar({
            acao: "listar_dizimistas"
        }).then(res => {

            let lista = res.lista || [];

            this.sugestoes = lista.filter(d =>
                d.nome.toLowerCase().includes(termo)
            );

            this.renderSugestoes(termo);
        });
    },

    renderSugestoes(termo) {

        let container = document.getElementById("sugestoes");

        if (this.sugestoes.length === 0) {
            container.innerHTML = `
                <div onclick="UI.cadastrarNovo('${termo}')"
                     style="padding:10px; cursor:pointer; background:#f9fafb;">
                    ➕ Cadastrar "${termo}"
                </div>
            `;
            return;
        }

        let html = "";

        this.sugestoes.slice(0, 5).forEach((d, i) => {

            let ativo = i === this.indiceSelecionado
                ? "background:#e2e8f0;"
                : "";

            html += `
                <div 
                    onclick="UI.selecionarDizimista('${d.codigo}','${d.nome}')"
                    style="padding:8px; cursor:pointer; border-bottom:1px solid #eee; ${ativo}">
                    ${d.nome}
                </div>
            `;
        });

        container.innerHTML = html;
    },

    selecionarDizimista(codigo, nome) {

        document.getElementById("codigo").value = codigo;
        document.getElementById("nomeLanc").value = nome;
        document.getElementById("buscaNome").value = nome;

        document.getElementById("sugestoes").innerHTML = "";
        this.indiceSelecionado = -1;
    },

    navegarSugestoes(e) {

        if (!this.sugestoes.length) return;

        if (e.key === "ArrowDown") {
            this.indiceSelecionado++;
        }

        if (e.key === "ArrowUp") {
            this.indiceSelecionado--;
        }

        if (this.indiceSelecionado < 0) this.indiceSelecionado = 0;
        if (this.indiceSelecionado >= this.sugestoes.length) {
            this.indiceSelecionado = this.sugestoes.length - 1;
        }

        if (e.key === "Enter") {
            let selecionado = this.sugestoes[this.indiceSelecionado];
            if (selecionado) {
                this.selecionarDizimista(selecionado.codigo, selecionado.nome);
            }
        }

        this.renderSugestoes();
    },

    cadastrarNovo(nome) {

        let confirmar = confirm(`Cadastrar novo dizimista: ${nome}?`);

        if (!confirmar) return;

        let codigo = prompt("Informe um código para o dizimista:");

        if (!codigo) return;

        API.enviar({
            acao: "cadastrar_dizimista",
            codigo,
            nome,
            tel: ""
        }).then(res => {

            if (res && res.status === "ok") {
                alert("Dizimista cadastrado!");

                this.selecionarDizimista(codigo, nome);
            }
        });
    }

};