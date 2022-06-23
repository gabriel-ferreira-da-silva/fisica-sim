const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width= 4525;
canvas.height= 2525;
let rs = 1;
let n  = 50;
let ccc = 0.1 ;
let time = 0;                                   
let limite = 0.03;


const universe = new Universe();

universe.begin(n, canvas.width, canvas.height);


function startAnimating(fps){
    
    fpsInterval=1000/fps;
    then= Date.now();
    startTime=then;
    animate();

}


function animate(){
    //track.play();
    requestAnimationFrame(animate);
    now =Date.now();
    elapsed=now-then;
  
    if(elapsed> fpsInterval){
        then=now-(elapsed%fpsInterval);
        ctx.fillStyle='rgba(0,0,0,  1)';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle='#ffffff';
        
        for(let i = 0; i < universe.elements.length ; i++ ){
            ctx.drawImage(universe.elements[i].campo, universe.elements[i].campox , universe.elements[i].campoy,2*universe.elements[i].camporaio,2*universe.elements[i].camporaio);
        }
        
    
        for(let i = 0; i < universe.elements.length ; i++ ){
            
            ctx.drawImage(universe.elements[i].image, universe.elements[i].x , universe.elements[i].y,2*universe.elements[i].raio,2*universe.elements[i].raio);//,universe.elements[i].image.width,universe.elements[i].image.width);//, universe.elements[i].image.width*2*universe.elements[i].raio, universe.elements[i].image.width*2*universe.elements[i].raio);///*);*/, universe.elements[i].image.width*universe.elements[i].raio,universe.elements[i].image.width*universe.elements[i].raio); //, ( universe.elements[i].raio),(universe.elements[i].raio));
            
            universe.live();
        }

        universe.print();
        /*
        time+=0.0001;
        if(time > limite){
            time=0;
            let num = n;
            universe.end();
            universe.begin(num, canvas.width, canvas.height);
        }*/
        
        requestAnimationFrame(animate);
    }
}        

function start(){
    startAnimating(25);    
}

start();
