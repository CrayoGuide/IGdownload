# Instagram Shorts Downloader

A fully functional web application that runs locally to download and repost Instagram shorts/reels videos.

## Features

- Download Instagram shorts/reels videos
- Preview videos before downloading
- Copy video link for reposting
- Simple and intuitive interface

## Complete Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer)
- npm (comes with Node.js)
- Git (for GitHub setup)

### Local Setup

1. **Clone or download this repository to your local machine**

2. **Navigate to the project directory in your terminal/command prompt**
   ```bash
   cd instagram-shorts-downloader
   ```

3. **Install the required dependencies**
   ```bash
   npm install
   ```
   This will install express, cors, axios, cheerio, and other dependencies listed in package.json

4. **Create the necessary directories and files**
   The application requires the following structure:
   ```
   instagram-shorts-downloader/
   ├── package.json
   ├── server.js
   ├── public/
   │   └── index.html
   └── README.md
   ```

   The server.js script will automatically create the public directory and move index.html there if needed.

5. **Start the server**
   ```bash
   npm start
   ```

6. **Access the application**
   Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```

## GitHub Setup

1. **Create a new GitHub repository**
   - Go to [GitHub](https://github.com)
   - Log in to your account
   - Click the "+" icon in the top right and select "New repository"
   - Name your repository (e.g., "instagram-shorts-downloader")
   - Choose public or private visibility
   - Do not initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Initialize Git in your local project folder**
   ```bash
   git init
   ```

3. **Add all files to Git**
   ```bash
   git add .
   ```

4. **Commit the files**
   ```bash
   git commit -m "Initial commit"
   ```

5. **Link your local repository to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/instagram-shorts-downloader.git
   ```
   Replace YOUR_USERNAME with your GitHub username

6. **Push your code to GitHub**
   ```bash
   git push -u origin main
   ```
   (If you're using an older version of Git, you might need to use `master` instead of `main`)

7. **Verify your repository**
   - Go to your GitHub profile
   - Check that your new repository appears and contains all your files

## Running from GitHub

To use this application after you've pushed it to GitHub:

1. **Clone the repository to your local machine**
   ```bash
   git clone https://github.com/YOUR_USERNAME/instagram-shorts-downloader.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd instagram-shorts-downloader
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Access the application**
   Open your browser and go to:
   ```
   http://localhost:3000
   ```

## How to Use

1. Copy the URL of an Instagram reel/short you want to download
   - Example: https://www.instagram.com/reel/ABC123XYZ/

2. Paste the URL into the input field on the application

3. Click "Fetch Video"

4. Once the video loads, you can:
   - Preview the video in the browser
   - Download it to your device by clicking "Download Video"
   - Copy the direct video link for reposting by clicking "Copy Video Link"

## Troubleshooting

If you encounter issues:

1. **Server won't start**
   - Check if another application is using port 3000
   - Make sure Node.js is properly installed
   - Try running with elevated permissions if necessary

2. **Can't find videos**
   - Instagram frequently updates their site structure
   - Check for recent changes in Instagram's HTML/API
   - Make sure your URL is correct (should be a reel or post with video)
   - Try clearing your browser cache

3. **Permission issues**
   - Make sure you have write permissions in the directory

4. **Dependencies problems**
   - Delete node_modules folder and run `npm install` again

5. **Debug with logs**
   - Check terminal/console output for error messages
   - The application logs important steps and errors

## Updating

Instagram frequently changes their website structure. If the downloader stops working:

1. Check for new versions of this code on GitHub
2. Update your local version with:
   ```bash
   git pull origin main
   ```

## Legal Disclaimer

This application is meant for personal use only. Please respect Instagram's Terms of Service and copyright laws. Do not use downloaded content for commercial purposes without proper authorization.
