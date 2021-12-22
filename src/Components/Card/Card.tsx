import React from "react";
import styles from './Card.module.scss';
import SimpleImageSlider from "react-simple-image-slider";
import { Checkbox, DefaultButton, DirectionalHint, Icon, IconButton, IIconProps, IIconStyleProps, IIconStyles, initializeIcons, IRatingStyles, ITooltipHostStyles, ITooltipProps, Rating, RatingSize, TooltipHost } from "@fluentui/react";
import { Link } from "react-router-dom";
import { ImageSize, IScreenDetect } from "../../utilities/constanst/Ienum";
import moment from "moment"
import firebaseInstance from "../../utilities/services/firebase";
import ImageStatic from "../../utilities/assecs/static";
// static

// Initialize icons in case this example uses them
initializeIcons();

export interface ICardProps {
    photo?: string;
    screen: IScreenDetect;
}
export interface ICardStates {
    item: any;
    screen: boolean;
    images: any;
    rating: any;
    check: any;
}

export default class Card extends React.Component<any, ICardStates> {
    private defaults = [
        { url: ImageStatic.getImage() },
        { url: ImageStatic.getImage() },
        { url: ImageStatic.getImage() },
    ];
    constructor(props: any) {
        super(props);

        this.setState({
            item: {},
            rating: this.props.card.rating
        })
    }

    componentWillMount() {
        let images = this.props.card.images.map((im: any) => {
            { return { url: im[ImageSize.medium] } };
        });
        this.setState({
            item: {},
            images: images,
            check: false
        })
    }

    componentWillUpdate(nextProps: any, nextState: any) {
        if (nextProps.nowTime != this.props.nowTime) {
            this.setState({
                item: {},
                rating: this.props.card.rating,
                check: true,
                images: nextProps.card.images.map((im: any) => {
                    { return { url: im[ImageSize.medium] } };
                })
            })

            // setTimeout(() => {
            //     this.setState({
            //         item: {},
            //         rating: this.props.card.rating,
            //         check: true
            //     })
            // }, 200);
        }
    }

    public renderTitle = (card: any) => {
        const { item } = this.state;
        const heartIcon: IIconProps = {
            iconName: 'Heart',
            styles: {
                root: { color: 'red', fontWeight: 600, fontSize: 35 }
            }
        };
        const heartFillIcon: IIconProps = {
            iconName: 'HeartFill',
            styles: {
                root: { color: 'red', fontWeight: 600, fontSize: 35 }
            }
        };

        return (<div className={styles.title_heart}>
            <Link key={'id'} to={`/Product/${card.id - 1}`}>
                <h1>{`${card.make} ${card.model} ${card.version}`}</h1>
            </Link>
            <div className={styles.heart}>
                <IconButton
                    iconProps={item.heartCheck ? heartFillIcon : heartIcon}
                    onClick={() => { item.heartCheck = !item.heartCheck; this.setState(item) }} />
            </div>
        </div>);
    }

    renderImage = () => {
        const ImageSliderStyle = { width: '100%', height: '100%' }

        let images = this.props.card.images.map((im: any) => {
            { return { url: im[ImageSize.medium] } };
        });
        // if (this.state.images) {
        //     // let images = this.state.images.map((im: any) => {
        //     //     { return { url: im[ImageSize.medium] } };
        //     // });
        //     ou.push(<SimpleImageSlider
        //         //autoPlay={true}
        //         width={ImageSliderStyle.width}
        //         height={ImageSliderStyle.height}
        //         images={this.state.images}
        //         showBullets={true}
        //         showNavs={true}
        //     />);
        // } else {
        //     return null;
        // }

        return (<SimpleImageSlider
            //autoPlay={true}
            width={ImageSliderStyle.width}
            height={ImageSliderStyle.height}
            images={images}
            showBullets={true}
            showNavs={true}
        />);
    }


    public render(): React.ReactElement<ICardProps> {
        const calendar: IIconProps = {
            iconName: 'Calendar',
            styles: {
                root: { fontWeight: 600, fontSize: '2rem' }
            }
        };
        const calloutProps = {
            gapSpace: 0,
            styles: {
                beak: { background: '#293845' },
                beakCurtain: { background: '#293845' },
                calloutMain: { background: '#293845' },
            },
        };
        const hostStyles: ITooltipProps = {
            styles: { content: { color: "white" } }
        };
        const { screen, card } = this.props;

        return (
            <div className={styles.container} id={"card" + card.id} >
                <div className={styles.cardinner}>
                    {screen.Is748 && this.renderTitle(card)}
                    <div className={styles.sliderContain}>
                        <div className={styles.slider} id={"card" + card.id} >
                            {this.renderImage()}
                        </div>
                    </div>
                    <div className={styles.infor}>
                        {!screen.Is748 && this.renderTitle(card)}
                        <div className={styles.spectify}>
                            <div className={styles.calendar}>
                                {!screen.Is748 && <Icon iconName={calendar.iconName} styles={calendar.styles} />}
                                <span>{moment(card.addedAt).format('MM.YYYY')}</span>
                            </div>
                            <div className={styles.distance}>
                                {!screen.Is748 && <svg viewBox="-5 -5 60 60" fill="#293845" className={styles.svgdistance}>
                                    <g>
                                        <path d="M44.827,41.545L27.634,1.869c-0.312-0.726-1.028-1.195-1.817-1.195h-1.322v5.07c0,1.095-0.889,1.984-1.984,1.984    c-0.004,0-0.009-0.001-0.013-0.001s-0.009,0.001-0.013,0.001c-1.097,0-1.984-0.889-1.984-1.984v-5.07h-1.323    c-0.791,0-1.506,0.469-1.82,1.195L0.164,41.545c-0.266,0.611-0.206,1.316,0.162,1.877c0.368,0.56,0.991,0.896,1.659,0.896h18.514    v-7.716c0-1.097,0.888-1.982,1.984-1.982c0.004,0,0.009,0.002,0.013,0.002s0.009-0.002,0.013-0.002    c1.096,0,1.983,0.888,1.983,1.982v7.716h18.517c0.668,0,1.291-0.337,1.657-0.896C45.033,42.861,45.093,42.156,44.827,41.545z     M24.49,26.314c0,1.099-0.889,1.982-1.983,1.982c-0.004,0-0.009,0-0.013,0c-0.003,0-0.009,0-0.013,0    c-1.097,0-1.984-0.887-1.984-1.982V16.03c0-1.095,0.887-1.984,1.984-1.984c0.004,0,0.009,0.001,0.013,0.001    s0.009-0.001,0.013-0.001c1.098,0,1.983,0.889,1.983,1.984V26.314z" />
                                    </g>
                                </svg>}
                                <span>{card.mileage} km</span>
                            </div>
                            <div className={styles.numberBoard}>
                                <h2>{card.price} - CHF</h2>
                            </div>
                            <div className={styles.rate}>
                                <TooltipHost
                                    content={`${parseFloat(card.rating).toFixed(1)} by ${card.voted} reviewer`}
                                    directionalHint={DirectionalHint.topLeftEdge}
                                    calloutProps={calloutProps}
                                    tooltipProps={hostStyles}
                                ><div>  <Rating
                                    id={"rate_" + card.id}
                                    size={RatingSize.Large}
                                    defaultRating={card.rating}
                                    rating={card.rating}
                                    min={1}
                                    max={5}
                                /></div>

                                </TooltipHost>

                            </div>
                        </div>
                        <div className={styles.create}>
                            <span>{moment(card.carRegAt).format('MM.YYYY')}</span>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}