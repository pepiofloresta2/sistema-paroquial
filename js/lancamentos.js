const Lancamentos = {

    adicionar() {

        let dataInput = document.getElementById("data").value;
        let tipo = document.getElementById("tipo").value;
        let categoria = document.getElementById("categoria").value;
        let forma = document.getElementById("forma").value;
        let codigo = document.getElementById("codigo").value.trim();
        let nome = document.getElementById("nomeLanc").value.trim();
        let valorTexto = document.getElementById("valor").value.trim();

        if (!dataInput) {
            alert("Informe a data.");
            return;
        }

        if (!valorTexto) {
            alert("Informe o valor.");
            return;
        }

        let partes = dataInput.split("-");
        let data = `${partes[2]}/${partes[1]}/${partes[0]}`;

        let valor = parseFloat(
            valorTexto
                .replace("R$", "")
                .replace(/\./g, "")
                .replace(",", ".")
                .trim()
        ) || 0;

        if (!valor || valor <= 0) {
            alert("Valor inválido.");
            return;
        }

        if (categoria === "Dízimo" && !codigo) {
            alert("Informe o código do dizimista.");
            return;
        }

        API.enviar({
            acao: "salvar_lancamento",
            data: data,
            tipo: tipo,
            categoria: categoria,
            forma: forma,
            codigo: codigo,
            nome: nome,
            valor: valor
        })
        .then(res => {
            if (res && res.status === "ok") {
                alert("Lançamento salvo com sucesso!");
                this.limpar();
            } else {
                alert("Erro ao salvar lançamento.");
            }
        });
    },

    limpar() {
        document.getElementById("codigo").value = "";
        document.getElementById("nomeLanc").value = "";
        document.getElementById("valor").value = "";
    }

};