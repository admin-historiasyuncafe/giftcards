const API_URL = "https://sheetdb.io/api/v1/ili8wk3w6v5da";

let currentGiftCard = null;
let qrScannerActivate = null;
let qrScannerRedeem = null;

function showTab(tabName) {

    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
    });

    document.getElementById(tabName).classList.add("active");

}

window.onload = () => {

    showTab("activate");

    qrScannerActivate = new Html5QrcodeScanner(
        "reader",
        {
            fps: 10,
            qrbox: 250
        }
    );

    qrScannerActivate.render(onScanSuccessActivate);

    qrScannerRedeem = new Html5QrcodeScanner(
        "readerRedeem",
        {
            fps: 10,
            qrbox: 250
        }
    );

    qrScannerRedeem.render(onScanSuccessRedeem);

};

function onScanSuccessActivate(decodedText) {

    document.getElementById("codigo").value = decodedText;

}

function onScanSuccessRedeem(decodedText) {

    document.getElementById("codigoRedimir").value = decodedText;

}

function formatDateTime() {

    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    let hours = now.getHours();

    const minutes =
        String(now.getMinutes()).padStart(2, "0");

    const ampm =
        hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    hours = hours ? hours : 12;

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;

}

async function activarGiftCard() {

    const codigo =
        document.getElementById("codigo").value.trim();

    const valorInicial =
        document.getElementById("valorInicial").value.trim();

    const compradoPor =
        document.getElementById("compradoPor").value.trim();

    const telefonoComprador =
        document.getElementById("telefonoComprador").value.trim();

    const regaladaA =
        document.getElementById("regaladaA").value.trim();

    const empleado =
        document.getElementById("empleadoActivacion").value.trim();

    if (!codigo) {
        alert("Escanea un QR primero");
        return;
    }

    if (!valorInicial) {
        alert("Indique el valor inicial");
        return;
    }

    try {

            const existingResponse =
        await fetch(API_URL);
    
    const existingData =
        await existingResponse.json();
    
    const existe =
        existingData.some(
            item =>
                item.Codigo === codigo
        );
    
    if(existe){
    
        alert(
            "Esta Gift Card ya fue activada."
        );
    
        return;
    }

        const payload = {

            data: [{

                Codigo: codigo,

                ValorInicial: valorInicial,

                Balance: valorInicial,

                CompradoPor: compradoPor,

                TelefonoComprador: telefonoComprador,

                RegaladaA: regaladaA,

                FechaActivacion: formatDateTime(),

                FechaExpiracion: "",

                Estado: "ACTIVA",

                Notas: "",

                EmpleadoActivacion: empleado

            }]
        };

        const response = await fetch(
            API_URL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        const result =
            await response.json();

        console.log(result);

        alert(
            "Gift Card activada correctamente"
        );

        document.getElementById("codigo").value = "";
        document.getElementById("valorInicial").value = "";
        document.getElementById("compradoPor").value = "";
        document.getElementById("telefonoComprador").value = "";
        document.getElementById("regaladaA").value = "";
        document.getElementById("empleadoActivacion").value = "";

    }
    catch(error){

        console.error(error);

        alert(
            "Error activando Gift Card"
        );

            if (
        !codigo ||
        !valorInicial ||
        !compradoPor ||
        !telefonoComprador ||
        !regaladaA ||
        !empleado
    ) {
        alert(
            "Debe completar todos los campos."
        );
        return;
    }

    }

}

async function buscarGiftCard() {

    const codigo =
        document.getElementById("codigoRedimir").value.trim();

    if (!codigo) {

        alert(
            "Escanea una Gift Card"
        );

        return;
    }

    try {

        const response =
            await fetch(
                `${API_URL}/search?Codigo=${encodeURIComponent(codigo)}`
            );

        const data =
            await response.json();

        if (!data.length) {

            document.getElementById("giftInfo").innerHTML =
                "<p class='error'>Gift Card no encontrada</p>";

            document.getElementById("balanceDisplay").style.display =
                "none";

            return;
        }

        const card = data[0];

        currentGiftCard = card;

            if(
        parseFloat(card.Balance) <= 0
    ){
    
        card.Estado = "USADA";
    
    }

        if (card.Estado === "USADA") {

            document.getElementById("giftInfo").innerHTML = `
                <div class="info-card">
                    <h3 style="color:red;">
                        Gift Card completamente utilizada
                    </h3>

                    <p>
                        <strong>Código:</strong>
                        ${card.Codigo}
                    </p>
                </div>
            `;

            document.getElementById("balanceDisplay").style.display =
                "block";

            document.getElementById("balanceDisplay").innerHTML =
                "$0.00";

            return;
        }

        document.getElementById("giftInfo").innerHTML = `
            <div class="info-card">
                <p><strong>Código:</strong> ${card.Codigo}</p>
                <p><strong>Estado:</strong> ${card.Estado}</p>
                <p><strong>Comprado por:</strong> ${card.CompradoPor}</p>
                <p><strong>Regalada a:</strong> ${card.RegaladaA}</p>
            </div>
        `;

        document.getElementById("balanceDisplay").style.display =
            "block";

        document.getElementById("balanceDisplay").innerHTML =
            "$" + Number(card.Balance).toFixed(2);

    }
    catch(error){

        console.error(error);

        alert(
            "Error buscando Gift Card"
        );

    }

}

async function redimirGiftCard() {

    if (!currentGiftCard) {

        alert(
            "Primero busca una Gift Card"
        );

        return;
    }

    if (
        currentGiftCard.Estado === "USADA"
    ) {

        alert(
            "Esta Gift Card ya fue utilizada completamente."
        );

        return;
    }

    const monto =
        parseFloat(
            document.getElementById(
                "montoRedencion"
            ).value
        );

    const empleado =
        document.getElementById(
            "empleadoRedencion"
        ).value.trim();

    if (!monto || monto <= 0) {

        alert(
            "Monto inválido"
        );

        return;
    }

    const balanceAnterior =
        parseFloat(
            currentGiftCard.Balance
        );

    if (monto > balanceAnterior) {

        alert(
            "El monto excede el balance disponible"
        );

        return;
    }

    const balanceNuevo =
        Number(
            (
                balanceAnterior - monto
            ).toFixed(2)
        );

    let nuevoEstado = "ACTIVA";

    if (balanceNuevo <= 0) {

        nuevoEstado = "USADA";

    }

    try {

        await fetch(

            `${API_URL}/Codigo/${encodeURIComponent(
                currentGiftCard.Codigo
            )}`,

            {
                method: "PATCH",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    data: {

                        Balance:
                            balanceNuevo,

                        Estado:
                            nuevoEstado

                    }

                })

            }

        );

        const transactionId =
            "TX-" + Date.now();

        await fetch(

            `${API_URL}?sheet=Transactions`,

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    data: [{

                        IDTransaccion:
                            transactionId,

                        Fecha:
                            formatDateTime(),

                        Codigo:
                            currentGiftCard.Codigo,

                        Tipo:
                            "REDENCION",

                        Monto:
                            monto,

                        BalanceAnterior:
                            balanceAnterior,

                        BalanceNuevo:
                            balanceNuevo,

                        Empleado:
                            empleado

                    }]

                })

            }

        );

        currentGiftCard.Balance =
            balanceNuevo;

        currentGiftCard.Estado =
            nuevoEstado;

        document.getElementById(
            "balanceDisplay"
        ).innerHTML =
            "$" + balanceNuevo.toFixed(2);

        document.getElementById(
            "giftInfo"
        ).innerHTML = `

            <div class="info-card">

                <p>
                    <strong>Código:</strong>
                    ${currentGiftCard.Codigo}
                </p>

                <p>
                    <strong>Estado:</strong>
                    ${nuevoEstado}
                </p>

                <p>
                    <strong>Comprado por:</strong>
                    ${currentGiftCard.CompradoPor}
                </p>

                <p>
                    <strong>Regalada a:</strong>
                    ${currentGiftCard.RegaladaA}
                </p>

            </div>

        `;

        document.getElementById(
            "montoRedencion"
        ).value = "";

        alert(
            `Redención aplicada.\n\nNuevo balance: $${balanceNuevo.toFixed(2)}`
        );

    }
    catch(error){

        console.error(error);

        alert(
            "Error procesando la redención"
        );

            if (
        !document.getElementById("codigoRedimir").value.trim() ||
        !document.getElementById("montoRedencion").value.trim() ||
        !empleado
    ) {
        alert(
            "Debe completar todos los campos."
        );
        return;
    }

    }

}
