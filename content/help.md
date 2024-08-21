---
title: 'Title of the page'
description: 'meta description of the page'
---

# Deploy Your Own Agentic WhatsApp Chatbot in 10 Minutes
Thanks to OpenAI's Assistant API, you can now build a WhatsApp chatbot that has capabilities like file retrieval and function calling, and can handle complex tasks seamlessly. When combined with automation tools like Make (formerly Integromat) or IFTTT, the possibilities are endless — whether it’s managing your bookings, suggesting movies based on your mood, or even executing custom workflows. This tutorial will guide you through deploying your own agentic WhatsApp chatbot using Nuxt 3 and Vercel in just 10 minutes.

## Prerequisites
In this tutorial, we’ll be building a movie suggestion bot that not only recommends movies based on your mood or similar to those you enjoy but also helps you keep a watchlist of movies you want to see. This bot is a simple yet powerful example of what you can achieve with the right tools and APIs.

**OpenAI API Key**: Sign up for an account on OpenAI and generate an API key. This will allow your bot to understand and respond intelligently to user queries.

**TMDb API Key**: The Movie Database (TMDb) API is a fantastic resource for fetching movie details. Sign up on TMDb and obtain an API key to enable your bot to suggest movies based on mood or similarity.

**WhatsApp Test Number on Meta**: To interact with users on WhatsApp, you’ll need a test number. Set up a WhatsApp Business Account via Meta and configure a test number through the WhatsApp Business API.

Make sure you have these keys and accounts ready before proceeding to the next steps.

## Step 1: Deploying the Template on Vercel
To make things easier, I’ve created a template for the movie suggestion bot, which you can find on GitHub. This template includes all the necessary files and configurations, so you can deploy the bot to Vercel with just a few clicks.

### Clone the Template Repository:

- Visit the GitHub repository [link to your repository].
- Fork the repository to your own GitHub account.

### Deploy to Vercel:
- Go to Vercel.
- Log in or create an account if you don’t have one.
- Click on the "New Project" button.
- Import your forked repository from GitHub.
- During the setup, make sure to add the necessary environment variables (OpenAI API Key, TMDb API Key, and WhatsApp Token).
- Click "Deploy" and wait for Vercel to build and deploy your project.

![my image](/images/create_kv_store_step1.png)

## Step 2: Connecting Your Meta WhatsApp Account to Vercel
Now that your bot is deployed on Vercel, the next step is to connect it to your Meta WhatsApp account by configuring a webhook. This will allow WhatsApp messages to be sent to your bot and responses to be returned.

### Set Up a Webhook URL:

- In your Vercel dashboard, locate the deployed project.
Find the URL for your deployment (e.g., https://your-bot-name.vercel.app).
Note this URL, as it will be needed for the webhook configuration.

### Configure the Webhook in Meta for Developers:

- Go to the Meta for Developers portal and select your WhatsApp app.
- Navigate to the "Webhook" section under "WhatsApp."
- Click "Add Webhook" and paste your Vercel deployment URL, appending /api/webhook to it (e.g., https://your-bot-name.vercel.app/api/webhook).
- Select the specific events you want to subscribe to (e.g., messages).
Save your changes.

### Verify the Webhook:

Meta will send a verification request to your webhook URL.
Ensure that your Vercel deployment has the logic to handle this verification. The template should already include this functionality.
Once verified, your webhook will be live, and your bot will start receiving and responding to messages from WhatsApp.

### Testing:

Send a test message to your WhatsApp Test Number to ensure everything is working correctly.

## Step 3: Setting Up the OpenAI Assistant in Playground
We'll use OpenAI's Playground to set up the Assistant. This step will help you configure the bot to suggest movies, and optionally, return a list of movies with IMDb ratings and synopses.

### Access the OpenAI Playground:

- Go to the OpenAI Playground.
- Log in with your OpenAI account.

### Set Up the Assistant:

- Give your assistant a name. I named mine Ebert.
- Add instructions. It can be as simple as:

> You are a helpful assistant that suggests movies based on the user's mood or preferences. When asked, you also provide a list of movies with IMDb ratings and a brief synopsis. For example, if the user says they are in the mood for a thriller, suggest a few options along with their IMDb ratings and a short description.

### Create Vector Store and Add Files

Here we add the files the Assistant can reference if need be.

### Add Functions

Make the Agent do stuff. Connect to Make or IFTTT.
`Function code to add`

## Step 4: Update your code
Add the Assistant Id
Optionally add other functions 