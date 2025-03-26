const N = 20;
const WIDTH = 800;
const HEIGHT = 600;

let tokens = [];

function getRandomInt(min, max){
    return min + (max-min+1)*Math.random();
}

function getRadiusFromArea(area){
    return Math.sqrt(area/Math.PI);
}