# Modern Calculator Web Application

A beautiful, responsive calculator web application built with vanilla HTML, CSS, and JavaScript. This project demonstrates professional frontend development practices with a modern glassmorphism design, smooth animations, and comprehensive functionality.

![Calculator Preview](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Yes-green?style=for-the-badge)

## 🌟 Features

### Core Calculator Functions
- **Basic Operations**: Addition, subtraction, multiplication, and division
- **Decimal Numbers**: Full support for decimal calculations
- **Percentage**: Quick percentage calculations
- **Positive/Negative Toggle**: Switch between positive and negative numbers
- **Clear Functions**: 
  - `AC` - All Clear (resets entire calculator)
  - `C` - Clear (clears current entry)
  - `Backspace` - Delete last digit

### Advanced Features
- **Memory Functions**: MC, MR, M+, M- for storing and recalling values
- **Scientific Mode**: Toggle scientific functions including:
  - Trigonometric functions (sin, cos, tan)
  - Logarithmic functions (log, ln)
  - Square root (√)
  - Power (x^y)
  - Pi constant (π)
- **Calculation History**: View and reuse previous calculations
- **Dark Mode**: Toggle between light and dark themes
- **Keyboard Support**: Full keyboard navigation and input
- **Error Handling**: Graceful error messages for invalid operations

### Design & UX
- **Glassmorphism Design**: Modern frosted glass aesthetic
- **Smooth Animations**: Button press effects and display transitions
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Accessibility**: ARIA labels, keyboard navigation, and focus states
- **Professional Typography**: Clean, readable fonts

## 📁 Project Structure

```
calculator/
│
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Calculator logic and interactivity
├── assets/
│   ├── icons/          # Icon assets (if needed)
│   └── images/         # Image assets (if needed)
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd calculator
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     ```
   - Navigate to `http://localhost:8000`

## 🎯 Usage Guide

### Basic Operations

1. **Enter numbers** by clicking the number buttons or using your keyboard (0-9)
2. **Select an operation** (+, −, ×, ÷)
3. **Enter the second number**
4. **Press =** or Enter to calculate

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| 0-9 | Enter number |
| . | Decimal point |
| + | Addition |
| - | Subtraction |
| * | Multiplication |
| / | Division |
| % | Percentage |
| = or Enter | Calculate |
| Escape | All Clear |
| Backspace | Delete last digit |
| Delete | Clear entry |
| C | Clear entry |

### Memory Functions

- **MC (Memory Clear)**: Clears the memory
- **MR (Memory Recall)**: Recalls the value from memory
- **M+ (Memory Plus)**: Adds current value to memory
- **M- (Memory Minus)**: Subtracts current value from memory

### Scientific Mode

Click the "Scientific" button to reveal additional mathematical functions:
- **sin, cos, tan**: Trigonometric functions (input in radians)
- **log**: Base-10 logarithm
- **ln**: Natural logarithm
- **√**: Square root
- **x^y**: Power function
- **π**: Pi constant

### History Panel

1. Click the history icon (clock) in the header
2. View your recent calculations
3. Click any history item to reuse that result
4. Click the trash icon to clear history

### Dark Mode

Click the sun/moon icon in the header to toggle between light and dark themes. Your preference is saved in local storage.

## 🎨 Design Features

### Glassmorphism Effect
- Frosted glass background with blur effects
- Semi-transparent layers
- Subtle borders and shadows
- Gradient backgrounds

### Animations
- Button press ripple effects
- Display update animations
- Smooth hover transitions
- Panel slide-in animations

### Responsive Breakpoints
- **Desktop**: Full calculator with history panel
- **Tablet**: Stacked layout
- **Mobile**: Optimized single-column layout
- **Small Mobile**: Compact buttons and display

## 🔧 Technical Details

### HTML Structure
- Semantic HTML5 elements
- ARIA labels for accessibility
- Proper heading hierarchy
- Logical content organization

### CSS Architecture
- CSS Custom Properties (variables) for theming
- BEM-like naming convention
- Mobile-first responsive design
- CSS Grid and Flexbox layouts
- Hardware-accelerated animations

### JavaScript Architecture
- Modular function organization
- State management object
- Event delegation
- Error handling
- Local storage for theme persistence
- Debounced functions for performance

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS3 features (Grid, Flexbox, Custom Properties)
- No polyfills required

## ♿ Accessibility Features

- **ARIA Labels**: All buttons have descriptive labels
- **Keyboard Navigation**: Full keyboard support
- **Focus States**: Visible focus indicators
- **Screen Reader**: Compatible with screen readers
- **Reduced Motion**: Respects prefers-reduced-motion
- **High Contrast**: Supports high-contrast mode

## 🎓 Learning Objectives

This project demonstrates:
- Clean, semantic HTML structure
- Modern CSS techniques (Grid, Flexbox, Custom Properties)
- Modular JavaScript architecture
- Event handling and DOM manipulation
- State management patterns
- Responsive design principles
- Accessibility best practices
- Performance optimization
- Error handling strategies

## 🐛 Known Limitations

- Trigonometric functions use radians (not degrees)
- Very large numbers may display in scientific notation
- Maximum 12 digits in display
- History limited to 20 calculations

## 🔄 Future Enhancements

Potential improvements for future versions:
- Degree/radian toggle for trigonometric functions
- More scientific functions (factorial, absolute value, etc.)
- Export history to file
- Custom theme colors
- Sound effects for button presses
- Voice input support
- Unit conversion mode

## 📝 Code Quality

### Standards Followed
- **HTML**: Semantic markup, proper nesting, accessibility attributes
- **CSS**: Organized with comments, consistent naming, responsive design
- **JavaScript**: Modular functions, meaningful variable names, error handling

### Best Practices
- No global namespace pollution
- Event delegation for performance
- Separation of concerns
- DRY principle (Don't Repeat Yourself)
- Consistent code style
- Comprehensive comments

## 🤝 Contributing

This is a portfolio project demonstrating frontend development skills. While contributions are welcome, the primary goal is to showcase professional development practices.

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built as a frontend internship portfolio project demonstrating professional web development skills.

## 🙏 Acknowledgments

- Design inspiration from modern calculator applications
- Icons from Feather Icons (embedded as SVG)
- Glassmorphism design trend

---

**Note**: This calculator is intended for educational and portfolio purposes. For critical calculations, please verify results with a trusted calculator.
