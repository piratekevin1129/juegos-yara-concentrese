var animacion_timer = null
var segundos = 0
var time_txt = document.getElementById('tiempo-msg-relojito-txt')
var timer_msg = document.getElementById('tiempo-msg')
var animacion_timer_ocultar = null

function startTimer(){
    timer_msg.className = 'tiempo-msg-on'
    animacion_timer = setInterval(animacionTimer,1000)
    animacion_timer_ocultar = setTimeout(function(){
        clearTimeout(animacion_timer_ocultar)
        animacion_timer_ocultar = null
        //timer_msg.className = 'tiempo-msg-off'
        
        //time_btn.disabled = false
    },2000)
}
function animacionTimer(){
    segundos++
    time_txt.innerHTML = renderTime()
}

function renderTime(){
    var minutos = 0
    var horas = 0
    var seconds = 0

    var segundos_txt = ""
    var horas_txt = ""
    var minutos_txt = ""

    if(segundos<60){
        horas = 0
        minutos = 0
        seconds = segundos
    }else{
        minutos = parseInt(segundos/60)
        seconds = segundos-(minutos*60)

        if(minutos>=60){
            horas = parseInt(minutos/60)
            minutos = minutos-(horas*60)
        }
    }

    if(horas>=0&&horas<=9){
        horas_txt = "0"+horas
    }else{
        horas_txt = horas
    }
    if(minutos>=0&&minutos<=9){
        minutos_txt = "0"+minutos
    }else{
        minutos_txt = minutos
    }
    if(seconds>=0&&seconds<=9){
        segundos_txt = "0"+seconds
    }else{
        segundos_txt = seconds
    }

    return horas_txt+':'+minutos_txt+':'+segundos_txt
}

function stopTimer(){
    clearInterval(animacion_timer)
    animacion_timer = null
    //timer_msg.className = 'tiempo-msg-off'
}

function pauseTimer(){
    clearInterval(animacion_timer)
    animacion_timer = null
}
function resumeTimer(){
    animacion_timer = setInterval(animacionTimer,1000)
}