let startbtn = document.querySelector("#startbtn");
let palavraTela = document.querySelector("#palavra-secreta");
let palavraSecretaNome;
let tentativas = 6;
let listaDinamica = [];
let palavraAleatoria = [{nome:"JIM HOPPER"}, {nome:"ELEVEN"}, {nome:"DEMOGORGON"}, {nome:"VECNA"}, {nome:"HAWKINS"}, {nome:"WILL BYERS"}, {nome:"MAX MAYFIELD"}, {nome:"EDDIE MUNSON"}, {nome:"DUSTIN HENDERSON"}, {nome:"ARGYLE"}, {nome:"DR BRENNER"}, {nome:"JOYCE BYERS"}, {nome:"MIKE WHEELER"}];

// Sorteia palavra secreta da lista de opcoes
criarPalavraSecreta()
function criarPalavraSecreta(){
    let indexPalavra = parseInt(Math.random()*palavraAleatoria.length);

    palavraSecretaNome = palavraAleatoria[indexPalavra].nome;
}
// Monta palavra na tela conforme acertos
montarPalavraNaTela()
function montarPalavraNaTela(){
    palavraTela.innerHTML = "";

    for(i = 0;i < palavraSecretaNome.length; i++){
        if(listaDinamica[i] == undefined){
            if(palavraSecretaNome[i] == " "){
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letra-espaco'>" + listaDinamica[i] + "</div>";
            }else{
                listaDinamica[i] = "&nbsp;";
            
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letra'>" + listaDinamica[i] + "</div>";
            
            }
        }else{
            if(palavraSecretaNome[i] == " "){
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letra-espaco'>" + listaDinamica[i] + "</div>";   
            }else{
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letra'>" + listaDinamica[i] + "</div>";
            }
            
        }
    }
}
// Verifica se letra escolhida já foi usada
function verificaLetraEscolhida(letra){
    document.getElementById("tecla-" + letra).disabled = true;
    if(tentativas > 0){
        mudarStyleLetra("tecla-" + letra, false);
        comparaListas(letra);
        montarPalavraNaTela();
    }
}
// Muda estilo da tecla conforme click
function mudarStyleLetra(tecla, condicao){
    if(condicao == false){
        document.getElementById(tecla).style.background = "rgb(175, 2, 2)";
        document.getElementById(tecla).style.color = "white";
    }else{
        document.getElementById(tecla).style.background = "green";
        document.getElementById(tecla).style.color = "white";
    }
}
// Compara se venceu ou perdeu
function comparaListas(letra){
    let pos = palavraSecretaNome.indexOf(letra);
    if(pos < 0){
        tentativas--;
        carregarImagemForca();
        if(tentativas == 0){
            abreModal("Game Over", "O Vecna venceu! A palavra secreta era " + palavraSecretaNome + " 😵");
        }
    }else{
        mudarStyleLetra("tecla-" + letra, true);
        for(i = 0; i < palavraSecretaNome.length; i++){
            if(palavraSecretaNome[i] == letra){
                listaDinamica[i] = letra;
            }
        }
    }
    let vitoria = true;
    for(i = 0; i < palavraSecretaNome.length; i++){
        if(palavraSecretaNome[i] != listaDinamica[i]){
            vitoria = false;
        }
    }
    if(vitoria == true){
        abreModal("Vitória", "PARABÉNS!!! Você venceu o Vecna... 🎉");
        tentativas = 0;
    }
}
// Carrega imagens conforme erros
function carregarImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("imagem-forca").innerHTML = "<img src= 'imagens/p1.png'>";
            break;
        case 4: 
            document.getElementById("imagem-forca").innerHTML = "<img src= 'imagens/p2.png'>";
            break;
        case 3: 
            document.getElementById("imagem-forca").innerHTML = "<img src= 'imagens/p3.png'>";
            break;
        case 2: 
            document.getElementById("imagem-forca").innerHTML = "<img src= 'imagens/p4.png'>";
            break;
        case 1: 
            document.getElementById("imagem-forca").innerHTML = "<img src= 'imagens/p5.png'>";
            break;
        case 0: 
            document.getElementById("imagem-forca").innerHTML = "<img src= 'imagens/p6.png'>";
            break;
    }
}
// Modal
function abreModal(titulo, mensagem){
    let modalTitulo = document.querySelector("#exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}
// Botao para reiniciar jogo
let btnReiniciar = document.querySelector("#btn-reiniciar");
btnReiniciar.addEventListener("click", function(){
    location.reload();
});