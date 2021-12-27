import { Checkbox, ComboBox, DatePicker, DefaultButton, defaultDatePickerStrings, IComboBox, IComboBoxOption, IComboBoxStyles, IDatePickerStyles, IIconProps, SelectableOptionMenuItemType, TooltipHostBase } from "@fluentui/react";
import _ from "lodash";
import moment from "moment";
import React from "react";
import styles from './Filter.module.scss';

export interface IFilterState {
    startDate: Date | undefined;
    endDate: Date | undefined;
    startPrice: any;
    endPrice: any;
    checked: any;
}

export default class Filter extends React.Component<any, IFilterState> {
    constructor(props: any) {
        super(props);
        this.state = {
            startDate: undefined,
            endDate: undefined,
            startPrice: undefined,
            endPrice: undefined,
            checked: []
        }
    }

    componentWillUpdate(nextProps: any, nextState: any) {
        if (nextState.startDate != this.state.startDate
            || nextState.endDate != this.state.endDate
            || nextState.startPrice != this.state.startPrice
            || nextState.endPrice != this.state.endPrice
            || JSON.stringify(nextState.checked) != JSON.stringify(this.state.checked)) {
            this.combind(this.props.items.cards, nextState);
        }
    }

    combind = (list: any, nextState: any) => {
        let res = list.filter((x: any) => {
            return nextState.checked.length == 0 ? true : nextState.checked.indexOf(Math.round(x.rating)) > -1
        })
        res = res.filter((x: any) => {
            return (nextState.startDate ? (moment(x.carRegAt) >= moment(nextState.startDate)) : true)
                && (nextState.endDate ? (moment(x.carRegAt) <= moment(nextState.endDate)) : true)
        })
        res = res.filter((x: any) => {
            return (nextState.startPrice ? x.price >= parseInt(nextState.startPrice) : true)
                && ((nextState.endPrice ? x.price <= nextState.endPrice : true))
        })
        this.props.call(res);
    }

    public render(): React.ReactElement<any> {
        const options: IComboBoxOption[] = [
            { key: 'Header1', text: 'Low', itemType: SelectableOptionMenuItemType.Header },
            { key: '1000', text: '1000 CHF' },
            { key: '2000', text: '2000 CHF' },
            { key: '3000', text: '3000 CHF' },
            { key: '4000', text: '4000 CHF' },
            { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
            { key: 'Header2', text: 'High', itemType: SelectableOptionMenuItemType.Header },
            { key: '10000', text: '10K CHF' },
            { key: '20000', text: '20K CHF' },
            { key: '30000', text: '30K CHF' },
            { key: '50000', text: '50K CHF' },
            { key: '60000', text: '60K CHF' },
            { key: '70000', text: '70K CHF' },
            { key: '80000', text: '80K CHF' },
            { key: '90000', text: '90K CHF' },
        ];
        const comboBoxStyles: Partial<IComboBoxStyles> = { root: { width: '100%' } };
        const calenderStyles: Partial<IDatePickerStyles> = { root: { width: '100%' } };
        const clearIcon: IIconProps = { iconName: 'Clear' };
        const clearButtonStyle = {
            border: 0,
            height: 32,
            width: 32,
            minWidth: 32
        }
        const onFormatDate = (date?: Date): string => {
            return !date ? '' : date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear());
        };

        // rating
        const rating = (num: any, checke: any) => {
            let checked = [...this.state.checked];
            if (this.state.checked.indexOf(num) == -1 && checke) {
                checked.push(num);
            } else {
                checked.splice(checked.indexOf(num), 1);
            }
            this.setState({ checked });
        }

        // dating
        const dateStart = (startDate: any) => {
            this.setState({ startDate });
        }
        const dateEnd = (endDate: any) => {
            this.setState({ endDate });
        }

        // price
        const onChange = (event: any, option?: any, index?: number, value?: string) => {
            event.stopPropagation();
            if (event.currentTarget.id.indexOf("start") > -1) {
                this.setState({ startPrice: option.key });
            }
            else {
                this.setState({ endPrice: option.key });
            }
        }

        const chevronDownIcon: IIconProps = { iconName: 'ChevronDown' };
        const clearPriceStartIcon: IIconProps = { iconName: 'Clear', id: "start", onClick: (e) => { onChange(e, { key: undefined }) } };
        const clearPriceEndIcon: IIconProps = { iconName: 'Clear', id: "end", onClick: (e) => { onChange(e, { key: undefined }) } };

        return <div className={styles.container}>
            <div className={styles.block}>
                <span className={styles.label}>
                    Rating
                </span>
                <div className={styles.rate}>
                    {
                        _.range(1, 6).map((i: any) => {
                            return <Checkbox id={"cb" + i} label={i} onChange={(ev, checked) => { rating(i, checked) }} />
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
                        placeholder="From"
                        ariaLabel="Select a date"
                        formatDate={onFormatDate}
                        styles={calenderStyles}
                        onSelectDate={dateStart}
                        value={this.state.startDate}
                        strings={defaultDatePickerStrings}
                        textField={{
                            onRenderSuffix: () => this.state.startDate ? <DefaultButton onClick={() => { dateStart(undefined) }} iconProps={clearIcon} style={clearButtonStyle} /> : null,
                            styles: { suffix: { padding: "0 4px", background: "unset" } }
                        }}
                    />
                    <DatePicker
                        placeholder="To"
                        ariaLabel="Select a date"
                        styles={calenderStyles}
                        formatDate={onFormatDate}
                        onSelectDate={dateEnd}
                        value={this.state.endDate}
                        strings={defaultDatePickerStrings}
                        textField={{
                            onRenderSuffix: () => this.state.endDate ? <DefaultButton onClick={() => { dateEnd(undefined) }} iconProps={clearIcon} style={clearButtonStyle} /> : null,
                            styles: { suffix: { padding: "0 4px", background: "unset" } }
                        }}
                    />
                </div>
            </div>

            <div className={styles.block}>
                <span className={styles.label}>
                    Price
                </span>
                <div className={styles.price}>
                    <ComboBox
                        id="start"
                        allowFreeform={false}
                        placeholder="From"
                        text={this.state.startPrice ? this.state.startPrice : "From"}
                        onChange={onChange}
                        options={options}
                        styles={comboBoxStyles}
                        buttonIconProps={
                            this.state.startPrice ? clearPriceStartIcon : chevronDownIcon
                        }
                    />
                    <ComboBox
                        id="end"
                        allowFreeform={false}
                        placeholder="To"
                        text={this.state.endPrice ? this.state.endPrice : "To"}
                        options={options}
                        onChange={onChange}
                        styles={comboBoxStyles}
                        buttonIconProps={
                            this.state.endPrice ? clearPriceEndIcon : chevronDownIcon
                        }
                    />
                </div>
            </div>
        </div >
    }
}