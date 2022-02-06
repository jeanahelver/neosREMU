'use-strict'
const PRIVATE = '_' + process.hrtime().join('.');
class Interface {
    constructor() {
        let _that = this[PRIVATE] = {
            __proto__: Interface._prototype,
            LastPacked: "",
            currentFrame: 0,
        };
        _that[PRIVATE] = _that;
    }
    GetCurrentFrame(){
        return this[PRIVATE].currentFrame;
    }
    ColorToHex(R,G,B){
        return R.toString(16) +G.toString(16) +B.toString(16);
    }
    DrawScreenRawRGB(screenData,colorAmount){
        let response = "";
        let data = null;
        let _that = this[PRIVATE];
        let colors = {};
        for(let x = 0; x < screenData.length/3; x++) {
            if(!colors[this.ColorToHex(screenData[x*3],screenData[x*3+1],screenData[x*3+2])]){
                colors[this.ColorToHex(screenData[x*3],screenData[x*3+1],screenData[x*3+2])] = 0;
            }else{
                colors[this.ColorToHex(screenData[x*3],screenData[x*3+1],screenData[x*3+2])]++;
            }
        }
        for (const [key, value] of Object.entries(colors)) {
            console.log(key, value);
        }
        //encode screen pixels to string
        for(let x = 0; x < screenData.length/3; x++) {
            let r = screen[x*3];
        }

        //encode repeating pixels into special characters
        let arr = [256,128,64,32,16,8,4,2,1];
        let startingPoint = 127;
        for(let lec = startingPoint; lec< colorAmount; lec++){
        for(let i = startingPoint; i< arr.length; i++){
          response = response.replace(new RegExp(String.fromCharCode(0).repeat(arr[i]), 'g'), () => String.fromCharCode(i));
        }
    }
            //calculate start/end of changed data
      if(_that.LastPacked != response){ //less data send
        let start = -1;
        let end = -1;
        for(let i = 0;i < _that.LastPacked.length;i++){
          if(response.charAt(i) != _that.LastPacked.charAt(i)){
              start = i;
              break;
          }
        }
        for(let i = Math.max(_that.LastPacked.length,response.length) - 1; i >= 0; i--){
          if(response.charAt(i) != _that.LastPacked.charAt(i)){
              end = i;
              break;
          }
        }
        data = String.fromCharCode(start + 3) + String.fromCharCode(end + 3) + response.substring(start,end + 1);
        _that.LastPacked = response
      }
        _that.currentFrame++;
        return data;
    };
    DrawScreenRawRGBA(screenData,colorAmount){
        for(let a = screenData.length/4; 0 <= a;a--){
            screenData.splice(a*4, 1);
        }
        return this.DrawScreenRawRGB(screenData,colorAmount);
    }
}
module.exports = Interface;