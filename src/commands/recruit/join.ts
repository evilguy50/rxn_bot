import { Discord, Slash, SlashOption } from "discordx"
import { CommandInteraction, ApplicationCommandOptionType, User, EmbedBuilder } from "discord.js"
import { newUser, addRc, db } from "@/utils/db.js"
import { addRole, removeRole } from "@/utils/roles.js"
import { config, serverId } from "@/main.js"
import { getChannel } from "@/utils/get.js"


@Discord()
class JoinCmd {
    @Slash({
        description: "Join the rxn",
        name: "join",
      })
    join(
        @SlashOption({ description: "Your xbox gamertag", name: "gamertag", type: ApplicationCommandOptionType.String })
        @SlashOption({ description: "What country you live in", name: "country", type: ApplicationCommandOptionType.String })
        @SlashOption({ description: "Who referred you to the rxn", name: "who_referred_you", type: ApplicationCommandOptionType.User })
        gamertag: string,
        country: string,
        who_referred_you: User,
        interaction: CommandInteraction
    ) {
        newUser(db, parseInt(interaction.user.id))
        addRc(db, who_referred_you, parseInt(interaction.user.id))
        removeRole(interaction.user.id, config.modules.recruits.new)
        addRole(interaction.user.id, config.modules.recruits.online)
        serverId.members.cache.get(interaction.user.id)!.setNickname(gamertag)
        let ServerWelcome = getChannel(serverId, config.modules.recruits.welcome)
        let embedMsg = new EmbedBuilder()
            .setTitle(`Added Online Role:`)
            .setFields(
                { name: 'Gamertag', value: gamertag },
                { name: 'Country', value: country }
            )
            .setColor(parseInt("c81f17", 16))
        if (ServerWelcome.isTextBased()) {
            ServerWelcome.send({ embeds: [embedMsg] })
        }
        interaction.reply({ content: 'Welcome to the server', ephemeral: true })
    }
}