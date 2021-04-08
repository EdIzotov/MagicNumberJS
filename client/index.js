window.addEventListener("load", function() {
    const SERVER_URL = "http://localhost:8085/game";

    let field = document.querySelector("#number-field");
    let sendButton = document.querySelector("#number-btn");
    let getNumbersButton = document.querySelector("#numbers");
    let dataBlock = document.querySelector("#data");

    sendButton.addEventListener("click", function() {
        let data = {
            data: field.value
        };
        let request = new XMLHttpRequest();
        request.open("POST", SERVER_URL);
        request.onload = function() {
            if (request.status === 200) {
                const responseAnswer = JSON.parse(request.responseText).data;
                dataBlock.innerText = field.value + " - " + responseAnswer;
                field.value = "";
            } else {
                console.log("ERROR");
            }
        }
        request.send(JSON.stringify(data));
    });

    getNumbersButton.addEventListener("click", function() {
        let request = new XMLHttpRequest();
        request.open("GET", SERVER_URL);
        request.onload = function() {
            if (request.status === 200) {
                console.log(200);
            } else {
                console.log("ERROR");
            }
        }
        request.send();
    });
});
