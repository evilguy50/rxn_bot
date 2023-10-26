import { Client, Guild, GuildBasedChannel } from "discord.js"

export function getServer(bot: Client, id: string): Guild {
    let serverCheck = bot.guilds.cache.get(id)
    if (serverCheck != undefined) {
        return serverCheck
    } else {
        throw ("invalid server id")
    }
}

export function getChannel(server: Guild, id: string): GuildBasedChannel {
    let channelCheck = server.channels.cache.get(id)
    if (channelCheck != undefined) {
        return channelCheck
    } else {
        throw ("invalid channel id")
    }
}