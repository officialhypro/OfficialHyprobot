const Discord = require("discord.js");
const client = new Discord.Client();
const info = require("./configure/secret.json");

client.commands = new Discord.Collection();

const lib = require("./lib/functions");
lib.setup(client);

module.exports.client = client;

client.login(info.token);
