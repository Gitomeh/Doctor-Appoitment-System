import { useState, useEffect } from 'react';
import DoctorCard from '../components/common/DoctorCard';
import doctorService from '../services/doctorService';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import ErrorMessage from '../components/ui/ErrorMessage';
import PageLayout from '../components/layouts/PageLayout';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [searchQuery, doctors]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await doctorService.getAllDoctors();
      setDoctors(data);
      setFilteredDoctors(data);
    } catch (err) {
      setError('Failed to load doctors. Please try again later.');
      console.error('Error fetching doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterDoctors = () => {
    if (!searchQuery.trim()) {
      setFilteredDoctors(doctors);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = doctors.filter((doctor) => {
      const nameMatch = doctor.name?.toLowerCase().includes(query);
      const hospitalMatch = doctor.hospital?.toLowerCase().includes(query);
      const specialtyMatch = doctor.specialty?.toLowerCase().includes(query);
      return nameMatch || hospitalMatch || specialtyMatch;
    });

    setFilteredDoctors(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <PageLayout title="Our Doctors">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
        <div className="relative">
          <label htmlFor="search" className="sr-only">
            Search doctors by name, hospital, or specialty
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search doctors by name, hospital, or specialty..."
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search doctors by name, hospital, or specialty"
            className="w-full px-4 py-3 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm text-sm sm:text-base"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {searchQuery && (
          <p className="text-xs sm:text-sm text-gray-600 mt-2" role="status" aria-live="polite">
            Found {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} matching "{searchQuery}"
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && <LoadingSpinner />}

      {/* Error State */}
      {error && (
        <div className="max-w-md mx-auto mb-6">
          <ErrorMessage message={error} onRetry={fetchDoctors} />
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredDoctors.length === 0 && (
        <EmptyState
          icon={
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          title={searchQuery ? `No doctors found matching "${searchQuery}"` : 'No doctors available'}
          description={searchQuery ? 'Try adjusting your search terms.' : 'Check back later for available doctors.'}
        />
      )}

      {/* Doctors Grid */}
      {!loading && !error && filteredDoctors.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </PageLayout>
  );
}

export default Doctors;
