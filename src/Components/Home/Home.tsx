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
        this.setState({ isOpen: true })
    }

    private _closePanel = () => {
        this.setState({ isOpen: false })
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchCards());
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
                    <div className={Classname.filter}>  <Filter {...this.props} call={this.handlefilter} /></div>
                </div>


                <Panel
                    isOpen={this.state.isOpen}
                    isHiddenOnDismiss={true}
                    onDismiss={this._closePanel}
                    isLightDismiss
                    type={PanelType.custom}
                    customWidth={PanelType.custom || PanelType.customNear ? '400px' : undefined}
                >
                    <Filter></Filter>
                </Panel>
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