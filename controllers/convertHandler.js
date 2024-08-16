function numberStringSplitter(input) {
  let number = input.match(/[.\d\/]+/g) || ['1']; //get digit and take "/" out; if none default to 1
  let string = input.match(/[a-zA-Z]+/g)[0]; //get string
  return [number[0], string];
}
function checkDiv(possibleFraction) {
  let nums = possibleFraction.split('/'); // convert to array
  if (nums.length > 2) { //if more than one "/"
    return false
  }
  return nums
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = numberStringSplitter(input)[0];
    let nums = checkDiv(result);
    if (!nums){
      return undefined
    }
    let nums1 = nums[0];
    let nums2 = nums[1] || 1; // if no "/" then default to 1
    result = parseFloat(nums1) / parseFloat(nums2); //calculate division
    if (isNaN(nums1) || isNaN(nums2)){return undefined};
    return result;
  };
  
  this.getUnit = function(input) {
    let result = numberStringSplitter(input)[1].toLowerCase();
    switch (result) { // check for all viable units
      case 'km': return 'km';
      case 'mi': return 'mi';
      case 'gal': return 'gal';
      case 'l': return 'L';
      case 'kg': return 'kg'; 
      case 'lbs': return 'lbs';
      default: return undefined;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let unit = initUnit.toLowerCase(); 
    switch (unit) { // return correct unit
        case 'km': return 'mi';
        case 'mi': return 'km';
        case 'gal': return 'L';
        case 'l': return 'gal';
        case 'kg': return 'lbs'; 
        case 'lbs': return 'kg';
        default: return undefined;
    }
    return result;
  };

  this.spellOutUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();
    switch (unit) { // convert to spelled-out units for string output
      case 'km': return 'kilometers';
      case 'mi': return 'miles';
      case 'gal': return 'gallons';
      case 'l': return 'liters';
      case 'kg': return 'kilograms';
      case 'lbs': return 'pounds';
      default: return undefined;
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    switch (unit) {
      case 'gal': result = initNum * galToL;
        break;
      case 'l': result = initNum / galToL;
        break;
      case 'lbs': result = initNum * lbsToKg;
        break;
      case 'kg': result = initNum / lbsToKg;
        break;
      case 'mi': result = initNum * miToKm;
        break;
      case 'km': result = initNum / miToKm;
        break;
    }
    return parseFloat(result.toFixed(5)); //convert result to float with 5 decimal places
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
