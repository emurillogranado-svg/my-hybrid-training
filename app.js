function openTab(evt, tabName){

    let tabcontent = document.getElementsByClassName("tab-content");

    for(let i=0;i<tabcontent.length;i++){
        tabcontent[i].classList.remove("active");
    }

    let tablinks = document.getElementsByClassName("tab-button");

    for(let i=0;i<tablinks.length;i++){
        tablinks[i].classList.remove("active");
    }

    document.getElementById(tabName).classList.add("active");

    evt.currentTarget.classList.add("active");
}

let timer;
let seconds = 0;
let isRunning = false;
let mode = 'countup';

function updateDisplay(){

    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;

    document.getElementById('display').innerText =
        `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
}

function setMode(newMode){

    resetTimer();

    mode = newMode;

    if(mode === 'amrap'){
        seconds = 900;
    }else{
        seconds = 0;
    }

    updateDisplay();
}

function toggleTimer(){

    if(isRunning){

        clearInterval(timer);

    }else{

        timer = setInterval(() => {

            if(mode === 'countup'){
                seconds++;
            }else{
                if(seconds > 0){
                    seconds--;
                }
            }

            updateDisplay();

        },1000);
    }

    isRunning = !isRunning;
}

function resetTimer(){

    clearInterval(timer);

    seconds = 0;
    isRunning = false;

    updateDisplay();
}

updateDisplay();

document.querySelectorAll("input").forEach((input,index)=>{

    input.id = "input_" + index;

    input.value = localStorage.getItem(input.id) || "";

    input.addEventListener("input",()=>{

        localStorage.setItem(input.id,input.value);

    });
});
