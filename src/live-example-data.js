// thanks: https://stackoverflow.com/a/2450976/275501
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

const randoms = ( arr, n ) => shuffle( arr.slice( 0 ) ).slice( 0, n );

const names = [ "Andrew", "Gareth", "Bob", "Niamh", "Stephen", "Chris", "Sarah-Jane", "Janet", "Jonathan", "Dirk", "Imran", "Sam", "Jon", "Lisa", "Gabi", "Saemus", "Duncan", "Dubravka" ];

const colors = [
    
    "0,0,0",
    "0,255,0",
    "0,0,255",
    "255,0,0",
    "1,255,254",
    "255,166,254",
    "255,219,102",
    "255,219,102",
    "0,100,1",
    "1,0,103",
    "149,0,58",
    "0,125,101",
    "255,0,246",
    "119,77,0",
    "144,251,146"

];

export function generateSeries( n ) {

    n = Math.min( n, names.length, colors.length );
    const randomColors = randoms( colors, n );
    const randomNames = randoms( names, n );
    return randomNames.map( ( name, i ) => ( {

        name,
        id: name.toLowerCase().slice( 0, 3 ),
        color: randomColors[ i ]

    } ) );

}

const oneof = arr => arr[ Math.floor( Math.random() * arr.length ) ];

const dateBetween = ( min, max ) => new Date( min.valueOf() + ( max.valueOf() - min.valueOf() ) * Math.random() );

const numberBetween = ( min, max ) => Math.round( min + ( max - min ) * Math.random() );

const truthyNumberBetween = ( min, max ) => numberBetween( min, max ) || truthyNumberBetween( min, max );

const weekString = date => {
 
    date = new Date( date.toISOString().slice( 0, 10 ) )
    date.setDate( date.getDate() - date.getDay() - 2 );
    return date.toISOString().slice( 0, 10 );

};

const negativeVerb = [ "duplicated", "forgot to document", "didn't take care of", "made a mess of", "didn't communicate changes to", "created bugs in", "forgot to check-in", "didn't test" ];
const positiveVerb = [ "removed redundant stuff from", "enhanced", "demo'd changes to", "built some better", "did awesome things to", "delivered", "smashed it with", "was generally awesome while working on" ];
const object = [ "CSS", "HTML", "the documentation", "the test plan", "new components", "the deployment" ];

function describe( series, evt ) {

    const s = series.find( s => s.id === evt.id ).name;
    const v = evt.score < 0 ? oneof( negativeVerb ) : oneof( positiveVerb )
    const o = oneof( object );
    return { ...evt, description: `${s} ${v} ${o}` };

}

export function generateEventData( series, minDate, maxDate ) {

    const events = [];
    const ids = series.map( x => x.id );
    const generateEvent = () => ( {

        id: oneof( ids ),
        when: weekString( dateBetween( minDate, maxDate ) ),
        score: truthyNumberBetween( -3, 5 )

    } );
    for( let i = 0; i < series.length * 10; i++ ) {

        events.push( describe( series, generateEvent() ) );

    }
    return events;

}
