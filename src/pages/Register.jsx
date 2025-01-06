import { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../services/api";
import PropTypes from 'prop-types';  // Import PropTypes

// Define propTypes above the component definition
Register.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,  // Add prop type validation
};

export function Register({setIsAuthenticated}) {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

    const [error, setError] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const signupUser = async () => {
        let response = await API.userSignup(user);
        console.log(response);
        if (response.isSuccess) {
            console.log(response);
            setError('');
            // Save the access token in session storage
            navigate('/');
            setIsAuthenticated(true);
            sessionStorage.setItem("accessToken", response.data.access_token);
        } else {
            setError("Something went wrong, please try again later");
        }
    };

    return (
        <section className="grid text-center h-screen items-center p-8">
            <div>
                <Typography variant="h3" color="blue-gray" className="mb-2">
                    Sign Up
                </Typography>
                <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
                    Enter your email and password to sign in
                </Typography>
                <form action="#" className="mx-auto max-w-[24rem] text-left">
                    <div className="mb-6">
                        <label htmlFor="email">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                Your Email
                            </Typography>
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={user.email}
                            placeholder="name@mail.com"
                            onChange={onInputChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="name">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                Your Name
                            </Typography>
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={onInputChange}
                            placeholder="John Doe"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                Password
                            </Typography>
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={passwordShown ? "text" : "password"}
                                name="password"
                                value={user.password}
                                placeholder="********"
                                onChange={onInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-4 flex items-center text-gray-600 focus:outline-none"
                            >
                                {passwordShown ? (
                                    <EyeIcon className="h-5 w-5" />
                                ) : (
                                    <EyeSlashIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                    <Button
                        color="gray"
                        size="lg"
                        className="mt-6"
                        fullWidth
                        onClick={signupUser}
                    >
                        Sign Up
                    </Button>
                    {error && (
                        <Typography className="mt-2 text-red-600 text-sm">
                            {error}
                        </Typography>
                    )}
                    <div className="!mt-4 flex justify-end">
                        <Typography
                            as="a"
                            href="#"
                            color="blue-gray"
                            variant="small"
                            className="font-medium"
                        >
                            Forgot password
                        </Typography>
                    </div>
                    <Typography
                        variant="small"
                        color="gray"
                        className="!mt-4 text-center font-normal mb-4"
                    >
                        Already registered?{" "}
                        <Link to="/signin" className="font-semibold text-gray-900">
                            Sign In
                        </Link>
                    </Typography>
                </form>
            </div>
        </section>
    );
}

export default Register;
