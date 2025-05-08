# Thermochemistry Experiment

This project is a web application designed to simulate thermochemistry experiments involving various chemical reactions. It visually represents the reactions using beakers and charts to illustrate temperature changes over time.

## Project Structure

```
thermochemistry-experiment
├── public
│   ├── index.html          # Main HTML document
│   └── styles
│       └── style.css      # Styles for the web application
├── src
│   ├── app.js             # Main JavaScript file to initialize the application
│   ├── components
│   │   ├── Beaker.js      # Component representing a beaker
│   │   ├── Chart.js       # Component for displaying temperature changes
│   │   └── Controls.js     # Component for user interface controls
│   └── utils
│       └── calculations.js # Utility functions for calculations
├── package.json            # Configuration file for npm
└── README.md               # Project documentation
```

## Features

- **Interactive Simulation**: Users can select different chemical reactions and observe the resulting temperature changes.
- **Visual Representation**: The application uses beakers to visually represent the liquids involved in the reactions.
- **Dynamic Charting**: Temperature changes are displayed in real-time using Chart.js, providing a clear view of the reaction progress.

## Getting Started

To set up and run the application locally, follow these steps:

1. **Clone the Repository**:
   ```
   git clone <repository-url>
   cd thermochemistry-experiment
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Run the Application**:
   ```
   npm start
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:3000` in your web browser to view the application.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.