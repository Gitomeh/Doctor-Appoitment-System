const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('../src/models/Doctor');

dotenv.config();

const doctors = [
  {
    name: 'Dr. Sarah Johnson',
    hospital: 'City General Hospital',
    specialty: 'Cardiology',
    email: 'sarah.johnson@citygeneral.com',
    phone: '+1 (555) 123-4567',
    image: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    name: 'Dr. Michael Chen',
    hospital: 'Metro Medical Center',
    specialty: 'Neurology',
    email: 'michael.chen@metromedical.com',
    phone: '+1 (555) 234-5678',
    image: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    name: 'Dr. Emily Rodriguez',
    hospital: 'St. Mary\'s Hospital',
    specialty: 'Pediatrics',
    email: 'emily.rodriguez@stmarys.com',
    phone: '+1 (555) 345-6789',
    image: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
  {
    name: 'Dr. James Wilson',
    hospital: 'University Hospital',
    specialty: 'Orthopedics',
    email: 'james.wilson@universityhospital.com',
    phone: '+1 (555) 456-7890',
    image: 'https://randomuser.me/api/portraits/men/4.jpg'
  },
  {
    name: 'Dr. Lisa Thompson',
    hospital: 'Regional Medical Center',
    specialty: 'Dermatology',
    email: 'lisa.thompson@regionalmed.com',
    phone: '+1 (555) 567-8901',
    image: 'https://randomuser.me/api/portraits/women/5.jpg'
  },
  {
    name: 'Dr. David Kim',
    hospital: 'City General Hospital',
    specialty: 'Oncology',
    email: 'david.kim@citygeneral.com',
    phone: '+1 (555) 678-9012',
    image: 'https://randomuser.me/api/portraits/men/6.jpg'
  },
  {
    name: 'Dr. Amanda Martinez',
    hospital: 'Metro Medical Center',
    specialty: 'Psychiatry',
    email: 'amanda.martinez@metromedical.com',
    phone: '+1 (555) 789-0123',
    image: 'https://randomuser.me/api/portraits/women/7.jpg'
  },
  {
    name: 'Dr. Robert Taylor',
    hospital: 'St. Mary\'s Hospital',
    specialty: 'General Medicine',
    email: 'robert.taylor@stmarys.com',
    phone: '+1 (555) 890-1234',
    image: 'https://randomuser.me/api/portraits/men/8.jpg'
  },
  {
    name: 'Dr. Jennifer Lee',
    hospital: 'University Hospital',
    specialty: 'Hematology',
    email: 'jennifer.lee@universityhospital.com',
    phone: '+1 (555) 901-2345',
    image: 'https://randomuser.me/api/portraits/women/9.jpg'
  },
  {
    name: 'Dr. William Brown',
    hospital: 'Regional Medical Center',
    specialty: 'Cardiology',
    email: 'william.brown@regionalmed.com',
    phone: '+1 (555) 012-3456',
    image: 'https://randomuser.me/api/portraits/men/10.jpg'
  }
];

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing doctors
    await Doctor.deleteMany();
    console.log('Cleared existing doctors');

    // Insert new doctors
    await Doctor.insertMany(doctors);
    console.log('Successfully seeded 10 doctors');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding doctors:', error.message);
    process.exit(1);
  }
};

seedDoctors();
