const Dizimistas = {

listar(destino = "listaDizimistasCadastro") {

    API.enviar({
        acao: "listar_dizimistas"
    }).then(res => {

        let lista = res.lista || [];

        let html = `

        <div class="flex justify-between items-center mb-4">

            <input
                type="text"
                id="buscaDizimistaCadastro"
                placeholder="Buscar dizimista..."
                class="border p-3 rounded-xl w-80"
                onkeyup="Dizimistas.filtrar(this.value)"
            >

            <button
                onclick="Dizimistas.novo()"
                class="bg-slate-900 text-white px-5 py-3 rounded-xl text-xl"
            >
                +
            </button>

        </div>

        <table class="w-full border-collapse">

            <thead>

                <tr class="bg-slate-100">

                    <th class="border p-3 text-left">Código</th>
                    <th class="border p-3 text-left">Nome</th>
                    <th class="border p-3 text-left">Telefone</th>
                    <th class="border p-3 text-center">Ações</th>

                </tr>

            </thead>

            <tbody id="tbodyDizimistas">
        `;

        lista.forEach(item => {

            html += `

            <tr class="hover:bg-slate-50">

                <td class="border p-3">
                    ${item.codigo}
                </td>

                <td class="border p-3">
                    ${item.nome}
                </td>

                <td class="border p-3">
                    ${item.tel || "-"}
                </td>

                <td class="border p-3 text-center space-x-2">

                    <button
                        onclick="Dizimistas.editar(
                            '${item.codigo}',
                            '${item.nome}',
                            '${item.tel || ""}'
                        )"
                        class="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                        Editar
                    </button>

                    <button
                        onclick="Dizimistas.excluir('${item.codigo}')"
                        class="bg-red-600 text-white px-3 py-1 rounded"
                    >
                        Excluir
                    </button>

                </td>

            </tr>
            `;
        });

        html += `
            </tbody>
        </table>
        `;

        let el = document.getElementById(destino);

        if(el){
            el.innerHTML = html;
        }

        window.listaCompletaDizimistas = lista;

    });
},

filtrar(texto) {

    texto = texto.toLowerCase();

    let linhas = document.querySelectorAll("#tbodyDizimistas tr");

    linhas.forEach(linha => {

        let nome = linha.children[1].innerText.toLowerCase();

        linha.style.display =
            nome.includes(texto)
            ? ""
            : "none";
    });
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

            alert("Dizimista cadastrado");

            this.listar();
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

            this.listar();
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

            this.listar();

        } else {

            alert("Erro ao excluir");
        }
    });
}

};