import {Route, Routes} from 'react-router-dom'
import View from './pages/View'
import UploadTasks from './pages/UploadTasks'
import NotFound from './pages/NotFound'

import Navbar from './components/Navbar'

function App(){
  return(
   <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<View/>} />
      <Route path="/new" element={<UploadTasks/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
   
   </>
  )
}

export default App