import React, {useState} from "react";



//create your first component
const Home = () => {
	const [email, setEmail] = useState('');
	const [emailList, setEmailList] = useState([]);

	//functions
	const handleSubmit = e => {
		e.preventDefault();
		setEmailList([...emailList, email]);
	}

	const handleChange = e => {
		setEmail(e.target.value);
	}

	const handleDelete = (index) => {
		setEmailList(emailList.filter((el, i) => i != index))
	}

	return (
		<div className="page">
			<div className="text-center">
				<form onSubmit={handleSubmit} className="form">
					<div className="subscribe">
						<p>SUBSCRIBE</p>
						<input
							placeholder="Your e-mail"
							className="subscribe-input"
							name="email"
							type="email"
							value={email}
							onChange={handleChange}
							required
						/>
						<br />
						<input className="submit-btn d-flex" type="submit" value="Submit" />
					</div>
				</form>

				<ul className="emailList">
					{emailList.length > 0
						? emailList.map((email, i) => (
							<li key={i}>
								{email}
								<span onClick={() => handleDelete(i)}>
									<i className="fa-solid fa-xmark"></i>
								</span>
							</li>
						))
						: <li>Add some emails</li>
					}
				</ul>
				<p className="itemCount">{emailList.length} item left</p>
			</div>
		</div>

	);
};

export default Home;
