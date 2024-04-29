import React, { useState, createContext } from 'react'

export const AppContext = createContext();

function ParentContext({children}) {

    const [isToggled, setIsToggled] = useState(true)

  return (
    <AppContext.Provider value={{ isToggled, setIsToggled }}>
        {children}
    </AppContext.Provider>
  )
}

export default ParentContext