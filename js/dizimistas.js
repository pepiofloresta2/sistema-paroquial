const Dizimistas = {

    // 🔵 CADASTRAR
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

    // 🔵 LISTAR
    listar() {

        API.enviar({
            acao: "listar_dizimistas"
        }).then(res => {

            let lista = res.lista || [];

            let html = `

            <div class="mb-4">
                <input
                    id="buscaDizimista"
                    placeholder="Buscar dizimista..."
                    oninput="Dizimistas.filtrar()"
                    class="w-full border rounded-xl p-3"
                >
            </div>

            <div class="overflow-auto max-h-[500px] border rounded-2xl">

            <table class="w-full border-collapse text-sm">

                <thead class="bg-slate-100 sticky top-0">
                    <tr>
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

                        <td class="border p-2">
                            ${item.codigo || ""}
                        </td>

                        <td class="border p-2">
                            ${item.nome || ""}
                        </td>

                        <td class="border p-2">
                            ${item.tel || "-"}
                        </td>

                        <td class="border p-2 text-center">

                            <button
                                onclick="Dizimistas.editar(
                                    '${item.codigo}',
                                    '${item.nome}',
                                    '${item.tel || ""}'
                                )"
                                class="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2"
                            >
                                Editar
                            </button>

                            <button
                                onclick="Dizimistas.excluir('${item.codigo}')"
                                class="bg-red-500 text-white px-3 py-1 rounded-lg"
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
            </div>

            <!-- BOTÃO FLUTUANTE -->
            <button
                onclick="document.getElementById('formNovo').classList.toggle('hidden')"
                class="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-slate-900 text-white text-4xl shadow-xl"
            >
                +
            </button>

            <!-- FORM NOVO -->
            <div id="formNovo" class="hidden mt-6 border rounded-2xl p-4 bg-slate-50">

                <h3 class="text-lg font-bold mb-4">
                    Novo Dizimista
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">

                    <input
                        id="dz_codigo"
                        placeholder="Código"
                        class="border rounded-xl p-3"
                    >

                    <input
                        id="dz_nome"
                        placeholder="Nome"
                        class="border rounded-xl p-3"
                    >

                    <input
                        id="dz_tel"
                        placeholder="Telefone"
                        class="border rounded-xl p-3"
                    >

                </div>

                <button
                    onclick="Dizimistas.adicionar()"
                    class="mt-4 bg-slate-900 text-white px-5 py-3 rounded-xl"
                >
                    Salvar
                </button>

            </div>
            `;

            document.getElementById("listaDizimistasCadastro").innerHTML = html;
        });
    },

    // 🔵 FILTRAR
    filtrar() {

        let termo = document
            .getElementById("buscaDizimista")
            .value
            .toLowerCase();

        let linhas = document.querySelectorAll("#tbodyDizimistas tr");

        linhas.forEach(linha => {

            let texto = linha.innerText.toLowerCase();

            linha.style.display =
                texto.includes(termo)
                ? ""
                : "none";
        });
    },

    // 🔵 EDITAR
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

                this.listar();
            }
        });
    },

    // 🔵 EXCLUIR
    excluir(codigo) {

        if (!confirm("Excluir dizimista?")) {
            return;
        }

        API.enviar({
            acao: "excluir_dizimista",
            codigo
        }).then(res => {

            if (res && res.status === "ok") {

                alert("Dizimista excluído");

                this.listar();
            }
        });
    }

};