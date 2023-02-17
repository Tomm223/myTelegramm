export const useNavigate = (href: string) => {
  history.pushState({}, '', href)
  window.dispatchEvent(new Event('popstate'))
}
