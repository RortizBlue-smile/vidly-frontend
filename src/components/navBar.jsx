import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function NavBar({ user }) {
	return (
		<nav className='navbar navbar-expand-lg bg-dark navbar-dark'>
			<div className='container-fluid'>
				<Link to='/' className='navbar-brand'>
					Vidly
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav'>
						<li className='nav-item'>
							<NavLink className='nav-link' aria-current='page' to='movies'>
								Movies
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link' to='customers'>
								Customers
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link' to='rentals'>
								Rentals
							</NavLink>
						</li>
						{!user && (
							<>
								<li className='nav-item'>
									<NavLink className='nav-link' to='login'>
										Login
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink className='nav-link' to='register'>
										Register
									</NavLink>
								</li>
							</>
						)}
						{user && (
							<>
								<li className='nav-item'>
									<NavLink className='nav-link' to='profile'>
										{user.name}
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink className='nav-link' to='logout'>
										Logout
									</NavLink>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default NavBar
