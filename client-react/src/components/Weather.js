import React from 'react'
import {isConfigured} from '../utils/authservice'
import { Form, FormGroup,FormControl, ControlLabel, Button, Glyphicon } from 'react-bootstrap'
import {emitEvent, sendRequest, getExpressions} from '../utils/serverhome-api'
import {searchRequest} from '../utils/voice-helper'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import VoiceRecognition from './VoiceRecognition'
import './Weather.css';

class Weather extends React.Component {

  constructor(props){
      super(props);
      this.state = { searchValue: "",
                     shortResult: "",
                     expressions:[],
                     isTable : false,
                     searchResult: null };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
     this.setState({
          searchValue: event.target.value
      });
  }

  handleSubmit (event) {
      console.log("emit event weathersearch : "+this.state.searchValue);
      emitEvent("weathersearch", this.state.searchValue);
      var self= this;

      var test = searchRequest(this.state.searchValue, this.state.expressions);
      console.log(test);
      sendRequest(test.plugin, test.action, test.data).then((data)=>{
          if(data.resultText){
              var utterThis = new SpeechSynthesisUtterance(data.resultText);
              utterThis.lang = 'fr-FR';
              console.log({"response":data.resultText});
              window.speechSynthesis.speak(utterThis);
              self.setState({
                  shortResult: data.resultText
              });
          }
      });
      if(event)
          event.preventDefault();
  }

  componentDidMount(){
      if(!isConfigured()) return;
      var self= this;
      getExpressions().then((expressions)=>{
          self.setState({"expressions": expressions});
      });

  }

  render() {
      return (
          <div className='plugincontent plugin-weather'>
              <Form onSubmit={this.handleSubmit} inline>
                  <FormGroup controlId="formInlineName">
                      <ControlLabel>Search</ControlLabel>{' '}
                      <FormControl type="text" placeholder="terms" value={this.state.searchValue} onChange={this.handleChange} />
                  </FormGroup>{' '}
                  <Button type="submit"><Glyphicon glyph="search" /> </Button>
              </Form>
              <Router>
                  <div>
                      <Route exact path="/" component={VoiceRecognition}/>
                  </div>
              </Router>
              <div className="shortResult">
                  <cite>{this.state.shortResult.day_long} {this.state.shortResult.date}</cite>
              </div>
              <div className="result">
                {this.state.shortResult.condition}
                <img src={this.state.shortResult.icon} alt=''/>
              </div>
          </div>
      );
  }

}

export default Weather;
