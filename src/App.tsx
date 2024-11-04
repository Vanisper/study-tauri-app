import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import JetbrainsCookiesCookies from "./components/JetbrainsCookiesCookies";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [showCookiesPopup, setShowCookiesPopup] = useState(false); // 状态来控制弹窗显示
   // 使用 useEffect 来动态控制 body 的 class
   useEffect(() => {
    if (showCookiesPopup) {
      document.body.classList.add("lock-scroll"); // 弹窗打开时，添加 class 到 body
    } else {
      document.body.classList.remove("lock-scroll"); // 弹窗关闭时，移除 class
    }

    // 清理函数确保在组件卸载时移除 class
    return () => {
      document.body.classList.remove("lock-scroll");
    };
  }, [showCookiesPopup]);

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <div className="row">
        <button onClick={() => setShowCookiesPopup(true)}>Open Cookie Settings</button> {/* 按钮打开弹窗 */}
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>

      {/* 根据状态显示弹窗 */}
      {showCookiesPopup && (
        <JetbrainsCookiesCookies onClose={() => setShowCookiesPopup(false)} />  // 正确传递关闭函数
      )}
    </div>
  );
}

export default App;
