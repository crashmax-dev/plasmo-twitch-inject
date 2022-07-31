import cssText from 'data-text:~style.css'
import { waitElement } from '@1natsu/wait-element'
import type { PlasmoContentScript } from 'plasmo'

export const config: PlasmoContentScript = {
  matches: ['https://dashboard.twitch.tv/u/*/stream-manager'],
  run_at: 'document_end'
}

export const getStyle = () => {
  const style = document.createElement('style')
  style.textContent = cssText
  return style
}

export const getMountPoint = async () => {
  const el = await waitElement('h2.CoreText-sc-cpl358-0')
  const div = document.createElement('div')
  div.classList.add('title')
  el.appendChild(div)
  return div
}

const Hello = () => {
  return (
    <div className='title'>
      <h1 style={{ color: 'tomato', zIndex: 999 }}>Привет, Виталь!</h1>
    </div>
  )
}

export default Hello
