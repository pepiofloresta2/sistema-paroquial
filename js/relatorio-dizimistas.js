const RelatorioDizimistas = {

    gerar() {

        let mesInput = document.getElementById("mesFiltro").value;

        if (!mesInput) {
            alert("Selecione o mês");
            return;
        }

        let partes = mesInput.split("-");
        let ano = partes[0];
        let mes = partes[1];

        API.enviar({
            acao: "buscar_rel