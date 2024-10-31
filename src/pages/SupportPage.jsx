import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

// Support Page
export const SupportPage = () => {
    const contactMethods = [
        {
            icon: Mail,
            title: 'Email Support',
            description: 'support@leukai.com',
            type: 'email'
        },
        {
            icon: Phone,
            title: 'Phone Support',
            description: '+1 (555) 123-4567',
            type: 'phone'
        },
        {
            icon: MapPin,
            title: 'Location',
            description: '123 AI Medical Center, Tech City, USA',
            type: 'address'
        }
    ];

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement form submission logic
        console.log('Support Form Submitted', formData);
        alert('Thank you for your message. We will get back to you soon!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-bold text-blue-900 text-center mb-12">
                        Support & Contact
                    </h1>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Methods */}
                        <div>
                            <h2 className="text-3xl font-semibold text-blue-800 mb-8">
                                Contact Information
                            </h2>
                            {contactMethods.map((method, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-md p-6 mb-6 flex items-center"
                                >
                                    <method.icon className="text-blue-600 mr-4" size={40} />
                                    <div>
                                        <h3 className="text-xl font-semibold text-blue-900">
                                            {method.title}
                                        </h3>
                                        <p className="text-gray-700">{method.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Support Form */}
                        <div>
                            <h2 className="text-3xl font-semibold text-blue-800 mb-8">
                                Send Us a Message
                            </h2>
                            <form
                                onSubmit={handleSubmit}
                                className="bg-white rounded-xl shadow-md p-8 space-y-6"
                            >
                                <div>
                                    <label className="block text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};