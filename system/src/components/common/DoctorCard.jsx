import { Link } from 'react-router-dom';

function DoctorCard({ doctor }) {
  // Default image if no photo provided
  const defaultImage = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face';
  
  const {
    photo = defaultImage,
    name = 'Doctor Name',
    hospital = 'Hospital Name',
    specialty = 'Specialty',
    _id
  } = doctor;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Doctor Photo */}
      <div className="h-48 overflow-hidden">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Doctor Information */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {name}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-sm">{hospital}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm">{specialty}</span>
          </div>
        </div>

        {/* Book Appointment Button */}
        <Link
          to={`/book-appointment/${_id}`}
          className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors duration-200"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
}

export default DoctorCard;