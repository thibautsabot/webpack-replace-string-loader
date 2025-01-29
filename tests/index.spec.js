import setup from './compiler.js'

it('should replace an occurrence of a string', async () => {
  const output = await setup({
    fixture: 'replace-single-string.js',
    loaderOptions: {
      matchingArray: [{ match: 'Hello', replace: 'Bonjour' }],
    },
  })

  expect(output).toBe("const myText = \'Bonjour, this is a test\'\n")
})

it('should replace all occurrences of strings', async () => {
  const output = await setup({
    fixture: 'replace-all-strings.js',
    loaderOptions: {
      matchingArray: [
        { match: 'Hello', replace: 'Bonjour' },
        { match: 'Earth', replace: 'Moon' },
      ],
    },
  })

  expect(output).toBe(
    "const myText = \'Bonjour, this is a test\'" +
      '\n' +
      "const answer = \'Bonjour test, this is the Moon\'" +
      '\n'
  )
})

it('should not replace anything if no match is found', async () => {
  const output = await setup({
    fixture: 'replace-single-string.js',
    loaderOptions: {
      matchingArray: [{ match: 'NoMatch', replace: 'Bonjour' }],
    },
  })

  expect(output).toBe("const myText = \'Hello, this is a test\'\n")
})

it('should fail if no matchingArray is provided', async () => {
  await expect(
    async () =>
      await setup({
        fixture: 'replace-single-string.js',
        loaderOptions: {
          invalidOption: [{ match: 'NoMatch', replace: 'Bonjour' }],
        },
      })
  ).rejects.toMatchObject(
    expect.arrayContaining([
      expect.objectContaining({
        message: expect.stringContaining("configuration has an unknown property 'invalidOption'"),
      }),
    ])
  )
})

it('should fail if invalid option are provided', async () => {
  await expect(
    async () =>
      await setup({
        fixture: 'replace-single-string.js',
        loaderOptions: {
          matchingArray: [{ replace: 'Bonjour', invalidOption: '' }],
        },
      })
  ).rejects.toMatchObject(
    expect.arrayContaining([
      expect.objectContaining({
        message: expect.stringContaining("has an unknown property 'invalidOption'"),
      }),
    ])
  )
})

it('should fail if an option is missing', async () => {
  await expect(
    async () =>
      await setup({
        fixture: 'replace-single-string.js',
        loaderOptions: {
          matchingArray: [{ replace: 'Bonjour' }],
        },
      })
  ).rejects.toMatchObject(
    expect.arrayContaining([
      expect.objectContaining({
        message: expect.stringContaining("misses the property 'match'"),
      }),
    ])
  )
})

it('should fail if additional option are provided', async () => {
  await expect(
    async () =>
      await setup({
        fixture: 'replace-single-string.js',
        loaderOptions: {
          matchingArray: [{ match: 'NoMatch', replace: 'Bonjour', thirdOption: '' }],
        },
      })
  ).rejects.toMatchObject(
    expect.arrayContaining([
      expect.objectContaining({
        message: expect.stringContaining("has an unknown property 'thirdOption'"),
      }),
    ])
  )
})
