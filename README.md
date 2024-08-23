# Deploy Your Own Agentic WhatsApp Chatbot in 10 Minutes

Thanks to OpenAI's Assistant API, anybody can now build a WhatsApp chatbot that has capabilities like file retrieval and function calling, and can handle complex tasks seamlessly. When combined with automation tools like Make or IFTTT, the possibilities are endless — whether it’s managing your bookings, suggesting movies based on your mood, or even executing custom workflows. This tutorial will guide you through deploying your own agentic WhatsApp chatbot using Nuxt 3 and Vercel in just 10 minutes.

## Prerequisites

We’ll be building a movie suggestion bot that not only recommends movies based on your mood or similar to those you enjoy but also helps you keep a watchlist of movies you want to see. This bot is a simple yet powerful example of what you can achieve with the right tools and APIs.

**OpenAI API Key**: Sign up for an account on OpenAI and generate an API key. This will allow your bot to understand and respond intelligently to user queries.

**TMDb API Key**: The Movie Database (TMDb) API is a fantastic resource for fetching movie details. Sign up on TMDb and obtain an API key to enable your bot to suggest movies based on mood or similarity.

Make sure you have these keys and accounts ready before proceeding to the next steps.

## Step 1: Deploying the Template on Vercel

I’ve created a template for the movie suggestion bot, which you can find on [GitHub](https://github.com/balsimpson/WhatsAppAgenticBot). This template includes all the necessary files and configurations, so you can deploy the bot to Vercel with just a click.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbalsimpson%2FWhatsAppAgenticBot&env=WHATSAPP_ACCESS_TOKEN,OPENAI_KEY)

## Step 2: Create a KV Store on Vercel

We will use the Vercel provided KV Store to simplify keeping track of message threads and watchlist. This is not a very scalable option, but it is arguably the simplest.

- Go to your Vercel dashboard and choose `Storage`.
  ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/prioozwaufekmgwau922.png)

- Click on `Create database` and choose KV
  ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cqncqmsmw4lt7ok11jrv.png)

Choose Continue and Vercel will create a persistent Storage for you that you can access from anywhere in your app. It will also automatically add environment variables for the KV Store including `KV_REST_API_URL` and `KV_REST_API_TOKEN`. Check the project environment variables to make sure these have been det, redploy to make sure.

Go to `https://your-bot-name.vercel.app` and the frontend should show interactions you have with your bot.

## Step 3: Connect Your Meta WhatsApp Account to Vercel

Now that your bot is deployed on Vercel, the next step is to connect it to your Meta WhatsApp account by configuring a webhook. This will allow WhatsApp messages to be sent to your bot and responses to be returned.

**WhatsApp Test Number on Meta**: To interact with users on WhatsApp, you’ll need a test number. Set up a WhatsApp Business Account via Meta and configure a test number through the WhatsApp Business API.[Click here to get started](https://developers.facebook.com/apps/).

[Refer to this link to setup.](https://dev.to/balsimpson/create-a-chatgpt-whatsapp-bot-on-cyclic-in-just-5-minutes-l4a)

### Set Up a Webhook URL:

- In your Vercel dashboard, locate the deployed project.
  Find the URL for your deployment (e.g., https://your-bot-name.vercel.app).
  Note this URL, as it will be needed for the webhook configuration.

### Configure the Webhook in Meta for Developers:

- Go to the Meta for Developers portal and select your WhatsApp app.
- Navigate to the "Webhook" section under "WhatsApp."
- Click "Add Webhook" and paste your Vercel deployment URL, appending /api/webhook to it (e.g., https://your-bot-name.vercel.app/api/webhook).
- Select the specific events you want to subscribe to (choose messages).
  Save your changes.

### Verify the Webhook:

Choose anything as your verification code and click "Verify webhook". Meta will send a verification request to your webhook URL and it should get verified.

### Testing:

Send a test message to your WhatsApp Test Number to ensure everything is working correctly.

## Step 3: Setting Up the OpenAI Assistant in Playground

The next step is to setup the assistant. We'll use OpenAI's Playground to set it up and configure the bot to suggest movies, and optionally, return a list of movies with IMDb ratings and synopses.

### Access the OpenAI Playground:

- Go to the OpenAI Playground.
- Log in with your OpenAI account.

### Set Up the Assistant:

Click on Create to create a new assistant.
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5ef1hisahs25cek55jy1.png)

- Give your assistant a name. I named mine Ebert.
- Add instructions. It can be as simple as:

> You are a helpful assistant that suggests movies based on the user's mood or preferences. When asked, you also provide a list of movies with IMDb ratings and a brief synopsis. For example, if the user says they are in the mood for a thriller, suggest a few options along with their IMDb ratings and a short description.

### Set the model

Choose the model that will be used by the Assistant. `gpt-4o-mini` is the cheapest and works for most tasks.

### Create Vector Store and Add Files

The vector store is an awesome addition to the new Assistants API that required multiple steps and third-party tools to achieve what you can do now with minimal friction.

Got to [Vector store](https://platform.openai.com/storage/vector_stores) to add the files the Assistant can reference, if need be. The free tier is quite generous and you can add up to 1GB of documents without being charged. All documents will be vectorised and be available to the assistant.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/b023gt5tket28zl543y1.png)

### Add Functions

Functions is what makes Assistants so powerful. They enable you to do tasks like fetching information from an external API, or add a new row to Google Sheets using Make.com.

You can specify the properties that are required for the function to be triggered and the chatbot will ask questions till those slots are filled. before trying to execute the function.

For our chatbot we will add two functions:
`add_to_watchlist` - This function will get triggered when the user says something like "Save The Raid to my watchlist".

```
{
  "name": "add_to_watchlist",
  "description": "Adds a movie or TV show to the user's watchlist when they express interest in watching it later.",
  "strict": true,
  "parameters": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "The name of the movie or tv show that needs to be added to the watchlist"
      }
    },
    "required": [
      "name"
    ],
    "additionalProperties": false
  }
}
```

`get_movie_tvshow_details` - Function to fetch movies/ tv show details from TMDb when user says something like "Tell me more about Memento".

```
{
  "name": "get_movie_tvshow_details",
  "description": "Get more info about the movie or tv show the user asked for from TMDb",
  "strict": true,
  "parameters": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "description": "The title of the movie or tv show"
      },
      "type": {
        "type": "string",
        "description": "The type of media - movie or tv. Guess if not provided"
      }
    },
    "required": [
      "title",
      "type"
    ],
    "additionalProperties": false
  }
}
```

That's all you need to do to be up and running. Note the Assistant ID.
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gua5i8eemiz8bo27u813.png)

## Step 4: Update your code with the assistant id

Add the Assistant Id to `/server/utils/assistantConfig.ts`. You can even serve up different assistants depending on user name if you want to.

## Step 5: Verify chatbot

Go to Vercel dashboard and to your project deployment to monitor incoming requests from WhatsApp. Send a message to your chatbot and you should get a reply.

Currently the chatbot will keep a thread for 15 minutes, but you can change that in `/server/utils/assistantHelpers.ts` by changing the value of `THREAD_MAX_TIME`

## Use cases

### Capture structured info

You can capture structured responses through natural dialogue, be it for a YouTube idea to be added to Notion or adding a row to Google Sheets for your AirBnB booking.

## Output structured info
