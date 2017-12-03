//seeker.js

function Seeker(game, width, height, animSpeed, sprite){
    seeker = new Player(game, width, height, animSpeed, sprite); 
    seeker.SPEED = 90;
    seeker.ANIM_SPEED = 5;

    return seeker;
}