const Dizimistas = {

    listaCache: [],

    carregar() {

        API.enviar({ acao: "listar_dizimistas" }).then(res => {

            this.listaCache = res.lista || [];
            this.render(this.listaCache);

        });
    },

    render(lista) {

        let html = `
        <div style="margin-bottom:10px;">
            <input id="buscaDizimista"
                placeholder="Buscar dizimista..."
                oninput="Dizimistas.filtrar()"
                style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px;">
        </div>

        <table style="width:100%; border-collapse:collapse; font-size:13px;">
            <thead>
                <tr style="background:#eee;">
                    <th style="border:1px solid #000; padding:6px;">Código</th>
                    <th style="border:1px solid #000; padding:6px;">Nome</th>
                    <th style="border:1px solid #000; padding:6px;">Telefone</th>
                    <th style="border:1px solid #000; padding:6px;">Ações</th>
                </tr>
            </thead>
            <tbody>
        `;

        lista.forEach(d => {
            html += `
            <tr>
                <td style="border:1px solid #000; padding:6px;">${d.codigo}</td>
                <td style="border:1px solid #000; padding:6px;">${d.nome}</td>
                <td style="border:1px solid #000; padding:6px;">${d.tel || "-"}</td>
                <td style="border:1px solid #000; padding:6px; text-align:center;">
                    <button onclick="Dizimistas.editar('${d.codigo}','${d.nome}','${d.tel || ""}')">✏️</button>
                    <button onclick="Dizimistas.excluir('${d.codigo}')">🗑️</button>
                </td>
            </tr>
            `;
        });

        html += `</tbody></table>`;

        html += `
        <button onclick="Dizimistas.novo()" 
        style="position:fixed; bottom:30px; right:30px;
        background:#2c3e50; color:white; border:none;
        border-radius:50%; width:60px; height:60px; font-size:28px;">
        +
        </button>
        `;

        document.getElementById("listaDizimistasCadastro").innerHTML = html;
    },

    filtrar() {

        let termo = document.getElementById("buscaDizimista").value.toLowerCase();

        let filtrados = this.listaCache.filter(d =>
            d.nome.toLowerCase().includes(termo)
        );

        this.render(filtrados);
    },

    novo() {

        let codigo = prompt("Código:");
        if (!codigo) return;

        let nome = prompt("Nome:");
        if (!nome) return;

        let tel = prompt("Telefone:");

        API.enviar({
            acao: "cadastrar_dizimista",
            codigo,
            nome,
            tel
        }).then(res => {
            if (res.status === "ok") {
                alert("Cadastrado");
                this.carregar();
            }
        });
    },

    editar(codigo, nomeAtual, telAtual) {

        let nome = prompt("Nome:", nomeAtual);
        if (nome === null) return;

        let tel = prompt("Telefone:", telAtual);
        if (tel === null) return;

        API.enviar({
            acao: "editar_dizimista",
            codigo,
            nome,
            tel
        }).then(res => {

            if (res.status === "ok") {
                alert("Atualizado");
                this.carregar();
            } else {
                alert("Erro ao atualizar");
            }

        });
    },

    excluir(codigo) {

        if (!confirm("Excluir dizimista?")) return;

        API.enviar({
            acao: "excluir_dizimista",
            codigo
        }).then(res => {

            if (res.status === "ok") {
                alert("Excluído");
                this.carregar();
            } else {
                alert("Erro ao excluir");
            }

        });
    }

};