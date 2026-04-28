// js/api.js

const API = {

    enviar(params) {

        let url = CONFIG.API_URL + "?" + new URLSearchParams(params);

        return fetch(url)
            .then(res => res.json())
            .catch(err => {
                console.error("Erro de comunicação:", err);
                alert("Erro ao conectar com Google Sheets.");
            });
    }

};