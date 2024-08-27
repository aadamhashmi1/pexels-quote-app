# Image Quote Editor

## Overview

The **Image Quote Editor** is a React-based web application that allows users to search for images, overlay quotes onto these images, and download or view the edited images in high resolution. The application utilizes the Pexels API for image search and the API Ninjas Quotes API to generate random quotes. Users can adjust the text's position, size, and style on the image using Fabric.js for a dynamic and interactive editing experience.

## Features

- **Image Search**: Search for images using keywords.
- **Quote Integration**: Overlay quotes onto selected images.
- **Interactive Text Editing**: Adjust text position, size, and style interactively with Fabric.js.
- **High-Resolution Viewing**: View and download images with overlaid quotes in high resolution.
- **Random Quote Generation**: Generate random quotes and search for images based on these quotes.
- **Responsive Design**: Mobile-friendly and responsive layout.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v10 or later)


## Tailwind CSS
   Tailwind CSS is used for styling. To customize or add new styles, you can modify the tailwind.config.js file. For more information on configuring Tailwind, refer to the Tailwind CSS documentation.

## Usage
 -Search for Images: Enter a keyword in the search bar and click "Search" to find images.
 -Generate Random Quote: Click "Generate Random Quote" to fetch a random quote and search for images related to it.
 -Edit Image: Click on an image to open it in a modal. Use the interactive text editor to position, resize, and style the text.
 -Download or View Image: Use the "Download" button to save the edited image or "Close" to return to the image grid.

## Technologies Used
 - React: JavaScript library for building user interfaces.
 - Tailwind CSS: Utility-first CSS framework for styling.
 - Fabric.js: JavaScript library for interactive object manipulation on canvas.
 - Pexels API: Provides high-quality and free stock photos.
 - API Ninjas Quotes API: Provides random quotes for integration.