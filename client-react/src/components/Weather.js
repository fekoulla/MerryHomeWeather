import React, { PropTypes } from 'react'
import {isConfigured} from '../utils/authservice'
import { Form, FormGroup,FormControl, ControlLabel, Button, Glyphicon } from 'react-bootstrap'
import {emitEvent, sendRequest, getExpressions, subscribeToEvent} from '../utils/serverhome-api'
import {searchRequest} from '../utils/voice-helper'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SpeechRecognition from 'react-speech-recognition'
import VoiceRecognition from './VoiceRecognition'
import './Weather.css';

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

class Weather extends React.Component {

  constructor(props){
      super(props);
      this.state = { searchValue: "",
                     shortResult: "",
                     shortResultCity: "",
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
                  shortResult: data.resultText,
                  shortResultCity: data.resultCity
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
          self.subscribeServerSays();
          if(self.props.recognition){
              self.props.recognition.onresult = function(event) {
                  var result=event.results[event.results.length-1];
                  if(result.isFinal){
                      var objRequest = searchRequest(result[0].transcript, expressions);
                      console.log({"transcript": result[0].transcript,
                                   "data": objRequest});
                      if(objRequest && objRequest.plugin){
                          self.sendData(objRequest);
                      }
                  }
              };
          }
      });

  }

  subscribeServerSays(){
      subscribeToEvent("serversays", function (data){
          var utterThis = new SpeechSynthesisUtterance(data);
          utterThis.lang = 'fr-FR';
          console.log({"event server says":data});
          window.speechSynthesis.speak(utterThis);
      });
  }

  sendData(objRequest){
      sendRequest(objRequest.plugin, objRequest.action, objRequest.data).then((data)=>{
          if(data.resultText){
              if(objRequest.data.searchDate == 'aujourd\'hui' || objRequest.data.searchDate == 'maintenant'){
                var utterThis = new SpeechSynthesisUtterance(objRequest.data.searchLocation + ", " + objRequest.data.searchDate +", " + data.resultText.day_long + data.resultText.date + ', il y a des,' + data.resultText.condition + ', et niveau températures, il fait entre' + data.resultText.tmin + ' et ' + data.resultText.tmax + ' degrés');
              }else{
                var utterThis = new SpeechSynthesisUtterance(objRequest.data.searchLocation + ", " + objRequest.data.searchDate +", " + data.resultText.day_long + data.resultText.date + ', il y aura des,' + data.resultText.condition + ', et niveau températures, il fera entre' + data.resultText.tmin + ' et ' + data.resultText.tmax + ' degrés');
              }
              utterThis.lang = 'fr-FR';
              console.log({"response":data.resultCity});
              this.state.shortResult = data.resultText;
              this.state.shortCityInfo = data.resultCity;
              window.speechSynthesis.speak(utterThis);
          }
      });
  }

  render() {
    var table = this.state.shortResult ? this.state.shortResult.hourly_data : [];
    var hoursList = Object.keys(table).map((hour) =>
      <li>{hour} : {table[hour].CONDITION} <img src={table[hour].ICON} alt=''/></li>
    );
    const { startListening, stopListening, browserSupportsSpeechRecognition } = this.props;
    let logMessages = this.props.listening;

    if(!isConfigured()){
        return <div>Configurer le server de merry home ;)</div>;
    }

    if (!browserSupportsSpeechRecognition) {
        return <div>Pour utiliser la reconnaissance vocale, merci d utiliser google chrome ;)</div>;
    }
    
    var latitude = this.state.shortResultCity ? this.state.shortResultCity.latitude : 48.8290;
    var longitude = this.state.shortResultCity ? this.state.shortResultCity.longitude : 2.3251;
    console.log(this.state.shortResult);

      return (
          <div className='plugincontent plugin-weather'>
          <Glyphicon glyph="comment" className={"voice-icon "+(this.props.listening  ? "listening" : "")} />
          { this.props.listening  ?
           <Button bsStyle="danger" onClick={stopListening}><Glyphicon glyph="stop" /> stop </Button> :
           <Button bsStyle="info" onClick={startListening }><Glyphicon glyph="play" /> start </Button> }
           {logMessages}
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
              <div>
              <iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://www.openstreetmap.org/export/embed.html?bbox=2.301163673400879%2C48.820484866660514%2C2.349057197570801%2C48.83749229606369&layer=mapnik&marker=48.8290%2C2.3251"></iframe><br/><small><a href="http://www.openstreetmap.org/?mlat={latitude}&mlon={longitude}#map=15/48.8290/2.3251">Afficher une carte plus grande</a></small>
              </div>
              <ul>
                {hoursList}
              </ul>
          </div>
      );
  }
}

VoiceRecognition.propTypes = propTypes;

const options = {
  autoStart: false
};

export default SpeechRecognition(options)(Weather);
