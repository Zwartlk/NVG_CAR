
import { Link } from '@fluentui/react';
import * as React from 'react';

export default class Title extends React.Component<any, {}> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        var menuBoxes: any = document.getElementsByClassName('MenuBox');
        for (var i = 0; i < menuBoxes.length; i++) {
            menuBoxes[i].onmouseover = function () {
                var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                this.style['fill'] = color;
            }
            menuBoxes[i].onmouseout = function () {
                this.style['fill'] = '#293845';
            }
        }
    }

    public render(): React.ReactElement<any> {
        return <div className={this.props.className} >
            <div style={{ display: "flex", alignItems: "center" }}>
                <Link key={'id'} onClick={() => { window.location.href = '/' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" version="1.1" viewBox="0 0 48.745 48.747">
                        <g fill="#293845">
                            <rect className="MenuBox" x="2.2848e-15" y="-.00011033" width="23.105" height="23.105" />
                            <rect className="MenuBox" x="25.64" y="-.00011033" width="23.105" height="23.105" />
                            <rect className="MenuBox" x="2.2848e-15" y="25.642" width="23.105" height="23.105" />
                            <rect className="MenuBox" x="25.64" y="25.642" width="23.105" height="23.105" />
                        </g>
                    </svg>
                </Link>
                <h1 style={{ display: "flex", fontSize: "1rem", fontWeight: 500, marginLeft: 10 }}>My awesome car</h1>
            </div>
        </div>;
    }
}
