/*class Body{
    constructor(  x, y,mass,src){
        this.x = x;
        this.y =y;
        this.mass = mass;
        this.src = src;

        const image = new Image();
        image.src = this.src
        this.image =image;
    }

    move(x, y){
        this.x = x;
        this.y = y;
    }
}*/
class Body{
    constructor(  x, y ){
        this.x = x;
        this.y =y;

        this.bufferx = 0;
        this.buffery =0;

        this.campox = 0;
        this.campoy = 0;
        this.buffernum=0;

        this.mass = 0;

        this.charge = 0;
        this.raio=0;
        this.camporaio=0;

        this.status="";

        this.accx=0;
        this.accy=0;
        this.velx=0;
        this.vely=0;
        this.buffervelx=0;
        this.buffervely=0;
        this.forcex=0;
        this.forcey=0;
        this.src = "";

        
        this.image = new Image();
        this.campo = new Image();
    }

    img(src){
        
        const image = new Image();
        this.src= src;
        image.src = src
        this.image = image;
        this.image.rc=src;
        
        this.campo.src= "blueorbit.png"
        
    }

    move(x, y){
        this.x = x;
        this.y = y;
    }
}


class Universe{
    constructor(){

        this.kinetic_energy=0;

        this.width=0;
        this.height=0;
        const elements = new Array();
        this.elements = elements;
        this.gravitational_constant=Math.sqrt(n)*0.01;
        this.eletric_constant=Math.sqrt(n)*0.5;
        this.cforce=this.gravitational_constant;
        this.cd=1;
        this.cdd=1;
        this.cvel=1;
        this.size = 0;
    }

    begin(bodies, width, height){
        this.width=width;
        this.height=height;
        let partx = width/Math.sqrt(bodies);
        let party = height/Math.sqrt(bodies);
        let ii=0;
        for(let i = 0 ; i <  bodies ;i++){
            
            const ball = new Body( partx*Math.sqrt(i), height*Math.random());
            
            ball.velx = 5*(0.5 - Math.random());
            ball.vely = 5*(0.5 - Math.random());

            ball.mass = 35;
            ball.charge = 300*(0.5 - Math.random());
            ball.img("blueball.png");
            //ball.image.width *= ball.mass / 150;
            ball.camporaio = ((ball.campo.width /2)*Math.sqrt(ball.charge*ball.charge) + (ball.campo.width /2)*ball.mass )/150;
            ball.raio = (ball.image.width/2)*ball.mass/150;
            
            this.add(ball);
        }
    }

    end(){
        let n = this.elements.length;
        for(let  i =0; i < n ; i++){
            this.elements.pop();
        }
    }

    add( body ){

        this.elements.push(body);
    }

    live(){
        //this.forces();
        //this.accelation();
        
        this.velocity();
        //this.colision();
        this.position();
    }

    

    position(){
        this.kinetic_energy=0;
        for(let i = 0; i < this.elements.length ; i++){
        
            this.elements[i].campox =this.elements[i].x  - (this.elements[i].camporaio -this.elements[i].raio);
            this.elements[i].campoy =this.elements[i].y - (this.elements[i].camporaio -this.elements[i].raio);        
        
            this.elements[i].x+=this.elements[i].bufferx;
            this.elements[i].y+=this.elements[i].buffery;

            if(this.elements[i].x < 0 || this.elements[i].x > this.width) this.elements[i].velx *=-1;
            if(this.elements[i].y < 0 || this.elements[i].y > this.height) this.elements[i].vely *=-1; 
            
            this.elements[i].x+=this.elements[i].velx;
            this.elements[i].y+=this.elements[i].vely;

            this.kinetic_energy = this.kinetic_energy + (this.elements[i].mass/2)*((this.elements[i].velx*this.elements[i].velx) + (this.elements[i].vely*this.elements[i].vely) );

            this.elements[i].bufferx=0;
            this.elements[i].buffery=0;
            
        }
    }

    velocity(){
        for(let i = 0; i < this.elements.length ; i++){
            this.elements[i].velx += this.cvel*this.elements[i].accx;
            this.elements[i].vely += this.cvel*this.elements[i].accy;
            this.elements[i].buffervelx =this.elements[i].velx;
            this.elements[i].buffervely =this.elements[i].vely;
        }
    }

    accelation(){
        for(let i = 0; i < this.elements.length ; i++){
            this.elements[i].accx = (this.elements[i].forcex/ this.elements[i].mass);
            this.elements[i].accy = (this.elements[i].forcey/ this.elements[i].mass); 
        }
    }

    colision1(){
        
        for(let i = 0; i < this.elements.length ; i++){
            let dx=0;
            let dy=0;
            let ddx=0;
            let ddy=0;
            
            let oldivelx = this.elements[i].velx;
            let oldively = this.elements[i].vely;
            
            for(let j = 0; j < this.elements.length ; j++){
                if(i!=j){
                    let oldjvelx = this.elements[j].velx;
                    let oldjvely = this.elements[j].vely;

                    dx = (this.elements[i].x -  this.elements[j].x);
                    dy = (this.elements[i].y -  this.elements[j].y);

                    if(Math.sqrt(dx*dx  + dy*dy) <= ( this.elements[i].raio + this.elements[j].raio ) ){
                        this.elements[i].buffervelx = oldivelx*( (this.elements[i].mass - this.elements[j].mass)/(this.elements[i].mass + this.elements[j].mass) );
                        this.elements[i].buffervelx += oldjvelx*( (2*this.elements[j].mass)/(this.elements[i].mass + this.elements[j].mass) );
                        this.elements[i].buffervely = oldively*( (this.elements[i].mass - this.elements[j].mass)/(this.elements[i].mass + this.elements[j].mass) );
                        this.elements[i].buffervely += oldjvely*( (2*this.elements[j].mass)/(this.elements[i].mass + this.elements[j].mass) );
                    
                        this.elements[j].buffervelx = oldivelx*( (2*this.elements[i].mass)/(this.elements[i].mass + this.elements[j].mass) );
                        this.elements[j].buffervelx -= oldjvelx*( (this.elements[i].mass - this.elements[j].mass)/(this.elements[i].mass + this.elements[j].mass) );
                        this.elements[j].buffervely = oldively*( (2*this.elements[i].mass)/(this.elements[i].mass + this.elements[j].mass) );
                        this.elements[j].buffervely -= oldjvely*( (this.elements[i].mass - this.elements[j].mass)/(this.elements[i].mass + this.elements[j].mass) );

                        let dis = ( this.elements[i].raio + this.elements[j].raio );

                        this.elements[j].bufferx = (1/2)*Math.sqrt(dis)*((this.elements[j].buffervelx) / Math.sqrt(this.elements[j].buffervely*this.elements[j].buffervely + this.elements[j].buffervelx*this.elements[j].buffervelx));
                        this.elements[j].buffery = (1/2)*Math.sqrt(dis)*((this.elements[j].buffervely) / Math.sqrt(this.elements[j].buffervely*this.elements[j].buffervely + this.elements[j].buffervelx*this.elements[j].buffervelx));
                    }
                }
            }       
        }
        for(let i = 0; i < this.elements.length ; i++){
            this.elements[i].velx =this.elements[i].buffervelx;
            this.elements[i].vely =this.elements[i].buffervely;
        }
    }

    colision(){
        for(let i = 0; i < this.elements.length ; i++){        
            this.elements[i].buffervelx =this.elements[i].velx;
            this.elements[i].buffervely =this.elements[i].vely;
        }

        for(let i = 0; i < this.elements.length ; i++){
            let dx=0;
            let dy=0;
            let ddx=0;
            let ddy=0;
            
            let oldivelx = this.elements[i].velx;
            let oldively = this.elements[i].vely;
            
            for(let j = 0; j < this.elements.length ; j++){
                if(i!=j){
                    let oldjvelx = this.elements[j].velx;
                    let oldjvely = this.elements[j].vely;

                    dx = (this.elements[i].x -  this.elements[j].x);
                    dy = (this.elements[i].y -  this.elements[j].y);

                    if(Math.sqrt(dx*dx  + dy*dy) <= ( this.elements[i].raio + this.elements[j].raio ) ){
                        this.elements[i].buffervelx = oldivelx - ( (2*this.elements[j].mass / (this.elements[i].mass  + this.elements[j].mass))*( ( (oldivelx- oldjvelx)*dx + (oldively - oldjvely)*dy )*( dx )/( dx*dx + dy*dy ) ) );
                        this.elements[i].buffervely = oldively - ( (2*this.elements[j].mass / (this.elements[i].mass  + this.elements[j].mass))*( ( (oldivelx- oldjvelx)*dx + (oldively - oldjvely)*dy )*( dy )/( dx*dx + dy*dy ) ) );

                        this.elements[j].buffervelx = oldjvelx - ( (2*this.elements[i].mass / (this.elements[i].mass  + this.elements[j].mass))*( ( (-oldivelx+ oldjvelx)*-dx + (-oldively + oldjvely)*-dy )*( -dx )/( dx*dx + dy*dy ) ) );
                        this.elements[j].buffervely = oldjvely - ( (2*this.elements[i].mass / (this.elements[i].mass  + this.elements[j].mass))*( ( (-oldivelx+ oldjvelx)*-dx + (-oldively + oldjvely)*-dy )*( -dy )/( dx*dx + dy*dy ) ) );
                        
                        this.elements[i].bufferx = ( (this.elements[i].raio + this.elements[j].raio -  Math.sqrt(dx*dx  + dy*dy)))*((this.elements[i].buffervelx) / Math.sqrt(this.elements[i].buffervely*this.elements[i].buffervely + this.elements[i].buffervelx*this.elements[i].buffervelx));
                        this.elements[i].buffery = ( (this.elements[i].raio + this.elements[j].raio -  Math.sqrt(dx*dx  + dy*dy)))*((this.elements[i].buffervely) / Math.sqrt(this.elements[i].buffervely*this.elements[i].buffervely + this.elements[i].buffervelx*this.elements[i].buffervelx));
                        
                    }
                }
            }       
        }
        for(let i = 0; i < this.elements.length ; i++){
            this.elements[i].velx = this.elements[i].buffervelx;
            this.elements[i].vely = this.elements[i].buffervely;
            
        }
    }

    

    
    forces(){
        
        for(let i = 0; i < this.elements.length ; i++){
            let dx=0;
            let dy=0;
            let ddx=0;
            let ddy=0;
            
            this.elements[i].forcex=0;
            this.elements[i].forcey=0;

            for(let j = 0; j < this.elements.length ; j++){
                if(i!=j){
                    dx = (this.elements[i].x -  this.elements[j].x);
                    dy = (this.elements[i].y -  this.elements[j].y);
                
                    ddx = ((dx) / Math.sqrt( ( (dx*dx)  + (dy*dy) ) ));
                    ddy = ((dy) / Math.sqrt( ( (dx*dx)  + (dy*dy) ) ));

                    if(Math.sqrt(dx*dx  + dy*dy) > ( this.elements[i].raio + this.elements[j].raio )){
                        //Fg = -(M1M2) / r^2
                        this.elements[i].forcex = this.elements[i].forcex + (ddx)*(-1*(this.cforce*(this.elements[i].mass*this.elements[j].mass))/ (dx*dx + dy*dy));
                        this.elements[i].forcey = this.elements[i].forcey + (ddy)*(-1*(this.cforce*(this.elements[i].mass*this.elements[j].mass))/ (dx*dx + dy*dy));
                        
                        //Fe =  (Q1Q2) / r^2
                        this.elements[i].forcex = this.elements[i].forcex + (ddx)*((this.eletric_constant*(this.elements[i].charge*this.elements[j].charge))/ (dx*dx + dy*dy));
                        this.elements[i].forcey = this.elements[i].forcey + (ddy)*((this.eletric_constant*(this.elements[i].charge*this.elements[j].charge))/ (dx*dx + dy*dy));
                    }
                }
            }    
        }
    }


    print(){
        console.log("kinetic energy: ");
        console.log(parseInt(this.kinetic_energy));
    }

    getsize(){
        return this.elements.length;
    }
}
