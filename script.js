function cabeca(caminhoDaSkin, id) {
    var head = document.getElementById('head');
    head.src = caminhoDaSkin;
    localStorage.setItem("cabeca", head.src);    
    $.post("trocaskin.php", {nick: localStorage.getItem("nick"), cabeca: id}, function(data) {
        console.log(data);      

    });
}
function corpo(caminhoDaSkin, id) {
    var body = document.getElementById('body');
    body.src = caminhoDaSkin;
    localStorage.setItem("corpo", body.src);  
    $.post("trocaskin.php", {nick: localStorage.getItem("nick"), corpo: id}, function(data) {
        console.log(data);      
    

    });
}
function registrar() {
    var nick = $("#registerNick").val();

    $.post("registro.php", {nick: nick}, function(data) {
        var response = JSON.parse(data);

        if (response.status === "success") {
            localStorage.setItem("nick", response.nick);
            atualizarNickDisplay();
        }

        $("#registerResponse").text(response.message);
    });
}

function login() {
    var nick = $("#loginNick").val();

    $.post("login_action.php", {nick: nick},
     function(data) {
        var response = JSON.parse(data);
console.log(response)
        if (response.status === "success") {
            localStorage.setItem("nick", response.nick);
            localStorage.setItem("user_id", response.user_id);
            localStorage.setItem("corpo", response.corpo);
            localStorage.setItem("cabeca", response.cabeca);
            atualizarNickDisplay();
            fetchSkins();
        }

        
        $("#loginResponse").text(response.message);
    });
}

function atualizarNickDisplay() {
    if (localStorage.getItem("nick")) {
        // Supondo que você tenha um <div id="nickDisplay"></div> onde quer mostrar o nick.
        $("#nickDisplay").text("Conectado como: " + localStorage.getItem("nick"));
    } else {
        $("#nickDisplay").text("Não está conectado.");
    }
}

// Ao carregar a página, exibimos o nick, se estiver disponível:
$(document).ready(function() {
    atualizarNickDisplay();
});
function fetchSkins() {
    const user_id = localStorage.getItem("user_id");    

    const head = document.getElementById('head');
    head.src = localStorage.getItem("cabeca");   
    const body = document.getElementById('body');
    body.src = localStorage.getItem("corpo");   

        const skinDiv1 = document.querySelector('.skin1');
        skinDiv1.innerHTML = ''; // Limpar conteúdo anterior
        const skinDiv2 = document.querySelector('.skin2');
        skinDiv2.innerHTML = ''; // Limpar conteúdo anterior
        $.post("apiskins.php", {user_id: user_id},
         function(data) {

        data.forEach(item => {
            let imgElement1 = document.createElement('img');
            imgElement1.className = 'itens1';
            imgElement1.src = item.cabeca;
            imgElement1.id = item.id;
            imgElement1.width = '100';
            imgElement1.alt = 'Cabeça do personagem';
            imgElement1.onclick = () => cabeca(item.cabeca, item.id);
            
            skinDiv1.appendChild(imgElement1);
        });


        data.forEach(item => {
            let imgElement2 = document.createElement('img');
            imgElement2.className = 'itens2';
            imgElement2.src = item.corpo;
            imgElement2.id = item.id;
            imgElement2.width = '100';
            imgElement2.alt = 'Cabeça do personagem';
            imgElement2.onclick = () => corpo(item.corpo, item.id);
            
            skinDiv2.appendChild(imgElement2);
        });

 
});
}





// Chame a função quando a página carregar
window.onload = fetchSkins;
