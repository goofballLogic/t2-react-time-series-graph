import React from "react";

const defaultFormatTableDate = x => new Date( x ).toLocaleDateString();

const render = ( { data, series, formatTableDate } ) => (

    <table>

        <thead>
        
            <tr>

                <th>When</th>
                { series.map( s => <th key={ s.id }>{ s.name }</th> ) }

            </tr>
        
        </thead>
        <tbody>

            { data.map( d => (

                <tr key={ d.when }>

                    <td>{ formatTableDate( d.when ) }</td>
                    { series.map( s => (

                        <td key={ s.id }>{ JSON.stringify( d.runningTotals[ s.id ] ) }</td>

                    ) ) }

                </tr>

            ) ) }
            
        </tbody>

    </table>

);

export default ( { data, series, formatTableDate } ) => {

    const sortedData = data.slice( 0 ).sort( ( a, b ) => a.when > b.when ? -1 : a.when < b.when ? 1 : 0 );
    formatTableDate = formatTableDate || defaultFormatTableDate;
    return render( { data: sortedData, series, formatTableDate } );

} ;