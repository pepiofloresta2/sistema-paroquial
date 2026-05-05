const Dizimistas = {

    adicionar() {

        let codigo = document.getElementById("dz_codigo").value.trim();
        let nome = document.getElementById("dz_nome").value.trim();
        let tel = document.getElementById("dz_tel").value.trim();

        if (!codigo || !nome) {
            alert("Informe código e nome");
            return;
        }

        API.enviar({
            acao: "cadastrar_dizimista",
            codigo,
            nome,
            tel
        }).then(res => {

            if (res && res.status === "ok") {
                alert("Dizimista cadastrado");

                document.getElementById("dz_codigo").value = "";
                document.getElementById("dz_nome").value = "";
                document.getElementById("dz_tel").value = "";

                this.listar();
            }
        });
    },

    listar() {

        API.enviar({
            acao: "listar_dizimistas"
        }).then(res => {

            let lista = res.lista || [];

            let html = `
            <table style="width:100%; border-collapse:collapse; font-size:12px;">
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

            lista.forEach(item => {
                html += `
                    <tr>
                        <td style="border:1px solid #000; padding:6px;">${item.codigo}</td>
                        <td style="border:1px solid #000; padding:6px;">${item.nome}</td>
                        <td style="border:1px solid #000; padding:6px;">${item.tel || "-"}</td>
                        <td style="border:1px solid #000; padding:6px; text-align:center;">
                            <button onclick="Dizimistas.editar('${item.codigo}','${item.nome}','${item.tel || ""}')">✏️</button>
                            <button onclick="Dizimistas.excluir('${item.codigo}')">🗑️</button>
                        </td>
                    </tr>
                `;
            });

            html += `</tbody></table>`;

            document.getElementById("listaDizimistas").innerHTML = html;
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

            if (res && res.status === "ok") {
                alert("Atualizado");
                this.listar();
            }
        });
    },

    excluir(codigo) {

        if (!confirm("Excluir dizimista?")) return;

        API.enviar({
            acao: "excluir_dizimista",
            codigo
        }).then(res => {

            if (res && res.status === "ok") {
                alert("Excluído");
                this.listar();
            }
        });
    }

};