interface TokenData {
  userId: string;
  login: string;
  iat: number;
}

export const parseJWT = (token: string): TokenData | null => {
  const str = token.split('.')[1];
  if (str) {
    let result = null;
    try {
      result = JSON.parse(atob(str));
    } catch {
      // Parse failed - invalid token
    }
    return result;
  }
  return null;
};
