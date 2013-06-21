// testing git
(function () {

    Calculator = function (gui) {
        this.number1 = null;
        this.number2 = null;
        this.operator = null;
    };

    Calculator.prototype = {
         equal: function (value, value2, operator) {
            var result;     
           
            console.log(value, value2, operator);
            console.log(this.number1, this.operator);
                
            switch (this.operator) {
                case '+':
                    result = value + value2;
                    break;
                case '-':
                    result = value - value2;
                    break;
                case '/':
                    result = value / value2;
                    break;
                case '*':
                    result = value * value2;
                    break;
            }

            console.log(result);
            return result;
        },

        backspace: function (value) {
            var result;         
            value.length > 1 ? result = value.slice(0, -1) : result = 0;
            return result;
        },

        reset: function () {
            return 0;
        }
    };

    /**
      * Calculator GUI starts here
      * 
      */

    CalculatorGUI = function (el) {
        
        this.calc = new Calculator(this);
        that = this;
        that.number1 = 0;
        that.display = el.find('.display').find('input');
        that.init(el);

        /*that.setNumeros = function(e) {numeros += e}
        that.getNumberos = function () { return numeros; };*/
    };

    CalculatorGUI.prototype = {
        findElement: function (value, element) {
            var result = false;
            for (key in value) {
                if (value[key] === element)
                    result = true;
            }           
            return result;
        },

        setDecimalPoint: function (value, screenValue) {
            var result;
            if (screenValue === '0')
                result = screenValue + value;
            else 
                that.findElement(screenValue, '.') === false ? result = that.createNumber(value, screenValue) : result = screenValue;
                
            return result;
        },
       
        createNumber: function (value, screenValue) {
            var result;
            screenValue === '0' ? result = value : result = screenValue + value;
            return result;
        },

        setNumber: function (value) {
            var numeros = ['hola', 'hello', 'salut'];
            for ( var i = 0; i < numeros.length; i = i + 1 ) 
                if (numeros[i].length === 0)
                    numeros[i] = value;         
        },

        setDisplay: function (result) {             
            that.display.val(result);
        },

        init: function (el) {
            var self = this;

            el.find('.numbers').on('click', 'button', function () {
                var number1;

                this.calc

                self.calc.number1 = this.value === '.' ? self.setDecimalPoint(this.value, self.display.val()) : self.createNumber(this.value, self.display.val());
                self.setDisplay(self.calc.number1);
            });

            el.find('.operators').on('click', 'button', function () {
                var operand = parseFloat(self.display.val());

                if (typeof parseFloat(self.display.val()) === 'number') {
                    self.calc.operator = this.value;
                    that.number1 = operand;                   
                    self.setDisplay(''); 
                } else {
                    self.setDisplay('-E-');
                }              
            });
            el.find('.edit').on('click', 'button', function () {
                if (this.value === 'clear')
                    self.setDisplay(self.calc.reset());
                else                    
                    self.setDisplay(self.calc.backspace(that.display.val()));
            });
            el.find('.equals').on('click', 'button', function () {                
                if (typeof parseFloat(self.display.val()) === 'number') {
                    var number2 = self.calc.number2;
                    number2 = parseFloat(self.display.val());
                    self.setDisplay(self.calc.equal(that.number1, number2, self.calc.operator));
                } else {}
                    
            });
            
        }
    }

}());

$(document).ready(function () {
    var $el = $('#calculator'),
        calculator = new CalculatorGUI($el);
});