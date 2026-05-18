const Relatorio = {
    totalEntradas: 0,
    totalSaidas: 0,    

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

let linhasEntradas = "";
let linhasSaidas = "";

let entradas = 0;
let saidas = 0;

let entradasAgrupadas = {};

let contador = 1;

// 🔵 PROCESSA LANÇAMENTOS
(res.lista || []).forEach(item=>{

    let valor =
        parseFloat(item.valor || 0);

    // 🔵 TODAS AS ENTRADAS AGRUPADAS
if(item.tipo === "Entrada"){

    let categoria =
        item.categoria || "Outros";

    let forma =
        item.forma || "Dinheiro";

    let chave =
        `${categoria} (${forma})`;

    if(!entradasAgrupadas[chave]){
        entradasAgrupadas[chave] = 0;
    }

    entradasAgrupadas[chave] += valor;

    return;
}

    // 🔴 SAÍDAS
    if(item.tipo === "Saída"){

        saidas += valor;

        linhasSaidas += `
        <tr style="color:red;">

            <td style="border:1px solid #000;padding:3px">
                ${item.data || ""}
            </td>

            <td style="border:1px solid #000;padding:3px">
                ${item.descricao || ""}
            </td>

            <td style="border:1px solid #000;padding:3px">
                ${item.fornecedor || "-"}
            </td>

            <td style="border:1px solid #000;padding:3px">
                ${item.nota || ""}
            </td>

            <td style="border:1px solid #000"></td>

            <td style="border:1px solid #000;padding:3px;text-align:right">
                R$ ${valor.toFixed(2)}
            </td>

        </tr>
        `;
    }

});

// 🔵 DATA FINAL DO MÊS
let ultimoDia = new Date(
    ano,
    mes,
    0
).toLocaleDateString("pt-BR");


// RESUMO ENTRADAS
for(let chave in entradasAgrupadas){

    let total =
        entradasAgrupadas[chave];

    entradas += total;

    linhasEntradas += `
    <tr>

        <td style="border:1px solid #000;padding:3px">
            ${ultimoDia}
        </td>

        <td style="border:1px solid #000;padding:3px">
            ${chave}
        </td>

        <td style="border:1px solid #000;padding:3px">
            Comunidade
        </td>

        <td style="border:1px solid #000"></td>

        <td style="
            border:1px solid #000;
            padding:3px;
            text-align:right;
            font-weight:bold;
        ">
            R$ ${total.toFixed(2)}
        </td>

        <td style="border:1px solid #000"></td>

    </tr>
    `;
}

// 🔵 LINHAS VAZIAS ESTILO LIVRO CAIXA
for(let i=0;i<15;i++){

    linhasSaidas += `
    <tr style="color:red">

        <td style="border:1px solid #000;height:24px"></td>
        <td style="border:1px solid #000"></td>
        <td style="border:1px solid #000"></td>
        <td style="border:1px solid #000"></td>
        <td style="border:1px solid #000"></td>
        <td style="border:1px solid #000"></td>

    </tr>
    `;
}

let linhas =
    linhasEntradas +

    `
    <tr>
        <td style="height:20px;border:1px solid #000;"></td>
        <td style="border:1px solid #000;"></td>
        <td style="border:1px solid #000;"></td>
        <td style="border:1px solid #000;"></td>
        <td style="border:1px solid #000;"></td>
        <td style="border:1px solid #000;"></td>
    </tr>
    ` +

    linhasSaidas;    

let saldo = entradas - saidas;

Relatorio.totalEntradas = entradas;
Relatorio.totalSaidas = saidas;
Relatorio.totalSaldo = saldo;


// 🔵 HTML FINAL
document.getElementById("res").innerHTML =
    FinanceiroTemplate.montar({

        referencia,
        linhas,
        entradas,
        saidas,
        saldo
    });

window.__RELATORIO_PRONTO__ = true;

}); // fecha API.enviar().then()

} // fecha gerar()

};