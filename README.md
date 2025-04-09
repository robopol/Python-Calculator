# Python Calculator Web App

This project is a fully client-side Python calculator web application that runs in your browser using [Pyodide](https://pyodide.org). It leverages powerful Python libraries like [Sympy](https://docs.sympy.org/latest/index.html), [NumPy](https://numpy.org), and [Matplotlib](https://matplotlib.org) to perform advanced mathematical computations, ranging from basic arithmetic to symbolic manipulation and graph plotting.
![Python calculator](assets/screencapture-calculator.png)
## Features

### Interactive Calculator Interface
A modern, responsive UI that supports both light and dark themes. You can also randomize theme colors for a unique look.

### Advanced Mathematical Operations
Supports a wide range of functions including:
- Basic arithmetic and advanced operations (exponentiation, modulus, rounding)
- Symbolic mathematics (simplification, expansion, differentiation, integration, equation solving)
- Matrix operations
- Trigonometric functions and their inverses

### Dynamic Graph Plotting
Plot mathematical functions (e.g., `sin(x)`, `cos(x)`) using Matplotlib directly in your browser.

### Calculation History
Keeps track of previous calculations so you can review or reuse them later.

### Responsive and Mobile-Friendly Design
The layout adapts to different screen sizes, ensuring usability on desktops, tablets, and mobile devices.

### Loading Indicator
A loading spinner is displayed while the required Python libraries are being loaded via Pyodide.

## How It Works

### HTML & CSS
The application is built in a single HTML file. The CSS handles a modern look with a blurred fractal background, and it provides both light and dark theme styles along with responsive design adjustments.

### JavaScript
Manages the UI interactions such as appending values to the input, clearing the display, toggling themes, and interfacing with Python functions. It also controls the loading spinner and binds events (like pressing Enter to calculate).

### Python Code (via Pyodide)
Once Pyodide is loaded, Python packages like NumPy, Matplotlib, and Sympy are loaded. The embedded Python script handles:
- Parsing and evaluating mathematical expressions
- Performing symbolic manipulations
- Plotting function graphs dynamically
- Maintaining a history of calculations

## Usage

### Input Expression
Type your mathematical expression into the provided input field.

### Calculate Result
Click on the calculator buttons or press "Enter" to evaluate the expression. The result is displayed along with any symbolic simplifications or expansions if applicable.

### Plot a Graph
Enter a function (e.g., `sin(x)`) in the graph input field and click the **Plot Graph** button to visualize it.

### Toggle Themes & Randomize Colors
Use the **Dark/Light Mode** button to switch between themes, and try the **Randomize Color** button to generate a new color scheme for the buttons and backgrounds.

## Getting Started

Since this is a purely front-end web application, you can simply clone the repository and open the **calculator.html** file in your browser. Ensure you have an active internet connection to load external resources like Pyodide and the necessary libraries.

### Steps to Run the App

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/robopol/Python-Calculator.git

## Contributing
Contributions are welcome! If you’d like to improve the code, add new features, or fix bugs, please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Author
Ing. Robert Polak
Website: https://robopol.sk
