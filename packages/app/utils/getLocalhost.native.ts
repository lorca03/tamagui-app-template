import Constants from 'expo-constants'

let localhost: string | undefined

export function getLocalhost() {
  if (localhost) return localhost
  const debuggerHost = Constants.expoConfig?.hostUri
  localhost = debuggerHost?.split(':')[0]
  if (!localhost) {
    localhost = 'localhost'
  }
  return localhost
}

export function replaceLocalhost(address: string) {
  return address.replace('://localhost:', `://${getLocalhost()}:`)
}
