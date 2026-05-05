const Relatorio = {

gerar(){

let mesInput = document.getElementById("mesFiltro").value;
if(!mesInput) return alert("Selecione o mês");

let [ano, mes] = mesInput.split("-");

API.enviar({
    acao:"buscar_relatorio",
    mes, ano
}).then(res=>{

let linhas = "";
let entradas=0;
let saidas=0;

(res.lista||[]).forEach(item=>{

let valor = parseFloat(item.valor||0);

let ent = item.tipo==="Entrada" ? valor : "";
let sai = item.tipo==="Saída" ? valor : "";

if(ent) entradas+=valor;
if(sai) saidas+=valor;

linhas+=`
<tr>
<td>${item.data||""}</td>
<td>${item.categoria||""}</td>
<td>${item.codigo||""}</td>
<td style="text-align:right">${ent? "R$ "+valor.toFixed(2):""}</td>
<td style="text-align:right;color:red">${sai? "R$ "+valor.toFixed(2):""}</td>
</tr>`;
});

let saldo = entradas-saidas;

document.getElementById("res").innerHTML = `
<div id="doc">

<h2 style="text-align:center">MOVIMENTO DO CAIXA</h2>

<table style="width:100%;border-collapse:collapse">

<tr>
<th>DATA</th><th>HISTÓRICO</th><th>DOC</th><th>ENTRADAS</th><th>SAÍDAS</th>
</tr>

${linhas}

<tr>
<td colspan="3"><b>SUBTOTAL</b></td>
<td>R$ ${entradas.toFixed(2)}</td>
<td>R$ ${saidas.toFixed(2)}</td>
</tr>

<tr>
<td colspan="3"><b>SALDO</b></td>
<td colspan="2">R$ ${saldo.toFixed(2)}</td>
</tr>

</table>

</div>
`;

});
}
};