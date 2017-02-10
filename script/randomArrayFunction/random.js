
//   /_____/ /_____/ /_____/ /_____/ /_____/ /_____/ /_____/ /_____/ /_____/ /_____/    
//   /_____/ /_____/ /_____/ /_____/ /_____/ /_____/ /_____/ /_____/ /_____/ /_____/    
//  ___________    .___                     .___         ________      .__    .___      
//  \_   _____/  __| _/_________ _______  __| _/____    /  _____/ __ __|__| __| _/____  
//   |    __)_  / __ |/  _ \__  \\_  __ \/ __ |/  _ \  /   \  ___|  |  \  |/ __ |/  _ \ 
//   |        \/ /_/ (  <_> ) __ \|  | \/ /_/ (  <_> ) \    \_\  \  |  /  / /_/ (  <_> )
//  /_______  /\____ |\____(____  /__|  \____ |\____/   \______  /____/|__\____ |\____/ 
//    ______\/______\/______  __\/__  ______ \/_____  ______  _\/___  ______  _\/___    
//   /_____/ /_____/ /_____/ /_____/ /_____/ /_____/ /_____/ /_____/ /_____/ /_____/    
//   /_____/ /_____/ /_____/ /_____/ /_____/ /_____/ /_____/ /_____/ /_____/ /_____/    


//  Queste due funzioni servono a generare un oggetto randomico ad ogni refresh 
//  della pagina o pressione del bottone.
//  Ogni immagine va messa in una cartella indicata dalla variabile "picsPath" 
//  e nominata secondo cifre crescenti a partire da 0. 
//  A seconda del numero di immagini da caricare, bisogna anche aggiornare il valore
//  della variabile "totPics".
//  Per caricare la funzione ad ogni refresh della pagina, è necessario inserire
//  le due funzioni nel tag body:
//
//      <body onLoad="imgName()
//                    getRandomValue()">
//      </body>
//

var pics = new Array;
var totPics = 12;
var picsPath = "res/";

function getRandomValue() {
    
    var randomPic = pics[Math.floor(Math.random() * pics.length)].src;
    console.log(randomPic);
    document.getElementById("random-image").src = randomPic;
    
}

function imgName() {
    var fileType = ".png";
    
    //  MODELLO IMMAGINE NELL'ARRAY
    //  pics[0] = new Image();
    //  pics[0].src = "res/" + i + ".png";
    
    for (i = 0; i < totPics; i++) {
        pics[i] = new Image();
        pics[i].src = picsPath + i + fileType;
        pics.push;
        
    //  scrive il percorso della singola immagine nella console
//        console.log(pics[i].src);
    }
    
    //  lista l'array di immagini nella console
//    console.log(pics);
    
}