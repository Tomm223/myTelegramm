import { HTTPTransport } from './fetch'

const API_BASE = process.env.API_URL_BASE
export const API_BASE_RESOURCES = process.env.API_URL_RESOURCES
export function HTTP(url: string) {
  // class Dublicate extends HTTPTransport {}
  return new HTTPTransport(API_BASE + url)
}
