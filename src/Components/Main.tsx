import React from "react";
import Title from './Title'
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import Home from "./Home/Home";
import Product from "./Product/Product";
import styles from './Main.module.scss';
import { IScreenDetect, ScreenDetect } from "../utilities/constanst/Ienum";
import Store from "../utilities/redux/store/store";
import * as ROUTES from '../utilities/constanst/routes';

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
            if (window.matchMedia(ScreenDetect.Is748).matches) {
                screen.Is748 = true;
            } else if (window.matchMedia(ScreenDetect.Is1024).matches) {
                screen.Is1024 = true;
            } else {
                screen.Is1980 = true;
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
                            <Route exact path={ROUTES.HOME} render={(props: any) => <Home {...this.state} {...props} />} />
                            <Route path={ROUTES.VIEW_PRODUCT} render={(props: any) => <Product {...this.state} {...props} />} />
                        </Switch>
                    </HashRouter>
                </Provider>
            </div >
        );
    }
}