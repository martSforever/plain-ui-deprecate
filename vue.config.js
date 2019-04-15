const $utils = require('./utils/build.utils')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/*获取命令行参数*/
const arg = $utils.decodeArgv()
/*添加插件*/
const plugins = []
!!arg.analysis && plugins.push(new BundleAnalyzerPlugin({analyzerPort: '9999'}))                        //如果命令行参数中存在analysis，则启用webpack-bundle-analysis插件分析打包数据

const option = {
    baseUrl: './',
    lintOnSave: false,
    outputDir: $utils.resolve('page'),
    devServer: {
        port: '8888',
    },
    pages: {
        index: {
            // page 的入口
            entry: 'demo/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'demo.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'plain-ui demo',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        portal: {
            // page 的入口
            entry: 'portal/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'plain-ui portal',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'portal']
        },
        new: {
            // page 的入口
            entry: 'new-demo/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'new.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'plain-ui new',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'new']
        },
    },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'src': $utils.resolve('src'),
                'demo': $utils.resolve('demo'),
            }
        },
        module: {
            rules: [
                {
                    test: /.md$/,
                    loader: 'text-loader'
                },
            ]
        },
        plugins: [
            ...plugins,
        ]
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "src/styles/global.scss"; @import "demo/global.scss";`
            }
        }
    },
    chainWebpack: config => {
        config.plugins.delete('prefetch-index')
        config.plugins.delete('prefetch-portal')
        config.plugins.delete('prefetch-new')
    }
}

module.exports = option