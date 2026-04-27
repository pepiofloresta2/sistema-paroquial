const API = {

    enviar(params) {

        const url = CONFIG.API_URL + "?" + new URLSearchParams(params);

        return fetch(url)
            .then(res => res.json())
            .catch(err => {
                console.error("Erro de comunicação:", err);
                alert("Erro ao conectar com Google Sheets.");
            });
    }

};