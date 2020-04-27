function loadImage(data){
    var img = new Image()
    img.onload = function(){
        img.onerror = null
        img.onload = null
        data.callBack()
    }
    img.onerror = function(){
        console.log("error cargando la imagen "+img.url)
        img.onerror = null
        img.onload = null
        data.callBack()
    }
    img.src = data.url
}
/////////////////////////////AUDIO/////////////////////////
function loadAudio(data){
    var url = data.src

    var audio_fx = null
    audio_fx = document.createElement('audio')
    audio_fx.setAttribute('src',url)
    audio_fx.load()
    audio_fx.addEventListener('loadeddata',function(){
        //alert("cargo")
        data.callBack(audio_fx)
    })
    audio_fx.addEventListener('error',function(){
        data.callBack(null)
    })
}

var cargador = document.getElementById('cargador')
var cargador_icon_bar = document.getElementById('cargador-icon-bar')
var cargador_txt = document.getElementById('cargador-txt')

function setCargadorPercent(p){
    cargador_icon_bar.style.top = (100-p)+'%'
    cargador_icon_bar.style.height = p+'%'
    cargador_txt.innerHTML = 'Cargando '+p+'%'
}

var animation_cargador = null
function unsetCargador(data){
    cargador.className = 'cargador-off'
    animation_cargador = setTimeout(function(){
        clearTimeout(animation_cargador)
        animation_cargador = null
        data.callBack()
    },50)
    
}