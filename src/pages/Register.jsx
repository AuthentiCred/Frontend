import { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export function Register() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

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
                            placeholder="name@mail.com"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="name">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                Your name
                            </Typography>
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
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
                                placeholder="********"
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
                    <Button color="gray" size="lg" className="mt-6" fullWidth>
                        sign up
                    </Button>
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
                    <Button
                        variant="outlined"
                        size="lg"
                        className="mt-6 flex h-12 items-center justify-center gap-2"
                        fullWidth
                    >
                        <img
                            src={`https://www.material-tailwind.com/logos/logo-google.png`}
                            alt="google"
                            className="h-6 w-6"
                        />{" "}
                        sign in with google
                    </Button>
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
