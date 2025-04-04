// Function for switching theme
function toggleTheme() {
    let bodyClass = document.body.classList;
    if (bodyClass.contains('light-mode')) {
        bodyClass.remove('light-mode');
        bodyClass.add('dark-mode');
        // Aktualizácia hlavného tlačidla
        const themeToggleBtn = document.getElementById('themeToggleBtn');
        if (themeToggleBtn) {
            themeToggleBtn.querySelector('.theme-icon').textContent = '☀️';
        }
        // Aktualizácia mobilného tlačidla
        const themeToggleBtnMobile = document.getElementById('themeToggleBtnMobile');
        if (themeToggleBtnMobile) {
            themeToggleBtnMobile.querySelector('.theme-icon').textContent = '☀️';
        }
    } else {
        bodyClass.remove('dark-mode');
        bodyClass.add('light-mode');
        // Aktualizácia hlavného tlačidla
        const themeToggleBtn = document.getElementById('themeToggleBtn');
        if (themeToggleBtn) {
            themeToggleBtn.querySelector('.theme-icon').textContent = '🌙';
        }
        // Aktualizácia mobilného tlačidla
        const themeToggleBtnMobile = document.getElementById('themeToggleBtnMobile');
        if (themeToggleBtnMobile) {
            themeToggleBtnMobile.querySelector('.theme-icon').textContent = '🌙';
        }
    }
    
    const variables = [
        '--button-bg',
        '--button-hover',
        '--button-text',
        '--calc-bg'
    ];
    variables.forEach(variable => {
        document.body.style.removeProperty(variable);
    });        
    
    const calcBg = getComputedStyle(document.body).getPropertyValue('--calc-bg');            
    document.body.style.setProperty('--history-bg', calcBg);
    
    // Added animation when switching theme
    animateThemeChange();
}

// Animation for theme switching
function animateThemeChange() {
    const overlay = document.createElement('div');
    overlay.classList.add('theme-transition-overlay');
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
    
    setTimeout(() => {
        overlay.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 500);
    }, 500);
}

// Predefinované farebné schémy
const colorSchemes = {
    default: {
        primary: '#6c5ce7',
        secondary: '#a29bfe',
        accent: '#00b894',
        function: '#d0cbff',
        equal: '#00b894',
        clear: '#ff6b6b'
    },
    ocean: {
        primary: '#0984e3',
        secondary: '#74b9ff',
        accent: '#00cec9',
        function: '#b3e0ff',
        equal: '#00cec9',
        clear: '#ff7675'
    },
    sunset: {
        primary: '#e17055',
        secondary: '#fab1a0',
        accent: '#fdcb6e',
        function: '#ffe0d8',
        equal: '#fdcb6e',
        clear: '#ff7675'
    },
    forest: {
        primary: '#00b894',
        secondary: '#55efc4',
        accent: '#6c5ce7',
        function: '#b2f5ea',
        equal: '#00b894',
        clear: '#ff7675'
    }
};

// Funkcia pre nastavenie farebnej schémy
function setColorScheme(schemeName) {
    const body = document.body;
    const scheme = colorSchemes[schemeName];
    
    if (!scheme) return;
    
    // Nastavenie základných farieb
    body.style.setProperty('--primary-color', scheme.primary);
    body.style.setProperty('--secondary-color', scheme.secondary);
    body.style.setProperty('--accent-color', scheme.accent);
    
    // Nastavenie farieb tlačidiel podľa témy
    if (body.classList.contains('light-mode')) {
        body.style.setProperty('--button-bg', scheme.primary);
        body.style.setProperty('--button-hover', scheme.secondary);
        body.style.setProperty('--function-button-bg', scheme.function);
        body.style.setProperty('--equal-button-bg', scheme.equal);
        body.style.setProperty('--clear-button-bg', scheme.clear);
    } else {
        body.style.setProperty('--button-glow', scheme.primary + '33'); // 20% opacity
        body.style.setProperty('--function-button-bg', scheme.function);
        body.style.setProperty('--equal-button-bg', scheme.equal);
        body.style.setProperty('--clear-button-bg', scheme.clear);
    }
    
    // Aktualizácia aktívneho tlačidla
    document.querySelectorAll('.theme-scheme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.scheme === schemeName) {
            btn.classList.add('active');
        }
    });
}

// Function for clearing history
function clearHistory() {
    const historyList = document.getElementById('history_list');
    const items = historyList.querySelectorAll('li');
    
    if (items.length === 0) return;
    
    // Add removing class to all items with delay for staggered animation
    items.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('removing');
        }, index * 50);
    });
    
    // After animations complete, clear the list
    setTimeout(() => {
        historyList.innerHTML = '';
    }, items.length * 50 + 300);
}

// Function to create wave effect across buttons
function createWaveEffect() {
    const buttons = document.querySelectorAll('.buttons button');
    const buttonsArray = Array.from(buttons);
    
    // Clear any existing wave effects
    buttonsArray.forEach(button => {
        button.classList.remove('wave-effect');
    });
    
    // Apply wave effect with delay based on button position
    buttonsArray.forEach((button, index) => {
        setTimeout(() => {
            button.classList.add('wave-effect');
            
            // Remove class after animation completes
            setTimeout(() => {
                button.classList.remove('wave-effect');
            }, 800); // match animation duration
        }, index * 60); // delay between buttons
    });
}

// Start wave effect periodically
function startPeriodicWave() {
    createWaveEffect();
    
    // Repeat the wave effect every 24 seconds (3x dlhší interval)
    setInterval(createWaveEffect, 24000);
}

// Event listeners on document load
document.addEventListener("DOMContentLoaded", function() {
    main();
    
    // Add button animation on click
    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 300);
        });
    });
    
    // Add keyboard support - len pre tlačidlá, ktoré nie sú v poli vstupu kalkulačky
    document.addEventListener('keydown', function(event) {
        // Ignorujeme udalosti klávesy Enter, keď je fokus na vstupnom poli kalkulačky
        // Tie budú spracované priamo v poli vstupu
        if (event.key === 'Enter' && document.activeElement.id !== 'calc_input') {
            calculate();
            event.preventDefault();
        }
    });
    
    // Graph modal control
    const openGraphBtn = document.getElementById('openGraphBtn');
    const closeGraph = document.getElementById('closeGraph');
    const graphModal = document.getElementById('graphModal');
    
    if (openGraphBtn) {
        openGraphBtn.addEventListener('click', openGraphModal);
    }
    
    if (closeGraph) {
        closeGraph.addEventListener('click', closeGraphModal);
    }
    
    // Close graph modal when clicking outside of it
    if (graphModal) {
        window.addEventListener('click', function(event) {
            if (event.target === graphModal) {
                closeGraphModal();
            }
        });
    }
    
    // Start wave effect after everything has loaded
    setTimeout(startPeriodicWave, 2000);
});

// Main function for loading Pyodide
async function main() {
    try {
        // Load Pyodide
        let pyodide = await loadPyodide();
        
        // Load required packages
        await pyodide.loadPackage(['numpy', 'matplotlib', 'sympy']);
        
        // Run Python code
        pyodide.runPython(`
import sympy as sp
from js import document, window
from sympy import *
import numpy as np
import matplotlib.pyplot as plt

history_list = document.getElementById("history_list")
result_div = document.getElementById("calc_output")

# Define multiple symbols (all letters except e, i, I)
symbols_str = 'a b c d f g h j k l m n o p q r s t u v w x y z A B C D F G H J K L M N O P Q R S T U V W X Y Z'
symbols = sp.symbols(symbols_str)
globals().update(dict(zip(symbols_str.split(), symbols)))

def append_to_input(value):
    input_field = document.getElementById("calc_input")
    input_field.value += str(value)

def clear_input():
    input_field = document.getElementById("calc_input")
    input_field.value = ""
    result_div.innerHTML = "Result will appear here"
    result_div.className = "calculation-result"

def calculate():
    input_field = document.getElementById("calc_input")
    expression = input_field.value
    
    try:        
        # Parse the expression
        expr = sp.sympify(expression)
        # Safe environment for eval
        allowed_names = {
            'abs': Abs,
            'pi': sp.pi,
            'e': sp.E,
            'phi': (1 + sp.sqrt(5)) / 2,
            'gamma': 0.5772156649015328606065120900824,
            'sqrt': sp.sqrt,
            'ln': sp.ln,
            'log': sp.log,            
            'sin': sp.sin,
            'cos': sp.cos,
            'tan': sp.tan,
            'arcsin': sp.asin,
            'arccos': sp.acos,
            'arctan': sp.atan,
            'sinh': sp.sinh,
            'cosh': sp.cosh,
            'tanh': sp.tanh,            
            'factorial': factorial,            
            'round': round,                        
            'Mod': sp.Mod,           
            'isprime': sp.isprime,
            'integral': sp.integrate, 
            'derivative': sp.diff, 
            'matrix': sp.Matrix,                
            're': sp.re,   
            'im': sp.im,   
            'arg': sp.arg, 
            'complex': complex,
            'I': sp.I,
            'i': sp.I,
            'x': x, 'y': y, 'z': z,
        }
        # Add all defined symbols to allowed_names
        for sym in symbols:
            allowed_names[str(sym)] = sym

        # Initialize result
        result = None
        result_str = "" 

        expression_lower = expression.lower()

        # Check for specific commands in the expression
        if "diff" in expression_lower:            
            # Derivative operation
            result = expr
        elif "integrate" or "integral" in expression_lower:
            # Integral operation
            result = expr
        elif "matrix" or "eye" or "zeros" or "ones" or "diag" or "det" or "nullspace" or "columnspace" or "eigenvals" or "diagonalize" in expression_lower:            
            matrix_expr = expression.replace('Matrix', 'sp.Matrix') 
            result = eval(matrix_expr)
        elif "solve" or "solveset" or "linsolve" or "nonlinsolve" in expression_lower:
            # Solve equation
            result = expr
        elif "isprime" or "apart" or "collect" or "cancel" or "factor" or "expand" or "simplify" or "subs" or "evalf" in expression_lower:
            result = expr        
        elif "limit" in expression_lower:            
            result = expr
        elif "series" or "expand_log" or "logcombine" or "expand_log" or "expand_trig" or "trigsimp" in expression_lower:            
            result = expr
        elif "binomial" or "gamma" or "combsimp" or "gammasimp" or "expand_func" or "hyperexpand" in expression_lower:            
            result = expr        
        elif "dsolve" in expression_lower:
            result = expr       
        else:            
            # Check if the expression contains any defined symbols
            if any(symbol in expr.free_symbols for symbol in symbols):
                # Perform symbolic operations
                simplified_expr = sp.simplify(expr)
                expanded_expr = sp.expand(expr)
                # Prepare the result string for display 
                result_str += f"<div class='result-item'><span class='result-label'>Simplified:</span> <span class='result-value'>{simplified_expr}</span></div>"               
                result_str += f"<div class='result-item'><span class='result-label'>Expanded:</span> <span class='result-value'>{expanded_expr}</span></div>"
                result_div.innerHTML = result_str
                result_div.className = "calculation-result success"
                return  # Exit after handling symbolic expression
            else:
                # Evaluate numerically if no symbols are present
                result = eval(expression, {"__builtins__": None}, allowed_names)                        
                
        if result is not None:
            result_div.innerHTML = f"<div class='result-item'><span class='result-label'>Result:</span> <span class='result-value'>{result}</span></div>"
            result_div.className = "calculation-result success"
        else:
            result_div.innerHTML = "<div class='result-error'>Error: Undefined result</div>"
            result_div.className = "calculation-result error"
        
        add_to_history(expression, result)
    
    except Exception as e:
        result_div.innerHTML = f"<div class='result-error'>Error: {e}</div>"
        result_div.className = "calculation-result error"

def add_to_history(expression, result):
    li = document.createElement("li")
    li.innerHTML = f"<div class='history-expression'>{expression}</div><div class='history-result'>{result}</div>"
    history_list.appendChild(li)

def plot_graph():
    input_field = document.getElementById("graph_input")
    expression = input_field.value
    try:
        # Get custom ranges if specified
        x_min_input = document.getElementById("x_min").value
        x_max_input = document.getElementById("x_max").value
        y_min_input = document.getElementById("y_min").value
        y_max_input = document.getElementById("y_max").value
        
        # Default to -10,10 if not specified
        x_min = float(x_min_input) if x_min_input else -10
        x_max = float(x_max_input) if x_max_input else 10
        
        # Create x values
        x = np.linspace(x_min, x_max, 1000)
        
        allowed_names = {}
        allowed_names.update(vars(np))
        allowed_names.update({
            'x': x,
            'abs': np.abs,
            'pi': np.pi,
            'phi': (1 + np.sqrt(5)) / 2,
            'gamma': 0.5772156649,
            'sqrt': np.sqrt,
            'ln': np.log,
            'log10': np.log10,
            'log2': np.log2,
            'sin': np.sin,
            'cos': np.cos,
            'tan': np.tan,
            'arcsin': np.arcsin,
            'arccos': np.arccos,
            'arctan': np.arctan,
            'sinh': np.sinh,
            'cosh': np.cosh,
            'tanh': np.tanh,
            'exp': np.exp,
            'floor': np.floor,
            'ceil': np.ceil,
            'sign': np.sign,
            'mod': np.mod,
        })
        
        # Evaluate the function
        y = eval(expression, {"__builtins__": None}, allowed_names)
        
        # Determine if dark mode is active
        is_dark_mode = document.body.classList.contains('dark-mode')
        bg_color = '#2a2d3a' if is_dark_mode else '#f8f9fa'
        text_color = '#ffffff' if is_dark_mode else '#333333'
        # Matplotlib nepodporuje CSS rgba formát, použijeme tuple s alfa kanálom
        grid_color_light = (0, 0, 0, 0.1)  # RGB + alpha (0-1)
        grid_color_dark = (0.78, 0.78, 0.78, 0.2)  # RGB + alpha (0-1)
        grid_color = grid_color_dark if is_dark_mode else grid_color_light
        curve_color = '#a29bfe' if is_dark_mode else '#6c5ce7'
        
        # Create the plot with theme-aware styling
        plt.figure(figsize=(10, 6), dpi=100)
        plt.plot(x, y, color=curve_color, linewidth=2.5)
        plt.grid(True, alpha=0.7, linestyle='--', color=grid_color)
        plt.xlabel('x', color=text_color)
        plt.ylabel('y', color=text_color)
        plt.title(f'Function Graph: y = {expression}', color=text_color)
        
        # Set axes colors
        plt.axhline(y=0, color=text_color, linestyle='-', alpha=0.3, linewidth=1)
        plt.axvline(x=0, color=text_color, linestyle='-', alpha=0.3, linewidth=1)
        
        # Set Y range if specified
        if y_min_input:
            plt.ylim(bottom=float(y_min_input))
        if y_max_input:
            plt.ylim(top=float(y_max_input))
        
        # Apply theme to plot
        plt.rcParams['axes.facecolor'] = bg_color
        plt.rcParams['figure.facecolor'] = bg_color
        plt.rcParams['text.color'] = text_color
        plt.rcParams['axes.labelcolor'] = text_color
        plt.rcParams['xtick.color'] = text_color
        plt.rcParams['ytick.color'] = text_color
        
        # Get fill option setting
        fill_option = document.getElementById("fill_option").checked
        if fill_option:
            # Fill area under curve 
            plt.fill_between(x, y, 0, alpha=0.2, color=curve_color)
        
        # Get points option
        points_option = document.getElementById("points_option").checked
        if points_option:
            # Display fewer points for clarity
            point_indices = np.linspace(0, len(x)-1, 20, dtype=int)
            plt.plot(x[point_indices], y[point_indices], 'o', color='white', 
                     markersize=5, markerfacecolor=curve_color)
        
        # Save figure to buffer
        import io
        import base64
        buf = io.BytesIO()
        plt.tight_layout()
        plt.savefig(buf, format='png', facecolor=bg_color)
        buf.seek(0)
        img_base64 = base64.b64encode(buf.read()).decode('utf-8')
        buf.close()
        
        # Set the image
        img_uri = "data:image/png;base64," + img_base64
        graph_img = document.getElementById("graph")
        graph_img.src = img_uri
    except Exception as e:
        window.alert(f"Error: {e}")
`);
        
        // Map JavaScript functions to Python
        window.append_to_input = pyodide.globals.get('append_to_input');
        window.clear_input = pyodide.globals.get('clear_input');
        window.calculate = pyodide.globals.get('calculate');
        window.plot_graph = pyodide.globals.get('plot_graph');

        // Add event listener for the Enter key
        let calcInput = document.getElementById("calc_input");
        calcInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent new line
                calculate();
            }
        });

        // Po načítaní skryjem loading
        document.getElementById('loading').style.display = 'none';
        
    } catch (error) {
        console.error("Error loading:", error);
        
        // Show error message in loading div
        const loadingDiv = document.getElementById('loading');
        
        // FIX: Preserve spinner and text
        const spinner = document.getElementById('loading-spinner');
        const loadingText = document.getElementById('loading-text');
        
        // Keep spinner and text if they exist
        if ((spinner && spinner.parentNode === loadingDiv) || 
            (loadingText && loadingText.parentNode === loadingDiv)) {
            // Remove all child elements except spinner and text
            const elementsToKeep = [spinner, loadingText].filter(el => el !== null);
            
            // Create temporary array for elements to remove
            const elementsToRemove = [];
            for (let i = 0; i < loadingDiv.children.length; i++) {
                const child = loadingDiv.children[i];
                if (!elementsToKeep.includes(child) && child.id !== 'loading-error') {
                    elementsToRemove.push(child);
                }
            }
            
            // Remove elements
            for (const element of elementsToRemove) {
                loadingDiv.removeChild(element);
            }
        }
        
        // Set text to "Error loading libraries"
        if (loadingText) {
            loadingText.textContent = "Error loading libraries";
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.id = 'loading-error';
        errorDiv.innerHTML = `<strong>Error loading:</strong><br>${error.message}<br><br>
            <p>Possible solutions:</p>
            <ul>
                <li>Check your internet connection</li>
                <li>Try refreshing the page (F5)</li>
                <li>Try using a different browser (Chrome, Firefox, Edge)</li>
                <li>Disable ad-blockers or extensions that might block scripts</li>
            </ul>`;
        
        loadingDiv.appendChild(errorDiv);
    }
}

// Functions for instructions modal
function openInstructions() {
    document.getElementById('instructionsModal').style.display = 'block';
}

function closeInstructions() {
    document.getElementById('instructionsModal').style.display = 'none';
}

// Functions for graph modal
function openGraphModal() {
    document.getElementById('graphModal').style.display = 'block';
    
    // Add drag and drop capability for the modal window
    setTimeout(makeGraphModalDraggable, 100);
}

function closeGraphModal() {
    document.getElementById('graphModal').style.display = 'none';
}

function copyToInput(text) {
    const input = document.getElementById('calc_input');
    input.value = text;
    input.focus();
    closeInstructions();
}

// Close modal when clicking outside of modal content
window.onclick = function(event) {
    const modal = document.getElementById('instructionsModal');
    if (event.target == modal) {
        closeInstructions();
    }
}

// Function to save graph as image
function saveGraph() {
    const graph = document.getElementById('graph');
    if (!graph.src || graph.src === window.location.href) {
        alert("Please generate a graph first!");
        return;
    }
    
    const link = document.createElement('a');
    link.href = graph.src;
    const functionText = document.getElementById('graph_input').value;
    const sanitizedName = functionText.replace(/[^\w\s]/gi, '_');
    link.download = `graph_${sanitizedName || 'function'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function for making the graph modal window draggable
function makeGraphModalDraggable() {
    const modal = document.querySelector('.graph-modal-content');
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // Check if element exists
    if (!modal) return;

    // Set zIndex above other elements
    modal.style.zIndex = "2001";

    // Function to start dragging
    function dragMouseDown(e) {
        e = e || window.event;
        
        // Skip if clicking on interactive elements
        const targetElement = e.target;
        if (targetElement.tagName === 'INPUT' || 
            targetElement.tagName === 'BUTTON' || 
            targetElement.tagName === 'SELECT' || 
            targetElement.tagName === 'TEXTAREA' ||
            targetElement.tagName === 'LABEL' ||
            targetElement.tagName === 'IMG' ||
            targetElement.type === 'checkbox' ||
            targetElement.closest('.graph-input-row') ||
            targetElement.closest('.graph-controls')) {
            return;
        }
        
        e.preventDefault();
        // Get cursor position at start
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // Call function on mouse move
        document.onmousemove = elementDrag;
    }

    // Function for element movement
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // Calculate new position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // Set new element position
        modal.style.top = (modal.offsetTop - pos2) + "px";
        modal.style.left = (modal.offsetLeft - pos1) + "px";
        modal.style.margin = "0";
    }

    // Function ends dragging
    function closeDragElement() {
        // Stop movement after mouse button release
        document.onmouseup = null;
        document.onmousemove = null;
    }

    // Set event listener on the entire modal window instead of just the header
    modal.onmousedown = dragMouseDown;
}

// Funkcie pre presúvanie modálneho okna
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

function dragStart(e) {
    if (e.type === "mousedown") {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target.closest('.modal-content')) {
        isDragging = true;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        const modalContent = document.querySelector('.modal-content');
        modalContent.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    }
}

// Pridanie event listenerov pre presúvanie
document.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", dragEnd);

function toggleAdvancedButtons() {
    const advancedToggle = document.querySelector('.advanced-toggle-mobile');
    const advancedButtons = document.getElementById('advancedButtons');
    
    if (advancedToggle && advancedButtons) {
        advancedToggle.classList.toggle('active');
        
        // Nastavenie stavu zobrazovania
        if (advancedButtons.style.display === 'none' || advancedButtons.style.display === '') {
            advancedButtons.style.display = 'grid';
            advancedButtons.style.gridTemplateColumns = 'repeat(4, 1fr)'; // Zmena na štyri stĺpce
            advancedButtons.style.gap = '8px';
        } else {
            advancedButtons.style.display = 'none';
        }
        
        // Animate the toggle icon
        const toggleIcon = advancedToggle.querySelector('.toggle-icon');
        if (toggleIcon) {
            if (advancedButtons.style.display === 'grid') {
                toggleIcon.textContent = '▲';
                toggleIcon.style.transform = 'rotate(180deg)';
            } else {
                toggleIcon.textContent = '▼';
                toggleIcon.style.transform = 'rotate(0deg)';
            }
        }
    }
} 