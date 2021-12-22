import static1 from './1-md.webp'
import static2 from './2-md.webp'
import static3 from './3-md.webp'
import static4 from './4-md.webp'
import static5 from './5-md.webp'
import static6 from './6-md.webp'
import static7 from './7-md.webp'
import static8 from './8-md.webp'
import static9 from './9-md.webp'
import Noimage from './NoImage.png'

export default class ImageStatic {
    public static getImage(id?: any) {
        let st = id ? id : 0
        switch (id) {
            case 1:
                return static1
            case 2:
                // code block
                return static2
            case 3:
                // code block
                return static3
            case 4:
                // code block
                return static4
            case 5:
                // code block
                return static5
            case 6:
                // code block
                return static6
            case 7:
                // code block
                return static7
            case 8:
                // code block
                return static8
            case 9:
                // code block
                return static9
            default:
                // code block
                return Noimage
        }
    }
};