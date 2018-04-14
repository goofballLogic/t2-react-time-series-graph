import React, { Component } from "react";
import { render } from "react-dom";
import TimeSeriesGraph from "./TimeSeriesGraph"
import { generateSeries, generateEventData } from "./live-example-data";
import accumulate from "./accumulate";
import debounce from "debounce";

function seedData() {

    const series = generateSeries( 6 );
    const now = new Date();
    const today = new Date( now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() );
    const ago = new Date( today );
    ago.setMonth( ago.getMonth() - 6 );
    const events = generateEventData( series, ago, today );
    const data = accumulate( events );
    return { series, events, data };

}

export class LiveExample extends Component {

    constructor() {

        super();
        this.state = seedData();
        this.state.key = Date.now();

    }

    restate() {

        const events = JSON.parse( this.events.value );
        const series = JSON.parse( this.series.value );
        const data = accumulate( events );
        const startRagged = this.startRagged.checked;
        const endRagged = this.endRagged.checked;
        this.setState( { data, events, series, startRagged, endRagged, error: undefined } );

    }

    handleClick() {

        this.setState( seedData() );
        this.setState( { key: Date.now() } );

    }

    componentDidCatch( error, info ) {

        this.setState( { error } );

    }

    componentDidUpdate() {

        if ( this.state.error ) { return; } // only bookmark when no errors
        if( JSON.stringify( this.state.goodSeries ) !== JSON.stringify( this.state.series ) ) {

            this.setState( { goodSeries: this.state.series } );

        }
        if ( JSON.stringify( this.state.goodData ) !== JSON.stringify( this.state.data ) ) {

            this.setState( { goodData: this.state.data } );

        }

    }

    render() {

        return (

            <article className="live-example" key={this.state.key}>
        
                <h1>Example</h1>
                <TimeSeriesGraph 
                    data={this.state.error ? this.state.goodData : this.state.data} 
                    series={this.state.error ? this.state.goodSeries: this.state.series}
                    startRagged={this.state.startRagged}
                    endRagged={this.state.endRagged} />
                <p>

                    <button onClick={() => this.handleClick()}>Regenerate data</button>
                
                </p>
                <p>

                    <label>Start ragged <input type="checkbox" onClick={ () => this.restate() } ref={ x => this.startRagged = x } /></label>
                    &nbsp;&nbsp;&nbsp;<label>End ragged <input type="checkbox" onClick={ () => this.restate() } ref={ x => this.endRagged = x } /></label>

                </p>
                <div className="data-editor">

                    <div>

                        <h2>Series (edit me!)</h2>   
                        <div className="editor">
    
                            <textarea 
                                ref={ x => this.series = x } 
                                defaultValue={ JSON.stringify( this.state.series, null, 3 ) }
                                onChange={ debounce( () => this.restate(), 500 ) } />

                        </div>
                    
                    </div>
                    <div>
                    
                        <h2>Events (edit me!)</h2>
                        <div className="editor">
                        
                            <textarea
                                ref={ x => this.events = x }
                                defaultValue={ JSON.stringify( this.state.events, null, 3 ) }
                                onChange={ debounce( () => this.restate(), 500 ) } />

                        </div>

                    </div>

                </div>
                <h2>Accumulated data (read-only)</h2>
                <pre className="plot-data">

                    { JSON.stringify( this.state.data, null, 3 ) }

                </pre>
                
            </article>

        );

    }

}

export const renderLiveExample = selector => 

    render( 
    
        <LiveExample />,
        document.querySelector( selector )
    
    );