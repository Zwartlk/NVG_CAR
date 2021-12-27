import React from "react";
import styles from './Card.module.scss';
import { DirectionalHint, Icon, IconButton, IIconProps, initializeIcons, IRatingProps, ITooltipProps, Rating, RatingSize, TooltipHost } from "@fluentui/react";
import { Link } from "react-router-dom";
import { ImageSize, IScreenDetect } from "../../utilities/constanst/Ienum";
import moment from "moment"
import 'react-lazy-load-image-component/src/effects/blur.css';
import Slider from "../ImageSlider/Slider";
import * as Util from "../../utilities/helper/util";
import road from '../../utilities/assecs/svg/road.svg'
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
}

export default class Card extends React.Component<any, ICardStates> {
    constructor(props: any) {
        super(props);

        this.setState({
            item: {},
            rating: this.props.card.rating
        })
    }

    componentWillMount() {
        this.setState({
            item: {},
            rating: this.props.card.rating
        })
    }

    componentWillUpdate(nextProps: any) {
        if (nextProps.card.rating != this.props.card.rating)
            this.setState({
                item: {},
                rating: nextProps.card.rating
            })
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
            <Link key={'id'} to={`/Product/${card.id}`}>
                <h1>{`${card.make} ${card.model} ${card.version}`}</h1>
            </Link>
            <div className={styles.heart}>
                <IconButton
                    iconProps={item.heartCheck ? heartFillIcon : heartIcon}
                    onClick={() => { item.heartCheck = !item.heartCheck; this.setState(item) }} />
            </div>
        </div>);
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
                beak: { background: '#293845', left: 10 },
                beakCurtain: { background: '#293845' },
                calloutMain: { background: '#293845' },
            },
        };
        const tooltipProps: ITooltipProps = {
            styles: {
                content: { color: "white" },
            },
        };
        const ratingProps: IRatingProps = {
            styles: {
                ratingStarBack: {
                    color: "#6558f5",
                    ':hover': { color: '#6558f5' },
                },
                ratingStarFront: {
                    color: "#6558f5",
                    ':hover': { color: '#6558f5' },
                },
                ratingStar: {
                    color: "#6558f5",
                    ':hover': { color: '#6558f5' },
                },
            },
        };
        const { screen, card } = this.props;

        return (
            <div className={styles.container} id={"card" + card.id} >
                <div className={styles.cardinner}>
                    {screen.Is748 && this.renderTitle(card)}
                    <div className={styles.sliderContain}>
                        <div className={styles.slider} id={"card" + card.id} >
                            <Slider
                                images={this.props.card.images}
                            />
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
                                {!screen.Is748 && <img className={styles.svgdistance} src={road} />}
                                <span>{Util.formatnumber(card.mileage, 0)} km</span>
                            </div>
                            <div className={styles.numberBoard}>
                                <h2>{Util.formatnumber(card.price, 2)} - CHF</h2>
                            </div>
                            <div className={styles.rate}>
                                <TooltipHost
                                    content={`${parseFloat(card.rating).toFixed(1)} by ${card.voted} reviewer`}
                                    directionalHint={DirectionalHint.topLeftEdge}
                                    calloutProps={calloutProps}
                                    tooltipProps={tooltipProps}
                                > <Rating
                                        id={"rate_" + card.id}
                                        size={RatingSize.Large}
                                        defaultRating={this.state.rating}
                                        rating={this.state.rating}
                                        onChange={(e, rating) => { this.setState({ rating }) }}
                                        styles={ratingProps.styles}
                                        min={1}
                                        max={5}
                                    />
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