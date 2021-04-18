# Usage RichMD for React
It is usage example RichMD for React. 

This code add to JSX.

```js
import React, { useState } from 'react';
import { render } from 'react-dom'
import { richmd } from 'richmd' // import Richmd

const Editor = () => {
  const [text, setMarkdown] = useState('');

  return (
    <>
      <form id="post-form">
        <div id="editor">
          <textarea className="textField" onChange={(e) => setMarkdown(e.target.value)}></textarea>
        </div>
        <div id="preview">
          <div className="preview" dangerouslySetInnerHTML={{__html: richmd(text)}}></div>
        </div>
      </form>
    </>
  )
}

render(<Editor />, document.getElementById('root'))
```
