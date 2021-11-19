export enum ChannelsEnum {
 Pos='Pos',
 Web='Web',
 Mobile='Mboile',
 Atm='Atm'
}

export const channels: Readonly<string[]> = [ChannelsEnum.Pos, ChannelsEnum.Web, ChannelsEnum.Mobile, ChannelsEnum.Atm]