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
                alert("Dizimista cadastrado com sucesso");

                document.getElementById("dz_codigo").value = "";
                document.getElementById("dz_nome").value = "";
                document.getElementById("dz_tel").value = "";

                // Atualiza lista automaticamente
                this.listar("listaDizimistasCadastro");
            }
        });
    },

    listar(destino = "listaDizimistasCadastro") {

        API.enviar({
            acao: "listar_dizimistas"
        }).then(res => {

            let lista = res.lista || [];

            if (!lista.length) {
                let el = document.getElementById(destino);
                if (el) el.innerHTML = "<p>Nenhum dizimista cadastrado.</p>";
                return;
            }

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

            let el = document.getElementById(destino);
            if (el) el.innerHTML = html;
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
                alert("Dizimista atualizado");

                // Atualiza ambas listas se existirem
                this.listar("listaDizimistasCadastro");
                this.listar("res");
            }
        });
    },

    excluir(codigo) {

        if (!confirm("Deseja excluir este dizimista?")) return;

        API.enviar({
            acao: "excluir_dizimista",
            codigo
        }).then(res => {

            if (res && res.status === "ok") {
                alert("Dizimista excluído");

                // Atualiza ambas listas
                this.listar("listaDizimistasCadastro");
                this.listar("res");
            }
        });
    }

};