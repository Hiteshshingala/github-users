
export interface IUser {
    id: number,
    login: string,
    avatar_url: string,
    html_url: string,
    followers_url: string,
    events_url: string,
    type: string,
    score: number
    node_id?: string,
    gravatar_id?:string,
    url?: string,
    following_url?: string,
    gists_url?: string,
    starred_url?: string,
    subscriptions_url?: string,
    organizations_url?: string,
    repos_url?: string,
    received_events_url?: string,
    site_admin?: boolean,
}

  