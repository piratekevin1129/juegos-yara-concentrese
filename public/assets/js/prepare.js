var ismobile = false
var actual_dimension = 1

function prepareWindow(){
    ismobile = isMobileDevice()
    
    console.log("ismobile: "+ismobile)
    if(window.innerWidth>=845){
        //actual_dimension = 1

        window.top.postMessage({'completado': false, 'alto': game_height}, '*' );
    }else if(window.innerWidth>=710&&window.innerWidth<845){
        //actual_dimension = 2
        
        window.top.postMessage({'completado': false, 'alto': game_height}, '*' );
    }else if(window.innerWidth>=530&&window.innerWidth<710){
        //actual_dimension = 3
        
        window.top.postMessage({'completado': false, 'alto': game_height}, '*' );
    }else{
        //actual_dimension = 4
        ismobile = true
        game_width = window.innerWidth
        game_height = 900
        
        window.top.postMessage({'completado': false, 'alto': game_height}, '*' );
    }

}


function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};