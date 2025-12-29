
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main } from './pages/main-page';
import { Signup } from './pages/signup';

function APP(){
    
     return <BrowserRouter>
          <Routes>
               <Route path="/myQuestions" element={<Main></Main>}></Route>
               <Route path="/signup" element={<Signup></Signup>}></Route>
          </Routes>
     </BrowserRouter>
     
}


export default APP;