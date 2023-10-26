import { type ArgsOf, Client, Discord, On } from "discordx"
import { removeUser, delRc, db } from "@/utils/db.js"

@Discord()
export class MemberLeft {
    @On()
    guildMemberRemove([dUser]: ArgsOf<"guildMemberRemove">, client: Client): void {
        delRc(db, parseInt(dUser.id))
        removeUser(db, parseInt(dUser.id))
    }
}
