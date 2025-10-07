const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create sample products
  const products = [
    {
      name: 'Ensemble T-Shirt',
      description: 'Premium cotton t-shirt with Ensemble logo',
      price: 25.99,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      stock: 50
    },
    {
      name: 'Music Club Mug',
      description: 'Ceramic mug perfect for your morning coffee',
      price: 15.99,
      imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop',
      stock: 30
    },
    {
      name: 'Dance Club Hoodie',
      description: 'Comfortable hoodie for dance practice',
      price: 45.99,
      imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
      stock: 25
    },
    {
      name: 'Theatre Club Cap',
      description: 'Stylish cap with theatre club branding',
      price: 20.99,
      imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
      stock: 40
    },
    {
      name: 'Ensemble Sticker Pack',
      description: 'Set of 10 vinyl stickers',
      price: 8.99,
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      stock: 100
    }
  ];

  console.log('📦 Creating products...');
  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: product
    });
  }

  // Create sample member profiles
  const members = [
    {
      name: 'Priya Sharma',
      role: 'President',
      club: 'CORE',
      bio: 'Passionate leader with 5+ years of experience in cultural activities. Dedicated to fostering creativity and building a strong community.',
      contactEmail: 'priya.sharma@ensemble.com'
    },
    {
      name: 'Arjun Patel',
      role: 'Vice President',
      club: 'CORE',
      bio: 'Creative visionary who brings fresh ideas to the table. Specializes in event coordination and team management.',
      contactEmail: 'arjun.patel@ensemble.com'
    },
    {
      name: 'Sneha Reddy',
      role: 'Dance Coordinator',
      club: 'DANCE',
      bio: 'Classical and contemporary dance expert with 8 years of training. Leads our dance troupe with grace and precision.',
      contactEmail: 'sneha.reddy@ensemble.com'
    },
    {
      name: 'Rahul Kumar',
      role: 'Music Coordinator',
      club: 'MUSIC',
      bio: 'Multi-instrumentalist and vocalist with a passion for both traditional and modern music. Inspires our musicians to reach new heights.',
      contactEmail: 'rahul.kumar@ensemble.com'
    },
    {
      name: 'Ananya Singh',
      role: 'Theatre Coordinator',
      club: 'THEATRE',
      bio: 'Theatre enthusiast with extensive experience in acting and direction. Brings stories to life with passion and creativity.',
      contactEmail: 'ananya.singh@ensemble.com'
    }
  ];

  console.log('👥 Creating member profiles...');
  for (const member of members) {
    await prisma.memberProfile.upsert({
      where: { name: member.name },
      update: {},
      create: member
    });
  }

  // Create a sample admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  console.log('👤 Creating admin user...');
  await prisma.user.upsert({
    where: { email: 'admin@ensemble.com' },
    update: {},
    create: {
      email: 'admin@ensemble.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN'
    }
  });

  console.log('✅ Database seeding completed successfully!');
  console.log('\n📋 Sample data created:');
  console.log('- 5 products in the shop');
  console.log('- 5 member profiles');
  console.log('- 1 admin user (admin@ensemble.com / admin123)');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
