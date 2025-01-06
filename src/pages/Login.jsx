import { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../services/api";
import PropTypes from 'prop-types';  // Import PropTypes

// Define propTypes above the component definition
Login.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired // Add prop type validation
};

export function Login({ setIsAuthenticated }) {
    const [passwordShown, setPasswordShown] = useState(false);
    const [error, setError] = useState(""); 
    
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

    const loginUser = async () => {
        try {
            let response = await API.loginUser(user);
            console.log(response);
            if (response.isSuccess) {
                setError('');
                // Store the tokens in sessionStorage
                sessionStorage.setItem("accessToken", `Bearer ${response.data.accessToken}`);
                // Set authentication state
                navigate('/'); // Redirect to home or dashboard
                setIsAuthenticated(true);
            } else {
                setError("Something went wrong, please try again later");
            }
        } catch (error) {
            setError("Something went wrong, please try again later");
            console.error(error);
        }
    };

    return (
        <section className="grid text-center h-screen items-center p-8">
            <div>
                <Typography variant="h3" color="blue-gray" className="mb-2">
                    Sign In
                </Typography>
                <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
                    Enter your email and password to sign in
                </Typography>
                <form
                    action="#"
                    className="mx-auto max-w-[24rem] text-left"
                    onSubmit={(e) => {
                        e.preventDefault();
                        loginUser();
                    }}
                >
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
                            placeholder="name@mail.com"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                                placeholder="********"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
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
                        type="submit"
                        color="gray"
                        size="lg"
                        className="mt-6"
                        fullWidth
                    >
                        Sign In
                    </Button>
                    {error && (
                        <div className="mt-4 text-red-500 text-sm">
                            {error}
                        </div>
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
                        className="!mt-4 text-center font-normal"
                    >
                        Not registered?{" "}
                        <Link to="/signup" className="font-semibold text-gray-900">
                            Create account
                        </Link>
                    </Typography>
                </form>
            </div>
        </section>
    );
}

export default Login;
