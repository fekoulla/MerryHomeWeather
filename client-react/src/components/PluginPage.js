import React from 'react';

import PluginContent from './PluginContent'
import {getPluginView} from '../utils/serverhome-api'

class PluginPage extends React.Component {
    
    constructor(props){
        super(props);
	this.state = { pluginView: {}};
    }
    
    componentDidMount(){
        getPluginView(this.props.match.params.pluginName).then((data)=>{
            this.setState({ pluginView: data});
        });
    }
    
    render() {
        let pluginName = this.props.match.params.pluginName;
        let pluginView = this.state.pluginView;
        let PluginNameView ;

        if(pluginName === "androidtv"){
            PluginNameView = "Android TV";
        }
        else if(pluginName === "cameras"){
            PluginNameView = "Caméras";
        }
        else if(pluginName === "philipshue"){
            PluginNameView = "Philipshue";
        }
        else if(pluginName === "weather"){
            PluginNameView = "The weather";
        }


        return (
            <div>
                <h3>{PluginNameView}</h3>
                <PluginContent viewInfo={pluginView} pluginName={pluginName} />     
            </div>
        );    
    }
};

export default PluginPage;