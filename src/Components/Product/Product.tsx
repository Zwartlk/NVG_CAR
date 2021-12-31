import { DefaultButton, DropdownMenuItemType, Icon, IDropdownOption, IIconProps, ImageFit, initializeIcons } from "@fluentui/react";
import React from "react";
import styles from './Product.module.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';
import phone from '../../utilities/assecs/svg/phone.svg'
import { connect } from "react-redux";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { getProduct } from "../../utilities/redux/actions/product.action";
import { ImageSize } from "../../utilities/constanst/Ienum";
import LoadingBar from 'react-top-loading-bar'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import road from '../../utilities/assecs/svg/road.svg'
import * as Util from "../../utilities/helper/util";
import _ from "lodash";

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
    id: number;
}
var executed = false;
class Product extends React.Component<any, IProductStates> {
    private _ref: any;
    private _refBar: any;
    constructor(props: any) {
        super(props);
        this.setState({ indexImage: 0 });
        this._ref = React.createRef();
        this._refBar = React.createRef();
    }

    componentWillMount() {
        const { dispatch } = this.props;
        this.setState({ indexImage: 0 });
        dispatch(getProduct(this.props.match.params.id));
    }

    componentWillUpdate(nextProps: any) {
        if (nextProps.match.params.id != this.props.match.params.id) {
            const { dispatch } = this.props;
            dispatch(getProduct(nextProps.match.params.id));
        }
    }

    componentDidMount() {
        this.grabToMove();
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
        document.title = item.make ? `${item.make} ${item.model} ${item.version}` : 'My awesome car';

        const addSkeleton = (div: any, count: number, heigth?: any) => {
            return !_.isEmpty(item) ? div : <Skeleton height={heigth} count={count} />
        }

        if (this.props.item.error) {
            let showError = (() => {
                return () => {
                    if (!executed) {
                        executed = true;
                        toast.error(`${this.props.item.error}`, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            onClose: () => { window.location = "" as any }
                        });
                    }
                };
            })();
            showError();
        } else {
            if (this._refBar.current)
                this._refBar.current.complete();
        }

        return <div className={styles.container}>
            <LoadingBar color="#6558f5" ref={this._refBar} shadow={true} />
            <div className={styles.buttonNav}>
                <Link key={'id'} to={`/Product/${item.id == 1 ? 9 : item.id - 1}`} style={{ display: "contents" }}>
                    <DefaultButton
                        toggle
                        text={"Previous"}
                        iconProps={preIcon}
                        id="prev"
                        onClick={(e) => { e.stopPropagation(); }}
                        allowDisabledFocus
                    />
                </Link>
                <Link key={'id'} to={`/Product/${item.id == 9 ? 1 : item.id + 1}`} style={{ display: "contents" }}>
                    <DefaultButton
                        toggle
                        text={"Next"}
                        iconProps={nextIcon}
                        id="next"
                        allowDisabledFocus
                    />
                </Link>
            </div>

            <div className={styles.block}>
                <div className={styles.imageContain}>
                    <div className={styles.image_flexColumn}>
                        <div className={styles.image_large}>
                            <div className={styles.image_large_view}>
                                {item.id && <LazyLoadImage
                                    delayTime={0}
                                    placeholderSrc={item.images[this.state.indexImage][ImageSize.small]}
                                    effect="blur"
                                    src={item.images[this.state.indexImage][ImageSize.medium]} />}
                            </div>
                        </div>
                        <div className={styles.image_small} ref={this._ref}>
                            {
                                item.imagesCount && item.images.map((v: any, i: any) => {
                                    return <div className={styles.image_small_view} onClick={() => { this.setState({ indexImage: i }); }}>
                                        <LazyLoadImage
                                            delayTime={0}
                                            placeholderSrc={v[ImageSize.small]}
                                            effect="blur"
                                            src={v[ImageSize.small]} />
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
                                        <img className={styles.svgdistance} src={road} />
                                        <span>{Util.formatnumber(item.mileage, 0)} km</span>
                                    </div>
                                    <div className={styles.numberBoard}>
                                        <h2>{Util.formatnumber(item.price, 2)} - CHF</h2>
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
                                {item.equipment && _.orderBy(item.equipment, undefined, 'asc').map((e: any) => { return <div>{e}</div> })}
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
                            onClick={() => window.open(`mailto:${item.sellerEmail}`)}
                            allowDisabledFocus
                        />
                        <DefaultButton
                            toggle
                            text={"call"}
                            iconProps={phoneIcon}
                            onClick={() => { window.open(`tel:${item.sellerPhone}`, '_self') }}
                            allowDisabledFocus
                        />
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
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