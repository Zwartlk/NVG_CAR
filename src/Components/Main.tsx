import React from "react";
import Title from './Title'
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import Home from "./Home/Home";
import Product from "./Product/Product";
import styles from './Main.module.scss';
import * as _ from 'lodash'
import { IScreenDetect, ScreenDetect } from "../utilities/constanst/Ienum";
import Store from "../utilities/redux/store/store";

export interface IMainProps {
    description: string;
}
export interface IMainStates {
    screen: IScreenDetect;
}


export default class Main extends React.Component<any, IMainStates>  {
    private store;
    constructor(props: any) {
        super(props);
        this.store = Store.create();
    }

    componentWillMount() {
        const screenDetect = () => {
            let screen: IScreenDetect = {};
            if (window.matchMedia("(max-width: 748px)").matches) {
                screen.Is748 = true;
            } else if (window.matchMedia("(max-width: 1024px)").matches) {
                screen.Is1024 = true;
            }
            return screen;
        }
        this.setState({
            screen: screenDetect()
        });
        window.addEventListener("resize", () => {
            this.setState({
                screen: screenDetect()
            });
        });
    }

    render() {
        return (
            <div className={styles.main}>
                <Provider store={this.store}>
                    <Title className={styles.logotitle} ></Title>
                    <HashRouter>
                        <Switch>
                            <Route exact path="/" render={(props: any) => <Home {...this.state} {...props} />} />
                            <Route path="/Product/:id" render={(props: any) => <Product {...this.state} {...props} />} />
                        </Switch>
                    </HashRouter>
                </Provider>
            </div >
        );
    }
}