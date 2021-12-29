import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Slider.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';
import _ from 'lodash';
import { DefaultButton } from '@fluentui/react';
import { ImageSize } from '../../utilities/constanst/Ienum';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

export interface IHomeStates {
    activeIndex: number;
    left: number;
    isOpen: boolean;
    slider: any;
    photoIndex: number;
}

export default class Slider extends React.Component<any, IHomeStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            slider: [],
            activeIndex: 1,
            left: 0,
            isOpen: false,
            photoIndex: 0
        };
    }

    prevSlide = () => {
        let el: any = document.getElementsByClassName('slider');
        this.setState({
            activeIndex: this.state.activeIndex - 1,
        })
        if (this.state.activeIndex === 1) {
            this.setState({
                activeIndex: this.state.activeIndex + this.props.images.length - 1,
            })
        }
    };

    nextSlide = () => {
        this.setState({
            activeIndex: this.state.activeIndex + 1,
        })
        if (this.state.activeIndex === this.props.images.length) {
            this.setState({
                activeIndex: this.state.activeIndex - this.props.images.length + 1,
            })
        }
    };

    clickIndicator = (e: any) => {
        this.setState({
            activeIndex: parseInt(e.target.textContent),
        })
    }

    public render(): React.ReactElement<any> {
        const { photoIndex, isOpen } = this.state;
        const style = {
            left: this.state.left,
            width: "100%",
            height: "100%"
        };
        const images = this.props.images.map((item: any) => { return item[ImageSize.large] });

        return (
            <div>
                <div className="slider-wrapper">
                    {
                        this.props.images.map((item: any, index: any) => {
                            let position: any = index + 1 === this.state.activeIndex ? "absolute" : "relative";
                            return (
                                <LazyLoadImage
                                    className={index + 1 === this.state.activeIndex ? 'slider-item' : 'hide'}
                                    wrapperClassName="slider"
                                    delayTime={0}
                                    style={{ position: position, left: this.state.left, cursor: "pointer" }}
                                    height={style.height}
                                    src={item[ImageSize.medium]}
                                    onClick={() => this.setState({ isOpen: true })}
                                    width={style.width} />
                            )
                        })
                    }
                </div>
                <div className="buttons-wrapper">
                    <DefaultButton className="prev-button" iconProps={{ iconName: "ChevronLeftSmall", style: { color: "white" } }} onClick={this.prevSlide} style={{ minWidth: 32 }} />
                    <DefaultButton className="next-button" iconProps={{ iconName: "ChevronRightSmall", style: { color: "white" } }} onClick={this.nextSlide} style={{ minWidth: 32 }} />
                </div>
                <div className="indicators-wrapper">
                    <ul className="indicators">
                        {
                            _.range(1, this.props.images.length + 1).map((item) => {
                                return (
                                    <li className={item === this.state.activeIndex ? 'active-indicator' : ''} onClick={(e) => { this.clickIndicator(e) }}>{item}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                {isOpen && (
                    <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                            })
                        }
                    />
                )}
            </div>
        );
    }
}