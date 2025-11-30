# Thumbnail Image Generator

A simple generator for casino game thumbnails that creates **420×420** images from the original provider thumbnails, automatically adding the **game name** and **provider name**. The project includes a **Node.js** backend and a web interface to test the generation and download the final images in PNG format.


## Demo

Test the web app here:  
[https://rbeaujon.com/rollhub/SITE/](https://rbeaujon.com/rollhub/SITE/)

The API is running at:  
[http://rollhub.rbeaujon.com/](http://rollhub.rbeaujon.com/)


## Installation & Running

1. Clone the repository:  
```bash
git clone https://github.com/rbeaujon/thumbnailImageGenerator.git
````

2. Navigate to the project folder:
```bash
  cd thumbnailImageGenerator
```

3. Install dependencies:

```bash
npm install
````

Before running, make sure to modify the condition in package.json to work under your desired domain or on localhost.

4. Start the project:

```bash
npm run start
```



# Backend (API)

The server is built with Node.js. To run it:
Navigate to the API folder inside the project.

## Install dependencies and start the API:

npm install
npm run start


The API handles receiving original images, generating new thumbnails using an LLM via OpenRouter, and returning the final images ready for download.

Security Note: The project uses an API key stored in a .env file and loaded via dotenv.
This ensures that sensitive credentials are not exposed in the code or repository, providing an additional layer of security. 
Make sure to create a .env file with your API key before running the project.

## Usage

The web interface displays a list of games along with their **original thumbnails**.  

For each game:

- Click **Generate** to create a **420×420** thumbnail.
- Once generated, the new thumbnail will be displayed with a **Download** button to save it as a PNG.
- Text labels (**game name** and **provider name**) are automatically applied using the **Anton** font from Google Fonts.

---

## Requirements

- **Node.js** installed  
- Internet connection to access the API and Google Fonts  
- Modify the domain in `package.json` if running in an environment other than `localhost`

---

## Technologies

- **Frontend:** React + TypeScript  
- **Backend:** Node.js  
- **Package Management:** npm  
- **LLM Integration:** OpenRouter API (for image generation)  
- **Fonts:** Google Fonts (Anton)
