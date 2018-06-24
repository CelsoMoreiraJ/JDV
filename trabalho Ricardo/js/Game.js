const jogador1 = 'x';
const jogador2 = 'o';
var playerTime = jogador1;
var gameOver = false;
var jogada = 0;
var P1 = 0;
var P2 = 0;



atualizaMostrador();
inicializarEspacos();

async function atualizaMostrador(){

	jogada++;
	if(gameOver){ 
		return;
	}

	if(playerTime == jogador1){

		var player = document.querySelectorAll("div#mostrador img")[0];
		player.setAttribute("src", "x.png");
	} else{
		var player = document.querySelectorAll("div#mostrador img")[0];
		player.setAttribute("src", "o.png");
	}if(jogada >= 9){
		await sleep(50);
		alert("EMPATE!");
		location.reload();
	}
}

function inicializarEspacos(){
	var PC = document.getElementById('CPU').checked; 
	var espacos = document.getElementsByClassName("espaco");
	for (var i = 0; i < espacos.length; i++) {
		
		espacos[i].addEventListener("click", function(){
			if(gameOver){return;}

			if(this.getElementsByTagName("img").length == 0){

				if(playerTime == jogador1){

					this.innerHTML = "<img src='x.png'>";
					this.setAttribute("jogada", jogador1);
					playerTime = jogador2;

				}else{

					this.innerHTML = "<img src='o.png'>";
					this.setAttribute("jogada", jogador2);
					playerTime = jogador1;
				}if (PC == jogador2) {
                    verificarVencedor(IA());
                }
				atualizaMostrador();
				verificarVencedor();

			}
		}

		);
	}
}

function IA(){ 

    var jogada = Math.floor((Math.random() * 9) + 1);

    while(verificarVencedor(jogada) != ""){

        jogada = "Cel" + Math.floor((Math.random() * 9) + 1);

    }

    return jogada;
}

async function verificarVencedor(){

	var Cel1 = document.getElementById("Cel1").getAttribute("jogada");
	var Cel2 = document.getElementById("Cel2").getAttribute("jogada");
	var Cel3 = document.getElementById("Cel3").getAttribute("jogada");

	var Cel4 = document.getElementById("Cel4").getAttribute("jogada");
	var Cel5 = document.getElementById("Cel5").getAttribute("jogada");
	var Cel6 = document.getElementById("Cel6").getAttribute("jogada");

	var Cel7 = document.getElementById("Cel7").getAttribute("jogada");
	var Cel8 = document.getElementById("Cel8").getAttribute("jogada");
	var Cel9 = document.getElementById("Cel9").getAttribute("jogada");


	var vencedor = "";

	if(((Cel1 == Cel4 && Cel1 == Cel7) || (Cel1 == Cel2 && Cel1 == Cel3) || (Cel1 == Cel5 && Cel1 == Cel9)) && Cel1 != ""){
		vencedor = Cel1;
	}else if(((Cel5 == Cel4 && Cel5 == Cel6 && Cel5 != "") || (Cel5 == Cel2 && Cel5 == Cel8 && Cel5 != "" ) || (Cel5 == Cel3 && Cel5 == Cel7) && Cel5 != "")){
		vencedor = Cel5;
	}else if(((Cel9 == Cel8 && Cel9 == Cel7) || (Cel9 == Cel3 && Cel9 == Cel6)) && Cel9 != ""){
		vencedor = Cel9;
	}

	if(vencedor != ""){
		gameOver = true;
		await sleep(50);
		alert("O ganhador foi o: '" + vencedor + "'");
		if(vencedor == jogador1){
			P1++;
			document.getElementById("P1").innerHTML = P1;
            document.getElementById("mostrador").innerHTML = "X venceu esta partida!"
		}else{
			P2++;
			document.getElementById("P2").innerHTML = P2;
            document.getElementById("mostrador").innerHTML = "O venceu esta partida!"
		}
		
		location.reload();
	}
}

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}