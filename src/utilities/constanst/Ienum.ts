export enum ScreenDetect {
    Is1024 = 1,
    Is748 = 2
}

export enum ImageSize {
    normal = '',
    small = 'sm',
    medium = 'md',
    large = 'lg'
}

export interface IScreenDetect {
    Is1024?: Boolean,
    Is748?: Boolean
}