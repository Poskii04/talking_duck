//raccolgo dalla pagina gli elementi che mi servono
const textArea= document.querySelector('textarea'); //per prendere un selettore css
const playButton= document.querySelector('button'); // dobbiamo sapere quando il testo viene premuto
const pitchbar= document.querySelector('input');
const duckFigure=document.querySelector('figure');

// onclick
playButton.addEventListener('click',function(){
    //istruzioni in caso di click
    //const text= textArea.value; leggimi cosa c'è scritto
    //const textLength= textArea.value.length; PROBLEMA: legge anche spazi

    const textLength= textArea.value.trim().length;//elimina spazi
    //console.log(textLength);
    if (textLength>0){
        //allora la papera parla
        talk();
    }
});

//PARLAAAA DIO CANE
function talk(){
    // 1-recuperare tono di voce e testo
    const text = textArea.value; //mi serve solo testo
    const pitch = pitchbar.value; 
    //console.log(pitch);

    // 2-preparo frase per il sintetizzatore vocale
    const frase= new SpeechSynthesisUtterance(text);

    // 3-dettagli della voce
    frase.volume= 1;
    frase.rate= 1; //velocita
    frase.pitch= pitch;

    // 4- facciamola parlare
    speechSynthesis.speak(frase);

    //quando inizia a parlare
    frase.addEventListener('start', function() {
            //blocco controlli
            textArea.disabled = true;
            pitchbar.disabled = true;
            playButton.disabled = true;
            //animiamo paperella
            duckFigure.classList.add('talking');
        });
    
    //quando smette di parlare
    frase.addEventListener('end', function() {
        //rimetto controlli
        textArea.disabled = false;
        pitchbar.disabled = false;
        playButton.disabled = false;
        //papera fissa
        duckFigure.classList.remove('talking');
    });
}
