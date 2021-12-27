import { DefaultButton, IIconProps, Panel, PanelType } from "@fluentui/react";
import React from "react";
import { connect } from "react-redux";
import { fetchCards, fetchFilter } from "../../utilities/redux/actions/cards.actions";
import Cards from "../Cards/Cards";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";
import Classname from './Home.module.scss';

export interface IHomeStates {
    isOpen: boolean;
    data: Array<any>;
}

class Home extends React.Component<any, IHomeStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            isOpen: false,
            data: this.props.items.cards
        };
    }

    private _openPanel = () => {
        document.body.style.overflow = "hidden";
        this.setState({ isOpen: true })
    }

    private _closePanel = () => {
        document.body.style.overflow = "auto";
        this.setState({ isOpen: false })
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchCards());
        window.addEventListener("resize", () => {
            if (this.props.screen.Is1980) {
                this.setState({ isOpen: false })
            }
        });
    }

    handlefilter = (data: any) => {
        const { dispatch } = this.props;
        dispatch(fetchFilter(data));
    }

    public render(): React.ReactElement<any> {
        const volume0Icon: IIconProps = {
            iconName: 'Filter', styles: {
                root: { color: "#6558f5" }
            }
        };
        const clearIcon: IIconProps = { iconName: 'Clear' };
        const volume3Icon: IIconProps = { iconName: 'Volume3' };

        return (
            <div className={Classname.container} >

                <div className={Classname.infor}>
                    <Cards  {...this.props} />
                </div>

                <div className={Classname.sortfilter}>
                    <div className={Classname.mobile_panel}>
                        <DefaultButton
                            toggle
                            text={'Filters'}
                            iconProps={true ? volume0Icon : volume3Icon}
                            onClick={this._openPanel}
                            allowDisabledFocus
                        />
                    </div>
                    <div className={Classname.sort}> <Sort {...this.props} call={this.handlefilter} /></div>
                    <DefaultButton
                        style={{ display: this.state.isOpen ? "block" : "none", zIndex: 4, border: 0, top: 0, position: "fixed", right: 0 }}
                        toggle
                        text={''}
                        iconProps={clearIcon}
                        onClick={this._closePanel}
                        allowDisabledFocus
                    />
                    <div className={this.state.isOpen ? Classname.filter_panel : Classname.filter}>  <Filter {...this.props} call={this.handlefilter} /></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        items: state.handleCards,
    };
};

export default connect(mapStateToProps)
    (Home);