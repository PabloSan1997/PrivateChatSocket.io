import { ContextProvider } from "./ContextProvider"
import { RoutesIndex } from "./routes/RoutesIndex"


function App() {

  return (
    <ContextProvider>
      <RoutesIndex/>
    </ContextProvider>
  )
}

export default App
