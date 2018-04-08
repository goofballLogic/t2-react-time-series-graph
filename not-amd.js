window.define = function( deps, factory ) {

    console.log( "Deps", deps );
    console.log( "Factory", factory );
    window.x = factory();
    console.log( window.x );
    
};
window.define.amd = "not really";