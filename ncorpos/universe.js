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
    constructor(  x, y,mass,src,height,width){
        this.x = x;
        this.y =y;
        this.mass = mass;
        this.accx=0;
        this.accy=0;
        this.velx=0;
        this.vely=0;
        this.forcex=0;
        this.forcey=0;
        this.src = src;

        const image = new Image();
        image.src = this.src
        this.image =image;
    }

    move(x, y){
        this.x = x;
        this.y = y;
    }
}


class Universe{
    constructor(){
        const elements = new Array();
        this.elements = elements;
        this.cforce=0.0005;
        this.cd=1;
        this.cdd=1;
        this.cvel=1;
        this.size = 0;
    }

    begin(bodies, width, height){
        for(let i = 0 ; i <  bodies ;i++){
            const ball = new Body(width*Math.random(), height*Math.random(), 50*Math.random()+100 , "ball.png");
            //ball.velx = ccc*(Math.random() - 0.5); 
            //ball.vely = ccc*(Math.random() - 0.5); 
            /*ball.velx=height*0.000001*(Math.random() - 0.5);
            ball.vely=height*0.000001*(Math.random() - 0.5);
            ball.accx=height*0.00000001*(Math.random() - 0.5);
            ball.accy=height*0.00000001*(Math.random() - 0.5);*/
            this.add(ball);
        }   
        //const sun = new Body(width*0.5, height*0.5, 3000   , "ball.png");
            /*ball.velx=height*0.000001*(Math.random() - 0.5);
            ball.vely=height*0.000001*(Math.random() - 0.5);
            ball.accx=height*0.00000001*(Math.random() - 0.5);
            ball.accy=height*0.00000001*(Math.random() - 0.5);*/
            //this.add(sun);

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

    live1(){
        for(let i = 0 ; i < this.elements.length ; i++){
            this.elements[i].x += 10*(Math.random() - 0.5);
            this.elements[i].y += 10*(Math.random() - 0.5);
            /*this.elements[i].x =(this.elements[i].x*(dirx/(Math.sqrt( dirx*dirx + diry*diry ))));
            this.elements[i].y =(this.elements[i].x*(diry/(Math.sqrt( dirx*dirx + diry*diry ))));*/
        }
    }

    live2(){
        for(let i = 0 ; i < this.elements.length ; i++){
            let dirx;
            let diry;
            for(let j = 0 ; j < this.elements.length ; j++){
                if(j!=i){
                    dirx+= (this.elements[i].x -this.elements[j].x);
                    diry+= (this.elements[i].y -this.elements[j].y);
                }
            }
            
            let radix = dirx*dirx;
            radix += diry*diry;
            
            dirx = Math.sqrt(radix);
            diry = Math.sqrt(radix);

            this.elements[i].x += dirx;
            this.elements[i].y += diry;

            /*this.elements[i].x =(this.elements[i].x*(dirx/(Math.sqrt( dirx*dirx + diry*diry ))));
            this.elements[i].y =(this.elements[i].x*(diry/(Math.sqrt( dirx*dirx + diry*diry ))));*/
        }
    }

    live3(){
        for(let i = 0 ; i < this.elements.length ; i++){
            let dx=0;
            let dy=0;
            for(let j = 0 ; j < this.elements.length ; j++){
                if(j!=i){
                    dx += this.elements[j].mass*(this.elements[i].x - this.elements[j].x);
                    dy += this.elements[j].mass*(this.elements[i].y - this.elements[j].y);
                }
            }

            this.elements[i].x -= ((dx) / Math.sqrt( ( (dx*dx)  + (dy*dy) ) ));
            this.elements[i].y -= ((dy) / Math.sqrt( ( (dx*dx)  + (dy*dy) ) ));


            /*this.elements[i].x =(this.elements[i].x*(dirx/(Math.sqrt( dirx*dirx + diry*diry ))));
            this.elements[i].y =(this.elements[i].x*(diry/(Math.sqrt( dirx*dirx + diry*diry ))));*/
        }
    }



    live4(){
        let c = 0.1;
        for(let i = 0 ; i < this.elements.length ; i++){
            let dx=0;
            let dy=0;
            for(let j = 0 ; j < this.elements.length ; j++){
                if(j!=i){
                    dx += this.elements[j].mass*(this.elements[i].x - this.elements[j].x);
                    dy += (this.elements[i].y - this.elements[j].y);
                    let rdx = ((dx) / Math.sqrt( ( (dx*dx)  + (dy*dy) ) ));
                    let rdy = ((dy) / Math.sqrt( ( (dx*dx)  + (dy*dy) ) ));
                    this.elements[i].x -= c*this.elements[j].mass*this.elements[i].mass*rdx;
                    this.elements[i].y -= c*this.elements[j].mass*this.elements[i].mass*rdy;
                }
            }

           


            /*this.elements[i].x =(this.elements[i].x*(dirx/(Math.sqrt( dirx*dirx + diry*diry ))));
            this.elements[i].y =(this.elements[i].x*(diry/(Math.sqrt( dirx*dirx + diry*diry ))));*/
        }
    }


    live(){
        this.accelation();
        this.velocity();
        this.position();
    }

    position(){
        for(let i = 0; i < this.elements.length ; i++){
            this.elements[i].x+=this.elements[i].velx;
            this.elements[i].y+=this.elements[i].vely;
        }
    }

    velocity(){
        for(let i = 0; i < this.elements.length ; i++){
            this.elements[i].velx += this.cvel*this.elements[i].accx;
            this.elements[i].vely += this.cvel*this.elements[i].accy;
        }
    }

    accelation1(){
        //Fg =a*m (M1M2)/ r^2
        for(let i = 0; i < this.elements.length ; i++){
            let dx=0;
            let dy=0;
            let ddx=0;
            let ddy=0;
            let force=0;
            this.elements[i].accx = 0;
            this.elements[i].accy = 0;
            for(let j = 0; j < this.elements.length ; j++){
                if(i!=j){
                    dx += this.cd*(this.elements[i].x -  this.elements[j].x);
                    dy += this.cd*(this.elements[i].y -  this.elements[j].y);
                
                    ddx = ((dx) / Math.sqrt( ( (dx*dx)  + (dy*dy) ) ));
                    ddy = ((dy) / Math.sqrt( ( (dx*dx)  + (dy*dy) ) ));
                    
                    force = force + (-1*(this.cforce*(this.elements[i].mass*this.elements[j].mass))/( (dx*dx)  + (dy*dy) ));

                }
            }

            if(Math.sqrt(dx*dx) >= this.cdd  && Math.sqrt(dy*dy) >= this.cdd){
                this.elements[i].accx += (force*ddx/this.elements[i].mass);
                this.elements[i].accy += (force*ddy/this.elements[i].mass);    
            }
        }
    }

    accelation(){
        //Fg =a*m (M1M2)/ r^2
        for(let i = 0; i < this.elements.length ; i++){
            let dx=0;
            let dy=0;
            let ddx=0;
            let ddy=0;
            
            this.elements[i].forcex=0;
            this.elements[i].forcey=0;
            this.elements[i].accx = 0;
            this.elements[i].accy = 0;

            for(let j = 0; j < this.elements.length ; j++){
                if(i!=j){
                    dx = this.cd*(this.elements[i].x -  this.elements[j].x);
                    dy = this.cd*(this.elements[i].y -  this.elements[j].y);
                
                    ddx = ((dx) / Math.sqrt( ( (dx*dx)  + (dy*dy) ) ));
                    ddy = ((dy) / Math.sqrt( ( (dx*dx)  + (dy*dy) ) ));

                    if(Math.sqrt(dx*dx) >= this.cdd  && Math.sqrt(dy*dy) >= this.cdd){
                        this.elements[i].forcex = this.elements[i].forcex + (ddx)*(-1*(this.cforce*(this.elements[i].mass*this.elements[j].mass))/ (dx*dx + dy*dy));
                        this.elements[i].forcey = this.elements[i].forcey + (ddy)*(-1*(this.cforce*(this.elements[i].mass*this.elements[j].mass))/ (dx*dx + dy*dy));                    
                    }

                    
                }
            }

            this.elements[i].accx = (this.elements[i].forcex/ this.elements[i].mass);
            this.elements[i].accy = (this.elements[i].forcey/ this.elements[i].mass);    
            
        }
    }


    print(){
        for(let i = 0 ; i < this.elements.length ; i++){
            console.log(this.elements[i].velx);
        }
    }

    getsize(){
        return this.elements.length;
    }
}
