import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Url } from '@/config/urls.tsx';
import Home from '@/pages/home/home';
import CarDetails from '@/pages/carDetails/carDetails';
import CarCompare from '@/pages/carCompare/carcompare';

const Router = () =>(
    <BrowserRouter>
    <Routes>
      <Route path={Url.Home} element={<Home />} />
      <Route path={Url.Car} element={< CarDetails/>} />
      <Route path={Url.Compare} element={< CarCompare/>} />
    </Routes>
  </BrowserRouter>
);

export default Router;