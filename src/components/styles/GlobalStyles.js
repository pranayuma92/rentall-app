import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Source Sans Pro', Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  body .jumbotron {
    background: ${({ theme }) => theme.jumbotron};
    transition: all 0.50s linear;
    & h1 {
      text-align: center;
      font-weight: bold;
      margin-bottom: 30px;
    }

    & input {
      padding: 25px;
      border-radius: 0;
      outline: none;
      border: 2px solid ${({ theme }) => theme.text};
    }
  }

  #root {
    min-height: 100vh;
    position: relative;
  }

  .card {
    background-color: ${({ theme }) => theme.body};
    transition: all 0.50s linear;
    cursor: pointer;
    border-radius: 0;

    & img {
      object-fit: cover;
      height: 150px;
      padding: 10px;
    }

    & .card-body {
      line-height: 0.8;
    }

    & .card-title {
      font-size: 18px;
      font-weight: bold;
      margin: 0;
    }

    & .card-footer {
      & p {
        margin: 0;
      }
    }
  }

  span.navbar-brand img {
    height: 30px;
  }

  span.navbar-brand {
      padding: 20px 30px;
      background: #002a62;
  }

  .navbar-expand {
      padding: 0 20px 0 0;
  }

  .nav-link {
    width: 6em;
    text-align: center;
  }

  .filter-wrapper {

    & .form-check-input {
      width: 15px;
      height: 15px;
      cursor: pointer;
    }

    & .category-bar {
      cursor: pointer;
    }

    & .location-bar {
      cursor: pointer;
    }

    & .unit-bar {
      cursor: pointer;
    }

    & .category-section {
      border-bottom: 1px solid #cfcfcf;
    }

    & .location-section {
      border-bottom: 1px solid #cfcfcf;
    }

    & .unit-section {
      border-bottom: 1px solid #cfcfcf;
    }
  }

  .ql-container.ql-snow {
    height: 300px;
  }

  .editor-box {
    & input[type=text] {
      border: 0;
      font-size: 24px;
    }

    & input[type=number] {
      border-radius: 0;
    }

    & input[type=radio] {
      height: 15px;
      width: 15px;
      cursor: pointer;
    }

    & button {
      border-radius: 0;
    }

    & .cancel-button {
      background: none;
      border: none;
      color: #eb0505;
      cursor: pointer;
    }
  }

  .img-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    background: #f6f6f6;
    cursor: pointer;
    
    & img {
      object-fit: contain;
      height: 130px;
      width: 100%;

    }

    & .add {
      height: 50px !important;
    }
  }

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(255 255 255 / 0.5);
    z-index: 2;
  }

  .box-login {
    background: #002a62;
    padding: 15px 30px 20px;

    & input {
      border-radius: 0;
      padding: 10px;
      box-shadow: none;
      border: none;
    }

    & button {
      margin: 0 5px;
      border-radius: 0;
      border: none;
      width: 8rem;
    }
  }

  .profile-page {
    & button {
      border-radius: 0;
    }
  }

  .edit-profile-page {
    & button,
      input {
      border-radius: 0;
    }
  }

  footer.bg-secondary {
    position: absolute;
    width: 100%;
    bottom: 0;
    background: #002a62 !important;
  }

  .swal-modal,
  .swal-button {
    border-radius: 0;
  }

  .side-detail-left {
    & img {
      width: 100%;
      height: 450px;
      object-fit: cover;
    }


}

`