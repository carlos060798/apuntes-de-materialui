
import { Toaster } from 'react-hot-toast'
import RouterApp from './route/Route'


function App() {

  return (
    <>
     <RouterApp />
     <Toaster 
      position="top-right"
      reverseOrder={false}
     
     />

    </>
  )
}

export default App
