const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const PORT = 3000;

const app = express();
app.listen(PORT, () => console.log('Server running on port ' + PORT));

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Global variable to store the latest message content
let latestMessage = '';

// Replace with your Discord bot token
const DISCORD_TOKEN = 'MTMyMjQ3NjEyMjg3NjY3ODE3NA.GtMM9r.R3OYs1IFyhZ9mEIfjuqH5HAFIEAn3_thE2T_bI'; // Don't share your token publicly

client.once('ready', () => {
    console.log('Bot is ready!');
});

// Listen for new messages
client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    // Update the global variable with the new message content
    latestMessage = message.content;
    console.log(`New message: ${latestMessage}`);
});

// Set up the Express route to return the latest message content
setInterval(() => {
    // Here you can fetch new data or update `latestMessage` manually
    app.get('/opgamer', (req, res) => {
        res.json({ message: latestMessage });
    });    // Optionally, you can simulate changes or fetch new content if required
}, 10000);

client.login(DISCORD_TOKEN);