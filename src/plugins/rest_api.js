function url () {
  const isProd = process.env.NODE_ENV === 'production'
  const baseUrl = isProd ? "https://route-api-1.herokuapp.com/" : "http://localhost:3000"
  return baseUrl
}

export default { url }
