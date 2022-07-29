
const divMenu = document.querySelector('.menu-botao');
const listaSpan = document.querySelectorAll('.menu-botao span');
const navAnimacao = document.querySelector('.header-apresentacao nav ul')
let mostrarMenu = true, executando = false;

divMenu.addEventListener('click', () => {


    if(mostrarMenu && !executando){

        mostrarMenu = false;
        executando = true;
        aparecerMenu();
        return
    }

    if(!executando && !mostrarMenu){

        mostrarMenu = true;
        executando = true;
        sairMenu();

    }

    return
})

function aparecerMenu(){

    listaSpan[0].style.animation = 'virarX .2s ease forwards';
    listaSpan[1].style.opacity = 0;
    listaSpan[2].style.animation = 'virarX2 .2s ease forwards';

    navAnimacao.style.animation = 'abrirMenu .5s forwards'

    // medidas recebidas pelas animações
    setTimeout( () => { 

        listaSpan[0].style.top = '20px';
        listaSpan[0].style.transform = 'rotate(45deg)';
        listaSpan[2].style.top = '20px';
        listaSpan[2].style.transform = 'rotate(-45deg)';

        navAnimacao.style.right = '3%';

        executando = false;

    }, 200)
    

}

function sairMenu(){

    listaSpan[0].style.animation = 'voltarX .2s ease forwards';
    listaSpan[2].style.animation = 'voltarX2 .2s ease forwards';

    navAnimacao.style.animation = 'fecharMenu .5s forwards'
    // medidas recebidas pelas animações
    setTimeout( () => {

        listaSpan[0].style.top = '10px';
        listaSpan[0].style.transform = 'rotate(0)';
        
        listaSpan[1].style.opacity = 1;
        listaSpan[2].style.top = '30px';
        listaSpan[2].style.transform = 'rotate(0)';

        navAnimacao.style.right = '-100%';

        executando = false;

    }, 200 );

}

const nome = document.querySelector('#nome');
const email = document.querySelector('#email');
const celular = document.querySelector('#celular');
const atendimento = document.querySelector('#opcoes');
const botaoEnviar = document.querySelector('#enviarEmail');

botaoEnviar.addEventListener('click', enviarEmail)

function enviarEmail(){
   
    let enviar = true;
    [nome, email, celular, atendimento].forEach( dados => {
        if(dados.value == ''){
            dados.style.border = "2px solid red";
            enviar = false
            return
        }
        dados.style.border = "2px solid #326229b0";

    })

    if(!enviar){
        return
    }

    const objeto = { nome: nome.value , email: email.value, celular: celular.value, atendimento: atendimento.value }

    const update = {     
        body: objeto,
        userId: 1
    };    
    
    const options = {    

        method: "POST",
        headers: {       
            "Content-Type": "application/json",
            },     
        body: JSON.stringify(update),
    };    

    fetch("https://api-hakc4ton.herokuapp.com/envioemail", options)
        .then(() => alert("Sua solicitação foi enviada"));

}
