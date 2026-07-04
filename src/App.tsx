import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Characters from './pages/Characters'
import CharacterDetail from './pages/CharacterDetail'
import Stories from './pages/Stories'
import StoryEditor from './pages/StoryEditor'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/new" element={<StoryEditor />} />
          <Route path="/stories/:id/edit" element={<StoryEditor />} />
          <Route path="/stories/:id" element={<StoryEditor readonly />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
