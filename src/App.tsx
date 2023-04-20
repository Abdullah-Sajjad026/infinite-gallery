import {Footer, Hero, ImagesGallery} from "./components";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Hero />
        <ImagesGallery />
        {/* <Footer /> */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
