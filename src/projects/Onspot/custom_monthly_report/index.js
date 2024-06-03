function parseArguments() {
  const args = process.argv.slice(2) // Remove the first two elements
  let argObject = {}

  args.forEach((arg, index) => {
    if (arg.startsWith('--')) {
      const argName = arg.slice(2) // Remove the '--'
      const argValue = args[index + 1]
      argObject[argName] = argValue
    }
  })

  return argObject
}

const args = parseArguments()
console.log(args)
