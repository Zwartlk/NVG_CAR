import { Checkbox, ComboBox, DatePicker, defaultDatePickerStrings, IComboBox, IComboBoxOption, IComboBoxStyles, IDatePickerStyles, SelectableOptionMenuItemType } from "@fluentui/react";
import _ from "lodash";
import React from "react";
import styles from './Filter.module.scss';

export default class Filter extends React.Component<any, {}> {
    private _checked: any = [];

    public render(): React.ReactElement<any> {
        const options: IComboBoxOption[] = [
            { key: 'Header1', text: 'First heading', itemType: SelectableOptionMenuItemType.Header },
            { key: 'A', text: '1000 $' },
            { key: 'B', text: '2000 $' },
            { key: 'C', text: '3000 $' },
            { key: 'D', text: '4000 $' },
            { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
            { key: 'Header2', text: 'Second heading', itemType: SelectableOptionMenuItemType.Header },
            { key: 'E', text: '10K $' },
            { key: 'F', text: '20K $', disabled: true },
            { key: 'G', text: '3000 $' },
            { key: 'H', text: '4000 $' },
            { key: 'I', text: '4000 $' },
            { key: 'J', text: '4000 $' },
        ];
        const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };
        const calenderStyles: Partial<IDatePickerStyles> = { root: { width: '100%' } };

        const rating = (num: any, checked: any) => {
            if (this._checked.indexOf(num) == -1 && checked) {
                this._checked.push(num);
            } else {
                this._checked.splice(this._checked.indexOf(num), 1);
            }
            let res = this.props.items.cards.filter((x: any) => {
                return this._checked.length == 0
                    ? true
                    : this._checked.indexOf(Math.round(x.rating)) > -1
            })
            this.props.call(res);
        }

        return <div className={styles.container}>
            <div className={styles.block}>
                <span className={styles.label}>
                    Rating
                </span>
                <div className={styles.rate}>
                    {
                        _.range(1, 6).map((i: any) => {
                            return <Checkbox id={"cc" + i} label={i} onChange={(ev, checked) => { rating(i, checked) }} />
                        })
                    }
                </div>
            </div>

            <div className={styles.block}>
                <span className={styles.label}>
                    Registation
                </span>
                <div className={styles.registation}>
                    <DatePicker
                        // firstDayOfWeek={firstDayOfWeek}
                        placeholder="From"
                        ariaLabel="Select a date"
                        styles={calenderStyles}
                        // DatePicker uses English strings by default. For localized apps, you must override this prop.
                        strings={defaultDatePickerStrings}
                    />
                    <DatePicker
                        // firstDayOfWeek={firstDayOfWeek}
                        placeholder="To"
                        ariaLabel="Select a date"
                        styles={calenderStyles}
                        // DatePicker uses English strings by default. For localized apps, you must override this prop.
                        strings={defaultDatePickerStrings}
                    />
                </div>
            </div>

            <div className={styles.block}>
                <span className={styles.label}>
                    Price
                </span>
                <div className={styles.price}>
                    <ComboBox
                        //defaultSelectedKey="C"
                        allowFreeform={true}
                        placeholder="From"
                        options={options}
                        styles={comboBoxStyles}
                    />
                    <ComboBox
                        //defaultSelectedKey="C"
                        label=""
                        allowFreeform={true}
                        placeholder="To"
                        options={options}
                        styles={comboBoxStyles}
                    />
                </div>
            </div>

        </div >;
    }
}