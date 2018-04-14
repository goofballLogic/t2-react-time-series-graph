const path = require( "path" );

module.exports = {

    mode: "development",
    entry: "./src/live-example.js",
    output: {

        filename: "live-example.js",
        path: path.resolve( __dirname, "dist" ),
        libraryTarget: "umd"

    },
    module: {

        rules: [
            
            {
            
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
          
            }
        
        ]
      
    }

};
