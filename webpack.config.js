const path = require( "path" );

module.exports = {

    mode: "production",
    entry: "./src/TimeSeriesGraph.js",
    output: {

        filename: "bundle.js",
        path: path.resolve( __dirname, "dist" ),
        libraryTarget: "commonjs2"

    },
    module: {

        rules: [
            
            {
            
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
          
            }
        
        ]
      
    },
    externals: [

        "react",
        "recharts"

    ]

};
