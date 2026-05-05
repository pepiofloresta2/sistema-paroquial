const Relatorio = {

gerar(){

let mesInput = document.getElementById("mesFiltro").value;
if(!mesInput) return alert("Selecione o mês");

let [ano, mes] = mesInput.split("-");
let ultimoDia = new Date(ano, mes, 0).toLocaleDateString("pt-BR");

API.enviar({
    acao:"buscar_relatorio",
    mes, ano
}).then(res=>{

let linhas = "";
let entradas=0;
let saidas=0;
let totalDizimo=0;

(res.lista||[]).forEach(item=>{

let valor = parseFloat(item.valor||0);

// 🔴 separa dízimo
if(item.categoria==="Dízimo"){
    totalDizimo += valor;
    return;
}

let ent = item.tipo==="Entrada" ? valor : "";
let sai = item.tipo==="Saída" ? valor : "";

if(ent) entradas+=valor;
if(sai) saidas+=valor;

linhas+=`
<tr>
<td style="border:1px solid #000;padding:4px">${item.data||""}</td>
<td style="border:1px solid #000;padding:4px">${item.categoria||""}</td>
<td style="border:1px solid #000;padding:4px;text-align:center">${item.codigo||""}</td>
<td style="border:1px solid #000;padding:4px;text-align:right">${ent? "R$ "+valor.toFixed(2):""}</td>
<td style="border:1px solid #000;padding:4px;text-align:right;color:red">${sai? "R$ "+valor.toFixed(2):""}</td>
</tr>`;
});

// 🔴 lança dízimo no final
if(totalDizimo>0){
linhas+=`
<tr>
<td style="border:1px solid #000;padding:4px">${ultimoDia}</td>
<td style="border:1px solid #000;padding:4px"><b>DÍZIMO CONSOLIDADO</b></td>
<td style="border:1px solid #000"></td>
<td style="border:1px solid #000;text-align:right"><b>R$ ${totalDizimo.toFixed(2)}</b></td>
<td style="border:1px solid #000"></td>
</tr>`;
entradas+=totalDizimo;
}

// 🔴 linhas em branco estilo livro caixa
for(let i=0;i<10;i++){
linhas+=`
<tr>
<td style="border:1px solid #000">&nbsp;</td>
<td style="border:1px solid #000"></td>
<td style="border:1px solid #000"></td>
<td style="border:1px solid #000"></td>
<td style="border:1px solid #000"></td>
</tr>`;
}

let saldo = entradas-saidas;

document.getElementById("res").innerHTML = `
<div id="doc" style="padding:10mm;width:190mm;margin:auto;border:1px solid #000;font-family:Arial">

<!-- CABEÇALHO -->
<div style="display:flex;justify-content:space-between;align-items:center;border:1px solid #000;padding:10px">

<img src="assets/logo.png" style="height:60px">

<div style="text-align:center">
<h3 style="margin:0">COM. SÃO PADRE PIO</h3>
<h4 style="margin:0">MOVIMENTO DO CAIXA</h4>
</div>

<img src="assets/diocese.png" style="height:60px">

</div>

<!-- TABELA -->
<table style="width:100%;border-collapse:collapse;margin-top:10px;font-size:12px">

<tr style="background:#eee">
<th style="border:1px solid #000">DATA</th>
<th style="border:1px solid #000">HISTÓRICO</th>
<th style="border:1px solid #000">DOC</th>
<th style="border:1px solid #000">ENTRADAS</th>
<th style="border:1px solid #000">SAÍDAS</th>
</tr>

${linhas}

<tr>
<td colspan="3" style="border:1px solid #000"><b>SUBTOTAL</b></td>
<td style="border:1px solid #000;text-align:right">R$ ${entradas.toFixed(2)}</td>
<td style="border:1px solid #000;text-align:right;color:red">R$ ${saidas.toFixed(2)}</td>
</tr>

<tr>
<td colspan="3" style="border:1px solid #000"><b>SALDO</b></td>
<td colspan="2" style="border:1px solid #000;text-align:right"><b>R$ ${saldo.toFixed(2)}</b></td>
</tr>

</table>

</div>
`;

window.__RELATORIO_PRONTO__ = true;

});
}
};