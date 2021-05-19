console.log("One second to start!")
    //start

const botconfig2 = require("./botconfig.json")
const prefix = botconfig2.prefix;
const Discord = require("discord.js");
const bot = new Discord.Client({disableEverynone: true, partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const DisTube = require("distube");
const distube = new DisTube(bot, { searchSongs: true, emitNewSongOnly: true});


process.on('uncaughtException', (err) => {
    console.log(err)
});


bot.on("ready", async () => {

  await console.log(`${bot.user.username} Online Lett! ${bot.guilds.cache.size} Szerveren!`)

    bot.user.setActivity(`A fejlesztőm: pepeD#7396` , {type:"PLAYING"});
    
    var stuses = [`A fejlesztőm: Dominikkkk#7396`, ` Prefix: ${prefix}`, `Online: ${bot.guilds.cache.size} szerveren!`, `A Parancsokhoz írd be: ${prefix}help`, "ZENE FUNKCIÓ!", "ZENE FUNKCIÓ!", "ZENE FUNKCIÓ!", "ZENE FUNKCIÓ!"]
    var i = 0;


setInterval(() => {
i = i + 1;

if(i === stuses.length) {
    i  = i -stuses.length
}


bot.user.setActivity(stuses[i], {type: "PLAYING"})

}, 5000);
    });


    bot.login(tokenfile.token);


// szűrő



// Command Handler
bot.on('message', async (message) => {



  
    const blacklist = ["hulye" ,"fasz", "kurva", "geci", "g*ci", "anyád", "szar", "cigány", "k**va", "kurva", "k****", "szop", "csóró", "vaze", "waze", "k*rva", "hacked", "buzi", "b*zi", "b*z*i", "köcsög", "krva", "bzi", "szop", "sex", "szex", "sx", "porn", "pornó", "fck", "f*ck", "gci", "k*cs*g", "k*csög", "sz*r", "segg", "s*gg", "s***", "picsa", "p*csa", "p*cs*a", "punci", "p*nci", "p*nci", "fing", "f*n*", "halá", "kabbe", "kapdbe", "kapd", "fütyi", "futy", "füty", "f*tyi", "pénisz", "nemiszerv", "bitch", "b*tch", "fuck", "csóró", "cs*ró", "cs*r*", "csicska", "cs*cska", "cs*csk*"]

for (var i = 0; i <= blacklist.length; i++) {




if(message.content.toLowerCase().includes(blacklist[i])) {


message.delete({timeout: 500})
message.reply("Ezen a szerveren TILOS a káromkodás!").then(message => message.delete({timeout: 3000}))

}
}



    if(message.author.bot) return;
    if(message.content.indexOf(prefix) !==0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLocaleLowerCase();

if(message.content.startsWith(prefix + command)) console.log(`Command Runned!! \n !${command}   \n Channel:  ${message.channel.name} \n Exact Message: ${message.content}  \n Exact User name: ${message.member.user.tag} \n  Sender: ${message.author.username}   \n   Server:  ${message.guild.name}`)
    
 


 


let channel01 = message.guild.channels.cache.find(channel => channel.name === 'bot-commands')

if(!channel01) return message.reply("Nem tudom lefuttatni a parancsot, mert kitörölted a bot-commands csatornát!")


let embed2 = new Discord.MessageEmbed()       


new Discord.MessageEmbed()


embed2.setTitle("Parancs Futtatva!")
embed2.setColor("RANDOM")
embed2.addField("Parancs:", `!${command}`)
embed2.addField("Csatorna:", `${message.channel}`)
embed2.addField("Teljes Üzenet:", `${message.content}`)
embed2.addField("Küldő:",`${message.author.username}`)
.setFooter("Bot-commands: ")
.setTimestamp()





channel01.send(embed2)

// Dolgok az id-kel kapcsoltaban!  VÉGE!



    try
{
    let commandFile = require(`./parancsok/${command}.js`)
commandFile.run(bot, message, args, prefix);




} catch(err) {
    if(message.mentions.users.has(bot.user.id)) return message.channel.send("Mit Szeretnél?");
}

 client.player = player;


if (command == "play")
if(!args[0]) return message.reply("Add meg a zene címét!")
        distube.play(message, args.join(" "));

    if (["repeat", "loop"].includes(command))
        distube.setRepeatMode(message, parseInt(args[0]));

    if (command == "stop") {
        distube.stop(message);
        message.channel.send("A Zene Megállítva!");
    }

    if (command == "skip")
        distube.skip(message);

    if (command == "queue") {
        let queue = distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }

    if ([`3d`, `bassboost`, `cho`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
        let filter = distube.setFilter(message, command);
        message.channel.send("Jelenlegi filter:" + (filter || "Off"));
    }
});

bot.login(process.env.BOT_TOKEN);



// Queue status template
const status = (queue) => `Hangerő: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Ismétlés: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "Ez a Zene:" : "Off"}\` | Automatikus Zene lejátszás: \`${queue.autoplay ? "On" : "Off"}\``;

// DisTube event listeners, more in the documentation page
distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Lejátszás: \`${song.name}\` - \`${song.formattedDuration}\`\nA Zenét kérte: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Hozzá Adva: ${song.name} - \`${song.formattedDuration}\`  ${song.user} Által`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nA Zenét kérte:: ${song.user}\nJelenlegi zene: \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
   
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => {})
    .on("error", (message, e) => {
    



});





















bot.on("guildCreate", guild => {

console.log(`HOZZÁADTAK EGY SZERVERHEZ!  ehhez a szerverhez: ${guild.name}`)

guild.channels.create("bot", {
    type: "category"
})

guild.channels.create("Javaslatok", {
    type: "text"
}).then((channel) =>{

    let cuccli2 = guild.channels.cache.find(category => category.name === 'bot')
    channel.setParent(cuccli2)

})


guild.channels.create("bot-commands", {
    type: "text"
})
.then((channel) => {

    let cuccli = guild.channels.cache.find(category => category.name === 'bot')


    let valami = cuccli.id
    
    channel.setParent(valami)






    let embed = new Discord.MessageEmbed()


    .setTitle("Köszönöm, hogy hozzáadtál a szerveredhez!")
    .setColor("RANDOM")
    .addField("A fejlesztőm: pepeD#7396", "Ha valami hibát észlelsz akkor neki küldj egy barát kérelmet!")
    .addField("A bothoz gyakran vannak frissítések", "kb olyan 2-3 naponta kerülnek belém parancsok!")
    .addField("Néha offline is vagyok.", "Ezért bocsánat!")
    .addField("Ebbe a csatornába fogom majd írni, ha valami parancsot le futtattál!", "Ezt a csatornát ne töröld ki!")
    .setFooter("Hozzáadtál:")
    .setTimestamp();
    
    channel.send(embed)



    channel.send("Ezt a csatornát TILOS kitörölni!, mert akkor nem fogsz tudni használni!")






})


guild.channels.create("Fontos", {
    type: "category"
})


guild.channels.create("hirek-bot", {
    type: "text"
}).then((channel) => {

let Fontos = guild.channels.cache.find(category => category.name === 'Fontos')

let FontosID = Fontos.id;

channel.setParent(FontosID)


guild.channels.create("üdvözlő-búcsúzó", {
    type: "text"
}).then((channel) => {

let Fontos = guild.channels.cache.find(c => c.name === 'Fontos')

let FontosID = Fontos.id;


channel.setParent(FontosID)



})



})




});






bot.on("guildMemberAdd", (member, guild) => {

    let roleCucc = member.guild.roles.cache.find(role => role.name === 'Játékos')

let channel01 = member.guild.channels.cache.find(channel => channel.name === 'üdvözlő-búcsúzó')

if(!channel01) return

if(!roleCucc) return 

let embed = new Discord.MessageEmbed()


.setTitle(`${member.user.tag} Csatlakozott A szerverhez!`)
.setDescription(`${member.user} Ne felejtsd el elolvasni a Szabályokat!`)
.addField(`${member.user.username} Veled együtt már`, `${member.guild.memberCount} Ember Van a Szerveren!`)
.setThumbnail(member.user.displayAvatarURL())
.setFooter(`${bot.user.username} Szerver Statisztika`,bot.user.displayAvatarURL())
.setTimestamp();

channel01.send(embed)
member.roles.add(roleCucc)

});
