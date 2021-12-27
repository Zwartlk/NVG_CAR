import { Dropdown, DropdownMenuItemType, IDropdownOption, initializeIcons } from "@fluentui/react";
import _ from "lodash";
import React from "react";
import styles from './Sort.module.scss';


// Initialize icons in case this example uses them
initializeIcons();

const exampleOptions: IDropdownOption[] = [
    { key: 'check_asc', text: 'Sort by increase', itemType: DropdownMenuItemType.Header },
    { key: 'model_asc', text: 'Model', data: { icon: 'Memo' } },
    { key: 'make_asc', text: 'Make', data: { icon: 'Memo' } },
    { key: 'price_asc', text: 'Price', data: { icon: 'Print' } },
    { key: 'rating_asc', text: 'Rating', data: { icon: 'ShoppingCart' } },
    { key: 'carRegAt_asc', text: 'Date registation', data: { icon: 'ShoppingCart' } },
    { key: 'default_asc', text: 'Default', data: { icon: 'Train' } },
    { key: 'check', text: 'Sort by descrease', itemType: DropdownMenuItemType.Header },
    { key: 'model_desc', text: 'Model', data: { icon: 'Memo' } },
    { key: 'make_desc', text: 'Make', data: { icon: 'Memo' } },
    { key: 'price_desc', text: 'Price', data: { icon: 'Print' } },
    { key: 'rating_desc', text: 'Rating', data: { icon: 'ShoppingCart' } },
    { key: 'carRegAt_desc', text: 'Date registation', data: { icon: 'ShoppingCart' } },
    { key: 'default', text: 'Default', data: { icon: 'Train' } },
];

export interface ISortStates {
}

export default class Sort extends React.Component<any, ISortStates> {
    constructor(props: any) {
        super(props);
        this.setState({});
    }

    public render(): React.ReactElement<any> {
        const dropdownStyles = { dropdown: { width: '100%', minWidth: "160px" } };

        const sort = (option: any, list: any) => {
            let op = option.key.split('_');
            this.props.call(_.orderBy(list, op[0], op[1]));
        }

        return <div className={styles.container}>
            <div className={styles.block}>
                <span className={styles.label} style={{ display: this.props.screen.Is1024 || this.props.screen.Is748 ? "none" : "block" }}>
                    Sort
                </span>
                <div className={styles.sort}>
                    <Dropdown
                        placeholder={this.props.screen.Is748 ? "Sort" : "Default"}
                        onChange={(e, option) => { sort(option, this.props.items.sorted) }}
                        styles={dropdownStyles}
                        options={exampleOptions}
                    />
                </div>
            </div>
        </div>
    }
}