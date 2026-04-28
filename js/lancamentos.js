// js/lancamentos.js

const Lancamentos = {

    adicionar() {

        let dataInput = document.getElementById("data").value;

        if (!dataInput) {
            alert("Informe a data");
            return;
        }

        let partes = dataInput.split("-");
        let dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;

        let tipo = document.getElementById("tipo").value;
        let categoria = document.getElementById("categoria").value;
        let forma = document.getElementById("forma").value;
        let codigo = document.getElementById("codigo").value.trim();
        let nome = document.getElementById("nomeLanc").value.trim();
        let valor = document.getElementById("valor").value.trim();

        if (!valor) {
            alert("Informe o valor");
            return;
        }

        API.enviar({
            acao: "salvar_lancamento",
            data: dataFormatada,
            tipo,
            categoria,
            forma,
            codigo,
            nome,
            valor
        }).then(res => {

            if (res && res.status === "ok") {
                alert("Lançamento salvo com sucesso");
                this.limpar();
            }
        });
    },

    limpar() {
        document.getElementById("valor").value = "";
        document.getElementById("codigo").value = "";
        document.getElementById("nomeLanc").value = "";
    }

};
