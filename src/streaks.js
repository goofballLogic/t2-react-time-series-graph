
function maxConsecutive( items, inclusionTest, inclusionsStrategy ) {
 
    let running = 0;
    let runningIncluded = [];
    
    let max = 0;
    let included = [];
    
    for( let i = 0; i < items.length; i++ ) {
    
        if ( !inclusionTest( items[ i ] ) ) {
            
            running = 0;
            runningIncluded = [];
            
        } else {
        
            running++;
            runningIncluded = runningIncluded.concat( inclusionsStrategy( items[ i ] ) );
            if( running >= max ) { 
                
                max = running;
                included = runningIncluded.slice( 0 );
                
            }
            
        }
        
    }
    return { max, included };
    
}

function maxSumConsecutive( items, valueStrategy, inclusionsStrategy ) {
    
    let running = 0;
    let runningIncluded = [];
    
    let max = 0;
    let included = [];
    
    for( let i = 0; i < items.length; i++ ) {
        
        const value = valueStrategy( items[ i ] );
        if ( typeof value === "undefined" || value === null || value < 0 ) {
         
            running = 0;
            runningIncluded = [];
            
        } else {
            
            running += Number( value );
            runningIncluded = runningIncluded.concat( inclusionsStrategy( items[ i ] ) );
            if ( running >= max ) {
                
                max = running;
                included = runningIncluded.slice( 0 );
                
            }
            
        }
        
    }
    return { max, included };
    
}

const sortUpStreaks = streaks => streaks.slice( 0 ).sort( ( a, b ) => b.streak.max - a.streak.max );

const percentageByMax = streaks => {
    
    const maxStreak = Math.max.apply( Math, streaks.map( x => x.streak.max ) );
    return streaks.map( s => ( {
      
        ...s,  
        percentage: s.streak.max === 0 ? 0 : 100 * s.streak.max / maxStreak
        
    } ) );

};

export function consecutiveUpStreaks( series, data ) {
    
    const streaks = series.map( s => ( {
        
        id: s.id,
        series: s,
        streak: maxConsecutive(
            
            data,
            d => d.points[ s.id ] > 0,
            d => d.events.filter( evt => evt.id === s.id )
            
        )
        
    } ) );
    return percentageByMax( sortUpStreaks( streaks ) );
    
}

export function sequentialUpStreaks( series, data ) {
    
    const streaks = series.map( s => ( {
            
        id: s.id,
        series: s,
        streak: maxConsecutive( 
            
            data.filter( d => s.id in d.points ),
            d => d.points[ s.id ] >= 0,
            d => d.events.filter( evt => evt.id === s.id )
            
        )
            
    } ) );
    return percentageByMax( sortUpStreaks( streaks ) );
    
}

export function consecutiveUpStreakSums( series, data ) {
    
    const streaks = series.map( s => ( {
    
        id: s.id,
        series: s,
        streak: maxSumConsecutive(
            
            data,
            d => d.points[ s.id ] || undefined,
            d => d.events.filter( evt => evt.id === s.id )
            
        )
        
    } ) );
    return percentageByMax( sortUpStreaks( streaks ) );
    
}

export function sequentialUpStreakSums( series, data ) {
    
    const streaks = series.map( s => ( {
    
        id: s.id,
        series: s,
        streak: maxSumConsecutive(
        
            data,
            d => d.points[ s.id ] || 0,
            d => d.events.filter( evt => evt.id === s.id )
            
        )
        
    } ) );
    return percentageByMax( sortUpStreaks( streaks ) );
    
}