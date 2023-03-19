import axios from "axios"

type Token = {
  token: string
}

export async function getToken(url: string, signal: AbortSignal): Promise<Token> {
  try {
    const response = await axios.get<Token>(url, {signal})
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      throw new Error(`Failure to refresh token: ${error}`)
    }
  }
}