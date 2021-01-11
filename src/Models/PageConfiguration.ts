export interface AccountLink
{
    Name: string,
    Url: string,
    Icon: string,
    FontColor: string,
    BackgroundColor: string
}

export interface PageConfiguration 
{
    PageName: string,
    DefaultPath: string,
    Accounts: AccountLink[]
}