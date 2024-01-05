const path = require('path');

module.exports = {
    entry: './src/plotting.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'plotting.js',
        path: path.resolve(__dirname, 'dist'),
    },

    devServer: {
        client: {
            overlay: {
                warnings: false,
            }
        },
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8080,
    },
};