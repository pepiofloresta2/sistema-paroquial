const UI = {

listaDizimistasCache: [],
indiceSelecionado: -1,

// 🔵 LIMPA ÁREA
limparTela() {

    let res = document.getElementById("res");
    if (res) res.innerHTML = "";

    let lista = document.getElementById("listaDizimistas");
    if (lista) lista.innerHTML = "";

    let listaCad =
        document.getElementById("listaDizimistasCadastro");

    if (listaCad) listaCad.innerHTML = "";
},

// 🔵 BOTÃO ATIVO
ativarBotao(el){

    this.removerAtivo();

    el.classList.add(
        "bg-slate-900",
        "text-white"
    );
},

removerAtivo(){

    document
    .querySelectorAll("#modalRelatorios button")
    .forEach(btn=>{

        btn.classList.remove(
            "bg-slate-900",
            "text-white"
        );
    });
},

// 🔵 AUTOCOMPLETE
buscarPorNome(){

    let campo =
        document.getElementById("buscaNome");

    if(!campo) return;

    let termo =
        campo.value.toLowerCase();

    let sugestoes =
        document.getElementById("sugestoes");

    if(!termo){

        if(sugestoes){
            sugestoes.innerHTML = "";
        }

        return;
    }

    API.enviar({
        acao:"listar_dizimistas"
    }).then(res=>{

        this.listaDizimistasCache =
            res.lista || [];

        let filtrados =
            this.listaDizimistasCache.filter(d =>
                d.nome
                .toLowerCase()
                .includes(termo)
            );

        let html = "";

        filtrados.forEach((d,i)=>{

            html += `
            <div
                onclick="UI.selecionar(${i})"
                class="p-3 hover:bg-slate-100 cursor-pointer border-b"
            >
                ${d.nome}
            </div>
            `;
        });

        if(sugestoes){
            sugestoes.innerHTML = html;
        }

        this.indiceSelecionado = -1;
    });
},

selecionar(i){

    let d = this.listaDizimistasCache[i];

    document.getElementById("codigo").value = d.codigo;

    document.getElementById("buscaNome").value = d.nome;

    // ESCONDE SUGESTÕES
    let box = document.getElementById("sugestoes");

    box.innerHTML = "";
    box.classList.remove("hidden");

    // limpa índice
    this.indiceSelecionado = -1;
},

navegarSugestoes(e){

    let itens =
        document.querySelectorAll("#sugestoes div");

    if(!itens.length) return;

    if(e.key === "ArrowDown"){
        this.indiceSelecionado++;
    }

    if(e.key === "ArrowUp"){
        this.indiceSelecionado--;
    }

    if(e.key === "Enter"){

        e.preventDefault();

        if(this.indiceSelecionado >= 0){
            itens[this.indiceSelecionado].click();
        }
    }

    itens.forEach(el=>{
        el.classList.remove("bg-slate-200");
    });

    if(itens[this.indiceSelecionado]){

        itens[this.indiceSelecionado]
        .classList.add("bg-slate-200");
    }
},

// 🔵 MÁSCARA TELEFONE
mascaraTelefone(input){

    let valor = input.value;

    valor = valor.replace(/\D/g,'');

    valor = valor.replace(
        /^(\d{2})(\d)/g,
        '($1) $2'
    );

    valor = valor.replace(
        /(\d{5})(\d)/,
        '$1-$2'
    );

    input.value = valor;
},

// 🔵 DASHBOARD
carregarDashboard(){

    // TOTAL DIZIMISTAS
    API.enviar({
        acao:"listar_dizimistas"
    }).then(res=>{

        let total =
            (res.lista || []).length;

        let el =
            document.getElementById(
                "kpiDizimistas"
            );

        if(el){
            el.innerText = total;
        }
    });

    // MÊS ATUAL
    let hoje = new Date();

    let mes =
        String(hoje.getMonth()+1)
        .padStart(2,"0");

    let ano =
        hoje.getFullYear();

    API.enviar({
        acao:"buscar_relatorio",
        mes,
        ano
    }).then(res=>{

        let entradas = 0;
        let saidas = 0;

        (res.lista || []).forEach(item=>{

            let valor = parseFloat(
                String(item.valor || 0)
                .replace(",", ".")
            );

            if(String(item.tipo).trim() === "Entrada"){
                entradas += valor;
            }

            if(String(item.tipo).trim() === "Saída"){
                saidas += valor;
            }
        });

        let saldo =
            entradas - saidas;

        let formatar = valor => {

            return valor.toLocaleString(
                "pt-BR",
                {
                    style:"currency",
                    currency:"BRL"
                }
            );
        };

        let kEntradas =
            document.getElementById(
                "kpiEntradas"
            );

        let kSaidas =
            document.getElementById(
                "kpiSaidas"
            );

        let kSaldo =
            document.getElementById(
                "kpiSaldo"
            );

        if(kEntradas){
            kEntradas.innerText =
                formatar(entradas);
        }

        if(kSaidas){
            kSaidas.innerText =
                formatar(saidas);
        }

        if(kSaldo){
            kSaldo.innerText =
                formatar(saldo);
        }

    }).catch(err=>{

        console.error(
            "Erro dashboard:",
            err
        );
    });
},

// 🔵 PDF
imprimir(){

    let element =
        document.getElementById("doc");

    if (!element) {

        alert(
            "Gere um relatório primeiro"
        );

        return;
    }

    html2pdf()
    .set({

        margin: 5,

        filename: "relatorio.pdf",

        html2canvas: {
            scale: 2
        },

        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        }

    })
    .from(element)
    .save();
}

};

UI.botaoRelatorio = function(botao){

    document
    .querySelectorAll(".btnRelatorio")
    .forEach(btn=>{

        btn.classList.remove(
            "bg-slate-900",
            "text-white"
        );
    });

    botao.classList.add(
        "bg-slate-900",
        "text-white"
    );
};

// 🔵 INICIALIZA AO ABRIR
window.addEventListener("load", ()=>{

    UI.alterarFormularioFinanceiro();

});


/* ============ ALTERA FORMULARIO ============ */
UI.alterarFormularioFinanceiro = function(){

    let tipo =
        document.getElementById("tipo").value;

    let categoria =
        document.getElementById("categoria");

    let blocoDizimista =
        document.getElementById("blocoDizimista");

    let blocoSaida =
        document.getElementById("blocoSaida");

    categoria.innerHTML = "";

    if(tipo === "Entrada"){

        categoria.innerHTML = `
            <option>Dízimo</option>
            <option>Coleta Missa</option>
            <option>Doação</option>
        `;

        blocoDizimista.classList.remove("hidden");
        blocoSaida.classList.add("hidden");
    }

    if(tipo === "Saída"){

        categoria.innerHTML = `
            <option>Aluguel</option>
            <option>Compras</option>
            <option>Energia</option>
            <option>Água</option>
        `;

        blocoDizimista.classList.add("hidden");
        blocoSaida.classList.remove("hidden");
    }
};