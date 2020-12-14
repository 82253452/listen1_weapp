import {useEffect, useRef} from "react";

export default function (effect, deps) {
  const first = useRef(true)
  if(first.current){
    first.current=false
  }
  useEffect(() => {
    if (!first.current) {
      effect();
    }
  }, deps)

}
