import { GuildMember } from "discord.js";
import { config } from "@/main.js";

export default function isAdmin(member: GuildMember) {
  const cache = member.roles.cache;
  let result = false;
  config.admin_roles.forEach((role) => {
    if (cache.has(role)) {
      result = true;
    }
  });
  return result;
}