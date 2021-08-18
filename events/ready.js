const { client } = require('../main.js');
const { mongo_url }= require("../settings/secret.json");
const chalk = require("chalk");
const muteModel = require('../models/mute');
const mongoose = require("mongoose");

client.on("ready", async () => {

    var figlet = require('figlet');
 
    figlet('Cub0rd Assistant', function(err, data) {
        if (err) {
            console.log('Error has been present');
            console.dir(err);
            return;
        }
        console.log(data)
    });

    console.log(chalk.bold(`Sucessfully loaded on Discordians [BETA] v.1.0.0 ✔️`));

    mongoose.connect(mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
})

    setInterval(async () => {
        for (const guild of client.guilds.cache) {
            const muteArray = await muteModel.find({
                guildID: guild[0],
            })
    
            for (const muteDoc of muteArray) {
                if (Date.now() >= Number(muteDoc.length)) {
                    const guild = client.guilds.cache.get(muteDoc.guildID)
                    const member = guild ? guild.members.cache.get(muteDoc.memberID) : null
                    const muteRole = guild ? guild.roles.cache.find(r => r.name == 'Muted') : null
    
                    if (member) {
                        await member.roles.remove(muteRole ? muteRole.id : '').catch(err => console.log(err))
                        
                        for (const role of muteDoc.memberRoles) {
                            await member.roles.add(role).catch(err => console.log(err))
                        }
                    }
    
                    await muteDoc.deleteOne().catch(err => console.log(err))
                }
            }
        }
    }, 60000)

    await client.user.setActivity("oofquest is pro!", {type: "WATCHING"})

});
