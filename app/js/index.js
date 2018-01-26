/**
 * Created by lxp on 2016/5/3.
 */
import React, {Component} from 'react';
import {render} from 'react-dom';
import '../style/fonts.css'
import '../style/common.less'
import png from '../assets/images/1.png';

export default class Index extends Component {
    render() {
        console.log(__PROXY__);//是否开启反向API代理;
        return (
            <div>
                <i className="iconfont icon-tupian1" style={{fontSize:100}}></i>
                <p>react通用开发环境</p>
                <img src={png}/>
                {
                    __PROXY__ ? <div>已开启API反向代理</div> : <div>未开启API反向代理</div>
                }
            </div>
        );
    }
};

render(<Index/>, document.getElementById('app'));
