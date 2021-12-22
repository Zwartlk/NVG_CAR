import { Image, Spinner, SpinnerSize } from "@fluentui/react";
import React from "react";
import ImageStatic from "../../utilities/assecs/static";
import { ImageSize } from "../../utilities/constanst/Ienum";
import firebaseInstance from "../../utilities/services/firebase";

export interface IImageLoaderProps {
    url: string;
}

export interface IImageLoaderStates {
    loaded: boolean;
}

export default class ImageLoader extends React.Component<IImageLoaderProps, IImageLoaderStates> {
    private _imageRef: React.RefObject<unknown>;
    constructor(props: any) {
        super(props);
        this._imageRef = React.createRef();
        this.setState({ loaded: false })
    }

    resizeImage = () => {
        let element: any = this._imageRef.current;
        if (element) {
            element.style.height = (element.offsetWidth * 3 / 5) + 'px';
        }
    }

    componentWillMount() {
        this.setState({ loaded: false })
        window.addEventListener("resize", () => {
            this.resizeImage();
        });
    }

    componentDidMount() {
        this.resizeImage();
    }

    onLoad = () => {
        this.setState({
            loaded: true
        })
    };

    public render(): React.ReactElement<any> {
        return (
            <div>
                <img ref={this._imageRef as any} onLoad={this.onLoad} src={this.props.url} />
                {
                    // !this.state.loaded && <img src={ImageStatic.getImage(0)} />
                }
            </div >
        )
    }
}





/* <div style={{
    display: "block",
    position: "absolute",
    width: "100%",
    height: "100%",
}}>
    {
        this.state.url == '' ? <Spinner size={SpinnerSize.small} /> :
            <div style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundSize: "cover",
                // overflow: "hidden",
                backgroundImage: `url(${this.state.url})`
            }}>

            </div>
    }
</div > */