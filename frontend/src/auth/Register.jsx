import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    try {
      await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      setUser({ email });

      toast.success("Registration successful");
      navigate("/workspace");
    } catch (err) {
      const message =
        err.response?.data?.error || "Signup failed";
      setFormError(message);
      toast.error(message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center min-h-screen 
      bg-linear-to-br from-indigo-200 via-white to-blue-200 p-4">

      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg 
        rounded-2xl shadow-xl p-6 sm:p-8">

        <h2 className="text-3xl font-bold text-center text-indigo-700">
          Bug Tracker
        </h2>
        <p className="mt-2 text-center text-gray-500">
          Create your account to get started.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <div className="relative mt-1">
              <User
                size={18}
                className="absolute left-3 top-2.5 text-gray-400"
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border p-2 pl-10 
                  focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <div className="relative mt-1">
              <Mail
                size={18}
                className="absolute left-3 top-2.5 text-gray-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border p-2 pl-10 
                  focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative mt-1">
              <Lock
                size={18}
                className="absolute left-3 top-2.5 text-gray-400"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border p-2 pl-10 
                  focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {formError && (
            <p className="text-red-500 text-sm text-center">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 
              rounded-lg bg-indigo-600 py-2 text-black font-semibold 
              hover:bg-indigo-700 transition"
          >
            <ArrowRight size={18} />
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
