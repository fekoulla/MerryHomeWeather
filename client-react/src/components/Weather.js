import React from 'react'
import PluginActionButton from "./PluginActionButton"
import './Weather.css';

class Weather extends React.Component {
    render() {
        var props = this.props;
        return (
            <div className='plugincontent plugin-weather'>
                <h1>TEST</h1>
            </div>
        );
    }
};

export default Weather;
