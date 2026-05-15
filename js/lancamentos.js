const Lancamentos = {

adicionar(){

    let categoria =
        document.getElementById("categoria").value;

    let tipo =
        document.getElementById("tipo").value;

    let dados = {

        acao: "salvar_lancamento",

        data:
            document.getElementById("data").value,

        tipo: tipo,

        categoria: categoria,

        forma:
            document.getElementById("forma").value,

        valor:
            document.getElementById("valor").value
                .replace(",", "."),

        // DÍZIMO
        codigo:
            document.getElementById("codigo")?.value || "",

        nome:
            document.getElementById("buscaNome")?.value || "",

        // SAÍDA
        nota:
            document.getElementById("notaFiscal")?.value || "",

        fornecedor:
            document.getElementById("fornecedor")?.value || "",

        descricao:
            document.getElementById("descricao")?.value || ""
    };

    // 🔵 VALIDAÇÕES

    if(!dados.data){
        return alert("Informe a data");
    }

    if(!dados.valor){
        return alert("Informe o valor");
    }

    // 🔵 DÍZIMO
    if(categoria === "Dízimo"){

        if(!dados.codigo){
            return alert("Selecione o dizimista");
        }
    }

    // 🔴 SAÍDA
    if(categoria === "Saída"){

        if(!dados.fornecedor){
            return alert("Informe o fornecedor");
        }

        if(!dados.descricao){
            return alert("Informe a descrição");
        }
    }

    API.enviar(dados).then(res=>{

        if(res.status === "ok"){

            alert("Lançamento salvo");

            // LIMPA CAMPOS
            document.getElementById("valor").value = "";

            document.getElementById("codigo").value = "";

            document.getElementById("nomeLanc").value = "";

            document.getElementById("buscaNome").value = "";

            document.getElementById("notaFiscal").value = "";

            document.getElementById("fornecedor").value = "";

            document.getElementById("descricao").value = "";

            document.getElementById("sugestoes").innerHTML = "";

            document.getElementById("sugestoes").classList.add("hidden");

            UI.listaDizimistasCache = [];
            UI.indiceSelecionado = -1;            

            UI.carregarDashboard();

        } else {

            alert("Erro ao salvar");
        }

    });

}

};