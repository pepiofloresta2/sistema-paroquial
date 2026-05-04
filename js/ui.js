// js/ui.js

const UI = {

    buscarDizimista() {

        let codigo = document.getElementById("codigo").value.trim();

        if (!codigo) return;

        API.enviar({
            acao: "buscar_dizimista",
            codigo
        }).then(res => {
            document.getElementById("nomeLanc").value = res.nome || "";
        });
    },

    lancar() {
        Lancamentos.adicionar();
    },

    relatorio() {
        Relatorio.gerar();
    },

    imprimir() {

        if (!window.__RELATORIO_PRONTO__) {
            alert("Gere o relatório primeiro");
            return;
        }

        let element = document.getElementById("area-impressao");

        if (!element) {
            alert("Área de impressão não encontrada");
            return;
        }

        let opt = {
            margin:       10,
            filename:     'relatorio.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    }

};