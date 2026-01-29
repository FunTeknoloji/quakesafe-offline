import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EmergencyMode from './pages/EmergencyMode';
import GuidePre from './pages/GuidePre';
import GuideDuring from './pages/GuideDuring';
import GuidePost from './pages/GuidePost';
import FirstAid from './pages/FirstAid';
import Tools from './pages/Tools';
import Map from './pages/Map';
import Family from './pages/Family';
import AIAssistant from './pages/AIAssistant';
import Settings from './pages/Settings';
import Messaging from './pages/Messaging';
import SoundTools from './pages/SoundTools';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/emergency" element={<EmergencyMode />} />

          {/* Rehber Bölümü */}
          <Route path="/guide/pre" element={<GuidePre />} />
          <Route path="/guide/during" element={<GuideDuring />} />
          <Route path="/guide/post" element={<GuidePost />} />
          <Route path="/first-aid" element={<FirstAid />} />

          {/* Harita ve Toplanma */}
          <Route path="/map" element={<Map />} />

          {/* İletişim */}
          <Route path="/family" element={<Family />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/ai" element={<AIAssistant />} />

          {/* Diğer */}
          <Route path="/tools" element={<Tools />} />
          <Route path="/sound-tools" element={<SoundTools />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
