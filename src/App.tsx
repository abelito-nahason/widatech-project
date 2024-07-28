import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddInvoice from './pages/add-invoice'
import PagePresetComponent from './components/PagePresetComponent'
import InvoiceCard from './pages/invoice-card'
import TimeGraphPage from './pages/time-graph'
  export const pagesList = [
    {
      path: '/',
      name: 'Add Invoice',
      element:<AddInvoice/>
    },
    {
      path: '/card',
      name: 'Invoice Cards',
      element:<InvoiceCard/>
    },
    {
      path: '/graph',
      name: 'Invoice Graph',
      element:<TimeGraphPage/>
    },
  ]

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <PagePresetComponent>
          <Routes>
                {
                  pagesList.map((page)=> (<Route key={page.path} path={page.path} element={page.element} />))
                }
          </Routes>
        </PagePresetComponent>
      </BrowserRouter>
    </div>
  )
}

export default App
