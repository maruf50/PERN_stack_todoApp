import NoteList from './components/NoteList'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Navbar />
        <NoteList />
      </div>
    </div>
  )
}

export default App
