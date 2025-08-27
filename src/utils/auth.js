const AUTH_TOKEN_KEY = "water_app_auth_token"

export const login = () => {
  localStorage.setItem(AUTH_TOKEN_KEY, "dummy_auth_token")
}

export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

export const isAuthenticated = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY) !== null
}
