const Relatorio = {

gerar(){

let mesInput = document.getElementById("mesFiltro").value;

if(!mesInput){
    return alert("Selecione o mês");
}

let [ano, mes] = mesInput.split("-");

let ultimoDia = new Date(ano, mes, 0)
.toLocaleDateString("pt-BR");

let numeroRelatorio = "145";

const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];

let mesReferencia =
meses[parseInt(mes)-1] + "/" + ano;

API.enviar({
    acao:"buscar_relatorio",
    mes,
    ano
})
.then(res=>{

let linhas = "";

let entradas = 0;
let saidas = 0;
let totalDizimo = 0;

(res.lista || []).forEach(item=>{

    let valor = parseFloat(
        String(item.valor || 0)
        .replace(",", ".")
    );

    // DÍZIMO CONSOLIDADO
    if(item.categoria === "Dízimo"){

        totalDizimo += valor;
        return;
    }

    let entrada =
        item.tipo === "Entrada"
        ? valor
        : "";

    let saida =
        item.tipo === "Saída"
        ? valor
        : "";

    if(entrada){
        entradas += valor;
    }

    if(saida){
        saidas += valor;
    }

    linhas += `
    <tr>

        <td class="td">
            ${item.data || ""}
        </td>

        <td class="td">
            ${item.categoria || ""}
        </td>

        <td class="td center">
            ${item.forma || ""}
        </td>

        <td class="td">
            ${item.nome || ""}
        </td>

        <td class="td right green">
            ${entrada
                ? "R$ " + valor.toFixed(2)
                : ""
            }
        </td>

        <td class="td right red">
            ${saida
                ? "R$ " + valor.toFixed(2)
                : ""
            }
        </td>

    </tr>
    `;
});


// DÍZIMO CONSOLIDADO
if(totalDizimo > 0){

    linhas += `
    <tr>

        <td class="td">
            ${ultimoDia}
        </td>

        <td class="td bold">
            DÍZIMO CONSOLIDADO
        </td>

        <td class="td"></td>

        <td class="td"></td>

        <td class="td right bold green">
            R$ ${totalDizimo.toFixed(2)}
        </td>

        <td class="td"></td>

    </tr>
    `;

    entradas += totalDizimo;
}


// LINHAS EXTRAS
for(let i=0;i<18;i++){

    linhas += `
    <tr>

        <td class="td">&nbsp;</td>
        <td class="td"></td>
        <td class="td"></td>
        <td class="td"></td>
        <td class="td"></td>
        <td class="td"></td>

    </tr>
    `;
}

let saldo = entradas - saidas;

document.getElementById("res").innerHTML = `

<div
    id="doc"
    style="
        width:190mm;
        min-height:277mm;
        margin:auto;
        background:white;
        padding:6mm;
        border:1px solid #000;
        font-family:Arial;
        color:#000;
    "
>

<style>

#doc table{
    width:100%;
    border-collapse:collapse;
    font-size:11px;
}

#doc .td{
    border:1px solid #000;
    padding:3px;
    height:24px;
}

#doc .center{
    text-align:center;
}

#doc .right{
    text-align:right;
}

#doc .green{
    color:#15803d;
}

#doc .red{
    color:#dc2626;
}

#doc .bold{
    font-weight:bold;
}

#doc .subtotal{
    font-size:18px;
    font-weight:bold;
}

#doc .total{
    font-size:24px;
    font-weight:bold;
    color:#1d4ed8;
}

</style>

<!-- CABEÇALHO -->
<div
    style="
        border:1px solid #000;
        padding:8px;
        display:flex;
        justify-content:space-between;
        align-items:center;
    "
>

    <img
        src="assets/logo.png"
        style="height:70px"
    >

    <div style="text-align:center">

        <div
            style="
                font-size:28px;
                font-weight:bold;
            "
        >
            COM. SÃO PADRE PIO
        </div>

        <div
            style="
                font-size:16px;
                margin-top:5px;
            "
        >
            RELATÓRIO FINANCEIRO
        </div>

    </div>

    <img
        src="assets/diocese.png"
        style="height:70px"
    >

</div>

<!-- INFO -->
<div
    style="
        border:1px solid #000;
        border-top:none;
        padding:8px;
        display:flex;
        justify-content:space-between;
        font-size:13px;
        font-weight:bold;
    "
>

    <div>
        Relatório Nº:
        ${numeroRelatorio}
    </div>

    <div>
        Referência:
        ${mesReferencia}
    </div>

    <div>
        ${ultimoDia}
    </div>

</div>

<!-- TABELA -->
<table>

<tr style="background:#f1f5f9">

    <th class="td">
        DATA
    </th>

    <th class="td">
        HISTÓRICO
    </th>

    <th class="td">
        FORMA
    </th>

    <th class="td">
        DIZIMISTA
    </th>

    <th class="td">
        ENTRADAS
    </th>

    <th class="td">
        SAÍDAS
    </th>

</tr>

${linhas}

<tr>

    <td
        colspan="4"
        class="td subtotal green"
    >
        SUBTOTAL ENTRADAS
    </td>

    <td class="td subtotal right green">
        R$ ${entradas.toFixed(2)}
    </td>

    <td class="td"></td>

</tr>

<tr>

    <td
        colspan="4"
        class="td subtotal red"
    >
        SUBTOTAL SAÍDAS
    </td>

    <td class="td"></td>

    <td class="td subtotal right red">
        R$ ${saidas.toFixed(2)}
    </td>

</tr>

<tr>

    <td
        colspan="4"
        class="td total"
    >
        TOTAL DO PERÍODO
    </td>

    <td
        colspan="2"
        class="td total right"
    >
        R$ ${saldo.toFixed(2)}
    </td>

</tr>

</table>

<!-- RODAPÉ -->
<div
    style="
        margin-top:10px;
        display:flex;
        justify-content:space-between;
        font-size:12px;
    "
>

    <div>
        Sistema Paroquial
    </div>

    <div>
        Página 1 de 1
    </div>

</div>

</div>
`;

window.__RELATORIO_PRONTO__ = true;

});
}
};