import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as DOMPurify from 'dompurify';
const SerchBox = () => {
	const [search, setSearch] = useState('');
	const [results, setResult] = useState([]);
	const handleOnChange = (e) => {
		let searchData = e.target.value;

		if (searchData !== '') {
			setSearch(searchData);
		} else if (searchData === '' && results.length < 0) {
			toast.error('Please enter a search string');
		}
	};
	const submitHandler = (e) => {
		e.preventDefault();
		axios
			.get(`http://localhost:5000`, { params: { search } })
			.then((response) => {
				setResult(response.data);
			});
		setSearch('');
	};

	return (
		<>
			<div className="mt-10 text-center">
				<form onSubmit={submitHandler}>
					<label className="">
						Enter a string to search:
						<input
							type="text"
							value={search || ''}
							onChange={handleOnChange}
							className=" border boader-2 p-2 m-2 "
						/>
					</label>
					<button
						className="bg-blue-600 p-2 text-white"
						type="submit"
					>
						search
					</button>
				</form>
			</div>
			{results.length > 0
				? results.map((result, index) => (
						<div key={index} className="flex justify-center">
							<div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg border border-1 my-2">
								<div className="p-6 flex flex-col justify-start">
									<h5 className="text-gray-900 text-xl font-medium mb-2">
										{result.title}
									</h5>
									<p
										className="text-gray-700 text-base mb-4"
										dangerouslySetInnerHTML={{
											__html: DOMPurify.sanitize(
												result.snippet
											),
										}}
									></p>
									<div className='inline-flex justify-between'>
										{' '}
									<p className="text-gray-600 text-xs">
										Last Updated:{' '}
											{result.timestamp}
										</p>
									<p className="text-gray-600 text-xs">
										number of words: {' '}
											{result.wordcount}
										</p>
									</div>
								</div>
							</div>
						</div>
				  ))
				: null}
		</>
	);
};

export default SerchBox;
