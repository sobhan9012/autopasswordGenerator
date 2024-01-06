import { useCallback, useState, useEffect, useRef} from 'react'

// import './App.css'

function App() {
  const [Length, setLength] = useState(8)
  const [NumberAllowed, setNumberAllowed] = useState(false)
  const [CharAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState("")

  //ref hook
  const passwordRef = useRef(null)

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  
    if (NumberAllowed) {
      str += "0123456789";
    }
  
    if (CharAllowed) {
      str += '!@#$%^&*()[]{}?~+-*/'
    }
  
    for (let i = 1; i <= Length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
  
    setPassword(pass);
  }, [Length, NumberAllowed, CharAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(Password)
  } , [Password])
  
  useEffect(() => {
    PasswordGenerator()
  }, [Length,NumberAllowed,CharAllowed,PasswordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
         />

          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-4 py-2 rounded-md transition transform hover:scale-105 focus:outline-none focus:ring focus:border-blue-300 hover:bg-blue-800 duration-200'
          >
            Copy
          </button>


        </div>
        
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'> 
            <input type="range" 
            min={6}
            max={100}
            value={Length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {Length}</label>
          </div>


          <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox" 
            defaultChecked = {NumberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>


          <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox" 
            defaultChecked = {CharAllowed}
            id="charInput"
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
            />
            <label htmlFor='charInput'>Charcters</label>
          </div>
        </div>
      </div>


    </>
  )
}

export default App
