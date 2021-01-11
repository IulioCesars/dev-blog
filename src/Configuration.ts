import { PageConfiguration } from "./Models/PageConfiguration";
import moment from 'moment';

export class Configuration {
    public static GetDateInDefaultFormat(date: Date) {
        return moment(date).format("DD/MM/yyyy");
    }

    public static GetPageConfiguration() : PageConfiguration 
    {
        return {
            PageName: 'Dev Blog',
            DefaultPath: '/',
            Accounts: [
                { Name: 'Twitter', Url: 'https://twitter.com/IulioCesars', BackgroundColor: '#52a2f3', FontColor: 'white', Icon:'' },
                { Name: 'Github', Url: 'https://github.com/IulioCesars', BackgroundColor: 'gray', FontColor: 'white', Icon:'' },
            ]
        }
    }
}