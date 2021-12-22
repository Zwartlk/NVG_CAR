import { DefaultButton, Dropdown, DropdownMenuItemType, Icon, IconType, IDropdownOption, IIconProps, IImageProps, ImageFit, initializeIcons, Stack } from "@fluentui/react";
import { url } from "inspector";
import React from "react";
import styles from './Product.module.scss';
import logo from '../Card/images/2-lg.jpg'
import phone from '../../utilities/assecs/svg/phone.svg'
import { connect } from "react-redux";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import _ from "lodash";
import { getProduct } from "../../utilities/redux/actions/product.action";
import ImageLoader from "../ImageLoader/ImageLoader";
import { ImageSize } from "../../utilities/constanst/Ienum";

// Initialize icons in case this example uses them
initializeIcons();

const exampleOptions: IDropdownOption[] = [
    { key: 'Header', text: 'Options', itemType: DropdownMenuItemType.Header },
    { key: 'A', text: 'Option a', data: { icon: 'Memo' } },
    { key: 'B', text: 'Option b', data: { icon: 'Print' } },
    { key: 'C', text: 'Option c', data: { icon: 'ShoppingCart' } },
    { key: 'D', text: 'Option d', data: { icon: 'Train' } },
    { key: 'E', text: 'Option e', data: { icon: 'Repair' } },
    { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
    { key: 'Header2', text: 'More options', itemType: DropdownMenuItemType.Header },
    { key: 'F', text: 'Option f', data: { icon: 'Running' } },
    { key: 'G', text: 'Option g', data: { icon: 'EmojiNeutral' } },
    { key: 'H', text: 'Option h', data: { icon: 'ChatInviteFriend' } },
    { key: 'I', text: 'Option i', data: { icon: 'SecurityGroup' } },
    { key: 'J', text: 'Option j', data: { icon: 'AddGroup' } },
];
export interface IProductProps {

}
export interface IProductStates {
    indexImage: number;
}
class Product extends React.Component<any, IProductStates> {
    private _ref: any;
    constructor(props: any) {
        super(props);
        this.setState({ indexImage: 0 });
        this._ref = React.createRef();
    }

    componentWillMount() {
        const { dispatch } = this.props;
        this.setState({ indexImage: 0 });
        dispatch(getProduct(this.props.match.params.id));
    }

    private grabToMove = () => {
        const slider = this._ref.current;
        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        slider.addEventListener('mousedown', (e: any) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mousemove', (e: any) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            slider.scrollLeft = scrollLeft - walk;
            console.log(walk);
        });
    }

    componentDidMount() {
        this.grabToMove();
    }

    public render(): React.ReactElement<IProductProps> {
        const calendar: IIconProps = {
            iconName: 'Calendar',
            styles: {
                root: { fontWeight: 600, fontSize: '2rem' }
            }
        };
        const phoneIcon: IIconProps = {
            iconName: 'Phone',
            styles: {
                root: { fontWeight: 600, fontSize: '2rem' }
            },
            iconType: IconType.Image,
            imageProps: { src: phone, imageFit: ImageFit.cover, width: 15 },
        };
        const mailIcon: IIconProps = {
            iconName: 'MailSolid',
            styles: {
                root: { color: "#6558f5" }
            }
        };
        const preIcon: IIconProps = {
            iconName: 'ChevronLeftMed',
            styles: {
                root: { color: "#6558f5" }
            }
        };
        const nextIcon: IIconProps = {
            iconName: 'ChevronRight',
            styles: {
                root: { color: "#6558f5" }
            }
        };

        let item = this.props.item.product ? this.props.item.product : {};

        const addSkeleton = (div: any, count: number, heigth?: any) => {
            return !_.isEmpty(item) ? div : <Skeleton height={heigth} count={count} />
        }

        return <div className={styles.container}>
            <div className={styles.buttonNav}>
                <DefaultButton
                    toggle
                    text={"Previous"}
                    iconProps={preIcon}
                    className="sss"
                    // onClick={setMuted}
                    allowDisabledFocus
                />
                <DefaultButton
                    toggle
                    text={"Next"}
                    iconProps={nextIcon}
                    //iconProps={muted ? volume0Icon : volume3Icon}
                    // onClick={setMuted}
                    allowDisabledFocus
                />
            </div>

            <div className={styles.block}>
                <div className={styles.imageContain}>
                    <div className={styles.image_flexColumn}>
                        <div className={styles.image_large}>
                            <div className={styles.image_large_view}>
                                {item.id && <ImageLoader url={item.images[this.state.indexImage][ImageSize.medium]} />}
                            </div>
                        </div>
                        <div className={styles.image_small} ref={this._ref}>
                            {
                                item.imagesCount && item.images.map((v: any, i: any) => {
                                    return <div className={styles.image_small_view} onClick={() => { this.setState({ indexImage: i }); }}>
                                        <ImageLoader url={v[ImageSize.small]} />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className={styles.infor}>
                    {
                        addSkeleton(
                            <div>
                                <div className={styles.title_heart}>
                                    <h1>{`${item.make} ${item.model} ${item.version}`}</h1>
                                </div>
                                <div className={styles.spectify}>
                                    <div className={styles.calendar}>
                                        <Icon iconName={calendar.iconName} styles={calendar.styles} />
                                        <span>{moment(item.addedAt).format('MM.YYYY')}</span>
                                    </div>
                                    <div className={styles.distance}>
                                        <svg viewBox="-5 -5 60 60" fill="#293845" className={styles.svgdistance}>
                                            <g>
                                                <path d="M44.827,41.545L27.634,1.869c-0.312-0.726-1.028-1.195-1.817-1.195h-1.322v5.07c0,1.095-0.889,1.984-1.984,1.984    c-0.004,0-0.009-0.001-0.013-0.001s-0.009,0.001-0.013,0.001c-1.097,0-1.984-0.889-1.984-1.984v-5.07h-1.323    c-0.791,0-1.506,0.469-1.82,1.195L0.164,41.545c-0.266,0.611-0.206,1.316,0.162,1.877c0.368,0.56,0.991,0.896,1.659,0.896h18.514    v-7.716c0-1.097,0.888-1.982,1.984-1.982c0.004,0,0.009,0.002,0.013,0.002s0.009-0.002,0.013-0.002    c1.096,0,1.983,0.888,1.983,1.982v7.716h18.517c0.668,0,1.291-0.337,1.657-0.896C45.033,42.861,45.093,42.156,44.827,41.545z     M24.49,26.314c0,1.099-0.889,1.982-1.983,1.982c-0.004,0-0.009,0-0.013,0c-0.003,0-0.009,0-0.013,0    c-1.097,0-1.984-0.887-1.984-1.982V16.03c0-1.095,0.887-1.984,1.984-1.984c0.004,0,0.009,0.001,0.013,0.001    s0.009-0.001,0.013-0.001c1.098,0,1.983,0.889,1.983,1.984V26.314z" />
                                            </g>
                                        </svg>
                                        <span>{item.mileage} km</span>
                                    </div>
                                    <div className={styles.numberBoard}>
                                        <h2>{item.price} - CHF</h2>
                                    </div>
                                </div>
                            </div>, 1, 450)
                    }
                </div>

                <div className={styles.description}>
                    <div className={styles.label}>
                        <h1>Description</h1>
                    </div>
                    {
                        addSkeleton(
                            <div className={styles.description_value}>
                                <span>{item.description}</span>
                            </div>, 3)
                    }
                </div>


                <div className={styles.equipment}>
                    <div className={styles.label}>
                        <h1>Equipment</h1>
                    </div>
                    {
                        addSkeleton(
                            <div className={styles.equipment_value}>
                                {item.equipment && item.equipment.map((e: any) => { return <div>{e}</div> })}
                            </div>, 3)
                    }
                </div>

                <div className={styles.seller}>
                    <div className={styles.label}>
                        <h1>Seller</h1>
                    </div>
                    <div className={styles.company}>
                        <h2>{item.sellerCompany}</h2>
                        <span>{item.sellerName}</span>
                    </div>
                    <div className={styles.contact}>
                        <DefaultButton
                            toggle
                            text={"email"}
                            iconProps={mailIcon}
                            // onClick={setMuted}
                            allowDisabledFocus
                        />
                        <DefaultButton
                            toggle
                            text={"call"}
                            iconProps={phoneIcon}
                            // onClick={setMuted}
                            allowDisabledFocus
                        />
                    </div>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state: any) => {
    return {
        item: state.handleProduct,
    };
};

export default connect(mapStateToProps)
    (Product);