class RPNCalculator {
    constructor() {
        this.operators = {
            '+': this.add.bind(this),
            '-': this.subtract.bind(this),
            '*': this.multiply.bind(this),
            '/': this.divide.bind(this)
        };
    }

    evaluate(expression) {
        if (typeof expression !== 'string') {
            throw new Error('A expressão deve ser uma string.');
        }

        const tokens = expression.trim().split(/\s+/);
        const stack = [];

        for (let token of tokens) {
            if (this.isNumber(token)) {
                stack.push(parseFloat(token));
            } else if (this.isOperator(token)) {
                if (stack.length < 2) {
                    throw new Error('Expressão inválida.');
                }
                const b = stack.pop();
                const a = stack.pop();
                const result = this.performOperation(token, a, b);
                stack.push(result);
            } else {
                throw new Error(`Token inválido: ${token}`);
            }
        }

        if (stack.length !== 1) {
            throw new Error('Expressão inválida.');
        }

        return stack.pop();
    }

    isNumber(token) {
        return !isNaN(token);
    }

    isOperator(token) {
        return token in this.operators;
    }

    performOperation(operator, a, b) {
        const operation = this.operators[operator];
        if (operation) {
            return operation(a, b);
        }
        throw new Error(`Operador desconhecido: ${operator}`);
    }

    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        if (b === 0) {
            throw new Error('Erro: Divisão por zero.');
        }
        return a / b;
    }
}

// Manipula��o da Interface
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new RPNCalculator();
    const calculateButton = document.getElementById('calculate');
    const expressionInput = document.getElementById('expression');
    const resultDiv = document.getElementById('result');

    calculateButton.addEventListener('click', () => {
        const expression = expressionInput.value;
        try {
            const result = calculator.evaluate(expression);
            resultDiv.textContent = `Resultado: ${result}`;
            resultDiv.classList.remove('error');
            resultDiv.classList.add('success');
        } catch (error) {
            resultDiv.textContent = error.message;
            resultDiv.classList.remove('success');
            resultDiv.classList.add('error');
        }
    });

    // Opcional: Permitir calcular pressionando Enter
    expressionInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            calculateButton.click();
        }
    });
});
