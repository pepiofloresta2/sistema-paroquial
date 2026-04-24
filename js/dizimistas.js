const Dizimistas = {

    adicionar() {

        let codigo = document.getElementById("dz_codigo").value.trim();
        let nome = document.getElementById("dz_nome").value.trim();
        let tel = document.getElementById("dz_tel").value.trim();

        if (!codigo || !nome) {
            alert("Informe código e nome do dizimista.");
            return;
        }

        API.enviar({
            acao: "cadastrar_dizimista",
            codigo: codigo,
            nome: nome,
            tel: tel
        })
        .then(res => {
            if (res && res.status === "ok") {
                alert("Dizimista cadastrado com sucesso!");
                this.limpar();
            } else {
                alert("Erro ao cadastrar dizimista.");
            }
        });
    },

    buscarPorCodigo(codigo) {

        if (!codigo) return;

        API.enviar({
            acao: "buscar_dizimista",
            codigo: codigo
        })
        .then(res => {
            if (res && res.nome) {
                document.getElementById("nomeLanc").value = res.nome;
            } else {
                document.getElementById("nomeLanc").value = "";
                alert("Dizimista não encontrado.");
            }
        });
    },

    limpar() {
        document.getElementById("dz_codigo").value = "";
        document.getElementById("dz_nome").value = "";
        document.getElementById("dz_tel").value = "";
    },

    listar() {

    fetch(CONFIG.API_URL + "?acao=listar_dizimistas")
        .then(res => res.json())
        .then(d => {

            let html = `
                <table>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                    </tr>
            `;

            d.lista.forEach(item => {
                html += `
                    <tr>
                        <td>${item.codigo}</td>
                        <td>${item.nome}</td>
                        <td>${item.tel}</td>
                    </tr>
                `;
            });

            html += `</table>`;

            document.getElementById("listaDizimistas").innerHTML = html;
        });
}

};