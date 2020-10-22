import React from 'react';
import { ThemeProvider } from 'styled-components'
import { useDarkMode } from './components/useDarkMode'
import { GlobalStyles } from './components/styles/GlobalStyles'
import { lightTheme, darkTheme } from './components/styles/Themes'
import Header from './components/Header'
import Routes from './components/routes'
import { BrowserRouter as Router } from 'react-router-dom'
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify'

function App() {
  const [theme, themeToggler, mountedComponent] = useDarkMode()
  const themeMode = theme === 'light' ? lightTheme : darkTheme

  if(!mountedComponent) return <div/>

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles/>
        <Router>
          <Header themeToggler={themeToggler}/>
          <Routes />
          <Footer />
        </Router>
        <ToastContainer />
      </>
    </ThemeProvider>
  );
}

export default App;
