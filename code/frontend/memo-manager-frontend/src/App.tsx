import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MemoList from './pages/MemoList';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MemoList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
