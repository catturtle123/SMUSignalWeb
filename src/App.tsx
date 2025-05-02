import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-8 text-2xl text-blue-600 font-bold">
      Tailwind 적용 완료!
    </div>
  )
}

export default App
