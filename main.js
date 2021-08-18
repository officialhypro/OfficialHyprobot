const Discord = require("discord.js");
const client = new Discord.Client({ ws: { properties: { $browser: "Discord iOS" }} }); // if you dont want the bot status to be on mobile remove { ws: { properties: { $browser: "Discord iOS" }}  ok cool
const info = require("./configure/secret.json");

client.commands = new Discord.Collection();

const lib = require("./lib/functions");
lib.setup(client);

module.exports.client = client;

client.login(info.token);
