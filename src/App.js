import { buttons } from "./buttonsArray";
import "./App.css";
import { useApp } from "./useApp";

function App() {
  const { handleOperator, makeDisplay } = useApp();

  return (
    <div className="calculate">
      <div className="content">
        <div className="result">{makeDisplay}</div>

        <div className="row">
          {buttons.map((button) => {
            return (
              <button
                key={button.name}
                className={button.class}
                onClick={() => handleOperator(button.name)}
                type="button"
              >
                {button.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
