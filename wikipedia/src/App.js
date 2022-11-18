import SearchBox from './components/SearchBox';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
	return (
		<div>
			<ToastContainer limit={1} />
			<SearchBox />
		</div>
	);
}

export default App;
