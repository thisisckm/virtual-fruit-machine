const assert = require('assert');
const Rules = require('../src/rules')

describe("Business Logic", () => {
      
  describe( "Test isJackpot", () => {  
    it("Is returning true when the input ['A', 'A', 'A', 'A]", () => {
      input = ['A', 'A', 'A', 'A'];
      const rules = new Rules();
      var actual = rules.isJackpot(input);
      var expected = true;
      assert.equal(actual, expected);
    });

    it("Is returning false when the input ['A', 'B', 'A', 'A]", () => {
        input = ['A', 'B', 'A', 'A'];
        const rules = new Rules();
        var actual = rules.isJackpot(input);
        var expected = false;
        assert.equal(actual, expected);
      });
  });

  describe( "Test isLucky", () => {  
    it("Is returning true when the input ['A', 'B', 'C', 'D]", () => {
      input = ['A', 'B', 'C', 'D'];
      const rules = new Rules();
      var actual = rules.isLucky(input);
      var expected = true;
      assert.equal(actual, expected);
    });
  });

  describe( "Test isLucky", () => {  
    it("Is returning false when the input ['A', 'B', 'A', 'D]", () => {
      input = ['A', 'B', 'A', 'D'];
      const rules = new Rules();
      var actual = rules.isLucky(input);
      var expected = false;
      assert.equal(actual, expected);
    });
  });

  describe( "Test isKeepTheChange", () => {  
    it("Is returning true when the input ['A', 'A', 'C', 'D]", () => {
      input = ['A', 'A', 'C', 'D'];
      const rules = new Rules();
      var actual = rules.isKeepTheChange(input);
      var expected = true;
      assert.equal(actual, expected);
    });
  });

  describe( "Test isKeepTheChange", () => {  
    it("Is returning true when the input ['A', 'C', 'A', 'A]", () => {
      input = ['A', 'C', 'A', 'A'];
      const rules = new Rules();
      var actual = rules.isKeepTheChange(input);
      var expected = true;
      assert.equal(actual, expected);
    });
  });

  describe( "Test isKeepTheChange", () => {  
    it("Is returning false when the input ['A', 'C', 'D', 'A]", () => {
      input = ['A', 'C', 'D', 'A'];
      const rules = new Rules();
      var actual = rules.isKeepTheChange(input);
      var expected = false;
      assert.equal(actual, expected);
    });
  });
});