import { validate } from 'schema-utils'
import schema from './schema.js'

const replaceAll = (content, matchingArray) => {
  let result = content

  // Synchronously replace all matching strings in the file.
  // Since a file could have multiple replacements, we can't do them in parallel.
  // In any case, the other loaders are waiting for this one to end.
  matchingArray.forEach(({ match, replace }) => {
    result = result.replaceAll(match, replace)
  })

  return result
}

// We don't use the sourceMap argument, but it forwarded to the next loader as a pass-through.
export default function loader(content, sourceMap) {
  this.cacheable()

  const options = this.getOptions()
  validate(schema, options)

  const result = replaceAll(content, options.matchingArray)

  return this.callback(null, result, sourceMap)
}
