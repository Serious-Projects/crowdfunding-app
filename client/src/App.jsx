import { Routes, Route } from 'react-router-dom';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import { Sidebar, Navbar } from './components';
import './styles.css';

function App() {
  return (
    <div className="relative sm:p-8 p-4 bg-[#13131e] min-h-screen flex flex-row ">
      <div className="relative hidden mr-10 sm:flex">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
