# SimStation React

SimStation is a React-based simulation game platform that allows users to play various simulation games, including Tiny City. The application features a user-friendly interface, game management, and a dashboard to explore different games.

## Project Structure

```
simstation-react
├── public
│   └── index.html          # Main HTML file for the application
├── src
│   ├── index.js           # Entry point of the React application
│   ├── App.js             # Main App component
│   ├── hiu.js             # Game logic and UI for Tiny City
│   ├── components
│   │   ├── HubView.js     # Dashboard component
│   │   ├── TinyCityGame.js # Gameplay component for Tiny City
│   │   └── Sidebar.js      # Navigation component
│   ├── styles
│   │   └── index.css      # Global CSS styles
│   └── utils
│       └── games.js       # Mock data for games
├── .gitignore              # Git ignore file
├── package.json            # npm configuration file
├── README.md               # Project documentation
└── vite.config.js          # Vite configuration file
```

## Getting Started

To get started with the SimStation project, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd simstation-react
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Features

- Play the Tiny City simulation game.
- Explore a dashboard with featured games.
- User-friendly navigation and interface.
- Responsive design for both desktop and mobile.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.