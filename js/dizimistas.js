const Dizimistas = {

listar(destino = "listaDizimistasCadastro") {

    API.enviar({
        acao: "listar_dizimistas"
    }).then(res => {

        let lista = res.lista || [];

        let html = `

        <div class="flex justify-between items-center mb-5">

            <input
                type="text"
                placeholder="Buscar dizimista..."
                class="border rounded-xl p-3 w-80"
                onkeyup="Dizimistas.filtrar(this.value)"
            >

            <button
                onclick="Dizimistas.abrirNovo()"
                class="bg-slate-900 text-white w-14 h-14 rounded-full text-3xl shadow-xl"
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

                <td class="border p-3 text-center">

                    <div class="flex justify-center gap-2">

                        <button
                            onclick="Dizimistas.abrirEditar(
                                '${item.codigo}',
                                '${item.nome}',
                                '${item.tel || ""}'
                            )"
                            class="bg-blue-600 text-white px-3 py-2 rounded-lg"
                        >
                            Editar
                        </button>

                        <button
                            onclick="Dizimistas.historico('${item.codigo}')"
                            class="bg-emerald-600 text-white px-3 py-2 rounded-lg"
                        >
                            Histórico
                        </button>

                        <button
                            onclick="Dizimistas.excluir('${item.codigo}')"
                            class="bg-red-600 text-white px-3 py-2 rounded-lg"
                        >
                            Excluir
                        </button>

                    </div>

                </td>

            </tr>
            `;
        });

        html += `
            </tbody>
        </table>
        `;

        document.getElementById(destino).innerHTML = html;
    });
},

filtrar(texto){

    texto = texto.toLowerCase();

    let linhas = document.querySelectorAll("#tbodyDizimistas tr");

    linhas.forEach(linha=>{

        let nome = linha.children[1]
            .innerText
            .toLowerCase();

        linha.style.display =
            nome.includes(texto)
            ? ""
            : "none";
    });
},

abrirNovo(){

    document.getElementById("tituloModalDizimista").innerText =
        "Novo Dizimista";

    document.getElementById("codigoAntigo").value = "";

    document.getElementById("formCodigo").value = "";
    document.getElementById("formNome").value = "";
    document.getElementById("formTel").value = "";

    document
        .getElementById("modalFormDizimista")
        .classList.remove("hidden");
},

abrirEditar(codigo,nome,tel){

    document.getElementById("tituloModalDizimista").innerText =
        "Editar Dizimista";

    document.getElementById("codigoAntigo").value = codigo;

    document.getElementById("formCodigo").value = codigo;
    document.getElementById("formNome").value = nome;
    document.getElementById("formTel").value = tel;

    document
        .getElementById("modalFormDizimista")
        .classList.remove("hidden");
},

fecharForm(){

    document
        .getElementById("modalFormDizimista")
        .classList.add("hidden");
},

salvar(){

    let codigoAntigo =
        document.getElementById("codigoAntigo").value;

    let codigo =
        document.getElementById("formCodigo").value.trim();

    let nome =
        document.getElementById("formNome").value.trim();

    let tel =
        document.getElementById("formTel").value.trim();

    if(!codigo || !nome){

        alert("Informe código e nome");
        return;
    }

    let acao =
        codigoAntigo
        ? "editar_dizimista"
        : "cadastrar_dizimista";

    API.enviar({
        acao,
        codigo_antigo: codigoAntigo,
        codigo,
        nome,
        tel
    }).then(res=>{

        if(res.status === "ok"){

            alert("Salvo com sucesso");

            this.fecharForm();

            this.listar();

        }else{

            alert(res.mensagem || "Erro");
        }
    });
},

excluir(codigo){

    if(!confirm("Excluir dizimista?")) return;

    API.enviar({
        acao:"excluir_dizimista",
        codigo
    }).then(res=>{

        if(res.status==="ok"){

            alert("Excluído");

            this.listar();
        }
    });
}

};

Dizimistas.historico = function(codigo){

    API.enviar({
        acao:"historico_dizimista",
        codigo
    }).then(res=>{

        let html = "";

        (res.lista || []).forEach(item=>{

            html += `

            <tr>

                <td class="border p-3">
                    ${item.data}
                </td>

                <td class="border p-3">
                    ${item.forma}
                </td>

                <td class="border p-3 text-right">
                    R$ ${parseFloat(item.valor).toFixed(2)}
                </td>

            </tr>
            `;
        });

        document.getElementById("tituloHistorico")
            .innerText =
            "Histórico do Dizimista";

        document.getElementById("conteudoHistorico")
            .innerHTML = `

            <div class="mb-6">

                <div class="text-lg">
                    Total Contribuído
                </div>

                <div class="text-4xl font-bold text-green-600">

                    R$ ${parseFloat(res.total || 0).toFixed(2)}

                </div>

            </div>

            <table class="w-full border-collapse">

                <tr class="bg-slate-100">

                    <th class="border p-3">
                        Data
                    </th>

                    <th class="border p-3">
                        Forma
                    </th>

                    <th class="border p-3">
                        Valor
                    </th>

                </tr>

                ${html}

            </table>
            `;

        document.getElementById("modalHistorico")
            .classList.remove("hidden");

    });

};