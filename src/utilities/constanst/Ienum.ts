export enum ScreenDetect {
    Is1024 = "(max-width: 1024px)",
    Is748 = "(max-width: 748px)"
}

export enum ImageSize {
    normal = '',
    small = 'sm',
    medium = 'md',
    large = 'lg'
}

export interface IScreenDetect {
    Is1024?: Boolean,
    Is748?: Boolean,
    Is1980?: Boolean,
}