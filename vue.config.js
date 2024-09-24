'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

/** 标题 */
const name = defaultSettings.title || 'vue Admin Template' // page title
/** 端口号 */
const port = process.env.port || process.env.npm_config_port || 9528 // dev port
/* 环境变量 */
const { NODE_ENV, VUE_APP_BASE_API, VUE_APP_SERVER_PROXY } = process.env

/** 打印环境变量（控制台） */
console.info()
console.info('\x1b[33m%s\x1b[0m', `🏭--NODE环境(NODE_ENV):`, NODE_ENV)
console.info('\x1b[36m%s\x1b[0m', `🔗--APP基础URL(VUE_APP_BASE_API):`, VUE_APP_BASE_API)
console.info('\x1b[36m%s\x1b[0m', `😈--APP代理URL(VUE_APP_SERVER_PROXY):`, VUE_APP_SERVER_PROXY)
console.info()

// https://cli.vuejs.org/zh/config/
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [VUE_APP_BASE_API]: {
        target: VUE_APP_SERVER_PROXY,
        changeOrigin: true
        // pathRewrite: {
        //   ['^' + VUE_APP_BASE_API]: ''
        // }
      }
    }
  },
  configureWebpack: {
    name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    externals: {
      'vue': 'Vue',
      'element-ui': 'ELEMENT',
      'cos-js-sdk-v5': 'COS'
    }
  },
  chainWebpack(config) {
    // 提高首屏速度，建议开启预加载
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // 忽略runtime.js：https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // 当页面很多的时候，会产生太多无意义的请求
    config.plugins.delete('prefetch')

    // 设置svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime`必须与runtimeChunk名称相同。默认为`runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // 只打包最初依赖的第三方
                },
                elementUI: {
                  name: 'chunk-elementUI', // 将elementUI拆分为一个包
                  priority: 20, // weight需要大于lib和app，否则将被打包到lib或app中
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 为了适应cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // 自定义规则
                  minChunks: 3, //  最小公数
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
