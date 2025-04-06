const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to fetch Instagram video
app.post('/api/fetch-instagram', async (req, res) => {
    try {
        const { url } = req.body;
        
        if (!url || !url.includes('instagram.com')) {
            return res.status(400).json({
                success: false,
                error: 'Invalid Instagram URL'
            });
        }
        
        console.log(`Fetching video from URL: ${url}`);
        
        // Handle both reel and post URLs
        const cleanUrl = url.split('?')[0]; // Remove query parameters
        
        // Get the Instagram page HTML
        const response = await axios.get(cleanUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Cookie': ''  // Add Instagram cookies here if needed for authentication
            }
        });
        
        const html = response.data;
        const $ = cheerio.load(html);
        
        // Try multiple methods to find the video URL
        let videoUrl = null;
        
        // Method 1: Check for og:video meta tag
        const ogVideo = $('meta[property="og:video"]').attr('content');
        if (ogVideo) {
            videoUrl = ogVideo;
            console.log('Found video URL in og:video meta tag');
        }
        
        // Method 2: Look for video elements with src
        if (!videoUrl) {
            const videoElement = $('video source').first().attr('src');
            if (videoElement) {
                videoUrl = videoElement;
                console.log('Found video URL in video source element');
            }
        }
        
        // Method 3: Parse JSON data from script tags (Instagram stores data in script tags)
        if (!videoUrl) {
            const scripts = $('script').map((i, el) => $(el).html()).get();
            
            for (const script of scripts) {
                if (script.includes('{"require":')) {
                    try {
                        // Look for video_url in the script content
                        const videoUrlMatch = script.match(/"video_url":"([^"]+)"/);
                        if (videoUrlMatch && videoUrlMatch[1]) {
                            videoUrl = videoUrlMatch[1].replace(/\\/g, '');
                            console.log('Found video URL in script JSON data');
                            break;
                        }
                    } catch (e) {
                        console.log('Error parsing script content:', e.message);
                    }
                }
            }
        }
        
        // If we couldn't find a video URL
        if (!videoUrl) {
            // Alternative approach - try to extract from shared data
            const sharedDataScript = $('script:contains("window._sharedData")').html();
            if (sharedDataScript) {
                try {
                    const sharedDataMatch = sharedDataScript.match(/window\._sharedData\s*=\s*({.+?});/);
                    if (sharedDataMatch) {
                        const sharedData = JSON.parse(sharedDataMatch[1]);
                        
                        // Navigate through the shared data structure to find video URL
                        const entryData = sharedData.entry_data;
                        if (entryData.PostPage) {
                            const mediaItem = entryData.PostPage[0].graphql.shortcode_media;
                            if (mediaItem.is_video && mediaItem.video_url) {
                                videoUrl = mediaItem.video_url;
                                console.log('Found video URL in sharedData');
                            }
                        }
                    }
                } catch (e) {
                    console.log('Error extracting from shared data:', e.message);
                }
            }
        }
        
        // If still no video URL
        if (!videoUrl) {
            console.log('Could not find video URL using available methods');
            return res.status(404).json({
                success: false,
                error: 'Could not find video in the Instagram post. Instagram may have updated their site structure.'
            });
        }
        
        // Get post details
        const author = $('meta[property="og:title"]').attr('content')?.split(' on Instagram')[0] || 'Unknown';
        const caption = $('meta[property="og:description"]').attr('content') || '';
        
        console.log(`Found video by ${author}`);
        
        return res.json({
            success: true,
            videoUrl,
            postDetails: {
                author,
                caption
            }
        });
    } catch (error) {
        console.error('Error fetching Instagram content:', error.message);
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch Instagram content: ' + error.message
        });
    }
});

// Check if the public directory exists, if not create it
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
    console.log('Created public directory');
}

// Copy index.html to public directory if it doesn't exist there
const indexPath = path.join(publicDir, 'index.html');
if (!fs.existsSync(indexPath)) {
    const currentIndexPath = path.join(__dirname, 'index.html');
    if (fs.existsSync(currentIndexPath)) {
        fs.copyFileSync(currentIndexPath, indexPath);
        console.log('Copied index.html to public directory');
    } else {
        // Create the index.html file in public from the content at the top of this file
        console.log('Please create an index.html file in the public directory');
    }
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Press Ctrl+C to stop the server`);
});
