const Discord = require("discord.js");

const config = require("./config.json");
const client = new Discord.Client();

on("playerConnecting", async (n, e, cwel) => {
  const src = global.source;
  cwel.defer();
  sprawdzCzyMaDC(src, async function (userId) {
    const nigg = client.guilds.cache.get(config.GUILD_ID);

    const zjebek = nigg.members.cache.get(userId);

    if (zjebek.roles.cache.has(config.WHITELISTED_ROLE_ID)) {
      return cwel.done();
    } else {
      return cwel.done(config.WIADOMOSC_BEZ_BILETU);
    }
  });
});

sprawdzCzyMaDC = async function (source, callback) {
  if (typeof source == "string") return source;
  if (!GetPlayerName(source)) return false;
  let arr = [];
  for (let index = 0; index <= GetNumPlayerIdentifiers(source); index++) {
    if (GetPlayerIdentifier(source, index)) {
      arr.push(GetPlayerIdentifier(source, index));
    }
  }
  setTimeout(() => {
    const found = arr.find((e) => e.startsWith("discord:"));
    if (found) {
      callback(found.replace("discord:", ""));
    } else {
      callback(null);
    }
  }, 500);
};

client
  .login(config.BOT_TOKEN)
  .then(`Discord Whitelist Successfully Loaded!`)
  .catch((err) => {
    const st = err.toString();
    if (st.includes("An invalid token was provided")) {
      console.log(
        "Podano zły Token. Skonfiguruj go w config.json (Token uzyskasz na stronie https://discord.com/developers/applications w zakładce Bot)"
      );
    } else {
      console.log(err);
    }
  });
