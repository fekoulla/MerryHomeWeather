import React from 'react'
import { Button, Glyphicon } from 'react-bootstrap'
import {sendRequest} from '../utils/serverhome-api'

class PluginActionButton extends React.Component {
    
    handleClick(e) {
       console.log("send action "+this.props.pluginName+", "+this.props.action+", "+this.props.data);
       sendRequest(this.props.pluginName, this.props.action, {data:this.props.data}).then((data)=>{
           console.log(data);
       });
    }
    
    render() {
        var buttonContent= this.props.icon ? <Glyphicon glyph={this.props.icon} style={{color:"rgb(67, 94, 126)"}} /> : <span style={{color:"rgb(67, 94, 126)"}}>{this.props.name}</span>;
        return (
            <Button 
                  className="btn btn-default"
                  style={{color:"rgb(67, 94, 126)"}}
                  bsStyle="info"
                  onClick={this.handleClick.bind(this)}>
                  {buttonContent}
            </Button>
            );
    }
};

export default PluginActionButton;