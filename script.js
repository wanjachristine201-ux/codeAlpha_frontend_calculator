/* ============================================
   MODERN CALCULATOR JAVASCRIPT
   Professional Modular Implementation
   ============================================ */

// ============================================
// CALCULATOR STATE MANAGEMENT
// ============================================
const CalculatorState = {
    currentValue: '0',
    previousValue: '',
    operation: null,
    shouldResetDisplay: false,
    memory: 0,
    history: [],
    isScientificMode: false,
    isDarkMode: false,
    isHistoryVisible: false
};

// ============================================
// DOM ELEMENT REFERENCES
// ============================================
const DOMElements = {
    mainDisplay: document.getElementById('mainDisplay'),
    expressionDisplay: document.getElementById('expressionDisplay'),
    memoryIndicator: document.getElementById('memoryIndicator'),
    historyPanel: document.getElementById('historyPanel'),
    historyList: document.getElementById('historyList'),
    historyToggle: document.getElementById('historyToggle'),
    clearHistory: document.getElementById('clearHistory'),
    themeToggle: document.getElementById('themeToggle'),
    scientificToggle: document.getElementById('scientificToggle'),
    scientificFunctions: document.getElementById('scientificFunctions'),
    buttons: document.querySelectorAll('.btn')
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format number for display
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
function formatNumber(num) {
    if (num === 0) return '0';
    
    const maxDigits = 12;
    const str = num.toString();
    
    if (str.length <= maxDigits) {
        return str;
    }
    
    // Use scientific notation for very large/small numbers
    if (Math.abs(num) > 1e12 || (Math.abs(num) < 1e-6 && num !== 0)) {
        return num.toExponential(6);
    }
    
    // Round to fit display
    const rounded = parseFloat(num.toPrecision(maxDigits));
    return rounded.toString();
}

/**
 * Parse display string to number
 * @param {string} str - String to parse
 * @returns {number} Parsed number
 */
function parseNumber(str) {
    return parseFloat(str) || 0;
}

/**
 * Check if string is a valid number
 * @param {string} str - String to validate
 * @returns {boolean} True if valid number
 */
function isValidNumber(str) {
    return !isNaN(parseFloat(str)) && isFinite(str);
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// DISPLAY FUNCTIONS
// ============================================

/**
 * Update the main display
 * @param {string} value - Value to display
 */
function updateDisplay(value) {
    DOMElements.mainDisplay.textContent = value;
    DOMElements.mainDisplay.classList.remove('animate');
    
    // Trigger animation
    void DOMElements.mainDisplay.offsetWidth;
    DOMElements.mainDisplay.classList.add('animate');
}

/**
 * Update the expression display
 * @param {string} expression - Expression to display
 */
function updateExpression(expression) {
    DOMElements.expressionDisplay.textContent = expression;
}

/**
 * Update memory indicator
 */
function updateMemoryIndicator() {
    if (CalculatorState.memory !== 0) {
        DOMElements.memoryIndicator.textContent = 'M';
        DOMElements.memoryIndicator.classList.add('active');
    } else {
        DOMElements.memoryIndicator.textContent = '';
        DOMElements.memoryIndicator.classList.remove('active');
    }
}

/**
 * Clear display
 */
function clearDisplay() {
    CalculatorState.currentValue = '0';
    CalculatorState.previousValue = '';
    CalculatorState.operation = null;
    CalculatorState.shouldResetDisplay = false;
    updateDisplay('0');
    updateExpression('');
}

/**
 * Clear current entry
 */
function clearEntry() {
    CalculatorState.currentValue = '0';
    CalculatorState.shouldResetDisplay = false;
    updateDisplay('0');
}

// ============================================
// CALCULATION FUNCTIONS
// ============================================

/**
 * Perform calculation based on operation
 * @param {string} operation - Operation to perform
 * @param {number} a - First operand
 * @param {number} b - Second operand
 * @returns {number} Result of calculation
 */
function calculate(operation, a, b) {
    switch (operation) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            if (b === 0) {
                throw new Error('Division by zero');
            }
            return a / b;
        case 'power':
            return Math.pow(a, b);
        default:
            return b;
    }
}

/**
 * Perform scientific calculation
 * @param {string} operation - Scientific operation
 * @param {number} value - Input value
 * @returns {number} Result of calculation
 */
function calculateScientific(operation, value) {
    switch (operation) {
        case 'sin':
            return Math.sin(value);
        case 'cos':
            return Math.cos(value);
        case 'tan':
            return Math.tan(value);
        case 'log':
            return Math.log10(value);
        case 'ln':
            return Math.log(value);
        case 'sqrt':
            if (value < 0) {
                throw new Error('Invalid input');
            }
            return Math.sqrt(value);
        case 'pi':
            return Math.PI;
        default:
            return value;
    }
}

/**
 * Execute current calculation
 */
function executeCalculation() {
    if (!CalculatorState.operation || CalculatorState.previousValue === '') {
        return;
    }
    
    try {
        const currentValue = parseNumber(CalculatorState.currentValue);
        const previousValue = parseNumber(CalculatorState.previousValue);
        
        const result = calculate(CalculatorState.operation, previousValue, currentValue);
        
        // Format result
        const formattedResult = formatNumber(result);
        
        // Add to history
        const operatorSymbol = getOperatorSymbol(CalculatorState.operation);
        const expression = `${CalculatorState.previousValue} ${operatorSymbol} ${CalculatorState.currentValue}`;
        addToHistory(expression, formattedResult);
        
        // Update display
        updateDisplay(formattedResult);
        updateExpression('');
        
        // Reset state
        CalculatorState.currentValue = formattedResult;
        CalculatorState.previousValue = '';
        CalculatorState.operation = null;
        CalculatorState.shouldResetDisplay = true;
        
    } catch (error) {
        handleError(error.message);
    }
}

/**
 * Get operator symbol for display
 * @param {string} operation - Operation name
 * @returns {string} Operator symbol
 */
function getOperatorSymbol(operation) {
    const symbols = {
        'add': '+',
        'subtract': '−',
        'multiply': '×',
        'divide': '÷',
        'power': '^'
    };
    return symbols[operation] || '';
}

// ============================================
// INPUT HANDLING FUNCTIONS
// ============================================

/**
 * Handle number input
 * @param {string} number - Number to input
 */
function inputNumber(number) {
    if (CalculatorState.shouldResetDisplay) {
        CalculatorState.currentValue = '';
        CalculatorState.shouldResetDisplay = false;
    }
    
    if (CalculatorState.currentValue === '0' && number !== '0') {
        CalculatorState.currentValue = number;
    } else if (CalculatorState.currentValue === '0' && number === '0') {
        return;
    } else if (CalculatorState.currentValue.replace(/[^0-9]/g, '').length < 12) {
        CalculatorState.currentValue += number;
    }
    
    updateDisplay(CalculatorState.currentValue);
}

/**
 * Handle decimal input
 */
function inputDecimal() {
    if (CalculatorState.shouldResetDisplay) {
        CalculatorState.currentValue = '0';
        CalculatorState.shouldResetDisplay = false;
    }
    
    if (!CalculatorState.currentValue.includes('.')) {
        CalculatorState.currentValue += '.';
        updateDisplay(CalculatorState.currentValue);
    }
}

/**
 * Handle operator input
 * @param {string} operation - Operation to perform
 */
function inputOperator(operation) {
    if (CalculatorState.operation && !CalculatorState.shouldResetDisplay) {
        executeCalculation();
    }
    
    CalculatorState.previousValue = CalculatorState.currentValue;
    CalculatorState.operation = operation;
    CalculatorState.shouldResetDisplay = true;
    
    const operatorSymbol = getOperatorSymbol(operation);
    updateExpression(`${CalculatorState.previousValue} ${operatorSymbol}`);
}

/**
 * Handle percentage calculation
 */
function inputPercentage() {
    const value = parseNumber(CalculatorState.currentValue);
    const result = value / 100;
    CalculatorState.currentValue = formatNumber(result);
    updateDisplay(CalculatorState.currentValue);
}

/**
 * Handle positive/negative toggle
 */
function toggleSign() {
    const value = parseNumber(CalculatorState.currentValue);
    const result = -value;
    CalculatorState.currentValue = formatNumber(result);
    updateDisplay(CalculatorState.currentValue);
}

/**
 * Handle backspace
 */
function inputBackspace() {
    if (CalculatorState.shouldResetDisplay) {
        return;
    }
    
    if (CalculatorState.currentValue.length === 1) {
        CalculatorState.currentValue = '0';
    } else {
        CalculatorState.currentValue = CalculatorState.currentValue.slice(0, -1);
    }
    
    updateDisplay(CalculatorState.currentValue);
}

/**
 * Handle scientific function input
 * @param {string} operation - Scientific operation
 */
function inputScientific(operation) {
    try {
        const value = parseNumber(CalculatorState.currentValue);
        
        if (operation === 'pi') {
            CalculatorState.currentValue = formatNumber(Math.PI);
        } else {
            const result = calculateScientific(operation, value);
            CalculatorState.currentValue = formatNumber(result);
        }
        
        CalculatorState.shouldResetDisplay = true;
        updateDisplay(CalculatorState.currentValue);
        
    } catch (error) {
        handleError(error.message);
    }
}

// ============================================
// MEMORY FUNCTIONS
// ============================================

/**
 * Memory Clear
 */
function memoryClear() {
    CalculatorState.memory = 0;
    updateMemoryIndicator();
}

/**
 * Memory Recall
 */
function memoryRecall() {
    CalculatorState.currentValue = formatNumber(CalculatorState.memory);
    CalculatorState.shouldResetDisplay = true;
    updateDisplay(CalculatorState.currentValue);
}

/**
 * Memory Plus
 */
function memoryPlus() {
    const value = parseNumber(CalculatorState.currentValue);
    CalculatorState.memory += value;
    updateMemoryIndicator();
    CalculatorState.shouldResetDisplay = true;
}

/**
 * Memory Minus
 */
function memoryMinus() {
    const value = parseNumber(CalculatorState.currentValue);
    CalculatorState.memory -= value;
    updateMemoryIndicator();
    CalculatorState.shouldResetDisplay = true;
}

// ============================================
// HISTORY FUNCTIONS
// ============================================

/**
 * Add calculation to history
 * @param {string} expression - Calculation expression
 * @param {string} result - Calculation result
 */
function addToHistory(expression, result) {
    CalculatorState.history.unshift({ expression, result });
    
    // Keep only last 20 calculations
    if (CalculatorState.history.length > 20) {
        CalculatorState.history.pop();
    }
    
    renderHistory();
}

/**
 * Render history panel
 */
function renderHistory() {
    if (CalculatorState.history.length === 0) {
        DOMElements.historyList.innerHTML = '<div class="history-empty">No calculations yet</div>';
        return;
    }
    
    DOMElements.historyList.innerHTML = CalculatorState.history
        .map((item, index) => `
            <div class="history-item" data-index="${index}">
                <div class="history-expression">${item.expression}</div>
                <div class="history-result">= ${item.result}</div>
            </div>
        `)
        .join('');
    
    // Add click handlers to history items
    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            const historyItem = CalculatorState.history[index];
            CalculatorState.currentValue = historyItem.result;
            CalculatorState.shouldResetDisplay = true;
            updateDisplay(historyItem.result);
        });
    });
}

/**
 * Clear history
 */
function clearHistory() {
    CalculatorState.history = [];
    renderHistory();
}

/**
 * Toggle history panel
 */
function toggleHistory() {
    CalculatorState.isHistoryVisible = !CalculatorState.isHistoryVisible;
    DOMElements.historyPanel.classList.toggle('active', CalculatorState.isHistoryVisible);
    DOMElements.historyToggle.setAttribute('aria-expanded', CalculatorState.isHistoryVisible);
}

// ============================================
// THEME FUNCTIONS
// ============================================

/**
 * Toggle dark mode
 */
function toggleTheme() {
    CalculatorState.isDarkMode = !CalculatorState.isDarkMode;
    document.documentElement.setAttribute('data-theme', CalculatorState.isDarkMode ? 'dark' : 'light');
    localStorage.setItem('calculator-theme', CalculatorState.isDarkMode ? 'dark' : 'light');
}

/**
 * Load saved theme
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('calculator-theme');
    if (savedTheme) {
        CalculatorState.isDarkMode = savedTheme === 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
}

// ============================================
// SCIENTIFIC MODE FUNCTIONS
// ============================================

/**
 * Toggle scientific mode
 */
function toggleScientificMode() {
    CalculatorState.isScientificMode = !CalculatorState.isScientificMode;
    DOMElements.scientificFunctions.classList.toggle('active', CalculatorState.isScientificMode);
    DOMElements.scientificToggle.classList.toggle('active', CalculatorState.isScientificMode);
    DOMElements.scientificFunctions.setAttribute('aria-hidden', !CalculatorState.isScientificMode);
}

// ============================================
// ERROR HANDLING
// ============================================

/**
 * Handle calculator errors
 * @param {string} message - Error message
 */
function handleError(message) {
    updateDisplay('Error');
    updateExpression(message);
    CalculatorState.currentValue = '0';
    CalculatorState.previousValue = '';
    CalculatorState.operation = null;
    CalculatorState.shouldResetDisplay = true;
    
    // Clear error after 2 seconds
    setTimeout(() => {
        updateDisplay('0');
        updateExpression('');
    }, 2000);
}

// ============================================
// KEYBOARD SUPPORT
// ============================================

/**
 * Keyboard key mappings
 */
const keyboardMap = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '.': 'decimal',
    '+': 'add',
    '-': 'subtract',
    '*': 'multiply',
    '/': 'divide',
    '%': 'percentage',
    '=': 'calculate',
    'Enter': 'calculate',
    'Escape': 'all-clear',
    'Backspace': 'backspace',
    'Delete': 'clear'
};

/**
 * Handle keyboard input
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleKeyboard(event) {
    const key = event.key;
    
    // Prevent default for calculator keys
    if (keyboardMap[key] || key === 'c' || key === 'C') {
        event.preventDefault();
    }
    
    const action = keyboardMap[key];
    
    if (action) {
        handleButtonAction(action);
        highlightButton(action);
    } else if (key === 'c' || key === 'C') {
        handleButtonAction('clear');
        highlightButton('clear');
    }
}

/**
 * Highlight button on keyboard press
 * @param {string} action - Button action
 */
function highlightButton(action) {
    // Find button with matching action
    const button = document.querySelector(`[data-action="${action}"]`) || 
                   document.querySelector(`[data-number="${action}"]`);
    
    if (button) {
        button.classList.add('keyboard-active');
        setTimeout(() => {
            button.classList.remove('keyboard-active');
        }, 150);
    }
}

// ============================================
// BUTTON CLICK HANDLERS
// ============================================

/**
 * Handle button click
 * @param {Event} event - Click event
 */
function handleButtonClick(event) {
    const button = event.target.closest('.btn');
    if (!button) return;
    
    const action = button.dataset.action;
    const number = button.dataset.number;
    
    if (number) {
        inputNumber(number);
    } else if (action) {
        handleButtonAction(action);
    }
}

/**
 * Handle button action
 * @param {string} action - Action to perform
 */
function handleButtonAction(action) {
    switch (action) {
        // Numbers
        case 'decimal':
            inputDecimal();
            break;
            
        // Operators
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
            inputOperator(action);
            break;
            
        // Calculate
        case 'calculate':
            executeCalculation();
            break;
            
        // Clear
        case 'all-clear':
            clearDisplay();
            break;
        case 'clear':
            clearEntry();
            break;
        case 'backspace':
            inputBackspace();
            break;
            
        // Special
        case 'percentage':
            inputPercentage();
            break;
        case 'toggle-sign':
            toggleSign();
            break;
            
        // Memory
        case 'memory-clear':
            memoryClear();
            break;
        case 'memory-recall':
            memoryRecall();
            break;
        case 'memory-plus':
            memoryPlus();
            break;
        case 'memory-minus':
            memoryMinus();
            break;
            
        // Scientific
        case 'sin':
        case 'cos':
        case 'tan':
        case 'log':
        case 'ln':
        case 'sqrt':
        case 'power':
        case 'pi':
            inputScientific(action);
            break;
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Button clicks
    DOMElements.buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
    
    // Keyboard input
    document.addEventListener('keydown', handleKeyboard);
    
    // Theme toggle
    DOMElements.themeToggle.addEventListener('click', toggleTheme);
    
    // History toggle
    DOMElements.historyToggle.addEventListener('click', toggleHistory);
    
    // Clear history
    DOMElements.clearHistory.addEventListener('click', clearHistory);
    
    // Scientific mode toggle
    DOMElements.scientificToggle.addEventListener('click', toggleScientificMode);
    
    // Close history when clicking outside
    document.addEventListener('click', (event) => {
        if (CalculatorState.isHistoryVisible && 
            !DOMElements.historyPanel.contains(event.target) && 
            !DOMElements.historyToggle.contains(event.target)) {
            toggleHistory();
        }
    });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize calculator
 */
function initializeCalculator() {
    loadTheme();
    initializeEventListeners();
    updateDisplay('0');
    updateMemoryIndicator();
    renderHistory();
}

// Start the calculator when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCalculator);
} else {
    initializeCalculator();
}
