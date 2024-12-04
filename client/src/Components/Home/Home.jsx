import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGlobeAmericas, FaShip, FaPlane, FaTruck, FaChartLine, FaHandshake, FaStar, FaQuoteLeft, FaArrowRight, FaSearch, FaMapMarkedAlt, FaCalendarAlt, FaUserTie } from 'react-icons/fa';
import { Carousel } from 'flowbite-react';

const priceList = [
  { origin: "New York", destination: "Los Angeles", price: 250 },
  { origin: "San Francisco", destination: "Chicago", price: 200 },
  { origin: "Miami", destination: "Houston", price: 150 },
  { origin: "Seattle", destination: "Austin", price: 180 },
  { origin: "Boston", destination: "Washington D.C.", price: 120 },
  { origin: "Chicago", destination: "Denver", price: 220 },
  { origin: "Los Angeles", destination: "San Francisco", price: 100 },
  { origin: "Houston", destination: "Miami", price: 150 },
  { origin: "Austin", destination: "Seattle", price: 200 },
  { origin: "Dhaka, BD", destination: "Kolkata, India", price: 100 },
  { origin: "Mumbai, India", destination: "Beijing, China", price: 500 },
  { origin: "New York, USA", destination: "London, UK", price: 750 },
  { origin: "Los Angeles, USA", destination: "Dubai, UAE", price: 900 },
  { origin: "Riyadh, Saudi Arabia", destination: "Dubai, UAE", price: 300 },
  { origin: "New York, USA", destination: "Hong Kong, China", price: 800 },
  { origin: "London, UK", destination: "Dubai, UAE", price: 700 },
  { origin: "Mumbai, India", destination: "London, UK", price: 650 },
  { origin: "Dubai, UAE", destination: "Dhaka, BD", price: 450 },
  { origin: "Beijing, China", destination: "Mumbai, India", price: 550 }
];

const testimonials = [
  { name: "John Doe", company: "ABC Corp", text: "Shahed Company Limited has transformed our international shipping process. Their expertise and dedication are unmatched." },
  { name: "Jane Smith", company: "XYZ Inc", text: "We've seen a significant improvement in our supply chain efficiency since partnering with Shahed Company Limited." },
  { name: "Mike Johnson", company: "123 Enterprises", text: "The level of personalized service and attention to detail provided by Shahed Company Limited is exceptional." },
  { name: "Emily Brown", company: "Global Traders Ltd", text: "Shahed Company Limited's innovative solutions have helped us expand our market reach significantly." },
  { name: "David Lee", company: "Tech Innovators", text: "Their customs brokerage service saved us time and money. Highly recommended for international businesses." }
];

const Home = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState(null);
  const [currency, setCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(85.5); // 1 USD = 85.5 BDT (approx.)
  const [priceDetails, setPriceDetails] = useState(null);

  useEffect(() => {
    calculateQuote();
  }, [origin, destination, weight, currency]);

  const calculateQuote = () => {
    const route = priceList.find(
      r => r.origin === origin && r.destination === destination
    );

    if (route && weight) {
      const basePrice = route.price;
      const weightInKg = parseFloat(weight);
      const weightFactor = Math.max(1, Math.ceil(weightInKg / 10));
      const weightIncrease = 1 + (0.002 * (weightFactor - 1)); // 0.2% increase for each 10 kg
      const totalPrice = basePrice * weightIncrease;

      setPrice(totalPrice);
      setPriceDetails({
        basePrice,
        weightFactor,
        weightIncrease,
        totalPrice
      });
    } else {
      setPrice(null);
      setPriceDetails(null);
    }
  };

  const formatCurrency = (amount, curr) => {
    if (curr === 'USD') {
      return `$${amount.toFixed(2)}`;
    } else {
      return `৳${(amount * exchangeRate).toFixed(2)}`;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <div className="h-[600px]">
        <Carousel className="h-full" indicators={false}>
          {[
            { title: "Global Trade Excellence", subtitle: "Your premier partner in international import and export solutions", image: "https://images.unsplash.com/photo-1577416412292-747c6607f055?auto=format&fit=crop&w=1600&h=700&q=80" },
            { title: "Worldwide Shipping", subtitle: "Efficient and reliable shipping solutions across the globe", image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1600&h=700&q=80" },
            { title: "Expert Logistics", subtitle: "Streamlined logistics services tailored to your business needs", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&h=700&q=80" },
          ].map((slide, index) => (
            <div key={index} className="relative flex h-full items-center justify-center bg-gray-900 dark:bg-gray-700 dark:text-white">
              <img src={slide.image} alt={slide.title} className="absolute w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
              <div className="relative text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold text-white mb-3"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {slide.title}
                </motion.h1>
                <motion.p 
                  className="text-lg md:text-xl text-gray-200 max-w-2xl"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {slide.subtitle}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link to="/contact" className="mt-6 inline-block bg-teal-600 text-white font-bold py-2 px-6 rounded-full hover:bg-teal-700 transition duration-300 text-sm">
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Quick Quote Calculator */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Get a Quick Quote</h2>
          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="origin">
                  Origin
                </label>
                <select 
                  className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                >
                  <option value="">Select Origin</option>
                  {[...new Set(priceList.map(item => item.origin))].map((origin, index) => (
                    <option key={index} value={origin}>{origin}</option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="destination">
                  Destination
                </label>
                <select 
                  className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option value="">Select Destination</option>
                  {[...new Set(priceList.map(item => item.destination))].map((destination, index) => (
                    <option key={index} value={destination}>{destination}</option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                  Weight (kg)
                </label>
                <input 
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
                  id="weight" 
                  type="number" 
                  placeholder="Enter weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currency">
                  Currency
                </label>
                <select 
                  className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="BDT">BDT</option>
                </select>
              </div>
            </div>
            {priceDetails && (
              <div className="mt-6 bg-gray-100 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Shipping Quote</h3>
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left text-gray-600" colSpan={2}>Quote Details</th>
                        <th className="px-4 py-2 text-right text-gray-600">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-600 font-semibold">Origin</td>
                        <td className="px-4 py-2 text-gray-800" colSpan={2}>{origin}</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-600 font-semibold">Destination</td>
                        <td className="px-4 py-2 text-gray-800" colSpan={2}>{destination}</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-600 font-semibold">Weight</td>
                        <td className="px-4 py-2 text-gray-800" colSpan={2}>{weight} kg</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-600 font-semibold">Base Price</td>
                        <td className="px-4 py-2 text-gray-800"></td>
                        <td className="px-4 py-2 text-gray-800 text-right">{formatCurrency(priceDetails.basePrice, currency)}</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-600 font-semibold">Weight Factor</td>
                        <td className="px-4 py-2 text-gray-800">{priceDetails.weightFactor}x (0.2% increase per 10kg)</td>
                        <td className="px-4 py-2 text-gray-800 text-right">{formatCurrency(priceDetails.basePrice * (priceDetails.weightIncrease - 1), currency)}</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-600 font-semibold">Subtotal</td>
                        <td className="px-4 py-2 text-gray-800"></td>
                        <td className="px-4 py-2 text-gray-800 text-right">{formatCurrency(priceDetails.totalPrice, currency)}</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-600 font-semibold">Insurance (2%)</td>
                        <td className="px-4 py-2 text-gray-800"></td>
                        <td className="px-4 py-2 text-gray-800 text-right">{formatCurrency(priceDetails.totalPrice * 0.02, currency)}</td>
                      </tr>
                      <tr className="bg-gray-200 font-bold">
                        <td className="px-4 py-2 text-gray-800">Total Price</td>
                        <td className="px-4 py-2 text-gray-800"></td>
                        <td className="px-4 py-2 text-gray-800 text-right">{formatCurrency(priceDetails.totalPrice * 1.02, currency)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  * This is an estimated quote. Final price may vary based on specific shipment details and any additional services required.
                </p>
                <div className="mt-6 flex justify-center">
                  <button className="bg-teal-600 text-white font-bold py-2 px-6 rounded-full hover:bg-teal-700 transition duration-300">
                    Proceed with Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Premium Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: FaGlobeAmericas, title: "Global Reach", description: "Connect with markets worldwide through our extensive network" },
              { icon: FaShip, title: "Sea Freight", description: "Efficient ocean transport solutions for your cargo" },
              { icon: FaPlane, title: "Air Freight", description: "Swift air cargo services for time-sensitive shipments" },
              { icon: FaTruck, title: "Land Transport", description: "Reliable ground shipping options across continents" },
              { icon: FaChartLine, title: "Trade Consulting", description: "Expert guidance to optimize your international trade" },
              { icon: FaHandshake, title: "Customer Focus", description: "Dedicated support ensuring your satisfaction at every step" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
                variants={itemVariants}
              >
                <div className="p-6">
                  <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <Link to="/services" className="text-teal-600 font-semibold text-sm flex items-center">
                    Learn More <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Shipping Routes Map */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Global Network</h2>
          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d60989881.07833486!2d-5.5661481817297695!3d23.012873812808984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1637234534563!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </motion.div>

        {/* Shipping Process Timeline */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Shipping Process</h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-lg shadow-xl p-6">
            {[
              { icon: FaSearch, title: "Quote Request", description: "Get an instant quote for your shipment" },
              { icon: FaHandshake, title: "Booking", description: "Confirm your booking with our team" },
              { icon: FaTruck, title: "Pickup", description: "We collect your cargo from the specified location" },
              { icon: FaShip, title: "Shipping", description: "Your cargo is safely transported to its destination" },
              { icon: FaMapMarkedAlt, title: "Tracking", description: "Track your shipment in real-time" },
              { icon: FaUserTie, title: "Delivery", description: "Your cargo is delivered to the final destination" },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center mb-4 md:mb-0">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mb-2">
                  <step.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{step.title}</h3>
                <p className="text-gray-600 text-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Statistics Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Global Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "1000+", label: "Clients Served" },
                { number: "50+", label: "Countries Reached" },
                { number: "5M+", label: "Tons Shipped" },
                { number: "99%", label: "Client Satisfaction" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <motion.p 
                    className="text-4xl font-bold text-white mb-1"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {stat.number}
                  </motion.p>
                  <p className="text-sm text-teal-100">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Client Success Stories</h2>
          <Carousel className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-4">
                  <FaQuoteLeft className="text-3xl text-teal-600 mb-4" />
                  <p className="text-gray-600 text-sm mb-4 italic">{testimonial.text}</p>
                  <div className="flex items-center">
                    <img src={`https://i.pravatar.cc/60?img=${index}`} alt={testimonial.name} className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-600">{testimonial.company}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </motion.div>

        {/* Latest News & Industry Insights */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Latest News & Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "The Future of Global Logistics", date: "May 15, 2023", excerpt: "Explore emerging trends shaping the future of international shipping and logistics.", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&h=250&q=80" },
              { title: "Sustainability in Shipping", date: "April 28, 2023", excerpt: "Learn about our commitment to reducing environmental impact in global trade.", image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=400&h=250&q=80" },
              { title: "Navigating Supply Chain Disruptions", date: "April 10, 2023", excerpt: "Strategies for maintaining resilient supply chains in uncertain times.", image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=400&h=250&q=80" },
            ].map((post, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-teal-600 text-xs"><FaCalendarAlt className="inline mr-1" /> {post.date}</span>
                    <Link to="/blog" className="text-teal-600 font-semibold text-sm flex items-center">
                      Read More <FaArrowRight className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="bg-gray-900 rounded-lg shadow-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Expand Your Global Reach?</h3>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">Let's discuss how we can help grow your business internationally with our tailored import-export solutions.</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="inline-block bg-teal-600 text-white font-bold py-3 px-8 rounded-full text-sm hover:bg-teal-700 transition duration-300"
              >
                Get Started Today
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Stay Informed</h2>
          <div className="bg-white rounded-lg shadow-xl p-8">
            <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">Subscribe to our newsletter for the latest industry insights, trade updates, and exclusive offers.</p>
            <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-teal-600 text-white font-bold py-2 px-8 rounded-full text-sm hover:bg-teal-700 transition duration-300"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;

