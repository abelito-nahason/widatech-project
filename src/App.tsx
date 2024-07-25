import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddInvoice from './pages/add-invoice'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AddInvoice/>} />
          <Route path='/card' element={<h1>card</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
