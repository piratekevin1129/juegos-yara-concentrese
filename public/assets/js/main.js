var i = 0
var j = 0
var k = 0

function getRand(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

var game_width = 845
var game_height = 507


function setGame(){
    animarCartaEntrada()
}

var animacion_instrucciones = null
var instrucciones = document.getElementById('instrucciones')
function setInstrucciones(){
    instrucciones.className = 'instrucciones-on'
    /*startTimer()
    animacion_instrucciones = setTimeout(function(){
        clearTimeout(animacion_instrucciones)
        animacion_instrucciones = null
        instrucciones.className = 'instrucciones-off'
    },4000)*/
}

function clickInstrucciones(btn){
    btn.disabled = true
    instrucciones.className = 'instrucciones-on'
    
    animacion_instrucciones = setTimeout(function(){
        clearTimeout(animacion_instrucciones)
        animacion_instrucciones = null
        instrucciones.className = 'instrucciones-off'
        btn.disabled = false
    },4000)
}

var positions_cartas = []
function unorderPositions(){
    positions_cartas = new Array()
    function checkNum(n){
        var repe = false
        for(var r = 0;r<positions_cartas.length;r++){
            if(positions_cartas[r]==n){
                repe = true
            }
        }
        return repe
    }
    while(positions_cartas.length<total_cartas){
        var rand = getRand(0,(total_cartas-1))
        var check = checkNum(rand)
        while(check){
            rand = getRand(0,(total_cartas-1))
            check = checkNum(rand)
        }
        positions_cartas.push(rand)
    }
    console.log(positions_cartas)
}

var cartas = 6
var total_cartas = cartas*2
var cartas_cont = document.getElementById('cartas-cont')
var cards = []

function deleteCards(){
    for(i = (cards.length-1);i>=0;i--){
        cartas_cont.removeChild(cards[i])
    }
    cards = []
}

function setCartas(){
    unorderPositions()

    for(i = 0;i<cartas;i++){
        var u = i
        var card1 = document.createElement('div')
        card1.className = 'carta-cont carta-cont-reves carta-cont-off'
        card1.setAttribute('value',(u+1))
        var card_frente_1 = document.createElement('div')
        card_frente_1.className = 'carta-frente'
        card_frente_1.style.visibility = 'hidden'
        card_frente_1.style.backgroundImage = 'url(public/assets/cards/'+(u+1)+'.png)'
        var card_reverso_1 = document.createElement('div')
        card_reverso_1.className = 'carta-reves'
        card1.appendChild(card_frente_1)
        card1.appendChild(card_reverso_1)

        var card2 = document.createElement('div')
        card2.className = 'carta-cont carta-cont-reves carta-cont-off'
        card2.setAttribute('value',(u+1))
        var card_frente_2 = document.createElement('div')
        card_frente_2.className = 'carta-frente'
        card_frente_2.style.visibility = 'hidden'
        card_frente_2.style.backgroundImage = 'url(public/assets/cards/'+(u+1)+'.png)'
        var card_reverso_2 = document.createElement('div')
        card_reverso_2.className = 'carta-reves'
        card2.appendChild(card_frente_2)
        card2.appendChild(card_reverso_2)

        card1.setAttribute('onclick','clickCarta(this)')
        card2.setAttribute('onclick','clickCarta(this)')
        //card1.setAttribute('onmouseover','overCarta(this)')
        //card2.setAttribute('onmouseover','overCarta(this)')

        cards.push(card1)
        cards.push(card2)
    }

    for(i = 0;i<cards.length;i++){
        var u = positions_cartas[i]
        cartas_cont.appendChild(cards[u])
    }
}

var animacion_carta_entrada = null
function animarCartaEntrada(inst){
    entrada_mp3.currentTime = 0
    entrada_mp3.play()
    var carta_ind = 0
    animacion_carta_entrada = setInterval(function(){
        if(carta_ind==cards.length){
            clearInterval(animacion_carta_entrada)
            animacion_carta_entrada = null

            if(inst==null||inst==undefined){
                //setInstrucciones()
                startTimer()
            }
            animating = false
        }else{
            cards[carta_ind].classList.remove('carta-cont-off')
            cards[carta_ind].classList.add('carta-cont-on')
        }
        carta_ind++
    },100)
}

var animacion_carta_voltea = null
var animating = true

var carta_volteada_1 = null
var carta_volteada_1_div = null
var carta_volteada_2 = null
var carta_volteada_2_div = null

function overCarta(cartica){
    if(!animating){
        //var nuevo_audio = new Audio('public/assets/sonidos/over.mp3')
        //nuevo_audio.play()
    }
}

var animacion_esperar = null
function clickCarta(cartica){
    if(!animating){
        var clase_actual = cartica.className
        if(clase_actual.indexOf('carta-cont-reves')==-1){
            //esta de frente
            //alert("esta de frente")
        }else{
            //voltear
            over_mp3.currentTime = 0
            over_mp3.play()
            animating = true

            animarCartas([cartica],'frente',function(){
                if(carta_volteada_1==null){
                    carta_volteada_1 = cartica.getAttribute('value')
                    carta_volteada_1_div = cartica
                    animating = false
                }else{
                    carta_volteada_2 = cartica.getAttribute('value')
                    carta_volteada_2_div = cartica

                    if(carta_volteada_1==carta_volteada_2){
                        //console.log("son pareja")
                        animating = false
                        carta_volteada_1 = null
                        carta_volteada_1_div = null
                        carta_volteada_2 = null
                        carta_volteada_2_div = null

                        campana_mp3.currentTime = 0
                        campana_mp3.play()
                        comprobarJuego()
                    }else{
                        //console.log("no son pareja")
                        //Esperar un rato
                        animacion_esperar = setTimeout(function(){
                            clearTimeout(animacion_esperar)
                            animacion_esperar = null

                            animarCartas([carta_volteada_1_div,carta_volteada_2_div],'atras',function(){
                                carta_volteada_1 = null
                                carta_volteada_1_div = null
                                carta_volteada_2 = null
                                carta_volteada_2_div = null
                                
                                animating = false
                            })
                        },300)
                    }
                }
            })
        }
    }    
}

function animarCartas(cartas_arr,flag,callBack){
    var cartica_1 = null
    var carta_frente_1 = null
    var carta_atras_1 = null

    for(i = 0;i<cartas_arr.length;i++){
        cartica_1 = cartas_arr[i]
        carta_frente_1 = cartica_1.getElementsByClassName('carta-frente')[0]
        carta_atras_1 = cartica_1.getElementsByClassName('carta-reves')[0]

        if(flag=='atras'){
            cartica_1.classList.remove('carta-cont-frente')
            cartica_1.classList.add('carta-cont-reves')
        }else{
            cartica_1.classList.remove('carta-cont-reves')
            cartica_1.classList.add('carta-cont-frente')
        }

        carta_frente_1.style.transform = 'rotateY(90deg)'
        carta_frente_1.style.webkitTransform = 'rotateY(90deg)'
        carta_frente_1.style.oTransform = 'rotateY(90deg)'

        carta_atras_1.style.transform = 'rotateY(90deg)'
        carta_atras_1.style.webkitTransform = 'rotateY(90deg)'
        carta_atras_1.style.oTransform = 'rotateY(90deg)'
    }

    animacion_carta_voltea = setTimeout(function(){
        clearTimeout(animacion_carta_voltea)
        animacion_carta_voltea = null

        for(i = 0;i<cartas_arr.length;i++){
            cartica_1 = cartas_arr[i]
            carta_frente_1 = cartica_1.getElementsByClassName('carta-frente')[0]
            carta_atras_1 = cartica_1.getElementsByClassName('carta-reves')[0]

            if(flag=='atras'){
                carta_frente_1.style.visibility = 'hidden'
                carta_atras_1.style.visibility = 'visible'
                
                carta_frente_1.style.transform = 'rotateY(180deg)'
                carta_frente_1.style.webkitTransform = 'rotateY(180deg)'
                carta_frente_1.style.oTransform = 'rotateY(180deg)'
                
                carta_atras_1.style.transform = 'rotateY(180deg)'
                carta_atras_1.style.webkitTransform = 'rotateY(180deg)'
                carta_atras_1.style.oTransform = 'rotateY(180deg)'
            }else{
                carta_frente_1.style.visibility = 'visible'
                carta_atras_1.style.visibility = 'hidden'
                
                carta_frente_1.style.transform = 'rotateY(0deg)'
                carta_frente_1.style.webkitTransform = 'rotateY(0deg)'
                carta_frente_1.style.oTransform = 'rotateY(0deg)'
                
                carta_atras_1.style.transform = 'rotateY(0deg)'
                carta_atras_1.style.webkitTransform = 'rotateY(0deg)'
                carta_atras_1.style.oTransform = 'rotateY(0deg)'
            }
            
        }
        
        animacion_carta_voltea = setTimeout(function(){
            clearTimeout(animacion_carta_voltea)
            animacion_carta_voltea = null

            if(callBack!=null){
                callBack()
            }
            
        },100)
    },100)

    
}

function clickReorganizar(){
    if(gano_juego){
        //window.location.reload(true)
        //location.href = window.location
        //location.reload() 
    }else{
        var carta_ind = 0
        encontradas = 0
        animating = true
        animacion_carta_entrada = setInterval(function(){
            if(carta_ind==cards.length){
                clearInterval(animacion_carta_entrada)
                animacion_carta_entrada = null

                deleteCards()
                setCartas()

                animarCartaEntrada(false)
            }else{
                cards[carta_ind].classList.remove('carta-cont-on')
                cards[carta_ind].classList.add('carta-cont-off')
            }
            carta_ind++
        },100)
    }
    
}

var encontradas = 0

function comprobarJuego(){
    encontradas++
    if(encontradas==cartas){
        ganoJuego()
    }
}

var gano_juego = false
function ganoJuego(){
    guardarScorm(true)
    ganar_mp3.currentTime = 0
    ganar_mp3.play()
    gano_juego = true
    stopTimer()
    
    clearTimeout(animacion_instrucciones)
    animacion_instrucciones = null
    instrucciones.className = 'instrucciones-off'
    document.getElementById('help-btn').disabled = false

    animacion_instrucciones = setTimeout(function(){
        clearTimeout(animacion_instrucciones)
        animacion_instrucciones = null
        
        instrucciones.innerHTML = '<p>Muy Bien! Tu tiempo es de '+renderTime()+'</p>'
        instrucciones.className = 'instrucciones-on'
    },500)
}