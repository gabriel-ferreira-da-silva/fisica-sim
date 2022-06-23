const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width= 3400;
canvas.height= 2400;
let rs = 0.6;
let n  = 40;
let ccc = 0.1 ;
let time = 0;                                   
let limite = 0.5;


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
        ctx.fillStyle='rgba(0,0,0,  0.077)';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle='#ffffff';
        for(let i = 0; i < universe.elements.length ; i++ ){
            ctx.drawImage(universe.elements[i].image,universe.elements[i].x - ( universe.elements[i].mass*rs)/2 ,universe.elements[i].y - ( universe.elements[i].mass*rs)/2,( universe.elements[i].mass)*rs,(universe.elements[i].mass)*rs );
            universe.live();
        }
        console.clear();
        universe.print();
        time+=0.0001;
        if(time > limite){
            time=0;
            universe.end();
            universe.begin(n, canvas.width, canvas.height);
        }
        requestAnimationFrame(animate);
    }
}        

function start(){
    startAnimating(25);    
}

start();
