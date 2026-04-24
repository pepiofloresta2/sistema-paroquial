const API = {

    enviar(params) {

        let url = CONFIG.API_URL + "?" + new URLSearchParams(params);

        return fetch(url, {
            method: "GET",
            mode: "no-cors"
        })
        .then(() => {
            return {
                status: "ok"
            };
        })
        .catch(err => {
            console.error("Erro de comunicação:", err);
            alert("Erro ao conectar com Google Sheets.");
        });
    }

};