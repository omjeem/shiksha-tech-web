import Navbar from '../components/Navbar';
import RegistrationForm from './components/RegistrationForm';
import Footer from '../components/Footer';

export default function Register() {
  return (
    <main>
      <Navbar />
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">School Registration</h1>
              <p className="text-gray-600 mb-8">Complete the form below to register your school for Shiksha Tech Education platform.</p>
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
} 