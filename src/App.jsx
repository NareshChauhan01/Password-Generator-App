import React, { useState, useCallback, useEffect, useRef } from 'react'

function App() {

   const [length, setLength] = useState(10);
   const [numberAllowed, setNumberAllowed] = useState(false);
   const [characterAllowed, setCharacterAllowed] = useState(false);
   const [password, setPassword] = useState("");

   // Useref hook
   const passwordRef = useRef(null);
   console.log(passwordRef);

   const copyHandler = useCallback(() => {
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0, 6)
      window.navigator.clipboard.writeText(password);
   }, [password])

   function changeHandler(e) {
      setLength(e.target.value)
   }

   const passwordGenerator = useCallback(() => {

      let password = '';
      let string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

      if (numberAllowed) string += '0123456789';
      if (characterAllowed) string += '!@#$%^&*()_+';


      for (let i = 1; i <= length; i++) {
         let char = Math.floor(Math.random() * string.length + 1);
         password += string.charAt(char);
      }
      setPassword(password);

   }, [length, numberAllowed, characterAllowed, setPassword]);


   useEffect(() => {
      passwordGenerator();
   }, [length, numberAllowed, characterAllowed])

   return (
      <div className="container">

         <h1>Password Generator</h1>

         <div className="display">

            <div className="display-container">
               <input
                  type="text"
                  readOnly
                  placeholder='Password'
                  className='display-input'
                  value={password}
                  ref={passwordRef}
               />
               <button
                  className='copy-btn'
                  onClick={copyHandler}
               >Copy</button>
            </div>

            <div className="length-container">
               <div>
                  <p>Length:</p>
                  <p>{length}</p>
               </div>

               <input
                  type="range"
                  min={1}
                  max={20}
                  value={length}
                  onChange={changeHandler}
                  className='range-input'
               />
            </div>

            <div className="number-checkbox">
               <label htmlFor="">Include Number:</label>
               <input
                  type="checkbox"
                  defaultChecked={numberAllowed}
                  onChange={() => {
                     setNumberAllowed((prev) => !prev);
                  }}
               />
            </div>

            <div className="character-checkbox">
               <label htmlFor="">Include Character:</label>
               <input
                  type="checkbox"
                  defaultChecked={characterAllowed}
                  onChange={() => {
                     setCharacterAllowed((prev) => !prev);
                  }}
               />
            </div>
         </div>

      </div>
   )
}

export default App 