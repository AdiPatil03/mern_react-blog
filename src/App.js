import React, {Suspense} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './resources/css/blog.scss';
import LandingPage from './component/LandingPage';

function App() {
    return (
        <Suspense fallback="loading">
            <LandingPage/>
        </Suspense>
    );
}

export default App;
