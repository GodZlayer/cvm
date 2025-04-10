import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { I18nProvider } from "./lib/i18n";

function App() {
  return (
    <I18nProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Carregando...
          </div>
        }
      >
        <>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </I18nProvider>
  );
}

export default App;
