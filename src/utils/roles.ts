import "discord.js"
import { serverId } from "../main.js"

export function addRole(user: string, roleId: string) {
    let role = serverId.roles.cache.get(roleId)!
    let member = serverId.members.cache.get(user)!
    member.roles.add(role).catch(console.error)
}

export function removeRole(user: string, roleId: string) {
    let role = serverId.roles.cache.get(roleId)!
    try {
        let member = serverId.members.cache.get(user)!
        member.roles.remove(role)
    } catch {
        console.log("invalid user / role")
    }
}
