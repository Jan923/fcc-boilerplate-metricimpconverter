const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  after(function() {
    chai.request(server)
      .get('/api')
    });
  
  test('Whole number input', function(){
    let input = '32L';
    assert.equal(convertHandler.getNum(input), 32);
  })
  test('Decimal number input', function(){
    let input = '3.2L';
    assert.equal(convertHandler.getNum(input), 3.2);
  })
  test('Fractional input', function(){
    let input = '1/2L';
    assert.equal(convertHandler.getNum(input), 0.5);
  })
  test('Fractional input with a decimal', function(){
    let input = '1.5/2L';
    assert.equal(convertHandler.getNum(input), 0.75);
  })
  test('Double fraction input', function(){
    let input = '3/2/3L';
    assert.equal(convertHandler.getNum(input), undefined);
  })
  test('Default to a numerical input of 1 when no numerical input is provided', function(){
    let input = 'L';
    assert.equal(convertHandler.getNum(input), '1');
  })
  test('Read each valid input unit', function(){
    let input = ['L', 'l', 'gal', 'GAL', 'mi', 'MI', 'km', 'KM', 'lbs', 'LBS', 'kg', 'KG'];
    let output = ['L', 'L', 'gal', 'gal', 'mi', 'mi', 'km', 'km', 'lbs', 'lbs', 'kg', 'kg'];
    input.forEach((el, i) => assert.equal(convertHandler.getUnit(el), output[i]));
  })
  test('Return an error for an invalid input unit', function(){
    let input = '32g';
    assert.equal(convertHandler.getUnit(input), undefined);
  })
  test('Return the correct return unit for each valid input unit', function(){
    let input = ['l', 'gal', 'mi', 'km', 'lbs', 'kg'];
    let output = ['gal', 'L', 'km', 'mi', 'kg', 'lbs'];
    input.forEach((el, i) => assert.equal(convertHandler.getReturnUnit(el), output[i]));
  })
  test('Return the spelled-out string unit for each valid input unit', function(){
    let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    let output = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
    input.forEach((el, i) => assert.equal(convertHandler.spellOutUnit(el), output[i]));
  })

  test("Converting gal to L", () => {
    assert.strictEqual(
      convertHandler.convert(2, "gal"),
      7.57082,
      "Correctly convert 2gal to 7.57082L"
    );
  });
  test("Converting L to gal", () => {
    assert.strictEqual(
      convertHandler.convert(2, "L"),
      0.52834,
      "Correctly convert 2L to 0.52834gal"
    );
  });
  test("Converting mi to km", () => {
    assert.strictEqual(
      convertHandler.convert(2, "mi"),
      3.21868,
      "Correctly convert 2mi to 3.21868km"
    );
  });
  test("Converting km to mi", () => {
    assert.strictEqual(
      convertHandler.convert(2, "km"),
      1.24275,
      "Correctly convert 2km to 1.24275mi"
    );
  });
  test("Converting lbs to kg", () => {
    assert.strictEqual(
      convertHandler.convert(2, "lbs"),
      0.90718,
      "Correctly convert 2lbs to 0.90718kg"
    );
  });
  test("Converting kg to lbs", () => {
    assert.strictEqual(
      convertHandler.convert(2, "kg"),
      4.40925,
      "Correctly convert 2kg to 4.40925lbs"
    );
  });
  
});