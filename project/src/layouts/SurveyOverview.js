/**
 * Purpose of this page is to allow admin
 * to see the survey that was created
 */

import React from "react";

export default class SurveyOverview extends React.Component {

    render() {
        return (
            <div>
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
