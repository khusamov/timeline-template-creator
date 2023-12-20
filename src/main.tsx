import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import './index.scss'
import {version, description} from '../package.json'

console.log(`Программа: ${description}`)
console.log(`Версия программы: ${version}`)
console.log(`Дата сборки: ${BUILD_DATE}`)

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
   <React.StrictMode>
      <App/>
   </React.StrictMode>
)
