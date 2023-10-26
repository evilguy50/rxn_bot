import { User } from "discord.js"
import { readFileSync, writeFileSync } from "fs"
import {config} from "../main.js"
import { removeRole, addRole } from "./roles.js"

let dbFile = "./rxn.json"
let levelList = config.modules.recruits.levels

export interface DbEntry {
    id: number,
    recruits: Array<number>
}
export interface DbJson extends Array<DbEntry> {}

export let db: DbJson = JSON.parse(readFileSync("./rxn.json", "utf-8"))
export function newUser(dbList: DbJson, user: number) {
    let newEnt: DbEntry = {id: user, recruits: []}
    let addEnt = true
    for (let u = 0; u < dbList.length; u++) {
        if (dbList[u].id == user) {
            addEnt = false
        }
    }
    if (addEnt) {
        dbList.push(newEnt)
        writeFileSync(dbFile, JSON.stringify(dbList))
    }
}

export function removeUser(dbList: DbJson, user: number) {
    dbList = dbList.filter((val: DbEntry) => {
        return val.id != user
    })
    writeFileSync(dbFile, JSON.stringify(dbList))
}

export function getRecruits(dbList: DbJson, user: number) {
    for (let u = 0; u < dbList.length; u++) {
        if (dbList[u].id == user) {
            return dbList[u].recruits.length
        }
    }
}

export function addRc(dbList: DbJson, user: User, rc: number) {
    let uIndex = -1
    let addRc = true
    for (let u = 0; u < dbList.length; u++) {
        if (dbList[u].id == parseInt(user.id)) {
            uIndex = u
        }
    }
    for (let r = 0; r < dbList[uIndex].recruits.length; r++) {
        if (dbList[uIndex].recruits[r] == rc) {
            addRc = false
        }
    }
    if (addRc) {
        dbList[uIndex].recruits.push(rc)
        writeFileSync(dbFile, JSON.stringify(dbList))
    }
    let rcNum = getRecruits(db, parseInt(user.id))!
    for (let l = 0;l < levelList.length; l++) {
        if (rcNum >= levelList[l].count) {
            addRole(user.id, levelList[l].role)
        }
    }
}

export function delRc(dbList: DbJson, rc: number) {
    for (let u = 0; u < dbList.length; u++) {
        dbList[u].recruits = dbList[u].recruits.filter((val: number) => {
            return val != rc
        })
        let rcNum = getRecruits(db, dbList[u].id)!
        for (let l = 0;l < levelList.length; l++) {
            if (rcNum < levelList[l].count) {
                removeRole(`${dbList[u].id}`, levelList[l].role)
            }
        }
    }
}