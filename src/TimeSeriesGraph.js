import React from "react";
import TimeSeriesTooltip from "./TimeSeriesTooltip";
import { ReferenceLine, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const defaultFormatTickDate = x => new Date( x ).toLocaleDateString();

function assignDefaultsTo( x, keys, defaults = {} ) {

    if ( !x ) { return; }
    for( let key of keys ) {

        x[ key ] = x[ key ] || defaults[ key ] || [ 0 ];

    }

}

function ensureDefaults( seriesIds, tidyData, startRagged, endRagged  ) {

    if ( !endRagged ) { 
        
        const last = tidyData.slice( -1 )[ 0 ] || {};
        assignDefaultsTo( last.runningTotals, seriesIds );
        assignDefaultsTo( last.points, seriesIds, last.runningTotals );
    
    }
    if ( !startRagged ) { 
    
        const first = tidyData[ 0 ];
        assignDefaultsTo( first.runningTotals, seriesIds );
        assignDefaultsTo( first.points, seriesIds );
    
    }
    
}

const TimeSeriesGraph = props => {

    const { formatTickDate, data, series, endRagged, startRagged, minTickGap = 20 } = props;
    if ( !data ) { throw new Error( "Missing property: data" ); }
    if ( !series ) { throw new Error( "Missing property: series" ); }
    if ( !data.length ) { return <div>No data</div>; }
    if ( !series.length ) { return <div>No series</div>; }

    const tidyData = JSON.parse( JSON.stringify( data ) );
    const seriesIds = series.map( x => x.id );
    ensureDefaults( seriesIds, tidyData, startRagged, endRagged );

    return <ResponsiveContainer height={400}>

        <LineChart data={tidyData} margin={{ right: 100 }}>

            <CartesianGrid strokeDasharray="3 3" />
            { series.map( s =>

                <Line connectNulls={true} 
                    dataKey={x => s.id in x.points ? x.runningTotals[ s.id ] : null }
                    key={s.id}
                    stroke={`rgb(${s.color})`}
                    type="linear"
                    name={s.name} />

            ) }
            <Legend />
            <Tooltip content={<TimeSeriesTooltip {...props} />} active={true}/>
            <XAxis dataKey="when" tickFormatter={formatTickDate || defaultFormatTickDate} type="number" domain={ [ "dataMin", "dataMax" ] } tickCount={999} minTickGap={ minTickGap } />
            <YAxis type="number" domain={ [ "dataMin - 2", "dataMax + 2" ] } tickCount={10} />
            <ReferenceLine y={0} stroke="black" />

        </LineChart>

    </ResponsiveContainer>;

};

export default TimeSeriesGraph;