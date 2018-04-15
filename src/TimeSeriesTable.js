import React from "react";

const defaultFormatTableDate = x => new Date( x ).toLocaleDateString();

const classifySignificantPoints = points => {

    var total = points.reduce( ( a, b ) => a + b );
    return total > 0 ? "up" : total < 0 ? "down" : "";

}

const classifyPoints = ( id, data ) => ( id in data.points )
    ? `significant ${ classifySignificantPoints(data.points[ id ]) }`
    : "";

const render = ( { data, series, formatTableDate, selectWhen } ) => (

    <table>

        <thead>
        
            <tr>

                <th>When</th>
                { series.map( s => <th key={ s.id }>
                
                    <span className="swatch" style={{ backgroundColor: `rgba(${s.color})` }}>&nbsp;</span>
                    { s.name }
                
                </th> ) }

            </tr>
        
        </thead>
        <tbody>

            { data.map( d => [

                <tr key={ d.when } 
                    onClick={ selectWhen.bind( this, d.when ) } 
                    className={ `master ${d.selected ? "selected" : ""}` }>

                    <td rowSpan="2">{ formatTableDate( d.when ) }</td>
                    { series.map( s => (

                        <td 
                            key={ s.id }
                            className={ `total ${ classifyPoints( s.id, d ) }` }>{ d.runningTotals[ s.id ] }</td>

                    ) ) }

                </tr>,
                <tr key={ `detail-${d.when}` } className={ `detail ${d.selected ? "selected" : ""}` }>

                    <td colSpan={ series.length }>

                        <div>
                            
                            <table>

                                <tbody>
                                { d.events.map( evt => ( { 
                                    
                                    s: series.find( s => s.id === evt.id ),
                                    ...evt
                                    
                                } ) ).filter( 
                                    
                                    evt => evt.s
                                
                                ).map( ( evt, i ) => ( 
                                        
                                    <tr key={ i }>
                                        
                                        <td>
                                            <span className="swatch" style={{ backgroundColor: `rgba(${evt.s.color})` }}>&nbsp;</span>
                                            { evt.s.name }
                                        </td>
                                        <td className={ evt.score < 0 ? "down" : evt.score > 0 ? "up" : "" }>{ evt.score }</td>
                                        <td>{ evt.description }</td>

                                    </tr>

                                ) ) }
                                </tbody>

                            </table>

                        </div>

                    </td>

                </tr>

             ] ) }

        </tbody>

    </table>

);

const noop = () => {};

export default ( { data, series, formatTableDate, selectWhen } ) => {

    const sortedData = data.slice( 0 ).sort( ( a, b ) => a.when > b.when ? -1 : a.when < b.when ? 1 : 0 );
    formatTableDate = formatTableDate || defaultFormatTableDate; 
    selectWhen = selectWhen || noop;
    return render( { data: sortedData, series, formatTableDate, selectWhen } );

} ;