import _ from "lodash";
import React from "react";
import Card from "../Card/Card";
import styles from './Cards.module.scss';

export default class Cards extends React.Component<any, {}> {
    constructor(props: any) {
        super(props);
    }

    public render(): React.ReactElement<any> {
        let mew = new Date().getTime();
        return <div >
            {this.props.items.sorted && this.props.items.sorted.length > 0 && this.props.items.sorted.map((card: any) => {
                return <Card {...{ nowTime: mew }} {... { card: card }} {...this.props} />
            })}
        </div>;
    }
}