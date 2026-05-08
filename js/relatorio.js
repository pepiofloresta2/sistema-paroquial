const Relatorio = {

gerar(){

let mesInput =
    document.getElementById("mesFiltro").value;

if(!mesInput){
    return alert("Selecione o mês");
}

let [ano, mes] = mesInput.split("-");

let referencia =
    new Date(ano, mes - 1)
    .toLocaleDateString(
        "pt-BR",
        {
            month:"long",
            year:"numeric"
        }
    );

API.enviar({
    acao:"buscar_relatorio",
    mes,
    ano
}).then(res=>{

let linhas = "";

let entradas = 0;
let saidas = 0;
let totalDizimo = 0;

let contador = 1;

// 🔵 PROCESSA LANÇAMENTOS
(res.lista || []).forEach(item=>{

    let valor =
        parseFloat(item.valor || 0);

    // 🔵 DÍZIMO CONSOLIDADO
    if(item.categoria === "Dízimo"){

        totalDizimo += valor;
        return;
    }

    // 🔵 ENTRADAS
    if(item.tipo === "Entrada"){

        entradas += valor;

        linhas += `
        <tr>

            <td style="border:1px solid #000;padding:3px;text-align:center">
                ${contador++}
            </td>

            <td style="border:1px solid #000;padding:3px">
                ${item.data || ""}
            </td>

            <td style="border:1px solid #000;padding:3px">
                ${item.categoria || ""}
            </td>

            <td style="border:1px solid #000;padding:3px">
                ${item.nome || "-"}
            </td>

            <td style="border:1px solid #000;padding:3px;text-align:right">
                R$ ${valor.toFixed(2)}
            </td>

            <td style="border:1px solid #000"></td>

        </tr>
        `;
    }

    // 🔴 SAÍDAS
    if(item.tipo === "Saída"){

        saidas += valor;

        linhas += `
        <tr>

            <td style="border:1px solid #000;padding:3px;text-align:center">
                ${contador++}
            </td>

            <td style="border:1px solid #000;padding:3px">
                ${item.data || ""}
            </td>

            <td style="border:1px solid #000;padding:3px">
                ${item.descricao || ""}
            </td>

            <td style="border:1px solid #000;padding:3px">
                ${item.fornecedor || "-"}
            </td>

            <td style="border:1px solid #000"></td>

            <td style="border:1px solid #000;padding:3px;text-align:right;color:red">
                R$ ${valor.toFixed(2)}
            </td>

        </tr>
        `;
    }

});

// 🔵 LANÇA DÍZIMO CONSOLIDADO
if(totalDizimo > 0){

    entradas += totalDizimo;

    linhas += `
    <tr style="background:#f8fafc">

        <td style="border:1px solid #000;padding:3px;text-align:center">
            ${contador++}
        </td>

        <td style="border:1px solid #000;padding:3px">
            -
        </td>

        <td style="border:1px solid #000;padding:3px">
            <b>DÍZIMO CONSOLIDADO</b>
        </td>

        <td style="border:1px solid #000;padding:3px">
            Comunidade
        </td>

        <td style="border:1px solid #000;padding:3px;text-align:right">
            <b>R$ ${totalDizimo.toFixed(2)}</b>
        </td>

        <td style="border:1px solid #000"></td>

    </tr>
    `;
}

// 🔵 LINHAS VAZIAS ESTILO LIVRO CAIXA
for(let i=0;i<15;i++){

    linhas += `
    <tr>

        <td style="border:1px solid #000;height:24px"></td>
        <td style="border:1px solid #000"></td>
        <td style="border:1px solid #000"></td>
        <td style="border:1px solid #000"></td>
        <td style="border:1px solid #000"></td>
        <td style="border:1px solid #000"></td>

    </tr>
    `;
}

let saldo = entradas - saidas;

// 🔵 HTML FINAL
document.getElementById("res").innerHTML = `

<div
id="doc"
style="
width:190mm;
margin:auto;
background:white;
padding:8mm;
font-family:Arial;
font-size:11px;
color:#000;
"
>

<!-- CABEÇALHO -->
<div
style="
border:1px solid #000;
padding:10px;
display:flex;
justify-content:space-between;
align-items:center;
"
>

    <img
        src="assets/logo.png"
        style="height:60px"
    >

    <div style="text-align:center">

        <h2 style="margin:0">
            COMUNIDADE SÃO PIO
        </h2>

        <div style="margin-top:5px">
            MOVIMENTO FINANCEIRO
        </div>

        <div style="margin-top:5px;font-size:12px">

            REFERÊNCIA:
            <b style="text-transform:uppercase">
                ${referencia}
            </b>

        </div>

    </div>

    <img
        src="assets/diocese.png"
        style="height:60px"
    >

</div>

<!-- TABELA -->
<table
style="
width:100%;
border-collapse:collapse;
margin-top:8px;
"
>

<tr style="background:#e5e7eb">

    <th style="border:1px solid #000;padding:5px">
        Nº
    </th>

    <th style="border:1px solid #000;padding:5px">
        DATA
    </th>

    <th style="border:1px solid #000;padding:5px">
        HISTÓRICO
    </th>

    <th style="border:1px solid #000;padding:5px">
        RESPONSÁVEL
    </th>

    <th style="border:1px solid #000;padding:5px">
        ENTRADAS
    </th>

    <th style="border:1px solid #000;padding:5px">
        SAÍDAS
    </th>

</tr>

${linhas}

<!-- SUBTOTAL -->
<tr>

    <td
        colspan="4"
        style="
        border:1px solid #000;
        padding:8px;
        font-weight:bold;
        "
    >
        SUBTOTAL
    </td>

    <td
        style="
        border:1px solid #000;
        padding:8px;
        text-align:right;
        font-weight:bold;
        color:green;
        "
    >
        R$ ${entradas.toFixed(2)}
    </td>

    <td
        style="
        border:1px solid #000;
        padding:8px;
        text-align:right;
        font-weight:bold;
        color:red;
        "
    >
        R$ ${saidas.toFixed(2)}
    </td>

</tr>

<!-- SALDO -->
<tr>

    <td
        colspan="4"
        style="
        border:1px solid #000;
        padding:10px;
        font-size:14px;
        font-weight:bold;
        "
    >
        SALDO FINAL
    </td>

    <td
        colspan="2"
        style="
        border:1px solid #000;
        padding:10px;
        text-align:right;
        font-size:16px;
        font-weight:bold;
        color:#2563eb;
        "
    >
        R$ ${saldo.toFixed(2)}
    </td>

</tr>

</table>

<!-- ASSINATURAS -->
<div
style="
margin-top:60px;
display:flex;
justify-content:space-between;
"
>

    <div style="text-align:center;width:250px">

        ___________________________

        <div style="margin-top:8px">
            Tesouraria
        </div>

    </div>

    <div style="text-align:center;width:250px">

        ___________________________

        <div style="margin-top:8px">
            Coordenação
        </div>

    </div>

</div>

</div>
`;

window.__RELATORIO_PRONTO__ = true;

});
}

};