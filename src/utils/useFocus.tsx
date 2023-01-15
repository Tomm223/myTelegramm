

export const useOutSide = (inintialVisible) => {
   const [isShow, setIsShow] = useState(inintialVisible)
   const ref = document

   const hundleClickOutSide = (e) => {
      if (ref.current && ref.current === e.target) {
         setIsShow(false)
      }
   }

   useEffect(() => {
      document.addEventListener('click', hundleClickOutSide, true)
      return () => {
         document.removeEventListener('click', hundleClickOutSide, true)
      }
   }, [])

   return {
      ref,
      isShow,
      setIsShow
   }
}

