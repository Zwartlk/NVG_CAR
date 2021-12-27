import { List } from "@fluentui/react";
import React, { Suspense } from 'react';
import _ from "lodash";
import Card from "../Card/Card";
//const Card = React.lazy(() => import('../Card/Card'));
//using suspense

export default class Cards extends React.Component<any, {}> {

    private slider: any;
    constructor(props: any) {
        super(props);
        this.slider = React.createRef();
    }

    public render(): React.ReactElement<any> {
        let ROW_PER_PAGE = 3;

        let _onRenderCell = (item: any): JSX.Element => {
            return (<Card  {... { card: item }} {...this.props} />)
        }

        let _getPageHeight = () => {
            console.log(this.slider);
            return this.slider.current._visibleRect.height;
        }

        let _getItemCountForPage = () => {
            return ROW_PER_PAGE;
        }

        return <List
            ref={this.slider}
            getPageHeight={_getPageHeight}
            items={this.props.items.sorted}
            getItemCountForPage={_getItemCountForPage as any}
            renderedWindowsAhead={0}
            onRenderCell={_onRenderCell}
        />
    }
}