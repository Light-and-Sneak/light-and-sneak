function createMap(game){

    
	var arrayOfLights = [];
	
	arrayOfLights.push(new Light(game, 50,50, false, 2000, true, 5,0,0,100,0,10000,50));
	//arrayOfLights[0].on = false;
	arrayOfLights.push(new Light(game, 90,90,false,0,true,0,1,0,10000,5,100,10));
	console.log(arrayOfLights.length);
    
    return arrayOfLights;
};