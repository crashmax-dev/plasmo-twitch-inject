import { createRoot } from 'react-dom/client'
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

export const getRootContainer = () => {
  return document.querySelector('.tw-modal-header__title > h2.tw-title')
}

async function observeElement(selector: string, callback: (el: Element) => void) {
  const observer = new MutationObserver((mutation) => {
    mutation.forEach((mutation) => {
      mutation.addedNodes.forEach((el) => {
        const addedEl = (el as Element).querySelector(selector)
        callback(addedEl)
      })
    })
  })

  const el = await waitElement(selector)
  if (el) {
    observer.observe(el, {
      childList: true,
      subtree: true
    })
  }
}

window.addEventListener('load', async () => {
  const el = await waitElement('.tw-modal-header__title > h2.tw-title')
  const root = createRoot(el)
  root.render(<Hello />)
})

const Hello = () => {
  return (
    <div className='title'>
      <h1 style={{ color: 'tomato' }}>Привет, Виталь!</h1>
    </div>
  )
}

export default Hello
