type Indexed = Record<string, any>

export function resolveResponse<T>(response: string): Promise<T | { reason: string }> {
  try {
    if (Array.isArray(response) || (response != null && typeof response == 'object')) {
      return response
    }

    return JSON.parse(response)
  } catch (err) {
    return { reason: response }
  }
}
