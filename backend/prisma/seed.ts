import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedData() {
  // Seed Admin
  const admin = await prisma.admin.create({
    data: {
      profilePic: "https://www.w3schools.com/w3images/avatar2.png",
      name: "Jhon",
      contactNumber: "03216572453",
      email: 'admin@example.com',
      password: '$2b$10$tW6arkaCh2b.eWvPKTt7d.lk5/u0T9faKvoFCHD/YfO0yiQcxRboS',    // Edu@12345
      role: 'Admin',
      is_Active: true,
      is_contactNumberVerified: true,
      is_emailVerified: true,
    },
  });

  // Seed Patient
  const patients = await Promise.all([
    prisma.patient.create({
      data: {
        profilePic: "https://www.w3schools.com/w3images/avatar2.png",
        name: "Jhon",
        contactNumber: "03216572450",
        email: 'jhon@example.com',
        password: '$2b$10$tW6arkaCh2b.eWvPKTt7d.lk5/u0T9faKvoFCHD/YfO0yiQcxRboS', // Edu@12345
        role: 'Patient',
        is_Active: true,
        is_contactNumberVerified: true,
        is_emailVerified: true,
      },
    }),
    prisma.patient.create({
      data: {
        profilePic: "https://www.w3schools.com/w3images/avatar2.png",
        name: "Alice",
        contactNumber: "03216572451",
        email: 'alice@example.com',
        password: '$2b$10$tW6arkaCh2b.eWvPKTt7d.lk5/u0T9faKvoFCHD/YfO0yiQcxRboS',  // Edu@12345
        role: 'Patient',
        is_Active: true,
        is_contactNumberVerified: true,
        is_emailVerified: true,
      },
    }),
    prisma.patient.create({
      data: {
        profilePic: "https://www.w3schools.com/w3images/avatar2.png",
        name: "Daeman",
        contactNumber: "03216572452",
        email: 'daeman@example.com',
        password: '$2b$10$tW6arkaCh2b.eWvPKTt7d.lk5/u0T9faKvoFCHD/YfO0yiQcxRboS',  // Edu@12345
        role: 'Patient',
        is_Active: true,
        is_contactNumberVerified: true,
        is_emailVerified: true,
      },
    }),
    prisma.patient.create({
      data: {
        profilePic: "https://www.w3schools.com/w3images/avatar2.png",
        name: "Bojan",
        contactNumber: "03216572453",
        email: 'bojan@example.com',
        password: '$2b$10$tW6arkaCh2b.eWvPKTt7d.lk5/u0T9faKvoFCHD/YfO0yiQcxRboS',  // Edu@12345
        role: 'Patient',
        is_Active: true,
        is_contactNumberVerified: true,
        is_emailVerified: true,
      },
    }),
    prisma.patient.create({
      data: {
        profilePic: "https://www.w3schools.com/w3images/avatar2.png",
        name: "Hower",
        contactNumber: "03216572454",
        email: 'hower@example.com',
        password: '$2b$10$tW6arkaCh2b.eWvPKTt7d.lk5/u0T9faKvoFCHD/YfO0yiQcxRboS',  // Edu@12345
        role: 'Patient',
        is_Active: true,
        is_contactNumberVerified: true,
        is_emailVerified: true,
      },
    })

  ]);

  // Seed Doctor

  const doctors = await Promise.all([
    prisma.doctor.create({
      data: {
        profilePic: "https://res.cloudinary.com/drascgtap/image/upload/v1714986156/BookingEngine/htq5a8mwabkn5fckok6x.png",
        name: "دكتورة وداد",
        contactNumber: "03121212121",
        email: 'drwadad@gmail.com',
        password: '$2b$10$tW6arkaCh2b.eWvPKTt7d.lk5/u0T9faKvoFCHD/YfO0yiQcxRboS',  // Edu@12345
        role: 'Doctor',
        degreeName: 'MBBS',
        degreeInstitute: 'KE',
        specializationId: null, 
        totalExperience: 10,
        doctorFee: 200,
        is_Active: true,
        is_contactNumberVerified: false,
        is_emailVerified: true,
      },
    }),
    prisma.doctor.create({
      data: {
        profilePic: "https://res.cloudinary.com/drascgtap/image/upload/v1715608368/BookingEngine/qexbvbymkkr0bwoxko2i.png",
        name: "دكتورة مها فؤاد",
        contactNumber: "03289746564",
        email: 'maha@gmail.com',
        password: '$2b$10$tW6arkaCh2b.eWvPKTt7d.lk5/u0T9faKvoFCHD/YfO0yiQcxRboS',  // Edu@12345
        role: 'Doctor',
        degreeName: 'MBBS',
        degreeInstitute: 'KE',
        specializationId: null,
        totalExperience: 5,
        doctorFee: 500,
        is_Active: true,
        is_contactNumberVerified: false,
        is_emailVerified: true,
      },
    }),
    prisma.doctor.create({
      data: {
        profilePic: "https://res.cloudinary.com/drascgtap/image/upload/v1714986650/BookingEngine/qj0ip3rlrkei4j59whwa.png",
        name: "دكتور أحمد خطاب",
        contactNumber: "03257875451",
        email: 'drahmad@gmail.com',
        password: '$2b$10$tW6arkaCh2b.eWvPKTt7d.lk5/u0T9faKvoFCHD/YfO0yiQcxRboS',  // Edu@12345
        role: 'Doctor',
        degreeName: 'MBBS',
        degreeInstitute: 'KE',
        specializationId: null,
        totalExperience: 10,
        doctorFee: 1000,
        is_Active: true,
        is_contactNumberVerified: false,
        is_emailVerified: true,
      },
    }),
    prisma.doctor.create({
      data: {
        profilePic: "https://res.cloudinary.com/drascgtap/image/upload/v1714986587/BookingEngine/ag4uzpqwwiuuophpn5oj.png",
        name: "دكتور محمد عصام",
        contactNumber: "03217413208",
        email: 'drmohammadasam@gmail.com',
        password: '$2b$10$tW6arkaCh2b.eWvPKTt7d.lk5/u0T9faKvoFCHD/YfO0yiQcxRboS',  // Edu@12345
        role: 'Doctor',
        degreeName: 'MBBS',
        degreeInstitute: 'KE',
        specializationId: null,
        totalExperience: 19,
        doctorFee: 1000,
        is_Active: true,
        is_contactNumberVerified: false,
        is_emailVerified: true,
      },
    }),
    prisma.doctor.create({
      data: {
        profilePic: "https://res.cloudinary.com/drascgtap/image/upload/v1714986449/BookingEngine/uctxtl1tg4bymbsspbk1.png",
        name: "دكتورة سيدة",
        contactNumber: "03217896541",
        email: 'drsyeda@gmail.com',
        password: '$2b$10$tW6arkaCh2b.eWvPKTt7d.lk5/u0T9faKvoFCHD/YfO0yiQcxRboS',  // Edu@12345
        role: 'Doctor',
        degreeName: 'MBBS',
        degreeInstitute: 'KE',
        specializationId: null,
        totalExperience: 4,
        doctorFee: 200,
        is_Active: true,
        is_contactNumberVerified: false,
        is_emailVerified: true,
      },
    })
  ]);

  const services = await Promise.all([
    prisma.service.create({
      data: {
        id: '25701a7b-6517-4e63-afab-840f600474a3',
        name: 'Dentil sub Service',
        description: 'Add a new sub Service',
        serviceFee: 1000,
        picture: 'https://res.cloudinary.com/drascgtap/image/upload/v1718351328/BookingEngine/graeawtqulyleraoislv.jpg',
        discount: false,
        is_Active: true,
        is_Deleted: false,
      },
    }),
    prisma.service.create({
      data: {
        id: '3287ea3e-4ae6-4375-ab00-9667abdff259',
        name: 'Gynecologist',
        description: 'Female Reproductive Organ related issues',
        serviceFee: 0,
        subService: null,
        picture: 'https://res.cloudinary.com/drascgtap/image/upload/v1714982310/BookingEngine/z1rypf9fhqrvphcu6wic.png',
        discount: false,
        is_Active: true,
        is_Deleted: false,
      },
    }),
    prisma.service.create({
      data: {
        id: '90de1d9a-1449-49b8-a405-7183072a2530',
        name: 'Dentist',
        description: 'Teeth related issues',
        serviceFee: 0,
        subService: null,
        picture: 'https://res.cloudinary.com/drascgtap/image/upload/v1715071200/BookingEngine/fmpjui6vfe1ym7yxa9vu.png',
        discount: false,
        is_Active: true,
        is_Deleted: false,
      },
    }),
    prisma.service.create({
      data: {
        id: 'f78c9b38-541f-4fc7-969f-20483bef0e9b',
        name: 'Dermatologist',
        description: 'Skin related issues',
        serviceFee: 0,
        subService: null,
        picture: 'https://res.cloudinary.com/drascgtap/image/upload/v1714982167/BookingEngine/r7holpsczgpmxkpjqcdf.png',
        discount: false,
        is_Active: true,
        is_Deleted: false,
      },
    }),
  ]);

  const categories = await Promise.all([
    prisma.categories.create({
      data: {
        id: "e6e65760-68f8-4a66-bf82-425051ce3e5f",
        name: "Lotion",
        unique_code: "xF8dUDMQ",
        active: true,
        attachment: "lotion.png",
        description: "this is to define upper category",
        deleted_at: false,
      },
    }),
  ]);

  const items = await Promise.all([
    prisma.items.create({
      data: {
        id: "024246e1-5d1d-4df6-89ed-4497a90bf2ba",
        name: "Dermagor Collagen Cream",
        unique_code: "hFLVio5Q",
        active: true,
        attachment: "https://res.cloudinary.com/drascgtap/image/upload/v1715020188/BookingEngine/hy1wjjobk6eza1gwajde.webp",
        description: null,
        categoryId: "e6e65760-68f8-4a66-bf82-425051ce3e5f",
        deleted_at: false,
      },
    }),
    prisma.items.create({
      data: {
        id: "084325cb-a493-4bdb-bcf4-fde16d0e9c51",
        name: "Vichy Normaderm Phytosoluyion Gel",
        unique_code: "Ua3YgozG",
        active: true,
        attachment: "https://res.cloudinary.com/drascgtap/image/upload/v1715020476/BookingEngine/de1kfmllrjafghrislh6.webp",
        description: "Unleash the purity of your skin with Vichy Normaderm Phytosolution Gel Cleanser. This dermatologist-tested formula is enriched with natural ingredients to gently cleanse, purify, and unclog pores, effectively removing impurities and excess oil. The gel texture transforms into a delicate foam, leaving your skin feeling refreshed and revitalized. With Vichy's expertise in skincare, embrace a clear and healthy complexion with this essential step in your daily routine.",
        categoryId: "e6e65760-68f8-4a66-bf82-425051ce3e5f",
        deleted_at: false,
      },
    }),
    prisma.items.create({
      data: {
        id: "38ba1728-abff-4b45-8f45-e97129b465b9",
        name: "Froika Hyaluronic AHA Cream",
        unique_code: "Y0uYE9QF",
        active: true,
        attachment: "https://res.cloudinary.com/drascgtap/image/upload/v1715020233/BookingEngine/xkdnsvhv4zcffhvhweay.webp",
        description: null,
        categoryId: "e6e65760-68f8-4a66-bf82-425051ce3e5f",
        deleted_at: false,
      },
    }),
    prisma.items.create({
      data: {
        id: "426f3c6f-5271-487c-8e09-2467f3be0138",
        name: "Cosmo White Eye Contour",
        unique_code: "YxIcnsY4",
        active: true,
        attachment: "https://res.cloudinary.com/drascgtap/image/upload/v1715020094/BookingEngine/rjpnexylc3jdvqkvzihx.webp",
        description: null,
        categoryId: "e6e65760-68f8-4a66-bf82-425051ce3e5f",
        deleted_at: false,
      },
    }),
    prisma.items.create({
      data: {
        id: "4343a8b9-ef41-4018-9906-6007d92512e3",
        name: "La Roche Posa Hialuonic Acid B5",
        unique_code: "f8euHoQI",
        active: true,
        attachment: "https://res.cloudinary.com/drascgtap/image/upload/v1715019903/BookingEngine/c0rwis4bsjoym1yyq8md.webp",
        description: "Fills wrinkles and promotes collagen production thanks to hyaluronic acid, and also contains Vitamin B5 to reduce inflammation, madecassoid to repair the skin barrier, and thermal spring water. Plumps, repairs wrinkles and regenerates sensitive skin. For the most sensitive skin.",
        categoryId: "e6e65760-68f8-4a66-bf82-425051ce3e5f",
        deleted_at: false,
      },
    }),
    prisma.items.create({
      data: {
        id: "5aeff5a2-a529-4764-be7a-5da0f6f59e99",
        name: "Froika U-10 Cream",
        unique_code: "xcwfjrAL",
        active: true,
        attachment: "https://res.cloudinary.com/drascgtap/image/upload/v1715020433/BookingEngine/m4iatqsubwznnzqvbsrv.webp",
        description: "",
        categoryId: "e6e65760-68f8-4a66-bf82-425051ce3e5f",
        deleted_at: false,
      },
    }),
    prisma.items.create({
      data: {
        id: "b06883ae-b3d1-485c-a334-3d3aa1fb625e",
        name: "Froika Suncare Anti Spot Cream",
        unique_code: "F8mmynnX",
        active: true,
        attachment: "https://res.cloudinary.com/drascgtap/image/upload/v1715020343/BookingEngine/qygpasoopztkwlbzffxe.webp",
        description: null,
        categoryId: "e6e65760-68f8-4a66-bf82-425051ce3e5f",
        deleted_at: false,
      },
    }),
    prisma.items.create({
      data: {
        id: "b363525d-8098-4c4d-9801-27d325c78bd0",
        name: "Bellogen Collagen 750ml",
        unique_code: "2R8S1HVk",
        active: true,
        attachment: "https://res.cloudinary.com/drascgtap/image/upload/v1715020146/BookingEngine/ea8xrj58pprqinvrr58w.webp",
        description: null,
        categoryId: "e6e65760-68f8-4a66-bf82-425051ce3e5f",
        deleted_at: false,
      },
    }),
    prisma.items.create({
      data: {
        id: "bc5e6197-c87c-4c68-b2b4-93fba41e075f",
        name: "Cosmo Argan Oil",
        unique_code: "QHOq9CKe",
        active: true,
        attachment: "https://res.cloudinary.com/drascgtap/image/upload/v1715019954/BookingEngine/flbdnavgsa2zcrwq5cyh.webp",
        description: null,
        categoryId: "e6e65760-68f8-4a66-bf82-425051ce3e5f",
        deleted_at: true,
      },
    }),
    
  ]);


  const itemVariants = await Promise.all([
    prisma.item_variants.create({
      data: {
        id: "46936fe9-4669-45de-847d-b18c845ca45e",
        size: "30ml",
        price: 111,
        stock: 10,
        unique_code: "SAYvSEKF",
        active: true,
        itemId: "084325cb-a493-4bdb-bcf4-fde16d0e9c51",
        deleted_at: false,
      },
    }),
    prisma.item_variants.create({
      data: {
        id: "48a06eaf-3495-40c6-88aa-2d881d939f3e",
        size: "100ml",
        price: 166,
        stock: 100,
        unique_code: "0sDPZIaJ",
        active: true,
        itemId: "b06883ae-b3d1-485c-a334-3d3aa1fb625e",
        deleted_at: false,
      },
    }),
    prisma.item_variants.create({
      data: {
        id: "4b4b6690-7a17-4e88-a1e6-3ae6a782d14c",
        size: "30ml",
        price: 205,
        stock: 100,
        unique_code: "7WaEK9IM",
        active: true,
        itemId: "024246e1-5d1d-4df6-89ed-4497a90bf2ba",
        deleted_at: false,
      },
    }),
    prisma.item_variants.create({
      data: {
        id: "68758aaf-16ec-4598-ac13-245dbaaaba82",
        size: "150ml",
        price: 247,
        stock: 100,
        unique_code: "WLxsOtfX",
        active: true,
        itemId: "38ba1728-abff-4b45-8f45-e97129b465b9",
        deleted_at: false,
      },
    }),
    prisma.item_variants.create({
      data: {
        id: "81d041ec-15f5-44e7-9329-9ebd23421aa9",
        size: "120ml",
        price: 132,
        stock: 0,
        unique_code: "nhJfYqE7",
        active: true,
        itemId: "bc5e6197-c87c-4c68-b2b4-93fba41e075f",
        deleted_at: false,
      },
    }),
    prisma.item_variants.create({
      data: {
        id: "99166c62-1e27-4c93-84fe-bded0e1015b5",
        size: "30ml",
        price: 195,
        stock: 20,
        unique_code: "x7NY2Mep",
        active: true,
        itemId: "426f3c6f-5271-487c-8e09-2467f3be0138",
        deleted_at: false,
      },
    }),
    prisma.item_variants.create({
      data: {
        id: "9a31dc04-68ea-4fd4-8bed-ca72e3f5d3b7",
        size: "100ml",
        price: 182,
        stock: 100,
        unique_code: "Wtut9rtt",
        active: true,
        itemId: "5aeff5a2-a529-4764-be7a-5da0f6f59e99",
        deleted_at: false,
      },
    }),
    prisma.item_variants.create({
      data: {
        id: "cab2dca4-ad58-4eba-a627-952f49ae469e",
        size: "30ml",
        price: 741,
        stock: 100,
        unique_code: "u279RjaT",
        active: true,
        itemId: "b363525d-8098-4c4d-9801-27d325c78bd0",
        deleted_at: false,
      },
    }),
  ]);  
}

 seedData()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
