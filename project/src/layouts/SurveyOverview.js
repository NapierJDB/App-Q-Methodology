import React from "react";
import axios from 'axios';

export default class SurveyOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            research: '',
    
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);

      }

      handleSubmit(event) {
        event.preventDefault()
    
        axios
          .post("https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/viewResearch",
            {
                researcherID: window.researcher_id
    
            })
          .then((response) => {
    
            console.log(response);
    
            this.state.research = response.data;
            console.log(this.state.research);

          }, 
          (error) => {
            console.log(error);
          })
          .catch(function (error) {
            console.log(error);
          })
        
      }

    //https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/viewResearch

    render() {
        return (
            <div>
                <h1>{window.researcher_id}</h1>
                <button onClick={this.handleSubmit}>Display</button>
                <h1>Survey Overview</h1>
                <h2>
                    Review your research survey
                </h2>
                <div>
                    <label>
                        Survey Name:
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                    </label>
                </div>
                <div>
                    <label>
                        Box 1:
                    </label>
                </div>
                <div>
                    <label>
                        Box 2:
                    </label>
                </div>
                <div>
                    <label>
                        Box 3:
                    </label>
                </div>
                <div>
                    <label>
                        Anchors quantity:
                    </label>
                </div>
                <div>
                    <label>
                        Statements quantity:
                    </label>
                </div>
                <button>
                    Create survey
                </button>
            </div>
        )
            
        
    }
}
