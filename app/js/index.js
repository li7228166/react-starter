/**
 * Created by lxp on 2016/5/3.
 */
import React , { Component } from 'react';
import { render } from 'react-dom';

import '../style/common.css'
import png from '../assets/images/1.png';

export default class Index extends Component {
    render() {
        return (
            <div>
                <p>react通用开发环境</p>
                <img src={png}/>
            </div>
        );
    }
};

render(<Index/>, document.getElementById('app'));