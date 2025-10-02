const { defineConfig } = require('@vue/cli-service')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = defineConfig({
    transpileDependencies: true, // 解决跨域问题
    // 关闭ESLint检查
    lintOnSave: false,
    // 开发服务器配置
    devServer: {
        // 自动打开浏览器
        open: true,
        // 端口号
        port: 3301,
        // 是否开启https
        https: false,
        // 代理配置
        proxy: {
            // 以/api开头的请求会被代理
            '/api': {
                // 目标服务器地址
                target: 'http://localhost:3000',
                // 是否改变请求头中的host
                changeOrigin: true,
                // 路径重写，将/api前缀替换为空
                pathRewrite: {
                    '^/api': ''
                }
            },
            // 可以添加多个代理配置
            //   '/another-api': {
            //     target: 'https://api.example.com',
            //     changeOrigin: true,
            //     secure: false, // 如果是https接口，需要配置这个参数为false
            //     pathRewrite: {
            //       '^/another-api': ''
            //     }
            //   }
        }
    },
    // 构建配置
    configureWebpack: {
        // 开发环境配置
        devtool: 'source-map',
        // 性能优化配置
        performance: {
            hints: false
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader', // 图片加载器
                    options: {
                        limit: 10240, // 10KB以下的图片转为base64
                        name: 'img/[name].[hash:7].[ext]',
                        esModule: false
                    }
                }
            ]
        }
    },
    // 其他配置
    productionSourceMap: false,
    // CSS相关配置
    css: {
        // 是否使用css分离插件
        extract: process.env.NODE_ENV === 'production',
        // 关闭CSS source maps
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            css: {
                // 这里的选项会传递给css-loader
                esModule: false
            }
        }
    },
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // CSS压缩
            config.plugin('optimize-css').use(OptimizeCSSAssetsPlugin)
        }
    }
})