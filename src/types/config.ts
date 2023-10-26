export type Config = {
  token: string,
  id: string,
  admin_roles: string[],
  modules: {
    recruits: {
      online: string,
      new: string,
      welcome: string,
      levels: {
        count: number,
        role: string
      }[]
    }
  }
}