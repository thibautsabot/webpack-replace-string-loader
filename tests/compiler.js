import webpack from 'webpack'
import { createFsFromVolume, Volume } from 'memfs'

const setup = async ({ fixture, loaderOptions }) => {
  const compiler = webpack({
    mode: 'development',
    entry: `./tests/fixtures/${fixture}`,
    output: {
      filename: 'index.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: require.resolve('../src/index.js'),
            options: loaderOptions,
          },
        },
      ],
    },
  })

  compiler.outputFileSystem = createFsFromVolume(new Volume())

  const stats = await new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err)
      if (stats.hasErrors()) reject(stats.toJson().errors)

      resolve(stats)
    })
  })

  return stats.toJson({ source: true }).modules[0].source
}

export default setup
