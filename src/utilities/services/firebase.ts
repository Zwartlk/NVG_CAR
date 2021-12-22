import { Image } from '@fluentui/react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getStorage, ref as refSt, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, onValue, Database } from "firebase/database";
import firebaseConfig from "./config";
import { ImageSize } from '../constanst/Ienum';

class Firebase {
    private db: Database;
    constructor() {
        const app = initializeApp(firebaseConfig);
        this.db = getDatabase(app);
    }

    public async getCards(): Promise<any> {
        return new Promise((resolve, reject) => {

            const starCountRef = ref(this.db, 'items');
            return onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            });
        });
    }

    public async getProduct(id: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const starCountRef = ref(this.db, 'items/' + id);

            return onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                return resolve(data);
            });
        });
    }

    public async getImage(folder: any, name: any, size: ImageSize): Promise<any> {
        return new Promise((resolve, reject) => {
            const storage = getStorage();

            const starCountRef = refSt(storage, `images/${folder}/${name}-${size}.jpg`);
            getDownloadURL(starCountRef).then((url) => {
                // `url` is the download URL for 'images/stars.jpg'
                resolve(url);
            }).catch((error) => {
                // Handle any errors
            });
        });
    }

    public async putUrl(list: any): Promise<any> {
        list.forEach(async (el: any) => {
            let Images = [];
            for (var i = 1; i < el.imagesCount + 1; i++) {
                let urlno = await this.getImage(el.id, i, ImageSize.normal);
                let urlsm = await this.getImage(el.id, i, ImageSize.small);
                let urlmd = await this.getImage(el.id, i, ImageSize.medium);
                let urllg = await this.getImage(el.id, i, ImageSize.large);
                let image = {
                    id: i,
                    no: urlno,
                    sm: urlsm,
                    md: urlmd,
                    lg: urllg
                }
                Images.push(image);
            }
            el["images"] = Images;
        });
        console.log(list);

    }
}

const firebaseInstance = new Firebase();

export default firebaseInstance;