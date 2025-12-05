import Jokes from '../pages/Jokes';
  import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const App = () => {

const queryClient=new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
          <Jokes/>
      </QueryClientProvider>
     
    </div>
  )
}

export default App
