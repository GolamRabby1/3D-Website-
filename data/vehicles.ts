export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  type: 'car' | 'bike';
  price: string;
  topSpeed: string;
  acceleration: string;
  power: string;
  image: string;
  description: string;
  color: string;
}

export const hypercars: Vehicle[] = [
  {
    id: 'lamborghini',
    name: 'Revuelto',
    brand: 'Lamborghini',
    type: 'car',
    price: '$608,358',
    topSpeed: '350 km/h',
    acceleration: '2.5s (0-100)',
    power: '1,015 CV',
    //image: 'https://picsum.photos/seed/lamborghini-rev/600/400.jpg',
    image: '/images/cars/RevueltoC.jpg',
    description: 'The first V12 hybrid from Sant\'Agata. A masterpiece of engineering and design that redefines the super sports car concept.',
    color: '#FFD700',
  },
  {
    id: 'bugatti',
    name: 'Chiron Super Sport',
    brand: 'Bugatti',
    type: 'car',
    price: '$3,300,000',
    topSpeed: '440 km/h',
    acceleration: '2.3s (0-100)',
    power: '1,600 HP',
    //image: 'https://picsum.photos/seed/bugatti-chiron/600/400.jpg',
    image: '/images/cars/chiron Super.jpg',
    description: 'The ultimate grand tourisme — quad-turbo W16 fury sculpted into 440 km/h aerodynamics. Nothing else comes close.',
    color: '#00F0FF',
  },
  {
    id: 'rimac',
    name: 'Nevera',
    brand: 'Rimac',
    type: 'car',
    price: '$2,200,000',
    topSpeed: '412 km/h',
    acceleration: '1.81s (0-100)',
    power: '1,914 HP',
    //image: 'https://picsum.photos/seed/rimac-nevera/600/400.jpg',
    image: '/images/cars/neveracar.jpg',
    description: 'The world\'s fastest electric production car. 1,914 horses of pure electric fury with torque vectoring on all four wheels.',
    color: '#7A00FF',
  },
];

export const superbikes: Vehicle[] = [
  {
    id: 'ducati',
    name: 'Panigale V4 R',
    brand: 'Ducati',
    type: 'bike',
    price: '$39,500',
    topSpeed: '300 km/h',
    acceleration: '2.9s (0-100)',
    power: '221 HP',
   // image: 'https://picsum.photos/seed/ducati-panigale/600/400.jpg',
   image: '/images/bikes/panigaleB.jpg',
    description: 'The absolute pinnacle of Ducati production. A road-legal racer derived directly from MotoGP technology.',
    color: '#FF0000',
  },
  {
    id: 'bmw-motorrad',
    name: 'M 1000 RR',
    brand: 'BMW Motorrad',
    type: 'bike',
    price: '$27,500',
    topSpeed: '306 km/h',
    acceleration: '3.1s (0-100)',
    power: '212 HP',
   // image: 'https://picsum.photos/seed/bmw-s1000rr/600/400.jpg',
    image: '/images/bikes/M1000.jpg',
    description: 'The Superbike of the future. Race-derived aerodynamics with M carbon components and ShiftCam technology.',
    color: '#0066FF',
  },
  {
    id: 'kawasaki',
    name: 'Ninja H2R',
    brand: 'Kawasaki',
    type: 'bike',
    price: '$57,500',
    topSpeed: '400 km/h',
    acceleration: '2.5s (0-100)',
    power: '326 HP',
   // image: 'https://picsum.photos/seed/kawasaki-h2r/600/400.jpg',
   image: '/images/bikes/NinjaB.jpg',
    description: 'Thehypersport icon. Supercharged engine, carbon fiber bodywork, and track-only performance that defies physics.',
    color: '#00FF66',
  },
];

export const allVehicles: Vehicle[] = [...hypercars, ...superbikes];