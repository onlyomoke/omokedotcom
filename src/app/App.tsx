import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../app/components/Layout';
import { HomePage, FilmsPage, AboutPage, ContactPage } from '../app/components/pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="films" element={<FilmsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;