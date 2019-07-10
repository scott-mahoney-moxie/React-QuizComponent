// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length){
        console.log('The chosen options contains different set of options than the correct set.');
        return false;
    }
    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        console.log('check for: ' + this[i]);
        console.log('indexOf Returned: '+ array.indexOf(this[i]));
        if (array.indexOf(this[i]) < 0 ){
            console.log(this[i] + ' was not found.');
            return false;          
        }
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

