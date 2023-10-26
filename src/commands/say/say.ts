import { Discord, Slash, SlashOption } from "discordx"
import { ApplicationCommandOptionType, CommandInteraction, GuildChannel } from "discord.js"
import { serverId } from "@/main.js"
import { getChannel } from "@/utils/get.js"
import isAdmin from "@/utils/isAdmin.js"

@Discord()
class SayCmd {
    @Slash({
        description: "Make the bot send a message in a specific channel",
        name: "say"
    })
    say(
        @SlashOption({ description: "channel to send the message in", name: "channel", type: ApplicationCommandOptionType.Channel})
        @SlashOption({ description: "what message you want to send", name: "message", type: ApplicationCommandOptionType.String })
        channel: GuildChannel,
        message: string,
        interaction: CommandInteraction
    ) {
        const member = serverId.members.cache.get(interaction.user.id)!
        if (isAdmin(member)) {
            let ch = getChannel(serverId, channel.id)
            if (ch.isTextBased()) {
                ch.send(message)
            }
            interaction.reply("sent message")
        } else {
            interaction.reply("You don't have permission to use this command")
        }
    }
}
