import React, { Component } from "react";
import { render } from "react-dom";
import TimeSeriesGraph from "./TimeSeriesGraph";
import TimeSeriesTable from "./TimeSeriesTable";
import TimeSeriesEventTable from "./TimeSeriesEventTable";
import TimeSeriesStreaks, { consecutiveUpStreaks, sequentialUpStreakSums, consecutiveUpStreakSums } from "./TimeSeriesStreaks";
import { generateSeries, generateEventData } from "./live-example-data";
import accumulate from "./accumulate";
import debounce from "debounce";

export const samples = { 
    
    TimeSeriesGraph, 
    TimeSeriesTable,
    TimeSeriesEventTable,
    TimeSeriesStreaks,
    consecutiveUpStreaks,
    sequentialUpStreakSums,
    consecutiveUpStreakSums,
    React,
    Component,
    render
    
};

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

const GRAPH = "0";
const TABLE = "1";
const EVENTS = "2";
const STREAKS = "3";

const simpleDateFormat = x => new Date( x ).toDateString();

const Streaks = ( { series, events, data } ) => (

    <div>
    
        <h2>Longest streak (Scores of 0 allowed)</h2>
        <TimeSeriesStreaks series={series} events={events} data={data} />
        
        <h2>Longest streak (scored up every time events were recorded)</h2>
        <TimeSeriesStreaks series={series} events={events} data={data} strategy={consecutiveUpStreaks} />
        
        <h2>Biggest streak (Scores of 0 allowed)</h2>
        <TimeSeriesStreaks series={series} events={events} data={data} strategy={sequentialUpStreakSums} />
        
        <h2>Biggest streak (scored up every time events were recorded)</h2>
        <TimeSeriesStreaks series={series} events={events} data={data} strategy={consecutiveUpStreakSums} />
        
    </div>
    
);

export class LiveExample extends Component {

    constructor() {

        super();
        this.state = seedData();
        this.state.key = Date.now();
        this.state.display = GRAPH;

    }

    restate() {

        const events = JSON.parse( this.events.value );
        const series = JSON.parse( this.series.value );
        const data = accumulate( events );
        const startRagged = this.startRagged.checked;
        const endRagged = this.endRagged.checked;
        this.setState( { data, events, series, startRagged, endRagged, error: undefined } );

    }

    selectWhen( when ) {

        const dataKey = this.state.error ? "goodData" : "data";
        const data = this.state[ dataKey ].map( x => ( { ...x, selected: x.when === when ? !x.selected : x.selected } ) );
        this.setState( { [ dataKey ] : data } );

    }

    handleClick() {

        this.setState( seedData() );
        this.setState( { key: Date.now() } );

    }

    componentDidCatch( error, info ) {

        console.error( error );
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
        if ( JSON.stringify( this.state.goodEvents ) !== JSON.stringify( this.state.events ) ) {

            this.setState( { goodEvents: this.state.events } );

        }

    }

    handleChangeComponent() {

        this.setState( { display: this.componentSelect.value } );

    }

    render() {

        return (

            <article className="live-example" key={this.state.key}>

                <select 
                    ref={ x => this.componentSelect = x } 
                    onChange={ this.handleChangeComponent.bind( this ) }
                    value={ this.state.display }>

                    <option value={ GRAPH }>Graph</option>
                    <option value={ TABLE }>Table</option>
                    <option value={ EVENTS }>Events</option>
                    <option value={ STREAKS }>Streaks</option>

                </select>
                <p>

                    <button onClick={() => this.handleClick()}>Regenerate data</button>
                
                </p>
                <p>

                    <label>Start ragged <input type="checkbox" onClick={ () => this.restate() } ref={ x => this.startRagged = x } /></label>
                    &nbsp;&nbsp;&nbsp;<label>End ragged <input type="checkbox" onClick={ () => this.restate() } ref={ x => this.endRagged = x } /></label>

                </p>
                { this.state.display === TABLE
                
                    ? <TimeSeriesTable
                        data={ this.state.error ? this.state.goodData : this.state.data }
                        series={ this.state.error ? this.state.goodSeries : this.state.series }
                        formatTableDate={ simpleDateFormat }
                        selectWhen={ when => this.selectWhen( when ) } />
                
                    : this.state.display === EVENTS
                    ? <TimeSeriesEventTable
                        events={ this.state.error ? this.state.goodEvents : this.state.events }
                        series={ this.state.error ? this.state.goodSeries : this.state.series }
                        formatTableDate={ simpleDateFormat }
                        selectEvent={ evt => this.selectEvent( evt ) } />
                    
                    : this.state.display === STREAKS
                    ? <Streaks
                        events={ this.state.error ? this.state.goodEvents : this.state.events }
                        data={ this.state.error ? this.state.goodData : this.state.data }
                        series={ this.state.error ? this.state.goodSeries : this.state.series }
                        />
                        
                    : <TimeSeriesGraph 
                        data={this.state.error ? this.state.goodData : this.state.data} 
                        series={this.state.error ? this.state.goodSeries: this.state.series}
                        startRagged={this.state.startRagged}
                        endRagged={this.state.endRagged}
                        formatTickDate={ simpleDateFormat }
                        formatTooltipDate={ simpleDateFormat } />

                }
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

//// http://tc2-react-time-series-graph-goofballlogic.c9users.io/

export const renderLiveExample = selector => 

    render( 
    
        <LiveExample />,
        document.querySelector( selector )
    
    );