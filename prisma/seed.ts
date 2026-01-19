import * as dotenv from "dotenv";
import { prisma } from "../server/utils/prisma";
// This manually loads the .env file from the root into process.env
dotenv.config();

async function main() {
  console.log("--- Cleaning Database ---");
  await prisma.car.deleteMany(); // Clears existing cars before seeding

  const cars = [
    {
      name: "911 GT3 RS",
      brand: "Porsche",
      modelYear: 2024,
      price: 241300,
      engine: "4.0L Naturally Aspirated Boxer-6",
      horsepower: 518,
      transmission: "7-Speed PDK",
      fuelType: "Petrol",
      mileage: 15,
      drivetrain: "RWD",
      exteriorColor: "Ice Grey Metallic",
      interiorColor: "Black / Weissach Package",
      description:
        "The ultimate track-focused 911. Aerodynamics taken to the absolute limit for the purest driving experience.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      status: "AVAILABLE",
      isFeatured: true,
    },
    {
      name: "M4 Competition xDrive",
      brand: "BMW",
      modelYear: 2023,
      price: 86000,
      engine: "3.0L BMW M TwinPower Turbo",
      horsepower: 503,
      transmission: "8-Speed M Steptronic",
      fuelType: "Petrol",
      mileage: 1200,
      drivetrain: "AWD",
      exteriorColor: "Isle of Man Green",
      interiorColor: "Kyalami Orange Leather",
      description:
        "A daily-driver that thinks it's a race car. The xDrive system provides unbelievable traction in all conditions.",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
      status: "AVAILABLE",
      isFeatured: true,
    },
    {
      name: "RS6 Avant Performance",
      brand: "Audi",
      modelYear: 2024,
      price: 125800,
      engine: "4.0L V8 Twin-Turbo",
      horsepower: 621,
      transmission: "Tiptronic",
      fuelType: "Petrol",
      mileage: 45,
      drivetrain: "Quattro AWD",
      exteriorColor: "Nardo Grey",
      interiorColor: "Valcona Leather",
      description:
        "The ultimate wagon. Space for the whole family and enough power to embarrass most supercars.",
      image:
        "https://images.pexels.com/photos/13446948/pexels-photo-13446948.jpeg",
      status: "AVAILABLE",
      isFeatured: false,
    },
    {
      name: "G 63 AMG",
      brand: "Mercedes-Benz",
      modelYear: 2023,
      price: 179000,
      engine: "4.0L V8 Biturbo",
      horsepower: 577,
      transmission: "9-Speed Automatic",
      fuelType: "Petrol",
      mileage: 3500,
      drivetrain: "4WD",
      exteriorColor: "Obsidian Black",
      interiorColor: "Red Nappa Leather",
      description:
        "The G-Wagon is an icon of status and capability. Rugged military roots meet modern luxury.",
      image:
        "https://images.pexels.com/photos/13498965/pexels-photo-13498965.jpeg",
      status: "AVAILABLE",
      isFeatured: true,
    },
    {
      name: "Model S Plaid",
      brand: "Tesla",
      modelYear: 2024,
      price: 89990,
      engine: "Tri-Motor Electric",
      horsepower: 1020,
      transmission: "Single Speed",
      fuelType: "Electric",
      mileage: 0,
      drivetrain: "AWD",
      exteriorColor: "Ultra Red",
      interiorColor: "White Synthetic Leather",
      description:
        "0-60 in 1.99 seconds. The fastest accelerating car in production today with full self-driving capability.",
      image:
        "https://images.pexels.com/photos/13575248/pexels-photo-13575248.jpeg",
      status: "AVAILABLE",
      isFeatured: false,
    },
    {
      name: "Huracán Sterrato",
      brand: "Lamborghini",
      modelYear: 2024,
      price: 273000,
      engine: "5.2L V10",
      horsepower: 602,
      transmission: "7-Speed Dual Clutch",
      fuelType: "Petrol",
      mileage: 10,
      drivetrain: "AWD",
      exteriorColor: "Arancio Xanto",
      interiorColor: "Alcantara Black",
      description:
        "A supercar for the dirt. Increased ground clearance and rugged tires for high-speed off-road thrills.",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b",
      status: "AVAILABLE",
      isFeatured: true,
    },
    {
      name: "DB12",
      brand: "Aston Martin",
      modelYear: 2024,
      price: 245000,
      engine: "4.0L V8 Twin-Turbo",
      horsepower: 671,
      transmission: "8-Speed Automatic",
      fuelType: "Petrol",
      mileage: 25,
      drivetrain: "RWD",
      exteriorColor: "British Racing Green",
      interiorColor: "Tan Bridge of Weir Leather",
      description:
        "The world's first 'Super Tourer.' Elegant, powerful, and impeccably hand-crafted.",
      image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e",
      status: "AVAILABLE",
      isFeatured: false,
    },
    {
      name: "Range Rover SV",
      brand: "Land Rover",
      modelYear: 2024,
      price: 209000,
      engine: "4.4L V8 Twin-Turbo",
      horsepower: 606,
      transmission: "8-Speed Automatic",
      fuelType: "Petrol",
      mileage: 50,
      drivetrain: "AWD",
      exteriorColor: "Charente Grey",
      interiorColor: "Serenity Theme Leather",
      description:
        "The pinnacle of luxury SUVs. Refined, composed, and capable of going anywhere in total silence.",
      image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24",
      status: "AVAILABLE",
      isFeatured: false,
    },
    {
      name: "Artura",
      brand: "McLaren",
      modelYear: 2023,
      price: 233000,
      engine: "3.0L V6 Hybrid",
      horsepower: 671,
      transmission: "8-Speed Seamless Shift",
      fuelType: "Hybrid",
      mileage: 800,
      drivetrain: "RWD",
      exteriorColor: "Flux Green",
      interiorColor: "Carbon Fiber / Alcantara",
      description:
        "High-performance hybrid supercar. Next-generation technology meets McLaren's lightweight racing DNA.",
      image: "https://images.unsplash.com/photo-1621135802920-133df287f89c",
      status: "AVAILABLE",
      isFeatured: false,
    },
    {
      name: "MC20 Cielo",
      brand: "Maserati",
      modelYear: 2024,
      price: 272000,
      engine: "3.0L V6 Nettuno",
      horsepower: 621,
      transmission: "8-Speed Dual Clutch",
      fuelType: "Petrol",
      mileage: 5,
      drivetrain: "RWD",
      exteriorColor: "Acquamarina",
      interiorColor: "Ice Grey Leather",
      description:
        "Italian style with a glass roof that disappears in seconds. A masterpiece of aero-design and wind-sculpted curves.",
      image:
        "https://images.pexels.com/photos/33987626/pexels-photo-33987626.jpeg",
      status: "AVAILABLE",
      isFeatured: true,
    },
  ];

  console.log("--- Seeding Started ---");
  for (const car of cars) {
    const created = await prisma.car.create({ data: car });
    console.log(`Created: ${created.name}`);
  }
  console.log("--- Seed Finished! ---");
}

main()
  .catch((e) => {
    console.error("Seed Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
