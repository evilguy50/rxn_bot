import { Discord, Slash, SlashOption } from "discordx"
import { CommandInteraction, ApplicationCommandOptionType, User, EmbedBuilder } from "discord.js"
import { getRecruits, db } from "@/utils/db.js"

@Discord()
class RecruitedCmd {
    @Slash({
        description: "Check how many people a user recruited",
        name: "recruited"
    })
    recruited(
        @SlashOption({ description: "name of recruiter", name: "recruiter", type: ApplicationCommandOptionType.User })
        user: User,
        interaction: CommandInteraction
    ) {
        let rcAmount = getRecruits(db, parseInt(user.id))!.toString()
        console.log(`RcAmount = ${rcAmount}`)
        const embedMsg = new EmbedBuilder()
            .setTitle(`Recruiter Stats:`)
            .addFields(
                { name: "amount", value: rcAmount}
            )
            .setColor(parseInt("c81f17", 16))
        interaction.reply({ embeds: [embedMsg] })
    }
}