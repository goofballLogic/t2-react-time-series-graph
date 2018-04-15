import React from "react";

const noop = () => {};

const render = ( { events, series, formatTableDate, selectWhen } ) => (

    <table>

        <thead>
        
            <tr>

                <th>When</th>
                <th>Name</th>
                <th>Score</th>
                <th>Description</th>
            
            </tr>
        
        </thead>
        <tbody>

            { events.map( evt => ( { 
                    
                ...evt,
                s: series.find( s => s.id === evt.id )
                
            } ) ).filter( evt => 
                
                evt.s
            
            ).map( evt =>

                <tr key={ evt.key}>

                    <td>{ formatTableDate( new Date( evt.when ) ) }</td>
                    <td>
                        <span className="swatch" style={{ backgroundColor: `rgba(${evt.s.color})` }}>&nbsp;</span>
                        { evt.s.name  }
                    </td>
                    <td className={ evt.score < 0 ? "down" : evt.score > 0 ? "up" : "" }>{ evt.score }</td>
                    <td>{ evt.description }</td>
                
                </tr>

            ) }

        </tbody>

    </table>

);

export default ( { events, series, formatTableDate, selectEvent } ) => {

    if ( !events ) { return null; }
    const sortedEvents = events
        .slice( 0 )
        .sort( ( a, b ) => a.when > b.when ? -1 : a.when < b.when ? 1 : 0 )
        .map( ( x, i ) => ( { ...x, key: x.key || i } ) );

    formatTableDate = formatTableDate || defaultFormatTableDate; 
    selectEvent = selectEvent || noop;
    return render( { events: sortedEvents, series, formatTableDate, selectEvent } );

} ;